-- Set up the custom roles type
CREATE TYPE user_role AS ENUM ('super_admin', 'hr', 'manager', 'employee', 'finance', 'field_employee');

-- 1. users
CREATE TABLE users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'employee'::user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. employees
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  emp_code TEXT UNIQUE NOT NULL,
  phone TEXT,
  department TEXT,
  designation TEXT,
  joining_date DATE,
  manager_id UUID REFERENCES employees(id),
  ctc DECIMAL(12, 2) DEFAULT 0,
  -- Documents/identifiers
  aadhar_no TEXT,
  pan_no TEXT,
  bank_account TEXT,
  ifsc_code TEXT,
  pf_no TEXT,
  esic_no TEXT,
  uan_no TEXT,
  ip_no TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. shifts
CREATE TABLE shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  grace_period_mins INTEGER DEFAULT 15,
  half_day_mins INTEGER DEFAULT 240,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. attendance
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in TIMESTAMP WITH TIME ZONE,
  check_out TIMESTAMP WITH TIME ZONE,
  check_in_lat DECIMAL(9, 6),
  check_in_lng DECIMAL(9, 6),
  check_out_lat DECIMAL(9, 6),
  check_out_lng DECIMAL(9, 6),
  late_by_mins INTEGER DEFAULT 0,
  overtime_mins INTEGER DEFAULT 0,
  status TEXT, -- 'present', 'absent', 'half_day', 'leave'
  source TEXT DEFAULT 'web', -- 'web', 'biometric', 'mobile'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(employee_id, date)
);

-- 5. leave_requests
CREATE TABLE leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  leave_type TEXT NOT NULL, -- 'CL', 'SL', 'EL'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days INTEGER NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'manager_approved', 'hr_approved', 'rejected'
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 6. payroll
CREATE TABLE payroll (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  gross_salary DECIMAL(12, 2) NOT NULL,
  net_salary DECIMAL(12, 2) NOT NULL,
  status TEXT DEFAULT 'draft', -- 'draft', 'processed', 'paid'
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 7. salary_components
CREATE TABLE salary_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payroll_id UUID REFERENCES payroll(id) ON DELETE CASCADE,
  basic DECIMAL(12, 2) DEFAULT 0,
  hra DECIMAL(12, 2) DEFAULT 0,
  special_allowance DECIMAL(12, 2) DEFAULT 0,
  bonus DECIMAL(12, 2) DEFAULT 0,
  arrears DECIMAL(12, 2) DEFAULT 0
);

-- 8. deductions
CREATE TABLE deductions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payroll_id UUID REFERENCES payroll(id) ON DELETE CASCADE,
  pf DECIMAL(12, 2) DEFAULT 0,
  esic DECIMAL(12, 2) DEFAULT 0,
  pt DECIMAL(12, 2) DEFAULT 0,
  tds DECIMAL(12, 2) DEFAULT 0,
  lwf DECIMAL(12, 2) DEFAULT 0,
  advance_recovery DECIMAL(12, 2) DEFAULT 0
);

-- 9. compliance
CREATE TABLE compliance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  type TEXT NOT NULL, -- 'PF_ECR', 'ESIC', 'PT', 'TDS'
  total_amount DECIMAL(15, 2),
  status TEXT DEFAULT 'generated',
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 10. advances
CREATE TABLE advances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  reason TEXT,
  installment_months INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'recovered'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 11. reimbursements
CREATE TABLE reimbursements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  bill_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 12. grievances
CREATE TABLE grievances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  status TEXT DEFAULT 'open', -- 'open', 'in_progress', 'resolved'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 13. tours
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  destination TEXT NOT NULL,
  purpose TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  estimated_cost DECIMAL(12, 2),
  status TEXT DEFAULT 'pending', 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 14. clients
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 15. leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES employees(id),
  title TEXT NOT NULL,
  value DECIMAL(12, 2),
  stage TEXT DEFAULT 'prospect', -- 'prospect', 'negotiation', 'won', 'lost'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 16. meetings
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  location_lat DECIMAL(9, 6),
  location_lng DECIMAL(9, 6),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 17. kpis
CREATE TABLE kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department TEXT NOT NULL,
  title TEXT NOT NULL,
  weightage INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 18. performance_reviews
CREATE TABLE performance_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES employees(id),
  review_period TEXT NOT NULL, -- e.g., 'Q1 2026'
  score DECIMAL(5, 2),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 19. notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 20. audit_logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);


-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll ENABLE ROW LEVEL SECURITY;

-- Basic Policies Sample
CREATE POLICY "Users can view their own record" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Employees can view their own info" ON employees FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Employees can view own attendance" ON attendance FOR SELECT USING (
  employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid())
);

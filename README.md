# Allied Medical HRMS + CRM

Enterprise-grade HRMS built with Next.js 15, Supabase, Tailwind CSS, and Shadcn UI.

## Modules Included:
- **RBAC Authentication**: Roles (Super Admin, HR, Manager, Employee, Finance, Field Employee).
- **Employee Master**: Complete CRUD for employees.
- **Attendance System**: GPS-based web attendance & Biometric Webhook endpoint.
- **Leave Management**: Tracking leave types and approvals.
- **Payroll Engine (India)**: Tax deductions, HRA, PF, PT, ESIC calculators.
- **CRM & Tours**: Field employee tracking, lead pipelines, visit logs.
- **Analytics Dashboard**: Real-time graphs for attendance & payroll costs.
- **Grievance Support Desk**: Internal ticketing system.
- **PMS & KPIs**: Performance tracking.

## Deployment to Vercel

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit of Allied Medical HRMS"
git branch -M main
git remote add origin https://github.com/yourusername/allied-medical-hrms.git
git push -u origin main
```

2. **Supabase Configuration**:
Go to the Supabase SQL Editor and run the script located in `database/schema.sql`.

3. **Vercel Deployment**:
- Go to [Vercel](https://vercel.com/new).
- Import your GitHub repository.
- Add the following Environment Variables before deploying:
  - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase Project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase Anon Key
  - `SUPABASE_SERVICE_ROLE_KEY` = Your Supabase Service Role Key

4. **Biometric Webhook**:
Point your eSSL or Biometric server to send POST requests containing `emp_code` and `check_time` to:
`https://your-vercel-domain.vercel.app/api/biometric/sync`

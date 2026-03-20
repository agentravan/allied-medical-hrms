import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// eSSL Biometric Webhook Endpoint
export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Expected structure from biometric machine or middleware
    // { emp_code: 'EMP001', check_time: '2026-03-20T08:30:00Z', device_id: 'DEV01' }
    
    if (!body || !body.emp_code || !body.check_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    // Find employee by code
    const { data: employee } = await supabase
      .from('employees')
      .select('id')
      .eq('emp_code', body.emp_code)
      .single()

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    const checkDate = new Date(body.check_time).toISOString().split('T')[0]

    // Check if attendance already exists for today to prevent duplicates
    const { data: existingAtt } = await supabase
      .from('attendance')
      .select('id, check_in, check_out')
      .eq('employee_id', employee.id)
      .eq('date', checkDate)
      .single()

    if (existingAtt) {
      // If check_in exists, and this is much later (e.g., > 4 hours), it might be a checkout
      // Simple logic: if check_out is null, mark it as check_out
      if (!existingAtt.check_out) {
        await supabase
          .from('attendance')
          .update({
            check_out: new Date(body.check_time).toISOString(),
            source: 'biometric'
          })
          .eq('id', existingAtt.id)
        return NextResponse.json({ message: 'Check-out updated' }, { status: 200 })
      } else {
        return NextResponse.json({ message: 'Already checked in and out' }, { status: 200 })
      }
    } else {
      // Insert new check in
      await supabase
        .from('attendance')
        .insert({
          employee_id: employee.id,
          date: checkDate,
          check_in: new Date(body.check_time).toISOString(),
          source: 'biometric'
        })
      return NextResponse.json({ message: 'Check-in recorded' }, { status: 201 })
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

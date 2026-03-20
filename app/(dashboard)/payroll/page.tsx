'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { calculatePayroll, PayrollOutput } from '@/lib/payroll/calculator'
import { Download, Calculator } from 'lucide-react'

export default function PayrollPage() {
  const [ctc, setCtc] = useState<number>(600000)
  const [payroll, setPayroll] = useState<PayrollOutput | null>(null)

  const handleCalculate = () => {
    if (ctc > 0) {
      const result = calculatePayroll({ ctc })
      setPayroll(result)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payroll Engine (India)</h1>
          <p className="text-slate-500 mt-1">Calculate and process monthly salaries.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export ECR
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Try Salary Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Annual CTC (₹)</Label>
              <Input 
                type="number" 
                value={ctc} 
                onChange={(e) => setCtc(Number(e.target.value))}
              />
            </div>
            <Button onClick={handleCalculate} className="w-full">
              <Calculator className="mr-2 h-4 w-4" /> Calculate Monthly Net
            </Button>

            {payroll && (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold text-lg mb-4">Payslip Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-slate-800 border-b pb-1">Earnings</p>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Basic (50%)</span>
                      <span>₹{payroll.basic.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">HRA (20%)</span>
                      <span>₹{payroll.hra.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Special</span>
                      <span>₹{payroll.special_allowance.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Gross</span>
                      <span>₹{payroll.gross_salary.toFixed(0)}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-slate-800 border-b pb-1">Deductions</p>
                    <div className="flex justify-between">
                      <span className="text-slate-500">PF</span>
                      <span>₹{payroll.pf.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ESIC</span>
                      <span>₹{payroll.esic_employee.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">PT</span>
                      <span>₹{payroll.pt.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">TDS</span>
                      <span>₹{payroll.tds.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="font-semibold text-blue-900">Net Take Home</span>
                  <span className="text-2xl font-bold text-blue-700">₹{payroll.net_salary.toFixed(0)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payroll Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Processed</TableHead>
                  <TableHead>Total Net</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Feb 2026</TableCell>
                  <TableCell>25 Feb 2026</TableCell>
                  <TableCell>₹12.4L</TableCell>
                  <TableCell>
                    <span className="inline-flex rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">Paid</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jan 2026</TableCell>
                  <TableCell>25 Jan 2026</TableCell>
                  <TableCell>₹12.2L</TableCell>
                  <TableCell>
                    <span className="inline-flex rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">Paid</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

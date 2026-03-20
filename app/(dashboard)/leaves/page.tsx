'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Calendar } from 'lucide-react'

// Dummy data for example
const leaveRequests = [
  { id: 1, type: 'Casual Leave', dates: '24 Mar - 25 Mar', days: 2, status: 'approved' },
  { id: 2, type: 'Sick Leave', dates: '10 Feb - 11 Feb', days: 2, status: 'approved' },
  { id: 3, type: 'Earned Leave', dates: '01 Apr - 05 Apr', days: 5, status: 'pending' },
]

export default function LeavesPage() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Leave Management</h1>
          <p className="text-slate-500 mt-1">Apply for leave and view your balance.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="mr-2 h-4 w-4" /> Apply Leave
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Casual Leave (CL)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 / 12</div>
            <p className="text-xs text-slate-500 mt-1">Days remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Sick Leave (SL)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10 / 10</div>
            <p className="text-xs text-slate-500 mt-1">Days remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Earned Leave (EL)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 / 20</div>
            <p className="text-xs text-slate-500 mt-1">Accrued balance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.type}</TableCell>
                  <TableCell>{req.dates}</TableCell>
                  <TableCell>{req.days}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      req.status === 'approved' 
                        ? 'bg-green-50 text-green-700 ring-green-600/20' 
                        : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                    }`}>
                      {req.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

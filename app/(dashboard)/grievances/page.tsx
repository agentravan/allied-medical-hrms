import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { PlusCircle, MessageCircle } from 'lucide-react'

const grievances = [
  { id: 'TKT-1021', subject: 'Payroll Discrepancy (Jan 2026)', date: '10 Feb 2026', priority: 'High', status: 'In Progress' },
  { id: 'TKT-1022', subject: 'Laptop battery replacement issue', date: '05 Mar 2026', priority: 'Medium', status: 'Open' },
  { id: 'TKT-1015', subject: 'Air conditioning not working on Floor 4', date: '15 Jan 2026', priority: 'Low', status: 'Resolved' },
]

export default function GrievancesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Grievance & Support Desk</h1>
          <p className="text-slate-500 mt-1">Raise HR or IT tickets and track their resolution status.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Raise Ticket
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center justify-between shadow-sm border border-red-100">
          <div>
            <p className="text-sm font-medium">Open Tickets</p>
            <h3 className="text-2xl font-bold">1</h3>
          </div>
          <div className="bg-red-200 p-3 rounded-full">
            <MessageCircle className="h-5 w-5 text-red-600" />
          </div>
        </div>
        <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg flex items-center justify-between shadow-sm border border-yellow-100">
          <div>
            <p className="text-sm font-medium">In Progress</p>
            <h3 className="text-2xl font-bold">1</h3>
          </div>
          <div className="bg-yellow-200 p-3 rounded-full">
            <MessageCircle className="h-5 w-5 text-yellow-600" />
          </div>
        </div>
        <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center justify-between shadow-sm border border-green-100">
          <div>
            <p className="text-sm font-medium">Resolved (Last 30d)</p>
            <h3 className="text-2xl font-bold">4</h3>
          </div>
          <div className="bg-green-200 p-3 rounded-full">
            <MessageCircle className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grievances.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium text-blue-600 hover:underline cursor-pointer">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      ticket.priority === 'High' ? 'bg-red-50 text-red-700 ring-red-600/20' : 
                      ticket.priority === 'Medium' ? 'bg-orange-50 text-orange-700 ring-orange-600/20' : 
                      'bg-slate-50 text-slate-700 ring-slate-600/20'
                    }`}>
                      {ticket.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      ticket.status === 'Resolved' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
                      ticket.status === 'Open' ? 'bg-red-50 text-red-700 ring-red-600/20' : 
                      'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                    }`}>
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-blue-600">View</Button>
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

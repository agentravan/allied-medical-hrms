import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Plus, Plane } from 'lucide-react'

const tours = [
  { id: 1, dest: 'Mumbai HQ', dates: '10 Apr - 15 Apr', cost: '₹25,000', status: 'pending' },
  { id: 2, dest: 'Bangalore Clinic', dates: '15 Mar - 18 Mar', cost: '₹12,000', status: 'approved' },
]

export default function ToursPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tour & Travel Management</h1>
          <p className="text-slate-500 mt-1">Submit travel requests and track expenses.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-500" /> My Travel Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destination</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Estimated Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.dest}</TableCell>
                  <TableCell>{t.dates}</TableCell>
                  <TableCell>{t.cost}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      t.status === 'approved' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                    }`}>
                      {t.status}
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

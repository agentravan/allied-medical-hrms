import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Target, TrendingUp } from 'lucide-react'

const kpis = [
  { id: 1, title: 'Quarterly Sales Target', weight: '40%', score: 85, status: 'On Track' },
  { id: 2, title: 'Client Retention Rate', weight: '30%', score: 92, status: 'Exceeding' },
  { id: 3, title: 'Compliance adherence', weight: '30%', score: 100, status: 'Exceeding' },
]

export default function PMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Performance Management System</h1>
          <p className="text-slate-500 mt-1">Track KPIs, Goals, and Performance Reviews.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Target className="mr-2 h-4 w-4" /> Set Goal
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" /> My Current KPIs (Q1 2026)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Goal Title</TableHead>
                <TableHead>Weightage</TableHead>
                <TableHead>Current Score (%)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpis.map((kpi) => (
                <TableRow key={kpi.id}>
                  <TableCell className="font-medium">{kpi.title}</TableCell>
                  <TableCell>{kpi.weight}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full ${kpi.score >= 90 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${kpi.score}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold">{kpi.score}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      kpi.status === 'Exceeding' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 'bg-blue-50 text-blue-700 ring-blue-600/20'
                    }`}>
                      {kpi.status}
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

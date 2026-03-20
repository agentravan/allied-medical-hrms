import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, MapPin } from 'lucide-react'

// Dummy Data
const stages = ['Prospect', 'Negotiation', 'Won', 'Lost']
const leads = [
  { id: 1, title: 'Apollo Hospitals Contract', client: 'Apollo Group', value: '₹12,50,000', stage: 'Negotiation' },
  { id: 2, title: 'Fortis Equipment Upgrades', client: 'Fortis Healthcare', value: '₹5,00,000', stage: 'Prospect' },
  { id: 3, title: 'Max Supply Deal', client: 'Max Super Speciality', value: '₹18,00,000', stage: 'Won' }
]

export default function CRMPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">CRM & Leads Pipeline</h1>
          <p className="text-slate-500 mt-1">Manage field leads, clients, and meetings.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><MapPin className="mr-2 h-4 w-4" /> Log Visit</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Add Lead
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage) => (
          <div key={stage} className="bg-slate-100 rounded-lg p-4 min-h-[500px]">
            <h3 className="font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-200">
              {stage}
            </h3>
            <div className="space-y-3">
              {leads
                .filter(lead => lead.stage === stage)
                .map(lead => (
                  <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm border-b pb-2">{lead.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 text-xs text-slate-500 space-y-1">
                      <p className="font-medium text-slate-800">{lead.client}</p>
                      <p className="text-blue-600 font-semibold">{lead.value}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

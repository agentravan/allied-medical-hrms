'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Clock } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

export default function AttendancePage() {
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)
  
  const handleCheckIn = () => {
    setLoading(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lng: longitude })
          
          // Submit to Supabase logic here
          const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'
          )
          
          const { data: { user } } = await supabase.auth.getUser()
          if(user) {
            // Find employee id for user
            const { data: emp } = await supabase.from('employees').select('id').eq('user_id', user.id).single()
            if(emp) {
              await supabase.from('attendance').insert({
                employee_id: emp.id,
                date: new Date().toISOString().split('T')[0],
                check_in: new Date().toISOString(),
                check_in_lat: latitude,
                check_in_lng: longitude,
                source: 'web'
              })
              alert('Checked in successfully via GPS!')
            }
          }
          setLoading(false)
        },
        (error) => {
          console.error(error)
          alert('GPS Location access denied or unavailable.')
          setLoading(false)
        }
      )
    } else {
      alert('Geolocation is not supported by your browser')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Attendance</h1>
        <p className="text-slate-500 mt-1">Mark your daily attendance and view history.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" /> Daily Check-In
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-slate-100 p-6 flex flex-col items-center justify-center text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <p className="text-slate-500 mb-6">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              
              <Button 
                onClick={handleCheckIn} 
                disabled={loading}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 h-12 px-8 rounded-full shadow-lg"
              >
                <MapPin className="mr-2 h-5 w-5" />
                {loading ? 'Fetching GPS...' : 'GPS Check-In'}
              </Button>
            </div>
            {location && (
              <p className="text-xs text-center text-slate-500">
                Location captured: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Attendance History Stats */}
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-slate-500">Present Days</span>
                <span className="font-semibold text-slate-800">18</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-slate-500">Absent Days</span>
                <span className="font-semibold text-slate-800">1</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-slate-500">Late Arrivals</span>
                <span className="font-semibold text-orange-600">2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

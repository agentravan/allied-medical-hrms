'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Plane,
  FileText,
  MessageSquare,
  Settings
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Attendance', href: '/attendance', icon: CalendarCheck },
  { name: 'Payroll', href: '/payroll', icon: FileText },
  { name: 'Tours', href: '/tours', icon: Plane },
  { name: 'Grievances', href: '/grievances', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 border-r border-slate-800 text-white">
      <div className="flex h-16 shrink-0 items-center px-6 font-bold text-xl tracking-wide text-blue-400">
        Allied Medical
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto pt-4 border-t border-slate-800">
        <ul role="list" className="flex flex-1 flex-col gap-y-2 px-4">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                    'group flex gap-x-3 rounded-md p-2 px-3 text-sm font-medium leading-6 transition-colors'
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white',
                      'h-5 w-5 shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

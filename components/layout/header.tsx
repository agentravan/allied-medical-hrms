'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'

export function Header({ userEmail }: { userEmail?: string }) {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'
  )

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-end gap-x-4 border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-2 text-sm text-slate-700">
          <User className="h-5 w-5 text-slate-400" />
          <span className="font-medium">{userEmail || 'User'}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-slate-600 hover:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </header>
  )
}

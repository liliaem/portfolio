'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'

const THEMES = [
  { id: 'light', label: 'Light', icon: <SunIcon className="h-4 w-4" aria-hidden="true" /> },
  { id: 'dark', label: 'Dark', icon: <MoonIcon className="h-4 w-4" aria-hidden="true" /> },
  { id: 'system', label: 'System', icon: <MonitorIcon className="h-4 w-4" aria-hidden="true" /> },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  if (!mounted) return <div className="h-9" />

  return (
    <div role="group" aria-label="Color theme" className="flex gap-1 rounded-md border border-line p-1 w-fit">
      {THEMES.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          aria-pressed={theme === id}
          aria-label={`${label} theme`}
          className={`p-1.5 rounded cursor-pointer transition-colors ${
            theme === id ? 'bg-brand-fill text-brand-contrast' : 'text-subtle hover:text-ink'
          }`}
        >
          {icon}
        </button>
      ))}
    </div>
  )
}

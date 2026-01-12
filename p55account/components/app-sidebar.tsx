"use client"

import {
  LayoutDashboard,
  Smartphone,
  FolderOpen,
  Upload,
  Play,
  LogOut,
  Gem,
  Sparkles,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { APP_NAME, APP_TAGLINE } from "@/lib/branding"

const menuItems = [
  { title: "Command Center", url: "/dashboard", icon: LayoutDashboard },
  { title: "Opportunities", url: "/create", icon: Smartphone },
  { title: "My Vault", url: "/pages", icon: FolderOpen },
  { title: "Link Vault", url: "/share", icon: Upload },
  { title: "Training", url: "/training", icon: Play },
]

const premiumItems = [
  { title: "DFY Vault", url: "/upgrades/dfy-vault", icon: Gem },
  { title: "Instant Income", url: "/upgrades/instant-income", icon: Sparkles },
  { title: "Autopilot", url: "/upgrades/automated-income", icon: Zap },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r-2 border-[#7c3aed]/20 bg-gradient-to-b from-[#0b0b12] via-[#120a24] to-[#0b0b12] flex flex-col z-50">
      {/* Header - Brand */}
      <div className="p-6 border-b-2 border-[#7c3aed]/20">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] via-[#f97316] to-[#84cc16] flex items-center justify-center shadow-[0_0_60px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_90px_rgba(249,115,22,0.45)] transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#0b0b12] flex items-center justify-center">
              <Smartphone className="w-7 h-7 text-[#c4b5fd]" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">{APP_NAME}</h2>
            <p className="text-xs text-[#f3e8ff]/80 font-semibold">{APP_TAGLINE}</p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <div className="flex-1 py-6 overflow-y-auto">
        <p className="text-xs font-bold text-[#c4b5fd]/60 px-6 mb-3 uppercase tracking-widest">Main</p>
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.url
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#7c3aed]/25 to-[#f97316]/20 text-white border-2 border-[#7c3aed]/35 shadow-lg shadow-[#7c3aed]/20"
                    : "text-[#e9d5ff]/80 hover:bg-[#7c3aed]/10 hover:text-white border-2 border-transparent"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* Premium Features */}
        <div className="mt-8">
          <div className="mx-6 mb-4 p-3 rounded-xl bg-gradient-to-r from-[#84cc16]/15 to-[#f97316]/15 border border-[#84cc16]/25">
            <p className="text-xs font-bold text-[#84cc16] uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Premium Tier
            </p>
          </div>
          <nav className="space-y-2 px-3">
            {premiumItems.map((item) => {
              const isActive = pathname === item.url
              const Icon = item.icon
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-200 border-2 ${
                    isActive
                      ? "bg-gradient-to-r from-[#84cc16]/20 to-[#f97316]/20 border-[#84cc16]/45 text-[#d9f99d] shadow-lg shadow-[#84cc16]/20"
                      : "border-[#84cc16]/20 text-[#d9f99d]/80 hover:border-[#84cc16]/40 hover:bg-[#84cc16]/10 hover:text-[#d9f99d]"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t-2 border-[#7c3aed]/20">
        <button
          onClick={handleSignOut}
          className="w-full h-14 text-base font-bold text-[#e9d5ff]/80 bg-transparent border-2 border-[#7c3aed]/20 rounded-2xl hover:border-[#7c3aed]/50 hover:text-white hover:bg-[#7c3aed]/10 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Exit Platform
        </button>
      </div>
    </aside>
  )
}

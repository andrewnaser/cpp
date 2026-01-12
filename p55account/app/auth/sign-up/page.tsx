"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Smartphone } from "lucide-react"
import { APP_NAME, APP_TAGLINE } from "@/lib/branding"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
          },
          emailConfirm: false, // Disable email verification
        },
      })
      if (error) throw error
      router.push("/dashboard") // Redirect directly to dashboard instead of verify-email page
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-[#0b0b12] via-[#120a24] to-[#0b0b12]">
      <div className="w-full max-w-lg">
        <Card className="glass-strong border-2 border-[#7c3aed]/35">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[#7c3aed] via-[#f97316] to-[#84cc16] flex items-center justify-center shadow-[0_0_80px_rgba(124,58,237,0.5)]">
                <div className="w-[72px] h-[72px] rounded-[22px] bg-[#0b0b12] flex items-center justify-center">
                  <Smartphone className="w-10 h-10 text-[#c4b5fd]" />
                </div>
              </div>
            </div>
            <CardTitle className="text-4xl font-extrabold text-white text-center tracking-tight">Join {APP_NAME}</CardTitle>
            <CardDescription className="text-lg text-[#e9d5ff]/80 text-center font-semibold">
              {APP_TAGLINE}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-7">
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-base font-bold text-white">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-14 text-lg glass border-2 border-[#7c3aed]/25 focus:border-[#7c3aed] rounded-2xl"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-bold text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-lg glass border-2 border-[#7c3aed]/25 focus:border-[#7c3aed] rounded-2xl"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-base font-bold text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 text-lg glass border-2 border-[#7c3aed]/25 focus:border-[#7c3aed] rounded-2xl"
                />
              </div>
              {error && (
                <div className="p-4 rounded-2xl bg-destructive/15 border-2 border-destructive/30">
                  <p className="text-sm text-destructive font-semibold">{error}</p>
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-16 text-lg font-extrabold bg-gradient-to-r from-[#7c3aed] to-[#f97316] hover:from-[#f97316] hover:to-[#7c3aed] rounded-2xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Initializing Agent..." : "Activate Account"}
              </Button>
              <div className="text-center pt-2">
                <p className="text-base text-[#e9d5ff]/80">
                  Already registered?{" "}
                  <Link href="/auth/login" className="text-[#84cc16] hover:text-[#bef264] font-bold transition-colors">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

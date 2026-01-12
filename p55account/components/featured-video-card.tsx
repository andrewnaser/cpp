"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { VideoPlaceholder } from "@/components/video-placeholder"
import { APP_NAME } from "@/lib/branding"

export function FeaturedVideoCard() {
  return (
    <Card className="glass-strong border-2 border-[#7c3aed]/35 overflow-hidden shadow-2xl shadow-[#7c3aed]/15">
      <CardContent className="p-0">
        <div className="space-y-0">
          {/* Video Info - Clean header */}
          <div className="p-6 border-b-2 border-[#7c3aed]/20">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-[#84cc16] animate-pulse" />
              <span className="text-[#84cc16] font-extrabold text-sm uppercase tracking-wider">Start Here</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Watch This Video To Get Started</h3>
            <p className="text-lg text-[#e9d5ff]/80 font-semibold">
              Quick orientation training for {APP_NAME} (placeholder for now)
            </p>
          </div>

          {/* Video Player */}
          <VideoPlaceholder title="Welcome Training (Placeholder)" subtitle="We’ll drop the real starter video here shortly." />
        </div>
      </CardContent>
    </Card>
  )
}

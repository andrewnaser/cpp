"use client"

import { useState, useEffect } from "react"
import { X, Gift, MapPin } from "lucide-react"

const PROMO_URL_1 = "https://veedah-publishing.a.explodely.com/?aff=smitty7789&pid=972135711"
const PROMO_URL_2 = "https://veedah-publishing.a.explodely.com/?aff=smitty7789&pid=421683150"

export function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [bannerStage, setBannerStage] = useState<1 | 2>(1) // 1 = lottery, 2 = gift

  useEffect(() => {
    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem("promo_popup_dismissed")
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Check if already on stage 2
    const stage = sessionStorage.getItem("promo_popup_stage")
    if (stage === "2") {
      setBannerStage(2)
    }

    // Show popup after a short delay (feels more natural)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem("promo_popup_dismissed", "true")
  }

  const handleBannerClick = () => {
    // Open link in new tab
    const url = bannerStage === 1 ? PROMO_URL_1 : PROMO_URL_2
    window.open(url, "_blank", "noopener,noreferrer")

    // If on stage 1, transition to stage 2
    if (bannerStage === 1) {
      setBannerStage(2)
      sessionStorage.setItem("promo_popup_stage", "2")
    }
  }

  if (isDismissed || !isVisible) return null

  // Stage 1: Purple lottery banner
  if (bannerStage === 1) {
    return (
      <div className="fixed bottom-6 left-6 z-[100] animate-in slide-in-from-left-5 fade-in duration-500">
        <button
          onClick={handleBannerClick}
          className="block group text-left"
        >
          <div className="relative w-[340px] rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 border border-purple-500/30 hover:shadow-purple-700/60 hover:scale-[1.02] transition-all duration-300">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#9333ea] to-[#6d28d9]" />
            
            {/* Sparkle decorations */}
            <div className="absolute top-3 right-12 text-white/30 text-lg">✦</div>
            <div className="absolute top-8 right-8 text-white/20 text-sm">✦</div>
            <div className="absolute bottom-4 left-4 text-white/20 text-base">✦</div>
            <div className="absolute bottom-8 right-16 text-white/15 text-xs">✦</div>

            {/* Close button */}
            <div
              onClick={handleDismiss}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="relative p-5 flex items-start gap-4">
              {/* 8-ball icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-lg border-2 border-gray-600">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                  <span className="text-black font-black text-sm">8</span>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 pt-0.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">🎉</span>
                  <h3 className="text-white font-extrabold text-lg tracking-tight">CONGRATS!</h3>
                </div>
                <p className="text-white/95 font-semibold text-[15px] leading-snug mb-2">
                  Click here to claim your <span className="text-yellow-300 font-bold">FREE</span> lottery ticket
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-300 font-bold text-sm">Only 1 ticket left!</span>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    )
  }

  // Stage 2: Green gift banner
  return (
    <div className="fixed bottom-6 left-6 z-[100] animate-in slide-in-from-left-5 fade-in duration-500">
      <button
        onClick={handleBannerClick}
        className="block group text-left"
      >
        <div className="relative w-[340px] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/50 border border-emerald-500/30 hover:shadow-emerald-600/60 hover:scale-[1.02] transition-all duration-300">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#059669] via-[#10b981] to-[#047857]" />

          {/* Close button */}
          <div
            onClick={handleDismiss}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </div>

          {/* Content */}
          <div className="relative p-5 flex items-start gap-4">
            {/* Gift icon */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center shadow-lg border border-white/20">
              <Gift className="w-7 h-7 text-white" />
            </div>

            {/* Text content */}
            <div className="flex-1 pt-0.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🎉</span>
                <h3 className="text-white font-extrabold text-[17px] leading-tight tracking-tight">
                  Congrats! You've Been Selected For A Gift
                </h3>
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-white/70" />
                <span className="text-white/80 text-sm">Because You're In</span>
                <span className="text-white font-bold text-sm">Dubai</span>
              </div>
              <p className="text-orange-300 font-bold text-sm">
                Tap here to claim your gift &gt;&gt;
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

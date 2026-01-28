"use client"

import { useState, useEffect } from "react"
import { X, Gift, MapPin } from "lucide-react"

const PROMO_URL_1 = "https://veedah-publishing.a.explodely.com/?aff=smitty7789&pid=972135711"
const PROMO_URL_2 = "https://veedah-publishing.a.explodely.com/?aff=smitty7789&pid=421683150"

export function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [bannerStage, setBannerStage] = useState<1 | 2>(1) // 1 = lottery, 2 = gift
  const [userCity, setUserCity] = useState<string>("Your Area")

  useEffect(() => {
    // Fetch user's city based on IP (cached for performance only)
    const fetchCity = async () => {
      try {
        const cachedCity = sessionStorage.getItem("promo_user_city")
        if (cachedCity) {
          setUserCity(cachedCity)
          return
        }

        const response = await fetch("https://ipapi.co/json/")
        if (response.ok) {
          const data = await response.json()
          const city = data.city || data.region || data.country_name || "Your Area"
          setUserCity(city)
          sessionStorage.setItem("promo_user_city", city)
        }
      } catch {
        // Silently fail, keep default "Your Area"
      }
    }
    fetchCity()

    // Always show popup after a short delay
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
    // Note: dismissed state is NOT persisted - banner will reappear on refresh/navigation
  }

  const handleBannerClick = () => {
    // Open link in new tab
    const url = bannerStage === 1 ? PROMO_URL_1 : PROMO_URL_2
    window.open(url, "_blank", "noopener,noreferrer")

    // If on stage 1, transition to stage 2 (in-memory only, resets on refresh)
    if (bannerStage === 1) {
      setBannerStage(2)
    }
  }

  if (isDismissed || !isVisible) return null

  // Stage 1: Purple lottery banner
  if (bannerStage === 1) {
    return (
      <div className="fixed bottom-6 left-6 z-[100] animate-in slide-in-from-left-5 fade-in duration-500">
        <style jsx>{`
          @keyframes subtle-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.4), 0 25px 50px -12px rgba(88, 28, 135, 0.5); }
            50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.6), 0 25px 50px -12px rgba(88, 28, 135, 0.7); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }
          .banner-float { animation: subtle-float 3s ease-in-out infinite; }
          .banner-glow { animation: glow-pulse 2.5s ease-in-out infinite; }
          .sparkle-1 { animation: sparkle 2s ease-in-out infinite; }
          .sparkle-2 { animation: sparkle 2s ease-in-out infinite 0.5s; }
          .sparkle-3 { animation: sparkle 2s ease-in-out infinite 1s; }
          .sparkle-4 { animation: sparkle 2s ease-in-out infinite 1.5s; }
        `}</style>
        <button
          onClick={handleBannerClick}
          className="block group text-left banner-float"
        >
          <div className="relative w-[340px] rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 border border-purple-500/30 hover:shadow-purple-700/60 hover:scale-[1.02] transition-all duration-300 banner-glow">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#9333ea] to-[#6d28d9]" />
            
            {/* Sparkle decorations - animated */}
            <div className="absolute top-3 right-12 text-white/30 text-lg sparkle-1">✦</div>
            <div className="absolute top-8 right-8 text-white/20 text-sm sparkle-2">✦</div>
            <div className="absolute bottom-4 left-4 text-white/20 text-base sparkle-3">✦</div>
            <div className="absolute bottom-8 right-16 text-white/15 text-xs sparkle-4">✦</div>

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
      <style jsx>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes glow-pulse-green {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), 0 25px 50px -12px rgba(4, 120, 87, 0.5); }
          50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 25px 50px -12px rgba(4, 120, 87, 0.7); }
        }
        @keyframes gift-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes text-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .banner-float { animation: subtle-float 3s ease-in-out infinite; }
        .banner-glow-green { animation: glow-pulse-green 2.5s ease-in-out infinite; }
        .gift-wiggle { animation: gift-wiggle 1.5s ease-in-out infinite; }
        .cta-pulse { animation: text-glow 1.5s ease-in-out infinite; }
      `}</style>
      <button
        onClick={handleBannerClick}
        className="block group text-left banner-float"
      >
        <div className="relative w-[340px] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/50 border border-emerald-500/30 hover:shadow-emerald-600/60 hover:scale-[1.02] transition-all duration-300 banner-glow-green">
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
            {/* Gift icon - animated */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center shadow-lg border border-white/20 gift-wiggle">
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
                <span className="text-white font-bold text-sm">{userCity}</span>
              </div>
              <p className="text-orange-300 font-bold text-sm cta-pulse">
                Tap here to claim your gift &gt;&gt;
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

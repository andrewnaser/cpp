import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Image as ImageIcon } from "lucide-react"

export function VideoPlaceholder({
  title = "Training video placeholder",
  subtitle = "Video content will be added here soon.",
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <Card className="overflow-hidden border-border/50">
      <CardContent className="p-0">
        <div className="relative aspect-video w-full bg-gradient-to-br from-[#1a1033] via-[#0b0b12] to-[#2b1b11]">
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-white/90" />
              </div>
              <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-white/90" />
              </div>
            </div>
            <div>
              <p className="text-white font-extrabold text-xl leading-tight">{title}</p>
              <p className="text-white/75 font-semibold mt-1">{subtitle}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



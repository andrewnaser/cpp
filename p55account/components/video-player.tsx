"use client"

import { VideoPlaceholder } from "@/components/video-placeholder"

interface VideoPlayerProps {
  videoUrl: string
  title: string
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  return (
    <VideoPlaceholder title={`${title} (Placeholder)`} subtitle="Video playback is disabled during the rebrand." />
  )
}

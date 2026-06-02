import CornerNav from "@/components/client/corner-nav"
import MusicPlayer from "@/components/client/music-player"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CornerNav />
      <MusicPlayer />
    </>
  )
}

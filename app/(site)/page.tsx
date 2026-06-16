import type { Metadata } from "next"
import HomeSceneLoader from "@/components/client/home-scene-loader"
import SiteFooter from "@/components/server/site-footer"

export const metadata: Metadata = {
  title: "Patrick Caire — Designer & Creative Developer",
  description: "Berlin-based Product/UX/UI designer who codes. Open to Product Designer and UX/UI Designer roles in Berlin and remote EU.",
  openGraph: {
    title: "Patrick Caire — Designer & Creative Developer",
    description: "Berlin-based designer who codes. Explore work across UX, web, brand, and product.",
    url: "https://patrickcaire.me",
  },
}

export default function Home() {
  return (
    <>
      <HomeSceneLoader />
      <SiteFooter tone="light" />
    </>
  )
}

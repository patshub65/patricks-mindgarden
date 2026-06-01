"use client"

import dynamic from "next/dynamic"

const MindgardenScene = dynamic(
  () => import("@/components/client/mindgarden-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="garden-bg" style={{ minHeight: "100dvh", position: "relative" }}>
        <div className="garden-grain" />
      </div>
    ),
  }
)

export default function HomeSceneLoader() {
  return <MindgardenScene />
}

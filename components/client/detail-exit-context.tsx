"use client"

import { createContext, use } from "react"

export const DetailExitContext = createContext<(() => void) | null>(null)
export const useDetailExit = () => use(DetailExitContext)

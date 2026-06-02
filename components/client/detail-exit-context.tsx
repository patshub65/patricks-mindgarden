"use client"

import { createContext, useContext } from "react"

export const DetailExitContext = createContext<(() => void) | null>(null)
export const useDetailExit = () => useContext(DetailExitContext)

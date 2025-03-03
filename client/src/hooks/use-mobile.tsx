import * as React from "react"

// Add more breakpoints for better responsive design
export const BREAKPOINTS = {
  mobile: 640,  // sm
  tablet: 768,  // md
  laptop: 1024, // lg
  desktop: 1280 // xl
} as const

export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`)
    const onChange = () => {
      setMatches(mql.matches)
    }
    mql.addEventListener("change", onChange)
    setMatches(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return matches
}

export function useIsMobile() {
  return useBreakpoint('mobile')
}
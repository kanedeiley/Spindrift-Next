'use client'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "./theme-provider"
import { DateRangeProvider } from "./range-provider"

function providers({children}:{children:React.ReactNode}) {
  return (
    <>
    <Toaster />
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <DateRangeProvider >
    {children}
    </DateRangeProvider>
    </ThemeProvider>
    </>
  )
}

export default providers
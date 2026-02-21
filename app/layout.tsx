import './globals.css'
import CookieConsent from '../components/CookieConsent'

export const metadata = {
  title: 'PPS Recycling LLC - IT Asset Disposition & E-Waste Recycling',
  description: 'Secure IT asset disposition and e-waste recycling for Elk Grove and Sacramento businesses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}

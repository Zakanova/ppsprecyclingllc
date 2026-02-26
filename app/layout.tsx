import './globals.css'
import CookieConsent from '../components/CookieConsent'

export const metadata = {
  title: 'PPSP Recycling LLC - IT Asset Disposition & E-Waste Recycling',
  description: 'Secure IT asset disposition and e-waste recycling for Elk Grove and Sacramento businesses. Free pickup, certified data destruction, revenue sharing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17977971910"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17977971910');
            `
          }}
        />
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
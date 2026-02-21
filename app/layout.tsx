export const metadata = {
  title: 'PPS Recycling LLC - IT Asset Disposition & E-Waste Recycling',
  description: 'Secure IT asset disposition and e-waste recycling for Elk Grove and Sacramento businesses. Free pickup, certified data destruction, revenue sharing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

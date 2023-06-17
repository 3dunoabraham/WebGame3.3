import '@/../style/ims-theme.css'
import '@/../style/reset.css'
import '@/../style/theme.css'
import '@/../style/css.css'
import { fetchSession } from '@/../script/state/repository/session'
import AppClientProvider from '@/dom/organ/layout/AppClientProvider'

export const metadata = {
  title: 'enarü',
  description: 'enaru',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await fetchSession()

  return (
    <html lang="en" style={{background:"black", }}>
      <head>
      </head>
      <body className="ma-0 h-min-90vh " > 
        <AppClientProvider session={session}>
          <> {children}  </>
        </AppClientProvider>
      </body>
    </html>
  )
}
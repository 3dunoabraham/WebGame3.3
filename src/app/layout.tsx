import '@/../style/ims-theme.css'
import '@/../style/reset.css'
import '@/../style/theme.css'
import '@/../style/css.css'
import { fetchSession } from '@/../script/state/repository/session'
import AppClientProvider from '@/dom/organ/layout/AppClientProvider'

export const metadata = {
  title: 'GTA ByteCity',
  description: 'Gamified Trading App',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await fetchSession()

  return (
    <html lang="en" style={{background:"black"}}>
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect"href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
          <link rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap`}
          />
      </head>
      <body className="ma-0 h-min-90vh " > 
        <AppClientProvider session={session}>
          <> {children}  </>
        </AppClientProvider>
        <div className='pos-abs bottom-0  flex-justify-end pb-1 tx-bold tx- tx-ls-1 tx-italic h-5 w-100 flex-col tx-sm box-shadow-i-2-t bg-black tx-white'>
          this app is under heavy development
        </div>
      </body>
    </html>
  )
}
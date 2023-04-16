"use client";

import AuthProvider from '@/../script/state/context/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function RootLayoutProvider({
    session,
  children,
}: {
    session: any,
  children: React.ReactElement
}) {
  const queryClient = new QueryClient()

  return (
    <AuthProvider {...{session}}>
      <QueryClientProvider client={queryClient}>
        {children}        
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default RootLayoutProvider;
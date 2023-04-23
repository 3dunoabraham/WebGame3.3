import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
    console.log(
        `App is changing to ${url} ${
        shallow ? 'with' : 'without'
        } shallow routing`
    )
    document.getElementById("spinner").style.display = "block"; 
  return;
}; 

const handleRouteComplete = (url, { shallow }) => {
      console.log('you have finished going to the new page')
      document.getElementById("spinner").style.display = "none";
      return;
}; 

router.events.on('routeChangeStart', handleRouteChange)
router.events.on('routeChangeComplete', handleRouteComplete)// If the component is unmounted, unsubscribe
    
// from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
  return <Component {...pageProps} />
}
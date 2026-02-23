import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isIVPage = router.pathname.startsWith('/iv/');

  useEffect(() => {
    if (!isIVPage) {
      import('../styles/globals.css');
    }
  }, [isIVPage]);

  // Strip URL query parameters globally (except for IV pages which don't run JS anyway)
  // This helps with cache hit rates and keeps URLs clean for sharing
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      const cleanUrl = window.location.pathname;
      // Using replaceState to avoid adding to browser history
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [router.asPath]);

  return <Component {...pageProps} />;
}

export default MyApp;
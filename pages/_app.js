import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isIVPage = router.pathname.startsWith('/iv/');

  useEffect(() => {
    if (!isIVPage) {
      import('../styles/globals.css');
    }
  }, [isIVPage]);

  return (
    <>
      {!isIVPage && process.env.NEXT_PUBLIC_ADSENSE_URL && (
        <Script
          async
          src={process.env.NEXT_PUBLIC_ADSENSE_URL}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
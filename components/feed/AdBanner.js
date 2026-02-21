import { useEffect, useRef } from 'react';
import Script from 'next/script';

/**
 * Renders a Google AdSense fluid ad unit.
 * Requires adClient and adSlot props passed from the server via env vars.
 */
export default function AdBanner({ adClient, adSlot }) {
    const insRef = useRef(null);

    useEffect(() => {
        if (!adClient || !adSlot) return;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            // Ignore adsbygoogle errors in dev or ad-blocked environments
        }
    }, [adClient, adSlot]);

    if (!adClient || !adSlot) return null;

    return (
        <>
            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
            <ins
                ref={insRef}
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-format="fluid"
                data-ad-layout-key="-fb+5w+4e-db+86"
                data-ad-client={adClient}
                data-ad-slot={adSlot}
            />
        </>
    );
}

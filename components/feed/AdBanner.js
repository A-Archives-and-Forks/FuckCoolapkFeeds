import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

/**
 * Renders a Google AdSense fluid ad unit.
 * Automatically hides itself when the ad is unfilled or blocked.
 * Requires adClient and adSlot props passed from the server via env vars.
 */
export default function AdBanner({ adClient, adSlot }) {
    const insRef = useRef(null);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        if (!adClient || !adSlot) return;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            // Ignore adsbygoogle errors in dev or ad-blocked environments
        }

        const ins = insRef.current;
        if (!ins) return;

        // Watch for Google's data-ad-status attribute.
        // Google sets it to "unfilled" when there is no ad to show.
        const observer = new MutationObserver(() => {
            const status = ins.getAttribute('data-ad-status');
            if (status === 'unfilled') setHidden(true);
        });
        observer.observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] });

        // Fallback: hide if the ins element has no height after 3s (likely ad-blocked)
        const timer = setTimeout(() => {
            if (ins.offsetHeight === 0) setHidden(true);
        }, 3000);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [adClient, adSlot]);

    if (!adClient || !adSlot || hidden) return null;

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

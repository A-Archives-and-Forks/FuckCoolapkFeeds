import { Html, Head, Main, NextScript } from 'next/document';

// Rendered on the server only; reads server-side env vars safely.
export default function Document({ adsensePublisherId }) {
    return (
        <Html>
            <Head>
                {adsensePublisherId && (
                    <meta name="google-adsense-account" content={adsensePublisherId} />
                )}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

Document.getInitialProps = async (ctx) => {
    const initialProps = await ctx.defaultGetInitialProps(ctx);
    return {
        ...initialProps,
        adsensePublisherId: process.env.ADSENSE_PUBLISHER_ID ?? null,
    };
};

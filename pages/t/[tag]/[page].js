import Head from 'next/head';
import { useEffect } from 'react';
import { optimizeFeedListData } from '../../../lib/feedOptimizer';
import { FeedCard, FeedCardStyles } from '../../../components/feed/FeedCard';

const MAX_PAGES = 5;


function reportHeight(isEmpty = false) {
    if (typeof window === 'undefined') return;
    const height = document.documentElement.scrollHeight;
    const match = window.location.pathname.match(/\/t\/(.+)\/(\d+)/);
    const page = match ? parseInt(match[2]) : 1;
    if (window.parent !== window) {
        window.parent.postMessage({ type: 'tag-height', height, page, isEmpty }, '*');
    }
}

const TagFeedPage = ({ feeds, error, currentPage, totalPages, tag }) => {
    useEffect(() => {
        const isEmpty = feeds.length === 0;
        reportHeight(isEmpty);
        const ro = new ResizeObserver(() => reportHeight(isEmpty));
        ro.observe(document.body);
        return () => ro.disconnect();
    }, [feeds]);

    if (error) {
        return (
            <div style={styles.errorContainer}>
                <p style={styles.errorText}>加载失败: {error}</p>
                <style jsx global>{FeedCardStyles}</style>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div style={styles.list}>
                {feeds.map((feed) => (
                    <FeedCard key={feed.id} feed={feed} />
                ))}
            </div>

            <style jsx global>{FeedCardStyles}</style>
        </div>
    );
};


export async function getServerSideProps({ req, res, params }) {
    const host = req.headers['x-forwarded-host'] || req.headers.host || '';
    const referer = req.headers['referer'] || req.headers['referrer'] || '';
    let refererHost = '';
    try { refererHost = new URL(referer).host; } catch (_) { }

    if (refererHost !== host) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.statusCode = 403;
        res.end('<!DOCTYPE html><html><body>403 Forbidden</body></html>');
        return { props: {} };
    }

    const { tag, page: pageParam } = params;
    const page = parseInt(pageParam, 10);

    if (isNaN(page) || page < 1 || page > MAX_PAGES) {
        return { notFound: true };
    }

    try {
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers['x-forwarded-host'] || req.headers.host;
        const baseUrl = `${protocol}://${host}`;

        const token = process.env.INTERNAL_AUTH_TOKEN || '';
        const headers = token ? { 'X-Internal-Auth': token } : {};

        const apiRes = await fetch(`${baseUrl}/api/tag?tag=${encodeURIComponent(tag)}&page=${page}`, { headers });
        if (!apiRes.ok) {
            throw new Error(`API returned ${apiRes.status}`);
        }

        const json = await apiRes.json();
        const feeds = (json.data || [])
            .filter(f => f.entityType === 'feed')
            .map(optimizeFeedListData);

        res.setHeader(
            'Cache-Control',
            'public, max-age=1800, s-maxage=3600, stale-while-revalidate=0'
        );
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');

        return {
            props: {
                feeds,
                currentPage: page,
                totalPages: MAX_PAGES,
                tag,
                error: null,
            }
        };
    } catch (err) {
        res.setHeader(
            'Cache-Control',
            'public, max-age=60, s-maxage=60, stale-while-revalidate=0'
        );
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        return {
            props: {
                feeds: [],
                currentPage: page,
                totalPages: MAX_PAGES,
                tag,
                error: err.message,
            }
        };
    }
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '12px 0 0 0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    errorContainer: {
        padding: '32px 16px',
        textAlign: 'center',
    },
    errorText: {
        color: '#999',
        fontSize: '14px',
    },
};


export default TagFeedPage;

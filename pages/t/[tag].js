import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { styles } from '../../styles/homeStyles';

const MAX_TAG_PAGES = 5;

export default function TagFeedContainer() {
    const router = useRouter();
    const { tag } = router.query;
    const [pages, setPages] = useState([1]);
    const [iframeHeights, setIframeHeights] = useState({ 1: 100 });
    const [loadingPages, setLoadingPages] = useState({ 1: true });
    const loaderRef = useRef(null);

    useEffect(() => {
        const onMessage = (e) => {
            if (e.data?.type === 'tag-height') {
                const page = e.data.page || 1;
                setIframeHeights(prev => ({ ...prev, [page]: e.data.height }));
                setLoadingPages(prev => ({ ...prev, [page]: false }));
            }
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []);

    useEffect(() => {
        if (!tag) return;

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                setPages(prevPages => {
                    const currentMaxPage = Math.max(...prevPages);
                    if (currentMaxPage < MAX_TAG_PAGES && !loadingPages[currentMaxPage]) {
                        const nextPage = currentMaxPage + 1;
                        setLoadingPages(prev => ({ ...prev, [nextPage]: true }));
                        return [...prevPages, nextPage];
                    }
                    return prevPages;
                });
            }
        }, {
            rootMargin: '100px',
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => observer.disconnect();
    }, [tag, loadingPages]);

    if (!tag) return null;

    return (
        <div className="container">
            <Head>
                <title>{`#${tag}# - Coolapk1s`}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <main className="main" style={{ paddingTop: '12px' }}>
                {/* Tag Header Section */}
                <div className="tag-header" style={{ padding: '12px 16px' }}>
                    <div className="tag-avatar">
                        <div className="tag-avatar-inner">#</div>
                    </div>
                    <div className="tag-info">
                        <h1 className="tag-name">{tag}</h1>
                        <div className="tag-stats">
                            <span>话题</span>
                            <span className="dot">·</span>
                            <span>酷安动态</span>
                        </div>
                    </div>
                </div>

                <div className="hl-section" style={{ marginTop: '12px' }}>
                    <div className="hl-section-header">
                        <div className="hl-section-title">
                            讨论列表
                        </div>
                    </div>

                    {pages.map(p => (
                        <div key={p} className="hl-iframe-container" style={{ minHeight: (iframeHeights[p] || 100) + 'px' }}>
                            {loadingPages[p] && (
                                <div className="hl-loading">
                                    <div className="hl-spinner" />
                                    <span>{p === 1 ? '加载话题中...' : '加载更多中...'}</span>
                                </div>
                            )}
                            <iframe
                                src={`/t/${encodeURIComponent(tag)}/${p}`}
                                className="hl-iframe"
                                style={{
                                    height: (iframeHeights[p] || 100) + 'px',
                                    opacity: loadingPages[p] ? 0 : 1,
                                    transition: 'opacity 0.3s ease'
                                }}
                                scrolling="no"
                                frameBorder="0"
                                title={`话题 ${tag} - 第${p}页`}
                            />
                        </div>
                    ))}
                    <div ref={loaderRef} style={{ height: '10px', width: '100%' }} />
                    {Math.max(...pages) === MAX_TAG_PAGES && !loadingPages[MAX_TAG_PAGES] && (
                        <div className="hl-end-msg">没有更多内容了</div>
                    )}
                </div>
            </main>

            <style jsx>{styles}</style>
            <style jsx>{`
                .tag-header {
                    display: flex;
                    align-items: center;
                    padding: 24px 16px;
                    width: 100%;
                    max-width: 800px;
                    background: var(--hl-bg);
                    margin-bottom: 0;
                }

                .tag-avatar {
                    width: 72px;
                    height: 72px;
                    background: #f0f2f5;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 16px;
                    border: 1px solid #eee;
                    flex-shrink: 0;
                }

                .tag-avatar-inner {
                    font-size: 32px;
                    font-weight: bold;
                    color: #28a745;
                }

                .tag-info {
                    flex: 1;
                    min-width: 0;
                }

                .tag-name {
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0 0 6px 0;
                    color: var(--hl-title-color, #111);
                }

                .tag-stats {
                    font-size: 14px;
                    color: #999;
                    display: flex;
                    align-items: center;
                }

                .dot {
                    margin: 0 8px;
                }

                .hl-section-header {
                    padding: 12px 16px;
                    background: #fff;
                    border-bottom: 1px solid #f0f2f5;
                }

                .hl-section-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #111;
                }

                @media (prefers-color-scheme: dark) {
                    .tag-header {
                        background: #1a1a1a;
                    }
                    .tag-avatar {
                        background: #222;
                        border-color: #333;
                    }
                    .tag-avatar-inner {
                        color: #3dd56d;
                    }
                    .tag-name {
                        color: #e8e8e8;
                    }
                    .hl-section-header {
                        background: #1a1a1a;
                        border-bottom-color: #222;
                    }
                    .hl-section-title {
                        color: #e8e8e8;
                    }
                }
            `}</style>
        </div>
    );
}

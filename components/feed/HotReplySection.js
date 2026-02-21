import { proxyImage } from '../../lib/imageProxy';

// Format a Unix timestamp into a locale-aware date string.
function formatDate(ts) {
    return new Date(ts * 1000).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

// A single nested child reply row.
function ReplyRow({ reply }) {
    return (
        <div style={styles.replyRow}>
            <img
                src={proxyImage(reply.userAvatar)}
                alt={reply.username}
                style={styles.replyAvatar}
            />
            <div style={styles.replyRowBody}>
                <span style={styles.replyRowUsername}>{reply.username}</span>
                {reply.rusername && (
                    <span style={styles.replyRowTo}>
                        {' '}回复 <span style={styles.replyRowToName}>{reply.rusername}</span>
                    </span>
                )}
                <span style={styles.replyRowMessage}>：{reply.message}</span>
                <div style={styles.replyRowMeta}>{formatDate(reply.dateline)}</div>
            </div>
        </div>
    );
}

// A top-level comment card with optional nested replyRows.
function ReplyCard({ reply }) {
    const hasChildren = reply.replyRows && reply.replyRows.length > 0;

    return (
        <div style={styles.card}>
            {/* Author row */}
            <div style={styles.cardHeader}>
                <img
                    src={proxyImage(reply.userAvatar)}
                    alt={reply.username}
                    style={styles.avatar}
                />
                <div style={styles.authorInfo}>
                    <span style={styles.username}>
                        {reply.username}
                        {reply.isFeedAuthor === 1 && (
                            <span style={styles.authorBadge}>作者</span>
                        )}
                    </span>
                    <span style={styles.dateline}>{formatDate(reply.dateline)}</span>
                </div>
                {reply.likenum > 0 && (
                    <div style={styles.likeChip}>
                        <span style={styles.likeIcon}>👍</span>
                        <span>{reply.likenum}</span>
                    </div>
                )}
            </div>

            {/* Comment body */}
            <p style={styles.message}>{reply.message}</p>

            {/* Nested replies */}
            {hasChildren && (
                <div style={styles.nestedContainer}>
                    {reply.replyRows.map((row) => (
                        <ReplyRow key={row.id} reply={row} />
                    ))}
                    {reply.replyRowsMore > 0 && (
                        <div style={styles.moreReplies}>
                            还有 {reply.replyRowsMore} 条回复…
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * HotReplySection – a pure SSR component that renders pre-fetched hot replies.
 * Props:
 *   replies: Array  – reply objects from fetchHotReplies()
 */
export default function HotReplySection({ replies }) {
    if (!replies || replies.length === 0) return null;

    return (
        <section style={styles.section}>
            <h2 style={styles.heading}>热门评论</h2>
            {replies.map((reply) => (
                <ReplyCard key={reply.id} reply={reply} />
            ))}
        </section>
    );
}

// ---------------------------------------------------------------------------
// Inline styles (follows the project's feedStyles pattern)
// ---------------------------------------------------------------------------
const styles = {
    section: {
        marginTop: '32px',
        paddingTop: '16px',
        borderTop: '1px solid #eee',
    },
    heading: {
        fontSize: '1.15em',
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#333',
    },
    card: {
        padding: '14px 0',
        borderBottom: '1px solid #f0f0f0',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '8px',
    },
    avatar: {
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        flexShrink: 0,
    },
    authorInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        flex: 1,
    },
    username: {
        fontWeight: '600',
        fontSize: '0.95em',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    authorBadge: {
        fontSize: '0.7em',
        padding: '1px 6px',
        borderRadius: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        fontWeight: 'normal',
    },
    dateline: {
        fontSize: '0.8em',
        color: '#aaa',
    },
    likeChip: {
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        fontSize: '0.85em',
        color: '#888',
        flexShrink: 0,
    },
    likeIcon: {
        fontSize: '0.9em',
    },
    message: {
        margin: '0 0 10px 48px',
        lineHeight: '1.65',
        fontSize: '0.95em',
        wordBreak: 'break-word',
    },
    nestedContainer: {
        margin: '0 0 0 48px',
        backgroundColor: '#f9f9f9',
        borderRadius: '6px',
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    replyRow: {
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-start',
    },
    replyAvatar: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        flexShrink: 0,
        marginTop: '2px',
    },
    replyRowBody: {
        fontSize: '0.88em',
        lineHeight: '1.6',
        wordBreak: 'break-word',
        color: '#555',
    },
    replyRowUsername: {
        fontWeight: '600',
        color: '#333',
    },
    replyRowTo: {
        color: '#aaa',
    },
    replyRowToName: {
        color: '#28a745',
    },
    replyRowMessage: {
        color: '#444',
    },
    replyRowMeta: {
        fontSize: '0.8em',
        color: '#bbb',
        marginTop: '2px',
    },
    moreReplies: {
        fontSize: '0.83em',
        color: '#28a745',
        paddingTop: '4px',
    },
};

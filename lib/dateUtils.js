/**
 * Format a Unix timestamp into a full date string (YYYY/MM/DD HH:mm).
 * @param {number|string} ts - Unix timestamp in seconds
 * @returns {string} Formatted date string
 */
export function formatDate(ts) {
    if (!ts) return '';
    const date = new Date(parseInt(ts) * 1000);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Returns a relative time string (e.g., "5分钟前") or falls back to formatDate.
 * @param {number|string} ts - Unix timestamp in seconds
 * @returns {string} Relative time or formatted date
 */
export function timeAgo(ts) {
    if (!ts) return '';
    const now = Math.floor(Date.now() / 1000);
    const diff = now - parseInt(ts);

    if (diff < 60) return '刚刚';
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;

    return formatDate(ts);
}

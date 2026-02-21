/**
 * Fetches hot reply list server-side via the internal /api/hot_reply endpoint.
 * This keeps the Coolapk API calls server-side and never exposes them to clients.
 *
 * @param {string|number} id - Feed ID to fetch replies for
 * @param {import('http').IncomingMessage} req - Next.js request object (used to determine host)
 * @returns {Promise<Array>} Array of reply objects, or empty array on failure
 */
export async function fetchHotReplies(id, req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const apiUrl = `${protocol}://${host}/api/hot_reply?id=${id}`;

    try {
        const headers = {};
        const authToken = process.env.INTERNAL_AUTH_TOKEN;
        if (authToken) {
            headers['X-Internal-Auth'] = authToken;
        }

        const response = await fetch(apiUrl, { headers });

        if (!response.ok) {
            console.error(`hot_reply API error: ${response.status} ${response.statusText}`);
            return [];
        }

        const data = await response.json();
        return data?.data ?? [];
    } catch (error) {
        console.error(`fetchHotReplies failed for id ${id}:`, error);
        return [];
    }
}

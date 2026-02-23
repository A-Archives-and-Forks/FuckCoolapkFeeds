import { fetchHotReplies } from '../../lib/hotReplyLoader';
import { proxyImage } from '../../lib/imageProxy';
import { processCoolapkEmoji } from '../../lib/emojiProcessor';

// This component is never rendered — response is sent directly in getServerSideProps.
export default function ReplyPage() {
  return null;
}

// ---------------------------------------------------------------------------
// HTML generation helpers (server-side only, no React)
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(ts) {
  return new Date(ts * 1000).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function processContent(text) {
  let html = processCoolapkEmoji(text);
  if (!html) return html || '';

  const viewMorePattern = /<a\s+href="\/feed\/replyList\?id=\d+">查看更多<\/a>/g;
  html = html.replace(viewMorePattern, '<span style="color:var(--c2);font-style:italic;font-size:0.9em">（完整评论请到客户端查看）</span>');

  return html
    .replace(/width:\s*24px/g, 'width:1.2em')
    .replace(/height:\s*24px/g, 'height:1.2em')
    .replace(/vertical-align:\s*middle/g, 'vertical-align:-0.22em');
}

function renderPicArr(picArr, style) {
  if (!picArr || picArr.length === 0) return '';
  const imgs = picArr.map((pic, idx) =>
    `<img src="${escapeHtml(proxyImage(pic))}" alt="comment pic" loading="lazy" style="${style}" data-pics="${escapeHtml(JSON.stringify(picArr.map(p => proxyImage(p))))}" data-idx="${idx}" class="reply-img" />`
  ).join('');
  return imgs;
}

function renderReplyRow(r) {
  const isImgOnly = r.message === '[图片]' && (r.picArr?.length || r.pic);
  const msgHtml = isImgOnly ? '' : processContent(r.message);
  const picsHtml = renderPicArr(r.picArr, 'width:100%;aspect-ratio:1;border-radius:4px;object-fit:cover;box-shadow:0 2px 4px rgba(0,0,0,0.1);cursor:pointer;display:block');
  return `
    <div style="display:flex;gap:8px;align-items:flex-start">
      <div style="display:flex;flex-direction:column;gap:4px;font-size:0.92em;line-height:1.6;word-break:break-word;color:var(--c1)">
        <div>
          <span style="font-weight:600;color:var(--link)">${escapeHtml(r.username)}</span>${r.rusername ? `<span style="color:var(--c3)"> 回复 <span style="color:var(--link)">${escapeHtml(r.rusername)}</span></span>` : ''}
          <span style="color:var(--rowmsg)">：${msgHtml}</span>
        </div>
        ${picsHtml ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(60px,30%),1fr));gap:8px">${picsHtml}</div>` : ''}
        <div style="font-size:0.82em;color:var(--c3);line-height:1.2">${formatDate(r.dateline)}</div>
      </div>
    </div>`;
}

function renderCard(reply, isLast) {
  const isImgOnly = reply.message === '[图片]' && (reply.picArr?.length || reply.pic);
  const msgHtml = isImgOnly ? '' : processContent(reply.message);
  const picsHtml = renderPicArr(reply.picArr, 'width:100%;aspect-ratio:1;border-radius:4px;object-fit:cover;box-shadow:0 2px 4px rgba(0,0,0,0.1);cursor:pointer');
  const nestedRowsHtml = (reply.replyRows && reply.replyRows.length > 0)
    ? `${reply.replyRows.map(r => renderReplyRow(r)).join('')}
       ${reply.replyRowsMore > 0 ? `<div style="font-size:0.86em;color:var(--link);padding-top:2px">还有 ${reply.replyRowsMore} 条回复…</div>` : ''}`
    : '';

  return `
    <div style="padding:12px 0;${isLast ? '' : 'border-bottom:1px solid var(--border)'}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <img src="${escapeHtml(proxyImage(reply.userAvatar))}" alt="${escapeHtml(reply.username)}" loading="lazy" style="width:36px;height:36px;border-radius:50%;flex-shrink:0" />
        <div style="display:flex;flex-direction:column;flex:1;gap:2px">
          <span style="font-weight:600;font-size:0.96em;display:flex;align-items:center;gap:6px">
            ${escapeHtml(reply.username)}
            ${reply.isFeedAuthor === 1 ? '<span style="font-size:0.68em;padding:1px 6px;border-radius:10px;background:var(--link);color:#fff">作者</span>' : ''}
          </span>
          <span style="font-size:0.82em;color:var(--c2)">${formatDate(reply.dateline)}</span>
        </div>
        <div style="display:flex;flex-direction:row;align-items:center;gap:10px;flex-shrink:0;color:var(--c2);font-size:0.82em">
          ${reply.likenum > 0 ? `<div style="display:flex;align-items:center;gap:3px">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
            ${reply.likenum}
          </div>` : ''}
          ${reply.replynum > 0 ? `<div style="display:flex;align-items:center;gap:3px">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ${reply.replynum}
          </div>` : ''}
        </div>
      </div>
      <div style="margin-left:46px;display:flex;flex-direction:column;gap:10px">
        ${msgHtml ? `<div style="line-height:1.65;font-size:1em;word-break:break-word">${msgHtml}</div>` : ''}
        ${picsHtml ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(80px,30%),1fr));gap:8px">${picsHtml}</div>` : ''}
        ${nestedRowsHtml ? `<div style="background:var(--nestbg);border-radius:6px;padding:8px 12px;display:flex;flex-direction:column;gap:8px">${nestedRowsHtml}</div>` : ''}
      </div>
    </div>`;
}

function buildHtml(replies) {
  const cardsHtml = (!replies || replies.length === 0)
    ? `<div style="padding:16px 0;color:var(--c2);font-size:0.9em;text-align:center">暂无热门评论</div>`
    : `${replies.map((r, i) => renderCard(r, i === replies.length - 1)).join('')}`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
:root{
  --bg:#f9f9f9;--c1:#333;--c2:#aaa;--c3:#bbb;--border:#f0f0f0;
  --nestbg:#f0f0f0;--link:#28a745;--heading:#333;--rowmsg:#444;
  --imgborder:1px solid #ddd;
}
@media(prefers-color-scheme:dark){:root{
  --bg:#1a1a1a;--c1:#e0e0e0;--c2:#888;--c3:#666;--border:#333;
  --nestbg:#252525;--link:#3dd56d;--heading:#e0e0e0;--rowmsg:#ccc;
  --imgborder:1px solid #555;
}}
html,body{overflow:hidden}
body{margin:0;padding:0;background:var(--bg);color:var(--c1);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
img{max-width:100%;border:0}
a{color:var(--link);word-break:break-all}
p{margin:0}
</style>
</head>
<body>
<div style="padding:0 0 32px;color:var(--c1);background:var(--bg)">
${cardsHtml}
</div>
<script>
(function(){
  function reportHeight(){
    // Use body.offsetHeight to avoid Safari's scrollHeight feedback loop
    var h=document.body.offsetHeight;
    window.parent.postMessage({type:'reply-height',height:h},'*');
  }
  reportHeight();
  window.addEventListener('load',reportHeight);
  new ResizeObserver(reportHeight).observe(document.body);

  // Image click: send proxied pic array to parent for lightbox
  document.addEventListener('click',function(e){
    var img=e.target.closest('.reply-img');
    if(!img)return;
    try{
      var images=JSON.parse(img.dataset.pics||'[]');
      var index=parseInt(img.dataset.idx)||0;
      window.parent.postMessage({type:'image-click',images:images,index:index},'*');
    }catch(_){}
  });
})();
</script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Data fetching — write pure HTML directly, no __NEXT_DATA__ injected
// ---------------------------------------------------------------------------
export async function getServerSideProps({ params, req, res }) {
  const { id } = params;

  // Enforce same-origin: only allow requests from the same host.
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

  const replies = await fetchHotReplies(id, req);
  const isError = replies === null;
  const html = buildHtml(replies || []);

  if (!isError) {
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=21600, stale-while-revalidate=0');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=0');
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.end(html);

  // Return empty props — Next.js sees res.finished and skips its own rendering.
  return { props: {} };
}

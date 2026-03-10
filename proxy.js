import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  // Security Check: Protect iframe-only content from cross-origin access
  // Targeted paths: /headlines/[page], /reply/[id], and /t/[tag]/[page]
  const isIframeContent = 
    pathname.startsWith('/headlines/') || 
    pathname.startsWith('/reply/') || 
    (/^\/t\/[^\/]+\/\d+$/.test(pathname)); // Matches /t/TagName/1 but NOT /t/TagName

  if (isIframeContent) {
    // Get the current host (respecting proxies like Vercel/CDN)
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
    const referer = request.headers.get('referer') || '';
    
    let refererHost = '';
    try {
      if (referer) {
        refererHost = new URL(referer).host;
      }
    } catch (e) {
      // Invalid URL in referer
    }

    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev && refererHost !== host) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  const pathMatch = pathname.match(/^\/(feed|picture|iv)\/([^/]+)$/);

  if (pathMatch) {
    const [, routeType, id] = pathMatch;
    const idAsNumber = parseInt(id, 10);

    if (isNaN(idAsNumber) || idAsNumber.toString() !== id.replace(/^0+/, '')) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.search = '';
      return NextResponse.redirect(url, 301);
    }

    let needsRedirect = false;
    let normalizedId = id;

    const normalizedIdFromNumber = idAsNumber.toString();
    if (normalizedIdFromNumber !== id) {
      normalizedId = normalizedIdFromNumber;
      needsRedirect = true;
    }

    if (search) {
      needsRedirect = true;
    }

    if (needsRedirect) {
      const url = request.nextUrl.clone();
      url.pathname = `/${routeType}/${normalizedId}`;
      url.search = '';

      return NextResponse.redirect(url, 301);
    }
  }

  const otherPagesMatch = pathname === '/' || pathname.match(/^\/(headlines|t|reply)\/.*$/);
  if (otherPagesMatch && search) {
    const url = request.nextUrl.clone();
    url.search = '';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/feed/:id*',
    '/picture/:id*',
    '/iv/:id*',
    '/headlines/:page*',
    '/t/:tag*',
    '/reply/:id*',
  ],
};
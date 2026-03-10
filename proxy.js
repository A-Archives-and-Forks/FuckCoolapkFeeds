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
    const referer = request.headers.get('referer');
    const host = request.headers.get('host');
    if (referer) {
      try {
        const refererUrl = new URL(referer);
        const requestUrl = request.nextUrl;
        
        const isDev = process.env.NODE_ENV === 'development';
        const isSameHost = refererUrl.host === requestUrl.host;

        if (!isDev && !isSameHost) {
          return new NextResponse('Forbidden', { status: 403 });
        }
      } catch (e) {
        return new NextResponse('Forbidden', { status: 403 });
      }
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
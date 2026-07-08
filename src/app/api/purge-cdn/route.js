import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const siteHost = 'www.nameerbag.com';
const zoneEnv = 'CLOUDFLARE_ZONE_ID_NAMEERBAG';

async function purgeCloudflare(zoneId, token) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ purge_everything: true }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success === false) {
    throw new Error(`Cloudflare purge failed for ${siteHost}: ${response.status} ${JSON.stringify(result)}`);
  }
  return result;
}

export async function POST() {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return NextResponse.json({ ok: true, skipped: true, reason: `VERCEL_ENV=${process.env.VERCEL_ENV}` });
  }

  const token = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;
  const zoneId = process.env[zoneEnv];

  if (!token || !zoneId) {
    return NextResponse.json({ ok: true, skipped: true, reason: `Missing CLOUDFLARE_API_TOKEN or ${zoneEnv}` });
  }

  try {
    const result = await purgeCloudflare(zoneId, token);
    return NextResponse.json({ ok: true, siteHost, zoneEnv, cloudflareSuccess: result.success === true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, siteHost, zoneEnv, error: error.message }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, siteHost, route: '/api/purge-cdn', method: 'POST' });
}

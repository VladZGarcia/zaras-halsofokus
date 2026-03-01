import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as any).runtime?.env ?? {};
  const hasResendKey = Boolean(runtime.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY);
  const hasDestinationEmail = Boolean(runtime.DESTINATION_EMAIL ?? import.meta.env.DESTINATION_EMAIL);

  return new Response(JSON.stringify({
    ok: hasResendKey && hasDestinationEmail,
    RESEND_API_KEY: hasResendKey ? 'set' : 'missing',
    DESTINATION_EMAIL: hasDestinationEmail ? 'set' : 'missing',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

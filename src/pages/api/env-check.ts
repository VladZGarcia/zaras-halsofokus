import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as any).runtime;
  const env = runtime?.env ?? {};

  const hasResendKey = Boolean(env.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY);
  const hasDestinationEmail = Boolean(env.DESTINATION_EMAIL ?? import.meta.env.DESTINATION_EMAIL);

  return new Response(JSON.stringify({
    ok: hasResendKey && hasDestinationEmail,
    RESEND_API_KEY: hasResendKey ? 'set' : 'missing',
    DESTINATION_EMAIL: hasDestinationEmail ? 'set' : 'missing',
    // Diagnostics — remove after fixing
    runtime_exists: runtime !== undefined,
    runtime_env_exists: runtime?.env !== undefined,
    env_keys: Object.keys(env),
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

/**
 * Health endpoint to verify required env vars are present.
 * Route: /api/env-check
 */

export async function onRequestGet(context) {
  const hasResendKey = Boolean(context.env.RESEND_API_KEY);
  const hasDestinationEmail = Boolean(context.env.DESTINATION_EMAIL);

  const payload = {
    ok: hasResendKey && hasDestinationEmail,
    RESEND_API_KEY: hasResendKey ? 'set' : 'missing',
    DESTINATION_EMAIL: hasDestinationEmail ? 'set' : 'missing'
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

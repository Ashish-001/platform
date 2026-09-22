// Replace with your own Formspree endpoint (https://formspree.io — free tier).
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

/**
 * Posts an enquiry payload to the form backend.
 * Throws when the request is rejected so callers can show an error state.
 */
export async function submitEnquiry(payload) {
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error('Request failed')
  return res
}

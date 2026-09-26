// Public client example only. No API key, monitor creation, or payment.
// Requires Node.js 22+. Run: node examples/preflight.mjs https://example.com/
import {pathToFileURL} from 'node:url';
export async function inspectSource(input, fetchImpl = fetch) {
  const source = new URL(input);
  if (!['http:', 'https:'].includes(source.protocol) || source.username || source.password) {
    throw new Error('Use a public HTTP(S) URL without credentials.');
  }
  const response = await fetchImpl('https://fluxproof.neoaethel.workers.dev/v1/preflight?ref=github', {
    method: 'POST', headers: {'content-type': 'application/json'},
    body: JSON.stringify({url:source.href}), signal: AbortSignal.timeout(20000)
  });
  const result = await response.json();
  if (!response.ok || result.schema !== 'fluxproof-preflight.v1' || result.fetchable !== true || result.content_included !== false) {
    throw new Error('Source check did not succeed. Inspect the source in the free web example; do not proceed to purchase automatically.');
  }
  return result;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (!process.argv[2]) throw new Error('Usage: node examples/preflight.mjs https://example.com/');
    const result = await inspectSource(process.argv[2]);
    console.log(JSON.stringify({status:'source_readable',metadata:result,next:'https://fluxproof.neoaethel.workers.dev/quickstart?ref=github',notice:'No monitor created and no payment made. A source check is not a change alert.'},null,2));
  } catch (error) {
    console.error(error instanceof TypeError ? 'Invalid URL or network failure; check the URL and retry.' : error.message);
    process.exitCode = 1;
  }
}

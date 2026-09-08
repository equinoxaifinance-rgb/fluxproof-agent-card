# FluxProof: public-page monitoring with evidence

Public pages change after an agent finishes its research. FluxProof watches the text and returns the source URL, observation time, prior/current hashes, and bounded added/removed excerpts when it observes a change.

Use it for public pricing pages, published policies and changelogs. Start by preflighting your actual source: pages requiring sign-in or browser JavaScript are outside its coverage.

- **Free:** one daily monitor for 30 days, 35 total checks including the baseline, latest receipt, no webhook.
- **$9 once / 30 days:** five monitors, minimum 15-minute interval, 15,000 total checks, change history and timestamped HMAC-signed HTTPS webhooks. No auto-renewal.
- **Integrations:** REST, five remote MCP tools, browser dashboard and buyer-authorized Stripe payment routes.

[Try a public source](https://fluxproof.neoaethel.workers.dev/quickstart?ref=github) · [Coverage and policies](https://fluxproof.neoaethel.workers.dev/policies)

## Find and connect

- Remote endpoint: `https://fluxproof.neoaethel.workers.dev/mcp`
- Official MCP Registry identity: `io.github.equinoxaifinance-rgb/fluxproof`
- [Smithery](https://smithery.ai/servers/neoaethel/fluxproof)
- [Glama](https://glama.ai/mcp/connectors/dev.workers.neoaethel.fluxproof/flux-proof)
- [OpenAPI](https://fluxproof.neoaethel.workers.dev/openapi.json) and [agent guide](https://fluxproof.neoaethel.workers.dev/llms.txt)

Discovery, offer and preflight do not require a key or charge. Get a free key from the product website or `POST /v1/keys/free`. Monitoring tools accept your buyer-owned `api_key` argument: keep tool transcripts private. A purchase always requires the buyer's authority.

## What the evidence does—and does not—mean

A content hash binds the observed text; it does not certify the truth of the source. Significance is a configured text signal, not a guarantee of business importance. Coverage is public HTML/text/JSON/XML up to 3 MB. There is no JavaScript rendering, sign-in/CAPTCHA bypass, or native email/SMS alerting.

The engine and source remain private. This repository and release distribute documentation and discovery metadata only—not an installable engine or redistribution rights.

Support: `the repo's GitHub issues page`. Do not send credentials, payment details or private URLs.

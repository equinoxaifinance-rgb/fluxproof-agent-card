# FluxProof: public-page monitoring with evidence

Public pages change after an agent finishes its research. FluxProof watches the text and returns the source URL, observation time, prior/current hashes, and bounded added/removed excerpts when it observes a change.

Use it for public pricing pages, published policies and changelogs. Start by preflighting your actual source: pages requiring sign-in or browser JavaScript are outside its coverage.

- **Free:** one daily monitor for 30 days, 35 total checks including the baseline, latest receipt, no webhook.
- **$9 once / 30 days:** five monitors, minimum 15-minute interval, 15,000 total checks, change history and timestamped HMAC-signed HTTPS webhooks. No auto-renewal.
- **Evidence plans, monthly:** Evidence Starter $29 a month (up to 25 pages every 6 hours) and Evidence Pro $99 a month (up to 150 pages hourly, plus signed webhooks), with price floors and email alerts. [Details](https://fluxproof.tryneverclosed.com/evidence?ref=github).
- **Integrations:** REST, six remote MCP tools at `/mcp` (five on the Claude connector at `/claude/mcp`), browser dashboard and buyer-authorized Stripe payment routes.

[Try a public source](https://fluxproof.tryneverclosed.com/quickstart?ref=github) · [Coverage and policies](https://fluxproof.tryneverclosed.com/policies)

## Find and connect

- Remote endpoint: `https://fluxproof.tryneverclosed.com/mcp`
- Official MCP Registry identity: `io.github.equinoxaifinance-rgb/fluxproof`
- [Smithery](https://smithery.ai/servers/neoaethel/fluxproof)
- [Glama](https://glama.ai/mcp/connectors/dev.workers.neoaethel.fluxproof/flux-proof)
- [OpenAPI](https://fluxproof.tryneverclosed.com/openapi.json) and [agent guide](https://fluxproof.tryneverclosed.com/llms.txt)

Discovery, offer and preflight do not require a key or charge. Get a free key from the product website or `POST /v1/keys/free`. Monitoring tools accept your buyer-owned `api_key` argument: keep tool transcripts private. A purchase always requires the buyer's authority.

## What the evidence does—and does not—mean

A content hash binds the observed text; it does not certify the truth of the source. Significance is a configured text signal, not a guarantee of business importance. Coverage is public HTML/text/JSON/XML up to 3 MB. There is no JavaScript rendering or sign-in/CAPTCHA bypass. Free and Monitor Pass deliver by dashboard, webhook, REST and MCP; Evidence plans also send email alerts; there is no SMS or mobile push.

The engine and source remain private. This repository and release distribute documentation and discovery metadata only—not an installable engine or redistribution rights.

Support: [open an issue](https://github.com/equinoxaifinance-rgb/fluxproof-agent-card/issues). Do not post credentials, payment details or private URLs.

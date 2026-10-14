# FluxProof

FluxProof watches public pricing, policy and changelog pages and tells you, with the source URL and before/after excerpts, when the text changes. By Neverclosed (https://tryneverclosed.com).

Live product: [FluxProof — public page monitoring for agents](https://fluxproof.tryneverclosed.com/?ref=github)

[Quickstart](QUICKSTART.md) · [Use cases](https://fluxproof.tryneverclosed.com/use-cases?ref=github) · [OpenAPI](https://fluxproof.tryneverclosed.com/openapi.json) · [Policies](https://fluxproof.tryneverclosed.com/policies)

n8n: [check one public source before creating a monitor](guides/n8n/README.md) with a bounded, MIT-licensed client workflow. No key, monitor creation or payment is included in this free preview.

Remote MCP endpoint: `https://fluxproof.tryneverclosed.com/mcp` (the original address `https://fluxproof.neoaethel.workers.dev/mcp` keeps working)

Server identity: `io.github.equinoxaifinance-rgb/fluxproof`, version `0.1.0`.

[Launch guide](LAUNCH.md) · [Agent card](.well-known/agent-card.json) · [Smithery listing](https://smithery.ai/servers/neoaethel/fluxproof) · [Glama connector](https://glama.ai/mcp/connectors/dev.workers.neoaethel.fluxproof/flux-proof)

Agent skill: [`skills/watch-page-changes/SKILL.md`](skills/watch-page-changes/SKILL.md) teaches an agent when and how to watch a page with FluxProof. Install: `npx skills add equinoxaifinance-rgb/fluxproof-agent-card --skill watch-page-changes`.

## Why use it

### Start with one source, without an account

[Check a public page in your browser](https://fluxproof.tryneverclosed.com/examples/public-page?ref=github), or run the dependency-free [Node.js client example](examples/preflight.mjs):

```bash
node examples/preflight.mjs https://example.com/
```

This checks whether the source can be read. It does **not** create a monitor, detect a change, return full paid history, or charge. After a successful check, follow the [monitor setup guide](https://fluxproof.tryneverclosed.com/quickstart?ref=github). Keep the first baseline separate from a later observed change.

If your integration stops, [open an issue](https://github.com/equinoxaifinance-rgb/fluxproof-agent-card/issues) with the tool or endpoint name, HTTP status/error code, and expected result. Include a source URL only if it is public and non-sensitive. Do not post API keys or payment credentials.

### What the monitor adds

- Normalize scripts, styles, markup, and whitespace before comparison.
- Receive the final source URL, observation time, prior/current SHA-256 hashes, significance, and bounded added/removed excerpts.
- Elevate configured watched terms such as `price`, `deprecated`, or `deadline`.
- Deliver changes through timestamped HMAC-SHA256 signed HTTPS webhooks.
- Discover and operate six tools through MCP, or use the REST API directly.
- Let an authorized agent receive a standard HTTP 402 Stripe payment challenge; discovery and preflight never charge.

## Offers

- Free: one public source, daily for 30 days, 30 scheduled checks including the baseline, five manual checks, latest receipt only, no webhook.
- Monitor Pass: $9 once for 30 days, five sources, 14,400 scheduled checks at 15-minute cadence including baselines, 600 manual checks, full history, signed webhooks, REST, MCP, and agent payment support.
- Evidence plans, monthly, cancel any time: Evidence Starter $29 a month (up to 25 pages checked every 6 hours) and Evidence Pro $99 a month (up to 150 pages checked hourly, plus signed webhooks). Both add price floors with email alerts, bulk page lists and timestamped proof packets: the exact page bytes, a signed manifest and an RFC 3161 timestamp from an outside authority. Details: [evidence plans](https://fluxproof.tryneverclosed.com/evidence?ref=github).

## Verified scope

Tested end to end in production (2026-09-08): change detection, signed webhook delivery and Stripe checkout.

## Boundaries

FluxProof accepts public HTTP or HTTPS text, HTML, JSON, and XML responses up to 3 MB. It does not sign in, solve bot challenges, or render JavaScript-only pages in a browser. Free and Monitor Pass deliver by dashboard, webhook, REST and MCP; Evidence plans also send email alerts; there is no SMS or mobile push. Mature general-purpose monitors remain stronger for browser automation, notification breadth, and raw monitor count.

## Commercial and source boundary

This repository's documentation, discovery metadata and examples are MIT licensed under the root [LICENSE](LICENSE), so you can copy and adapt them freely. The n8n client wrapper and guide in [`guides/n8n`](guides/n8n/README.md) carry the same MIT licence.

The MIT licence does not cover the FluxProof monitoring engine or the hosted service at `fluxproof.tryneverclosed.com`. Their source is not in this repository and is not licensed or distributed here; buying access does not transfer source or redistribution rights. Paid history, upstream data, credentials and account or payment rights keep their own terms.

Support: [open an issue](https://github.com/equinoxaifinance-rgb/fluxproof-agent-card/issues). Never post API keys, card data, passwords, or private URLs.

## Local stdio client

`server.mjs` is a small stdio MCP server for clients and directories that start servers locally. It lists the same six tools and sends every call to the hosted service at https://fluxproof.tryneverclosed.com/mcp; nothing runs or is stored locally. Set `FLUXPROOF_API_KEY` to send your key as a bearer token.

```sh
npm ci && node server.mjs
```

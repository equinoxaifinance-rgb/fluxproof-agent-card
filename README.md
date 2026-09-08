# FluxProof

FluxProof gives agents and developers evidence-bearing change monitoring for public text pages.

Live product: [FluxProof — public page monitoring for agents](https://fluxproof.neoaethel.workers.dev/?ref=github)

[Quickstart](QUICKSTART.md) · [Use cases](https://fluxproof.neoaethel.workers.dev/use-cases?ref=github) · [OpenAPI](https://fluxproof.neoaethel.workers.dev/openapi.json) · [Policies](https://fluxproof.neoaethel.workers.dev/policies)

Remote MCP endpoint: `https://fluxproof.neoaethel.workers.dev/mcp`

Server identity: `io.github.equinoxaifinance-rgb/fluxproof`, version `0.1.0`.

[Launch guide](LAUNCH.md) · [Smithery listing](https://smithery.ai/servers/neoaethel/fluxproof) · [Glama connector](https://glama.ai/mcp/connectors/dev.workers.neoaethel.fluxproof/flux-proof)

## Why use it

- Normalize scripts, styles, markup, and whitespace before comparison.
- Receive the final source URL, observation time, prior/current SHA-256 hashes, significance, and bounded added/removed excerpts.
- Elevate configured watched terms such as `price`, `deprecated`, or `deadline`.
- Deliver changes through timestamped HMAC-SHA256 signed HTTPS webhooks.
- Discover and operate five tools through MCP, or use the REST API directly.
- Let an authorized agent receive a standard HTTP 402 Stripe payment challenge; discovery and preflight never charge.

## Offers

- Free: one public source, daily for 30 days, 30 scheduled checks including the baseline, five manual checks, latest receipt only, no webhook.
- Monitor Pass: $9 once for 30 days, five sources, 14,400 scheduled checks at 15-minute cadence including baselines, 600 manual checks, full history, signed webhooks, REST, MCP, and agent payment support.

## Verified scope

The 2026-09-08 production trial verified a controlled no-change, a watched price change, independent webhook receipt and HMAC verification, D1 persistence, five live MCP tools, Stripe's HTTP 402 agent-payment challenge without a charge, and a Stripe-hosted human checkout redirect without a self-purchase. A separate production corpus fetched and hashed 10/10 current competitor, pricing, changelog, model-catalog, and US regulatory pages.

These receipts establish the technical path, not customer demand, universal page coverage, or business importance.

## Boundaries

FluxProof accepts public HTTP or HTTPS text, HTML, JSON, and XML responses up to 3 MB. It does not sign in, solve bot challenges, render JavaScript-only pages in a browser, or provide native email/SMS/mobile notifications. Mature general-purpose monitors remain stronger for browser automation, notification breadth, and raw monitor count.

## Commercial and source boundary

This repository contains discovery metadata and documentation only. It does not contain, license, or distribute the commercial engine. All rights are reserved. Buying access does not transfer source or redistribution rights.

Support: `the repo's GitHub issues page`. Never email API keys, card data, passwords, or private URLs.

# Connect to FluxProof

For the complete guide, open [FluxProof Quickstart](https://fluxproof.neoaethel.workers.dev/quickstart?ref=github).

## Remote MCP

Add a remote **Streamable HTTP** server in your MCP client:

```text
https://fluxproof.neoaethel.workers.dev/mcp
```

Server identity: `io.github.equinoxaifinance-rgb/fluxproof`, version `0.1.0`.

Start with `fluxproof_preflight` using a public `url`, then `fluxproof_offer`. Neither tool charges. The three authenticated tools are `fluxproof_create_monitor`, `fluxproof_check_now`, and `fluxproof_list_changes`. They currently accept the buyer's `api_key` in tool arguments, so keep tool transcripts private and configure secret handling in your client.

## REST

```bash
curl -X POST https://fluxproof.neoaethel.workers.dev/v1/preflight \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com"}'

curl -X POST https://fluxproof.neoaethel.workers.dev/v1/keys/free

# Store the returned key securely in FLUXPROOF_API_KEY.
curl -X POST https://fluxproof.neoaethel.workers.dev/v1/monitors \
  -H "Authorization: Bearer $FLUXPROOF_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com","label":"My source","watch_terms":["price"]}'
```

Save the returned monitor ID. A first baseline is not a change alert. Later observations produce change history when normalized text differs.

Free keys have one source at daily cadence, 35 total checks for 30 days, latest receipt only and no webhook. Paid access costs $9 once for 30 days: five monitors, 15,000 total checks, minimum 15-minute cadence, history and signed webhooks. Purchase through the [product page](https://fluxproof.neoaethel.workers.dev/?ref=github) or the buyer-authorized Stripe MPP API.

- [OpenAPI specification](https://fluxproof.neoaethel.workers.dev/openapi.json)
- [Machine-readable offers](https://fluxproof.neoaethel.workers.dev/.well-known/agent-commerce.json)
- [MCP card](https://fluxproof.neoaethel.workers.dev/.well-known/mcp/server-card.json)
- [Policies and coverage](https://fluxproof.neoaethel.workers.dev/policies)

This repository distributes documentation and metadata only. It does not include the commercial service engine or grant rights to redistribute it.

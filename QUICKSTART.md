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

If the create call fails (for example the source was down) and a retry says the monitor limit is reached, list your monitors and delete the stranded one, then try again:

```bash
curl https://fluxproof.neoaethel.workers.dev/v1/monitors \
  -H "Authorization: Bearer $FLUXPROOF_API_KEY"

curl -X DELETE https://fluxproof.neoaethel.workers.dev/v1/monitors/MONITOR_ID \
  -H "Authorization: Bearer $FLUXPROOF_API_KEY"
```

Free keys have one source at daily cadence for 30 days: 35 checks in total (30 scheduled including the baseline, plus five manual), latest receipt only and no webhook. Paid access costs $9 once for 30 days: five monitors, 15,000 total checks, minimum 15-minute cadence, history and signed webhooks. Purchase through the [product page](https://fluxproof.neoaethel.workers.dev/?ref=github) or the buyer-authorized Stripe MPP API.

## Paid pass for agents

An agent with the buyer's payment authority buys a pass with one call. FluxProof first checks the source; if it can't be read you get `424` and no charge. Otherwise you get a `402` Stripe payment challenge; retry the same request with the payment credential to receive `201` and the paid API key. The `idempotency_key` must be 24 to 120 characters of `A-Z a-z 0-9 _ -`; reuse it on the retry.

```bash
curl -X POST https://fluxproof.neoaethel.workers.dev/v1/passes \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com","idempotency_key":"'"$(openssl rand -hex 16)"'"}'
```

Paid monitors accept `interval_minutes` down to 15. Ask for it explicitly:

```bash
curl -X POST https://fluxproof.neoaethel.workers.dev/v1/monitors \
  -H "Authorization: Bearer $FLUXPROOF_PAID_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com/pricing","label":"Pricing","watch_terms":["price"],"interval_minutes":15}'
```

- [OpenAPI specification](https://fluxproof.neoaethel.workers.dev/openapi.json)
- [Machine-readable offers](https://fluxproof.neoaethel.workers.dev/.well-known/agent-commerce.json)
- [MCP card](https://fluxproof.neoaethel.workers.dev/.well-known/mcp/server-card.json)
- [Policies and coverage](https://fluxproof.neoaethel.workers.dev/policies)

This repository distributes documentation and metadata only. It does not include the commercial service engine or grant rights to redistribute it.

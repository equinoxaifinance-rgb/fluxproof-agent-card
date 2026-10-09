# Installing FluxProof in Cline (and other MCP clients)

FluxProof is a hosted (remote) MCP server. There is nothing to download, build or run locally.

## Steps

1. Open Cline's MCP settings file (`cline_mcp_settings.json`) from the MCP Servers panel.
2. Add this entry inside `mcpServers`:

```json
{
  "mcpServers": {
    "fluxproof": {
      "type": "streamableHttp",
      "url": "https://fluxproof.neoaethel.workers.dev/mcp",
      "disabled": false
    }
  }
}
```

3. Save the file. Cline connects and lists the server's tools.

No API key is needed for the free tools. Creating paid monitors needs a Monitor Pass; see the [README](README.md).

## Other clients

- Claude Code: `claude mcp add --transport http fluxproof https://fluxproof.neoaethel.workers.dev/mcp`
- Any client that supports Streamable HTTP: point it at `https://fluxproof.neoaethel.workers.dev/mcp`.

## Check it works

Ask Cline to list FluxProof's tools. They should appear without any key. Nothing is charged unless you buy a pass.

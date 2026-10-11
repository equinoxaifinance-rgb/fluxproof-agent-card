#!/usr/bin/env node
// Local stdio MCP server for FluxProof. It is a thin client: every tool call is
// sent to the hosted FluxProof service, which does the fetching, monitoring and
// billing. Nothing is stored locally. Set FLUXPROOF_API_KEY to send a key as a
// bearer token instead of passing api_key in tool arguments.
import { readFile } from "node:fs/promises";
import { realpathSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export const BASE_URL = (process.env.FLUXPROOF_BASE_URL || "https://fluxproof.tryneverclosed.com").replace(/\/+$/u, "");
const TOOLS = JSON.parse(await readFile(new URL("./tools.json", import.meta.url), "utf8"));
const TOOL_NAMES = new Set(TOOLS.map((tool) => tool.name));

export async function callHosted(name, args, { fetchImpl = fetch, apiKey = process.env.FLUXPROOF_API_KEY } = {}) {
  if (!TOOL_NAMES.has(name)) return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
  const headers = { "content-type": "application/json", accept: "application/json" };
  if (apiKey) headers.authorization = `Bearer ${apiKey}`;
  const response = await fetchImpl(`${BASE_URL}/mcp`, {
    method: "POST",
    headers,
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args ?? {} } }),
    signal: AbortSignal.timeout(60_000),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload) return { content: [{ type: "text", text: `FluxProof service error: HTTP ${response.status}` }], isError: true };
  if (payload.error) return { content: [{ type: "text", text: `FluxProof service error: ${payload.error.message}` }], isError: true };
  return payload.result;
}

export function createServer(options = {}) {
  const server = new Server({ name: "fluxproof", version: "0.1.0" }, { capabilities: { tools: {} } });
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));
  server.setRequestHandler(CallToolRequestSchema, async (request) =>
    callHosted(request.params.name, request.params.arguments, options));
  return server;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href;
if (isMain) await createServer().connect(new StdioServerTransport());

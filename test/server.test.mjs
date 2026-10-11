import { test } from "node:test";
import assert from "node:assert/strict";
import { callHosted, BASE_URL } from "../server.mjs";

test("forwards a tool call to the hosted /mcp endpoint", async () => {
  let seen;
  const fetchImpl = async (url, init) => {
    seen = { url, init };
    return new Response(JSON.stringify({ jsonrpc: "2.0", id: 1, result: { content: [{ type: "text", text: "ok" }] } }), { status: 200 });
  };
  const result = await callHosted("fluxproof_offer", {}, { fetchImpl, apiKey: "k_test" });
  assert.equal(seen.url, `${BASE_URL}/mcp`);
  assert.equal(seen.init.headers.authorization, "Bearer k_test");
  assert.deepEqual(JSON.parse(seen.init.body).params, { name: "fluxproof_offer", arguments: {} });
  assert.equal(result.content[0].text, "ok");
});

test("rejects unknown tools without a network call", async () => {
  const result = await callHosted("nope", {}, { fetchImpl: () => assert.fail("no fetch") });
  assert.equal(result.isError, true);
});

test("reports hosted errors as tool errors", async () => {
  const fetchImpl = async () => new Response("bad", { status: 502 });
  const result = await callHosted("fluxproof_offer", {}, { fetchImpl });
  assert.equal(result.isError, true);
});

# Preview one public source in n8n

[Download the workflow](fluxproof-free-preview.workflow.json). It sends one public URL to FluxProof's free metadata preflight, validates the reply and returns a separate [monitor setup route](https://fluxproof.neoaethel.workers.dev/quickstart). No key or payment is required for the preview. No monitor is created.

## Import and run

1. In an existing authorized n8n editor, create an empty workflow and choose **Import from File**. Import the JSON into an isolated workspace: its stable test ID must not overwrite an unrelated workflow.
2. Read the note, then open **Choose input** and enter a public URL. Never include a key, private document URL or secret query parameter.
3. Leave the workflow unpublished and execute it manually. Inspect the final node's JSON rather than treating a green n8n execution indicator as proof of a readable source.
4. `source_readable_not_monitored` means one valid observation was returned. `monitorCreated` and `paymentAttempted` remain false; `changeState` stays `not_observed`.
5. Choose a free key or explicitly authorized paid access separately in the setup guide. Create a baseline before interpreting changes. Never paste a key into this recipe.

## Result contract

The final result contains the submitted/final public URL, observation time, content hash and byte count. It does not return paid history or the source's full content. A hash identifies observed bytes; it does not establish their truth or significance.

`source_check_failed` preserves a typed failure and returns no setup handoff. Invalid URLs, failed fetches, malformed responses, missing hashes, invalid byte counts and stale/future observations are not successful previews. **A failed fetch never means unchanged.** Correct invalid input before rerunning. For a rate limit or transient network/5xx error, wait and choose one manual retry; no automatic retry loop exists.

The workflow includes only a manual trigger, grouped input, one fixed free HTTP request, response mapping and a note. It contains no credentials, scheduler, webhook receiver, monitor management or payment nodes. Inspect instance-level execution retention before sensitive work. No campaign tag is sent: attribution is unknown, not a verified n8n referral or owner QA.

## Verification and setup boundary

The exact artifact imported/exported with the same executable graph in n8n 2.40.7 on Node 24.19.0. Native CLI execution of an equivalent owner-QA copy reached `source_readable_not_monitored`; a localhost input reached `source_check_failed/url_host_not_public`. QA copies differ only in workflow identity and the source-attribution query. Packaged-code tests cover transport, malformed responses, stale receipts, failed fetches, missing hashes and unexpected content.

These are CLI/runtime and code checks, not an n8n directory certification. Editor-canvas inspection remains uncompleted: a clean instance opened owner setup and no account credentials were created. After authorized owner setup, verify the written editor import path visually. For self-hosting, use the official [n8n setup guide](https://docs.n8n.io/deploy/host-n8n/install-options/install-with-npm), a new private user folder, and loopback-only editor/broker listeners; do not expose a public tunnel. Node 25 and n8n 3 are not this tested baseline.

See the live [API contract](https://fluxproof.neoaethel.workers.dev/openapi.json) for current service behavior and limits. This preview does not prove monitor history, webhook delivery or paid fulfillment.

## License

The original client wrapper and this guide are [MIT licensed](LICENSE). This is a narrow exception to the repository's all-rights-reserved notice. Copying, modification and redistribution of these wrapper files are allowed; the hosted service, private monitoring engine, paid history, upstream data/docs, n8n itself and account/payment rights are excluded.

Workflow SHA-256: `e56f50cf5f71f855934b3a2838941f3be468aaefe038c1e66d9ee1bd6ee990a6`.

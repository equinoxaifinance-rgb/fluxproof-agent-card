# Runs FluxProof's hosted MCP server over stdio for MCP clients and
# directory inspectors that start servers locally. All tools run on
# https://fluxproof.tryneverclosed.com/mcp; this image only bridges to it.
FROM node:22-alpine

RUN npm install -g mcp-remote@0.14.3 \
    && npm cache clean --force

USER node

CMD ["mcp-remote", "https://fluxproof.tryneverclosed.com/mcp", "--transport", "http-only"]

# Streaming UI for LLM responses

How to render LLM responses as they stream in.

## Why streaming matters

A 2-second wait for a complete response feels slow. A 2-second wait with tokens streaming feels instant. UX, not perf.

## Implementation sketch

1. Server uses provider's streaming API (Anthropic's `messages.stream` or OpenAI's `stream: true`)
2. Server pipes tokens to client via SSE or WebSocket
3. Client appends tokens to a growing string in React state
4. Render the string with a typing-indicator at the end while streaming

## Gotchas

- **Tool calls:** Streaming and tool calls don't compose cleanly. Pause streaming, run tool, resume.
- **Markdown:** Partial markdown can look broken (e.g., unmatched `**`). Either re-render on chunk boundary or use a forgiving renderer.
- **Cancellation:** User clicks "stop" mid-stream. Send abort signal to provider; clean up half-rendered state.

## For ProjectOS

Use SSE (matches our realtime model). Render in chat messages as they stream. Tool calls render as styled blocks with their own lifecycle (pending → success/failure).

# Magic-link auth

Email-based passwordless auth. User enters email; we send a one-time link; clicking the link signs them in.

## When this fits

- Consumer products
- Low security pressure (not banking, not healthcare)
- Audience comfortable with email
- You want the simplest possible auth

## When this doesn't fit

- Users with shared inboxes (corporate environments)
- High-frequency login (the email round-trip becomes annoying)
- Apps where the user needs instant access (slow corporate email = bad UX)

## Implementation sketch

1. Email input → POST `/api/auth/magic-link`
2. Server generates signed token (JWT or random + DB lookup), emails it
3. User clicks link → GET `/api/auth/verify?token=...`
4. Server validates, creates session, redirects to app

## Tradeoffs

- **Latency:** Email is slow. ~5-30s round-trip.
- **Deliverability:** Spam folders are a real concern. Use a transactional provider.
- **Security:** Email is the weakest link. If their email is compromised, your account is too.

## Recommended for ProjectOS users

If they chose magic-link in discovery and they're on Next.js + Clerk, Clerk handles this natively. One Clerk component, done.

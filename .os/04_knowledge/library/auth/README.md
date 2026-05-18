# Authentication — when to use which

A decision guide for choosing an auth approach based on project stack and audience.

## Quick guide

| Audience | Stack | Recommended |
|---------|-------|-------------|
| Consumer solo users | Any | Magic link |
| Consumer + mobile | Any | Magic link + passkeys |
| B2B SaaS | Any | OAuth (Google/Microsoft) + magic link |
| Enterprise | Any | OAuth + SSO via Clerk/Auth0 |
| Power users | Any with native support | Passkeys |

## Variants

- `magic-link.md` — email link, simplest, no passwords
- `passkeys.md` — WebAuthn, no passwords, modern
- `oauth.md` — third-party providers

## Anti-patterns

- Rolling your own password storage (use a library — bcrypt at minimum)
- Storing session tokens in localStorage (use httpOnly cookies)
- Skipping rate limiting on login endpoints

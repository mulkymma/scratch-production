# scratch-production

## Contact form email

The contact form sends project enquiries to `scratch.production0@gmail.com` through Resend. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in `.env.local` for local development and in the deployment environment. The sender address must use a domain verified in Resend. See `.env.example` for the expected variables.
git add README.md app/globals.css app/page.tsx package.json package-lock.json app/api .env.example
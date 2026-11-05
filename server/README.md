# Gemini review analysis (local development)

## Help desk API contract

The frontend uses these routes through the configured `VITE_API_BASE_URL` backend. The application API server lives in the separate backend project.

- `POST /api/support/answer` with `{ "topicId": "stock|discount|delivery|return|specs|payment" }` returns `{ "answer": "..." }`. The server should retrieve the matching current records from its database and use its configured AI provider to compose an answer grounded only in those records. Do not accept free text at this route.
- `POST /api/support/inquiries` with `{ "question", "customerName", "customerEmail", "customerId", "messages" }` stores an unanswered inquiry and its customer/AI transcript and returns its record, including an `id` or `_id`. Guest inquiries require a valid name and email; the response includes a one-time `guestAccessToken` that the frontend must keep private and send as `X-Support-Access-Token` when checking for a reply. Notify admins using the application's existing notification mechanism.
- `GET /api/support/inquiries?status=open|closed` is admin-only and returns tickets in the selected status. Legacy `answered` records are treated as open. Admins can open each ticket to load its full conversation.
- `POST /api/support/inquiries/:id/messages` lets the ticket owner continue the same thread with `{ "text": "..." }`. Guests must send their `X-Support-Access-Token`; the message is saved and keeps the ticket open for admin follow-up. Closed tickets reject new messages.
- `POST /api/support/inquiries/:id/reply` is admin-only, appends an admin message, and keeps the ticket open for continued conversation.
- `POST /api/support/inquiries/:id/close` is admin-only and closes the ticket. The customer chat then locks that conversation and offers a new ticket action.
- `GET /api/support/inquiries/:id` returns the inquiry to its owner (or an admin), including the reply once available. Guests must provide their `X-Support-Access-Token`. The customer chat polls this route while waiting.

The backend must derive customer identity from the authenticated session/token where available, validate ownership on customer reads, and enforce admin authorization for listing and replying. Guest inquiries can be accepted with a validated email/name. Never trust the client-supplied role or customer ID for authorization.

1. Create a Gemini API key in Google AI Studio. Keep it private; do not put it in a `VITE_` variable or client-side code.
2. Copy `.env.example` to `.env` and set `GEMINI_API_KEY`. The default model is `gemini-3.5-flash`; change `GEMINI_MODEL` if that model is unavailable to your account.
3. Open two terminals in the project folder:

   ```powershell
   npm.cmd run ai:server
   npm.cmd run dev
   ```

4. Open the Vite URL and click **Analyze with Gemini** in the home-page reviews section.

The AI server binds to localhost on port 5001 and limits requests to 12 per minute per local client. The browser sends review text to this local server, which calls Gemini; the API key never goes to the browser. Google AI Studio free-tier model access, quotas, region availability, and terms can change. This local-development endpoint should not be exposed publicly without authentication and deployment rate limits.

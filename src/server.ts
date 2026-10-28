import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} - try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/contact" && request.method === "POST") {
        try {
          const body = (await request.json()) as {
            name?: string;
            email?: string;
            message?: string;
            topics?: string[];
            intent?: string;
            honeypot?: string;
          };
          const { name, email, message, topics, intent, honeypot } = body;

          // Silent drop for bot submissions
          if (honeypot) {
            return new Response(JSON.stringify({ success: true }), {
              status: 200,
              headers: { "content-type": "application/json" },
            });
          }

          if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }

          const envRecord = env as Record<string, string> | undefined;
          const apiKey =
            envRecord?.RESEND_API_KEY ||
            (typeof process !== "undefined" ? process.env?.RESEND_API_KEY : undefined);
          const targetEmail = "fitaalemayehu12@gmail.com";

          const topicStr =
            Array.isArray(topics) && topics.length > 0
              ? topics.join(", ")
              : intent || "General inquiry";
          const subject = `Portfolio message: ${topicStr}, from ${name}`;

          if (!apiKey) {
            console.warn("RESEND_API_KEY not configured. Simulating message dispatch.");
            return new Response(JSON.stringify({ success: true, simulated: true }), {
              status: 200,
              headers: { "content-type": "application/json" },
            });
          }

          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              from: "Portfolio Contact <onboarding@resend.dev>",
              to: targetEmail,
              reply_to: email,
              subject,
              text: `Name: ${name}\nEmail: ${email}\nIntent: ${intent || "None specified"}\nTopics: ${Array.isArray(topics) && topics.length > 0 ? topics.join(", ") : "None specified"}\n\nMessage:\n${message}`,
            }),
          });

          if (!resendResponse.ok) {
            const errText = await resendResponse.text();
            console.error("Resend error:", errText);
            return new Response(JSON.stringify({ error: "Failed to send message" }), {
              status: 500,
              headers: { "content-type": "application/json" },
            });
          }

          const resendData = await resendResponse.json();
          return new Response(JSON.stringify({ success: true, data: resendData }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          console.error("Contact API error:", err);
          return new Response(JSON.stringify({ error: "Invalid request payload" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

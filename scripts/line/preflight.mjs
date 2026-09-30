const LINE_API = "https://api.line.me";
const OPENAI_API = "https://api.openai.com";

function argValue(name) {
  const prefix = `--${name}=`;
  const found = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : null;
}

function hasFlag(name) {
  return process.argv.slice(2).includes(`--${name}`);
}

function requireHttpsUrl(value, label) {
  if (!value) throw new Error(`${label} is required`);
  const url = new URL(value);
  if (url.protocol !== "https:") throw new Error(`${label} must use HTTPS`);
  if (value.length > 500) throw new Error(`${label} must be 500 characters or less`);
  return url.toString();
}

async function readJson(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text.slice(0, 2000) };
  }
}

async function lineRequest(path, options = {}) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not configured");

  const response = await fetch(`${LINE_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers ?? {}),
    },
    signal: AbortSignal.timeout(15_000),
  });

  const data = await readJson(response);
  if (!response.ok) {
    throw new Error(`LINE ${options.method ?? "GET"} ${path} failed: ${response.status} ${JSON.stringify(data)}`);
  }
  return data;
}

async function checkBotInfo() {
  const data = await lineRequest("/v2/bot/info");
  return {
    ok: true,
    displayName: data.displayName ?? null,
    basicId: data.basicId ?? null,
    premiumId: data.premiumId ?? null,
  };
}

async function getWebhookInfo() {
  try {
    const data = await lineRequest("/v2/bot/channel/webhook/endpoint");
    return {
      ok: true,
      endpoint: data.endpoint ?? null,
      active: Boolean(data.active),
    };
  } catch (error) {
    if (String(error).includes("404")) {
      return { ok: true, endpoint: null, active: false };
    }
    throw error;
  }
}

async function setWebhookEndpoint(endpoint) {
  await lineRequest("/v2/bot/channel/webhook/endpoint", {
    method: "PUT",
    body: JSON.stringify({ endpoint }),
  });
  return { ok: true, endpoint };
}

async function testWebhookEndpoint(endpoint) {
  const data = await lineRequest("/v2/bot/channel/webhook/test", {
    method: "POST",
    body: JSON.stringify(endpoint ? { endpoint } : {}),
  });
  return {
    ok: Boolean(data.success),
    success: Boolean(data.success),
    statusCode: data.statusCode ?? null,
    reason: data.reason ?? null,
    detail: data.detail ?? null,
  };
}

async function checkOpenAiLive() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-6-luna";
  const response = await fetch(`${OPENAI_API}/v1/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions: "Return exactly OK.",
      input: "Connection test",
      max_output_tokens: 8,
      store: false,
    }),
    signal: AbortSignal.timeout(20_000),
  });

  const data = await readJson(response);
  if (!response.ok) {
    throw new Error(`OpenAI connection test failed: ${response.status} ${JSON.stringify(data)}`);
  }

  return {
    ok: true,
    model: data.model ?? model,
    responseId: data.id ?? null,
  };
}

function envState() {
  return {
    LINE_CHANNEL_SECRET: Boolean(process.env.LINE_CHANNEL_SECRET),
    LINE_CHANNEL_ACCESS_TOKEN: Boolean(process.env.LINE_CHANNEL_ACCESS_TOKEN),
    OPENAI_API_KEY: Boolean(process.env.OPENAI_API_KEY),
    OPENAI_MODEL: process.env.OPENAI_MODEL?.trim() || "gpt-6-luna",
    RIOT_STAFF_ALERT_WEBHOOK_URL: Boolean(process.env.RIOT_STAFF_ALERT_WEBHOOK_URL),
  };
}

async function main() {
  const apply = hasFlag("apply");
  const openAiLive = hasFlag("openai-live");
  const requestedEndpoint = argValue("webhook") ?? process.env.LINE_WEBHOOK_URL ?? null;

  const report = {
    ok: true,
    mode: apply ? "apply" : "read-only",
    environment: envState(),
    checks: {},
  };

  if (!process.env.LINE_CHANNEL_ACCESS_TOKEN) {
    report.ok = false;
    report.checks.line = {
      ok: false,
      error: "LINE_CHANNEL_ACCESS_TOKEN is not configured",
    };
  } else {
    try {
      report.checks.bot = await checkBotInfo();
      report.checks.webhookCurrent = await getWebhookInfo();

      if (requestedEndpoint) {
        const endpoint = requireHttpsUrl(requestedEndpoint, "Webhook URL");
        report.checks.webhookRequested = { ok: true, endpoint };

        if (apply) {
          report.checks.webhookSet = await setWebhookEndpoint(endpoint);
          report.checks.webhookTest = await testWebhookEndpoint(endpoint);
          if (!report.checks.webhookTest.success) report.ok = false;
        } else {
          report.checks.webhookTest = await testWebhookEndpoint(endpoint);
          if (!report.checks.webhookTest.success) report.ok = false;
        }
      }
    } catch (error) {
      report.ok = false;
      report.checks.line = {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  if (openAiLive) {
    try {
      report.checks.openAi = await checkOpenAiLive();
    } catch (error) {
      report.ok = false;
      report.checks.openAi = {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  } else {
    report.checks.openAi = {
      ok: Boolean(process.env.OPENAI_API_KEY),
      liveTest: false,
      note: "Use --openai-live for a minimal Responses API request.",
    };
    if (!process.env.OPENAI_API_KEY) report.ok = false;
  }

  if (!process.env.LINE_CHANNEL_SECRET) {
    report.ok = false;
    report.checks.lineChannelSecret = {
      ok: false,
      error: "LINE_CHANNEL_SECRET is not configured",
    };
  } else {
    report.checks.lineChannelSecret = { ok: true };
  }

  console.log(JSON.stringify(report, null, 2));

  if (!report.ok) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

export async function apiPost<TPayload>(
  path: string,
  payload: TPayload,
): Promise<{ ok: true; id?: string }> {
  if (!API_BASE_URL && import.meta.env.PROD) {
    throw new Error("Backend URL is not configured. Set VITE_API_BASE_URL in Vercel.");
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Could not reach backend. Check VITE_API_BASE_URL, backend deploy, and CORS.");
  }

  const body = (await response.json().catch(() => null)) as { error?: string; id?: string } | null;

  if (!response.ok) {
    throw new Error(body?.error ?? "Request failed");
  }

  return { ok: true, id: body?.id };
}

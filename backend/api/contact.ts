import {
  type ApiRequest,
  type ApiResponse,
  createRequestId,
  handleOptions,
  isEmail,
  readJsonBody,
  requireString,
  setCors,
} from "../lib/api-utils";

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (handleOptions(request, response)) return;
  setCors(request, response);

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const payload = readJsonBody(request);
    const message = {
      id: createRequestId("contact"),
      name: requireString(payload, "name", 80),
      email: requireString(payload, "email", 120),
      phone: requireString(payload, "phone", 20),
      subject: requireString(payload, "subject", 120),
      message: requireString(payload, "message", 800),
      createdAt: new Date().toISOString(),
    };

    if (!isEmail(message.email)) {
      throw new Error("email is invalid");
    }

    console.info("Contact message received", message);
    response.status(201).json({ ok: true, id: message.id });
  } catch (error) {
    response.status(400).json({
      error: error instanceof Error ? error.message : "Invalid contact request",
    });
  }
}

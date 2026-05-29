import {
  type ApiRequest,
  type ApiResponse,
  createRequestId,
  handleOptions,
  isEmail,
  optionalString,
  readJsonBody,
  requireNumber,
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
    const booking = {
      id: createRequestId("booking"),
      serviceType: requireString(payload, "serviceType", 80),
      vehicleType: requireString(payload, "vehicleType", 80),
      pickupLocation: requireString(payload, "pickupLocation", 200),
      dropoffLocation: requireString(payload, "dropoffLocation", 200),
      pickupDate: requireString(payload, "pickupDate", 20),
      pickupTime: requireString(payload, "pickupTime", 20),
      passengers: requireNumber(payload, "passengers", 1, 50),
      luggage: requireNumber(payload, "luggage", 0, 50),
      firstName: requireString(payload, "firstName", 50),
      lastName: requireString(payload, "lastName", 50),
      email: requireString(payload, "email", 120),
      phone: requireString(payload, "phone", 20),
      flightNumber: optionalString(payload, "flightNumber", 20),
      specialRequests: optionalString(payload, "specialRequests", 600),
      createdAt: new Date().toISOString(),
    };

    if (!isEmail(booking.email)) {
      throw new Error("email is invalid");
    }

    console.info("Booking request received", booking);
    response.status(201).json({ ok: true, id: booking.id });
  } catch (error) {
    response.status(400).json({
      error: error instanceof Error ? error.message : "Invalid booking request",
    });
  }
}

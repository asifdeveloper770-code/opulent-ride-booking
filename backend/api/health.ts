import { type ApiRequest, type ApiResponse, handleOptions, setCors } from "../lib/api-utils";

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (handleOptions(request, response)) return;
  setCors(request, response);

  response.status(200).json({
    ok: true,
    service: "opulent-ride-backend",
    timestamp: new Date().toISOString(),
  });
}

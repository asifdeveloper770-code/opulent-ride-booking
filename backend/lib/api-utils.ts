type RequestLike = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
};

declare const process: {
  env: Record<string, string | undefined>;
};

export type ApiRequest = RequestLike;
export type ApiResponse = ResponseLike;

export function setCors(request: ApiRequest, response: ApiResponse) {
  const configuredOrigin = process.env.FRONTEND_ORIGIN;
  const requestOrigin = getHeader(request, "origin");
  const allowedOrigin = configuredOrigin ?? requestOrigin ?? "*";

  response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  response.setHeader("Vary", "Origin");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function handleOptions(request: ApiRequest, response: ApiResponse): boolean {
  if (request.method !== "OPTIONS") return false;

  setCors(request, response);
  response.status(204).end();
  return true;
}

export function readJsonBody<T extends Record<string, unknown>>(request: ApiRequest): T {
  if (typeof request.body === "string") {
    return JSON.parse(request.body) as T;
  }

  if (request.body && typeof request.body === "object" && !Array.isArray(request.body)) {
    return request.body as T;
  }

  return {} as T;
}

export function requireString(
  payload: Record<string, unknown>,
  key: string,
  maxLength: number,
): string {
  const value = payload[key];

  if (typeof value !== "string") {
    throw new Error(`${key} is required`);
  }

  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error(`${key} is required`);
  }

  if (trimmed.length > maxLength) {
    throw new Error(`${key} is too long`);
  }

  return trimmed;
}

export function optionalString(
  payload: Record<string, unknown>,
  key: string,
  maxLength: number,
): string {
  const value = payload[key];

  if (value == null || value === "") return "";

  if (typeof value !== "string") {
    throw new Error(`${key} must be text`);
  }

  const trimmed = value.trim();

  if (trimmed.length > maxLength) {
    throw new Error(`${key} is too long`);
  }

  return trimmed;
}

export function requireNumber(
  payload: Record<string, unknown>,
  key: string,
  min: number,
  max: number,
): number {
  const numericValue = Number(payload[key]);

  if (!Number.isFinite(numericValue) || numericValue < min || numericValue > max) {
    throw new Error(`${key} is invalid`);
  }

  return numericValue;
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function createRequestId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function getHeader(request: ApiRequest, name: string): string | undefined {
  const headers = request.headers ?? {};
  const header = headers[name] ?? headers[name.toLowerCase()];

  if (Array.isArray(header)) {
    return header[0];
  }

  return header;
}

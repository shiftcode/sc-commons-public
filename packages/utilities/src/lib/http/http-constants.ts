/**
 * All status codes defined in RFC1945 (HTTP/1.0, RFC2616 (HTTP/1.1),
 * RFC2518 (WebDAV), RFC6585 (Additional HTTP Status Codes), and
 * RFC7538 (Permanent Redirect) are supported.
 */
export enum HttpStatusCode {
  ACCEPTED = 202,
  BAD_GATEWAY = 502,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  CONTINUE = 100,
  CREATED = 201,
  EXPECTATION_FAILED = 417,
  FAILED_DEPENDENCY = 424,
  FORBIDDEN = 403,
  GATEWAY_TIMEOUT = 504,
  GONE = 410,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  IM_A_TEAPOT = 418,
  INSUFFICIENT_SPACE_ON_RESOURCE = 419,
  INSUFFICIENT_STORAGE = 507,
  INTERNAL_SERVER_ERROR = 500,
  LENGTH_REQUIRED = 411,
  LOCKED = 423,
  METHOD_FAILURE = 420,
  METHOD_NOT_ALLOWED = 405,
  MOVED_PERMANENTLY = 301,
  MOVED_TEMPORARILY = 302,
  MULTI_STATUS = 207,
  MULTIPLE_CHOICES = 300,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
  NO_CONTENT = 204,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NOT_ACCEPTABLE = 406,
  NOT_FOUND = 404,
  NOT_IMPLEMENTED = 501,
  NOT_MODIFIED = 304,
  OK = 200,
  PARTIAL_CONTENT = 206,
  PAYMENT_REQUIRED = 402,
  PERMANENT_REDIRECT = 308,
  PRECONDITION_FAILED = 412,
  PRECONDITION_REQUIRED = 428,
  PROCESSING = 102,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  REQUEST_TIMEOUT = 408,
  REQUEST_TOO_LONG = 413,
  REQUEST_URI_TOO_LONG = 414,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  RESET_CONTENT = 205,
  SEE_OTHER = 303,
  SERVICE_UNAVAILABLE = 503,
  SWITCHING_PROTOCOLS = 101,
  TEMPORARY_REDIRECT = 307,
  TOO_MANY_REQUESTS = 429,
  UNAUTHORIZED = 401,
  UNPROCESSABLE_ENTITY = 422,
  UNSUPPORTED_MEDIA_TYPE = 415,
  USE_PROXY = 305,
}

export enum ContentType {
  PDF = 'application/pdf',
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JSON = 'application/json',
  TXT = 'text/plain',
  XML = 'application/xml',
  CSV = 'text/csv',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
}

export enum CorsHeader {
  ALLOW_ORIGIN = 'Access-Control-Allow-Origin',
  ALLOW_METHODS = 'Access-Control-Allow-Methods',
  ALLOW_CREDENTIALS = 'Access-Control-Allow-Credentials',
  ALLOW_HEADERS = 'Access-Control-Allow-Headers',
  EXPOSE_HEADERS = 'Access-Control-Expose-Headers',
  MAX_AGE = 'Access-Control-Max-Age',
}

export enum HttpMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PATCH = 'PATCH',
}

export enum CommonHttpHeader {
  CONTENT_TYPE = 'Content-Type',
  CONTENT_DISPOSITION = 'Content-Disposition',
  VARY = 'Vary',
  CONTENT_LENGTH = 'Content-Length',
  AUTHORIZATION = 'Authorization',
  ORIGIN = 'Origin',
  CACHE_CONTROL = 'Cache-Control',
  LOCATION = 'Location', // for redirects
  ACCEPT_LANGUAGE = 'Accept-Language',
  COOKIE = 'Cookie',
}

export enum SecurityHttpHeader {
  STRICT_TRANSPORT_SECURITY = 'Strict-Transport-Security',
  REFERRER_POLICY = 'Referrer-Policy',
  X_CONTENT_TYPE_OPTIONS = 'X-Content-Type-Options',
  X_FRAME_OPTIONS = 'X-Frame-Options',
  X_XSS_PROTECTION = 'X-XSS-Protection',
  CONTENT_SECURITY_POLICY = 'Content-Security-Policy',
  PERMISSIONS_POLICY = 'Permissions-Policy',
  FEATURE_POLICY = 'Feature-Policy',
}

export enum SecurityHttpHeaderDefaultValue {
  STRICT_TRANSPORT_SECURITY = 'max-age=16070400; includeSubDomains',
  REFERRER_POLICY = 'strict-origin-when-cross-origin',
  X_CONTENT_TYPE_OPTIONS = 'nosniff',
  X_XSS_PROTECTION = '1; mode=block',
  PERMISSIONS_POLICY = 'microphone=(), geolocation=()',
  FEATURE_POLICY = "microphone 'none'; geolocation 'none'",
}

export const ONE_YEAR_IN_SECONDS = 31536000
export const ONE_DAY_IN_SECONDS = 86400
export const ONE_HOUR_IN_SECONDS = 3600
export const ONE_MINUTE_IN_SECONDS = 60

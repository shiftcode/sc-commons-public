import { CommonHttpHeader, ContentType, CorsHeader, HttpMethod, HttpStatusCode } from '@shiftcode/utilities'
import { APIGatewayProxyResult } from 'aws-lambda'

export class HttpResponse implements APIGatewayProxyResult {
  static readonly EMPTY_204 = new HttpResponse('', HttpStatusCode.NO_CONTENT)

  body: string

  /**
   * A map of response header keys and their respective values.
   */
  headers: Record<string, string>

  /**
   * The HTTP status code of the response (e.g., 200, 404).
   */
  statusCode: HttpStatusCode

  isBase64Encoded?: boolean

  static noContent() {
    return new HttpResponse('', HttpStatusCode.NO_CONTENT)
  }

  static json(data: any, statusCode: HttpStatusCode | number = HttpStatusCode.OK) {
    return new HttpResponse(JSON.stringify(data), statusCode).withContentType(ContentType.JSON)
  }

  static xml(data: string, statusCode: HttpStatusCode | number = HttpStatusCode.OK) {
    return new HttpResponse(data, statusCode).withContentType(ContentType.XML)
  }

  static txt(plainText: string, statusCode: HttpStatusCode | number = HttpStatusCode.OK) {
    return new HttpResponse(plainText, statusCode).withContentType(ContentType.TXT)
  }

  static binary(
    buffer: Buffer,
    contentType: string | ContentType,
    statusCode: HttpStatusCode | number = HttpStatusCode.OK,
  ) {
    return new HttpResponse(buffer.toString('base64'), statusCode).withBase64EncodedBody().withContentType(contentType)
  }

  /** TXT response with code {@link HttpStatusCode.UNAUTHORIZED} */
  static unauthorized(body: string) {
    return HttpResponse.txt(body, HttpStatusCode.UNAUTHORIZED)
  }

  /** TXT response with default code {@link HttpStatusCode.BAD_REQUEST} */
  static badRequest(body: string) {
    return HttpResponse.txt(body, HttpStatusCode.BAD_REQUEST)
  }

  /** JSON response with default code {@link HttpStatusCode.INTERNAL_SERVER_ERROR} */
  static serverError(data: any, statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR) {
    return HttpResponse.json(data, statusCode)
  }

  /** JSON response with default code {@link HttpStatusCode.BAD_REQUEST} */
  static clientError(data: any, statusCode = HttpStatusCode.BAD_REQUEST) {
    return HttpResponse.json(data, statusCode)
  }

  constructor(body: string, statusCode: HttpStatusCode | number) {
    this.body = body
    this.statusCode = statusCode
    this.headers = {}
  }

  addHeader(key: string, val: string): this {
    this.headers[key] = val
    return this
  }

  withCors(
    origin = '*',
    options?: {
      allowCredentials?: boolean
      allowedMethods?: HttpMethod[]
      allowedHeaders?: string[]
      exposeHeaders?: string[]
      maxAge?: number
    },
  ): this {
    this.headers[CorsHeader.ALLOW_ORIGIN] = origin
    // if origin isn't static we should ad the vary header
    if (origin !== '*') {
      this.headers[CommonHttpHeader.VARY] =
        this.headers[CommonHttpHeader.VARY]?.concat(` ,${CommonHttpHeader.ORIGIN}`) ?? CommonHttpHeader.ORIGIN
    }

    if (options) {
      if (options.allowCredentials) {
        this.headers[CorsHeader.ALLOW_CREDENTIALS] = options.allowCredentials.toString()
      }
      // should be present on OPTIONS preflight responses only
      if (options.allowedMethods && options.allowedMethods.length !== 0) {
        this.headers[CorsHeader.ALLOW_METHODS] = options.allowedMethods.join(', ')
      }
      if (options.allowedHeaders && options.allowedHeaders.length !== 0) {
        this.headers[CorsHeader.ALLOW_HEADERS] = options.allowedHeaders.join(', ')
      }
      if (options.exposeHeaders && options.exposeHeaders.length !== 0) {
        this.headers[CorsHeader.EXPOSE_HEADERS] = options.exposeHeaders.join(', ')
      }
      if (options.maxAge !== undefined) {
        this.headers[CorsHeader.MAX_AGE] = options.maxAge.toString(10)
      }
    }
    return this
  }

  withContentType(type: string | ContentType): this {
    this.headers[CommonHttpHeader.CONTENT_TYPE] = type
    return this
  }

  // not complete see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
  withCacheControl(
    maxAge: number,
    sMaxAge: number,
    cacheability: Array<'public' | 'private' | 'no-store'> = [],
    rules: Array<'must-revalidate' | 'proxy-revalidate' | 'immutable'> = [],
  ): this {
    const headerStrings = [`max-age=${maxAge}`, `s-maxage=${sMaxAge}`, ...cacheability, ...rules]
    this.headers[CommonHttpHeader.CACHE_CONTROL] = headerStrings.join(', ')
    return this
  }

  withBase64EncodedBody(): this {
    this.isBase64Encoded = true
    return this
  }
}

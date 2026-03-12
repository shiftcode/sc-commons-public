type Value = { value: string } | { value: string; multiValue: Array<{ value: string }> }

// created based on https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-viewer
export interface CloudFrontFunctionEvent {
  version: '1.0'
  context: {
    /**
     * The CloudFront domain name (for example, d111111abcdef8.cloudfront.net) of the distribution that's associated with the event.
     */
    distributionDomainName: string

    /**
     * The ID of the distribution(for example, EDFDVBD6EXAMPLE) that's associated with the event.
     */
    distributionId: string

    /**
     * The event type, either viewer-request or viewer-response.
     */
    eventType: string

    /**
     * A string that uniquely identifies a CloudFront request(and its associated response).
     */
    requestId: string
  }
  viewer: {
    ip: string
  }
  request: {
    /**
     * HTTP method of the request
     */
    method: string
    /**
     * The relative path of the requested object.
     */
    uri: string
    /**
     * An object that represents the query string in the request. If the request doesn't include a query string,
     * the request object still includes an empty querystring object.
     *
     * The querystring object contains one field for each query string parameter in the request.
     */
    querystring: Record<string, Value | undefined>
    /**
     *  An object that represents the HTTP headers in the request. If the request contains any Cookie headers, those
     *  headers are not part of the headers object. Cookies are represented separately in the cookies object.
     *
     * The headers object contains one field for each header in the request. Header names are converted to lowercase
     * in the event object, and header names must be lowercase when they're added by your function code.
     * When CloudFront Functions converts the event object back into an HTTP request, the first letter of each word
     * in header names is capitalized. Words are separated by a hyphen (-). For example, if your function code adds
     * a header named example-header-name, CloudFront converts this to Example-Header-Name in the HTTP request.
     */
    headers: Record<string, Value | undefined>
    /**
     * An object that represents the cookies in the request (Cookie headers).
     *
     * The cookies object contains one field for each cookie in the request.
     */
    cookies: Record<string, Value | undefined>
  }
}

export interface CloudFrontFunctionHandler {
  (
    event: CloudFrontFunctionEvent,
  ):
    | CloudFrontFunctionEvent['request']
    | { statusCode: number; statusDescription?: string; headers?: Record<string, Value> }
}

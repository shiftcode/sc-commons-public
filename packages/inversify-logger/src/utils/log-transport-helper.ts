import { LogTransport } from '@shiftcode/logger'
import { Container } from 'inversify'

/**
 * A helper function to bind log transports to the container with the provided configuration.
 *
 * @param container - The Inversify container.
 * @param transportConfig - The configuration for the transport.
 * @param transportClass - The transport class to bind (e.g., NodeConsoleLogTransport).
 */
export function bindLogTransport<T extends LogTransport, C extends { new (config: any): T }>(
  container: Container,
  transportConfig: ConstructorParameters<C>[0],
  transportClass: C,
): void {
  // Create the transport instance using the provided config
  const transportInstance = new transportClass(transportConfig)

  // Bind the transport instance to the container (hardcoded LogTransport as the service identifier)
  container.bind<LogTransport>(LogTransport).toConstantValue(transportInstance)
}

// tslint:disable:no-console
import { execSync } from 'node:child_process'

/**
 * executes a command using child_process
 * defining 'inherit' as stdio, which prints to the console and ignores the output
 */
export function exec(command: string): void {
  console.log(`>>> ${command}`)
  execSync(command, { encoding: 'utf8', stdio: 'inherit' })
}

/**
 * executes a command using child_process and returns the output
 */
export function execReturn(command: string): string {
  console.log(`>>> ${command}`)
  return execSync(command, { encoding: 'utf8' }).trim()
}

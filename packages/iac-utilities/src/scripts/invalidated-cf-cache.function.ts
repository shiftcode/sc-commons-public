import { promisify } from 'node:util'

import { CloudFrontClient, CreateInvalidationCommand, GetInvalidationCommand } from '@aws-sdk/client-cloudfront'

import { readFromStackOutput } from './script-utils.js'

const sleep = promisify(setTimeout)
const client = new CloudFrontClient({})

export interface InvalidatedCfCacheOptions {
  outputs: string
  key: string
  wait: boolean
  items: string[]
}

export async function invalidateCfCache(options: InvalidatedCfCacheOptions | Promise<InvalidatedCfCacheOptions>) {
  const opts = await options
  const distributionId = await readFromStackOutput(opts.outputs, opts.key)

  const createInvCmd = new CreateInvalidationCommand({
    DistributionId: distributionId,
    InvalidationBatch: {
      CallerReference: `ci:invalidate-cf-cache-${Date.now()}`,
      Paths: {
        Quantity: opts.items.length,
        Items: opts.items,
      },
    },
  })
  const response = await client.send(createInvCmd)

  if (!response.Invalidation?.Id) {
    throw new Error(`Failed creating Invalidation on ${distributionId}`)
  }

  if (opts.wait) {
    await waitUntilDone(distributionId, response.Invalidation.Id)
    return `successfully invalidated the Distribution ${distributionId}`
  } else {
    return `successfully sent invalidationRequest to Distribution ${distributionId}`
  }
}

async function waitUntilDone(distributionId: string, invalidationId: string, timeout = 1_000): Promise<void> {
  await sleep(timeout)

  const getInvCmd = new GetInvalidationCommand({
    DistributionId: distributionId,
    Id: invalidationId,
  })

  const response = await client.send(getInvCmd)

  if (!response.Invalidation) {
    throw new Error(`Could not get Invalidation ${invalidationId} from Distribution ${distributionId}`)
  }
  console.log(`Status ${invalidationId}: ${response.Invalidation.Status}`)

  if (response.Invalidation.Status !== 'Completed') {
    await waitUntilDone(distributionId, invalidationId, timeout)
  }
}

/**
 * Execute a batch of tasks in parallel with a given limit.
 */
export async function* batchTasks(
  tasks: Array<() => Promise<any>>,
  limit: number,
): AsyncGenerator<Array<PromiseSettledResult<void>>> {
  for (let i = 0; i < tasks.length; i = i + limit) {
    const tasksChunk = tasks.slice(i, i + limit)
    yield await Promise.allSettled(tasksChunk.map((task) => task()))
  }
}

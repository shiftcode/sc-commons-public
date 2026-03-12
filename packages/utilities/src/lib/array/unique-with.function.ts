/**
 * Returns a new array with unique elements based on a comparison function.
 * The comparison function needs to return true if two items are considered equal.
 * @hint providing a fn that always returns true will keep only the first item, while a fn that always returns false will remove all items.
 */
export function uniqueWith<T>(array: T[], compareFn: (a: T, b: T) => boolean): T[] {
  return array.filter(
    // keep the items, where the index of the first occurrence of an item that matches the current item is the same as the current index
    (item, index, self) => index === self.findIndex((other) => compareFn(item, other)),
  )
}

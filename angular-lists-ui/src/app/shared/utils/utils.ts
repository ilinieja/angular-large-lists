/**
 * Removes duplicates from array comparing by the field provided.
 * Does not mutate original array.
 */
export function removeDuplicatesByField<T>(
  items: T[],
  fieldName: keyof T
): T[] {
  return items.filter(
    (item, index, array) =>
      index ===
      array.findIndex((foundItem) => foundItem[fieldName] === item[fieldName])
  );
}

/**
 * Sorts array comparing by the field provided using the comparator provided.
 * Does not mutate original array.
 */
export function sortByField<T>(
  items: T[],
  comparator: (a: T, b: T) => number
): T[] {
  return items.slice().sort((itemA, itemB) => comparator(itemA, itemB));
}

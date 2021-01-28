/**
 * Iterates over each object in `data` to look for all unique values of `property`.
 * @param data an array of objects with the same properties
 * @param property the property in the objects of `data` which will be looked up
 * @returns an array of unique values derived from all the values of `property`
 */
export function getUniqueValues(data, property) {
  return Array.from(new Set(data.map(d => d[property])));
}
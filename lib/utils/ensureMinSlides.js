export function ensureMinSlides(items, min = 6) {
  if (!items.length) return items;
  const result = [...items];
  while (result.length < min) result.push(...items);
  return result;
}

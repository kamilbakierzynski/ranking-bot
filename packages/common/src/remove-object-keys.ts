export const removeObjectKeys = (
  object: Record<string | number | symbol, unknown>,
  keysToRemove: string[]
): Record<string | number | symbol, unknown> =>
  Object.entries(object).reduce((acc, entry) => {
    const [key, value] = entry;
    if (keysToRemove.includes(key)) {
      return acc;
    }
    return { ...acc, [key]: value };
  }, {});

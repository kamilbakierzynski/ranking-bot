import { removeObjectKeys } from "./remove-object-keys";

export const removeMongoFields = (
  object: Record<string | number | symbol, unknown>,
  additionalKeysToRemove: string[] = []
): Record<string | number | symbol, unknown> => {
  const keysToRemove = ["__v", "_id", ...additionalKeysToRemove];
  return removeObjectKeys(object, keysToRemove);
};

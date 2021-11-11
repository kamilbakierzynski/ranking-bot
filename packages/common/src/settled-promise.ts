export const isPromiseFulfilled = <T>(
  promise: PromiseSettledResult<T>
): promise is PromiseFulfilledResult<T> => promise.status === "fulfilled";

export const isPromiseRejected = <T>(
  promise: PromiseSettledResult<T>
): promise is PromiseRejectedResult => promise.status === "rejected";

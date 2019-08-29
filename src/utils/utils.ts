export function isSomething<T>(x: T | undefined | null): x is NonNullable<T> {
  return x != null;
}

export function getPastDays(editTime: number, moreThen?: number): number {
  const currentTime = new Date().getTime();

  const diffTime = Math.abs(currentTime - editTime);
  const diffDays = Math.floor(diffTime / (8.64e+7));

  if (!moreThen) {
      return diffDays;
  }

  const result = moreThen - diffDays;

  return result > 0 ? result : 0;
}
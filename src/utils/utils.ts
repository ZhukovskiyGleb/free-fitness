enum Delimiter {
    Day = 8.64e+7,
    Hour = 3.6e+6,
}

function getDiffTime(fromTime: number, delimiter: Delimiter): number {
    const currentTime = new Date().getTime();
    const diffTime = Math.abs(currentTime - fromTime);

    return Math.floor(diffTime / (delimiter));
}

export function getDaysPast(fromTime: number, moreThen?: number): number {
  const diffDays = getDiffTime(fromTime, Delimiter.Day);

  if (!moreThen) {
      return diffDays;
  }

  const result = moreThen - diffDays;

  return result > 0 ? result : 0;
}

export function getHoursPast(fromTime: number, moreThen?: number): number {
  const diffHours = getDiffTime(fromTime, Delimiter.Day);

  if (!moreThen) {
    return diffHours;
  }

  const result = moreThen - diffHours;

  return result > 0 ? result : 0;
}

export function isSomething<T>(x: T | undefined | null): x is NonNullable<T> {
  return x != null;
}

export function log(...args: any[]) {
    console.log(...args);
}
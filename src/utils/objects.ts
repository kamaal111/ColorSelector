export function dropEmpty<T extends Record<string, any | null | undefined>>(
  object: T
) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }

    return { ...acc, [key]: value };
  }, {} as Record<string, NonNullable<T[keyof T]>>);
}

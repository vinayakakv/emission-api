export const pickKeys = (record: Record<string, number>, keys: string[]) =>
  Object.fromEntries(
    Object.entries(record).filter(([key]) => keys.includes(key))
  );

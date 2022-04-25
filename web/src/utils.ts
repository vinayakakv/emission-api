export const range = (startInclusive: number, endExclusive: number) => {
  const length = endExclusive - startInclusive;
  return [...Array(length).keys()].map(element => startInclusive + element);
};

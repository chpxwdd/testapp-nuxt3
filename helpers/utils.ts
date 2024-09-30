export const formatNumberWithSpaces = (number: Number) => {
  return number?.toLocaleString("en-US").replace(/,/g, " ");
};

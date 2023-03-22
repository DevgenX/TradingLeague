export const convert = (value = 0) => {
  if (value >= 1000) value = value / 1000 + "K";
  else if (value >= 1000000) value = value / 1000 + "M";

  return value;
};

export default {
  convert,
};

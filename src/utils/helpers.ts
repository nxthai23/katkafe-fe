export const waitForSeconds = async (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const ordinalSuffix = (value: number) => {
  let suffix = ["th", "st", "nd", "rd"],
    v = value % 100;
  return value + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
};

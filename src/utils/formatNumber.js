const formatNumber = (number, decimals = 0, decimalSeparator = ".", thousandSeparator = ",") => {
  if (isNaN(number)) return "";

  const fixed = decimals >= 0 ? number.toFixed(decimals) : number.toString();
  const [integerPart, decimalPart] = fixed.split(".");
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  const formattedDecimalPart = decimals > 0 ? `${decimalSeparator}${decimalPart || "".padEnd(decimals, "0")}` : "";

  return `${formattedIntegerPart}${formattedDecimalPart}`;
};

export default formatNumber;

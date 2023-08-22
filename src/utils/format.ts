export type FormatOptions = {
  value: string | number;
  decimals?: boolean;
  removeCurrencySign?: boolean;
};

export const numberFormat = ({
  value,
  decimals,
  removeCurrencySign,
}: FormatOptions) =>
  Intl.NumberFormat('en-EN', {
    style: removeCurrencySign ? undefined : 'currency',
    currency: removeCurrencySign ? undefined : 'USD',
    maximumFractionDigits: decimals ? undefined : 0,
    minimumFractionDigits: decimals ? undefined : 0,
  }).format(value as number);

export const capitalizeString = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const capitaliseFirstLetter = (value?: string | null) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

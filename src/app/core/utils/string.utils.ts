export const replaceSpaceAndConvertToLowerCase = (text: string): string => {
  return text.split(' ').join('_').split('-').join('_').toLowerCase();
};

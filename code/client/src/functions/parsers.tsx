export const listSummary = (textInput: string) => {
  if (!textInput) {
    return [];
  }
  return String(textInput)
    .match(/• (.*?)\n/g)
    .map((bullet) => bullet.replace(/• /, '').trim());
};

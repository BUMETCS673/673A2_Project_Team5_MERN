export const listSummary = (textInput: string) => {
  console.log('textInput', textInput);

  if (!textInput) {
    return [];
  }
  return String(textInput)
    .match(/• (.*?)\n/g)
    .map((bullet) => bullet.replace(/• /, '').trim());
};

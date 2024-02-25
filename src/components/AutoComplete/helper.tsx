import { OPTION } from "./types";

const matcher = (option: OPTION, input: string) =>
  option?.value.toLowerCase().includes(input.toLowerCase());

export const highlightText = (text: string, searchText: string) => {
  const regex = new RegExp(searchText, "gi");
  text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, "");
  return text.replace(regex, '<mark class="highlight">$&</mark>');
};

export const getFilterSearchResults = async (
  textInput: string,
  options: OPTION[] | null
): Promise<OPTION[]> => {
  const availableOptions = textInput ? options ?? [] : [];

  const results = availableOptions
    .filter((availableOption) => matcher(availableOption, textInput))
    .map(
      (v): OPTION => ({ id: v.id, value: highlightText(v.value, textInput) })
    );

  // mimicing an async operation
  const TIMEOUT = 300;
  return new Promise((resolve) => setTimeout(() => resolve(results), TIMEOUT));
};

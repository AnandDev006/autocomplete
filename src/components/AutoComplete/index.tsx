import * as React from "react";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";
import { OPTION } from "./types";
import { getFilterSearchResults } from "./helper";

import "./autoComplete.css";

type AutoCompleteProps = {
  options: OPTION[] | null;
};

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const [searchResults, setSearchResults] = React.useState<OPTION[]>();
  const [selectedRowIdx, setSelectedRowIdx] = React.useState(-1);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!searchResults) return;

    if (e.code === "ArrowUp") {
      setSelectedRowIdx((idx) =>
        [-1, 0].includes(idx) ? searchResults.length - 1 : idx - 1
      );
    } else if (e.code === "ArrowDown") {
      setSelectedRowIdx((idx) =>
        idx === searchResults.length - 1 ? 0 : idx + 1
      );
    }
  };

  const updateSearchResults = async (textInput: string) => {
    setSearchResults([]);
    const results: OPTION[] = await getFilterSearchResults(
      textInput,
      props.options
    );
    setSearchResults(results);
    setSelectedRowIdx(-1);
  };

  return (
    <div className="autocomplete-container">
      <SearchBar updateSearchResults={updateSearchResults} onKeyUp={onKeyUp} />
      {searchResults && searchResults.length > 0 ? (
        <SearchResultsList
          searchResults={searchResults}
          selectedRowIdx={selectedRowIdx}
        />
      ) : null}
    </div>
  );
};

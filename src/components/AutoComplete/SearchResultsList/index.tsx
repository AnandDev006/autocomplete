import * as React from "react";
import { OPTION } from "../types";

import { SearchResult } from "../SearchResult";
import "./searchResultsList.css";

type SearchResultsProps = {
  searchResults: OPTION[];
  selectedRowIdx: number;
};

export const SearchResultsList: React.FC<SearchResultsProps> = (props) => {
  return (
    <div className="search-result-list-container">
      {props.searchResults.map((result, idx) => (
        <SearchResult
          key={result.id}
          result={result.value}
          isHighlighted={idx === props.selectedRowIdx}
        />
      ))}
    </div>
  );
};

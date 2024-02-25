import * as React from "react";
import "./searchResult.css";

type SearchResultProps = {
  result: string;
  isHighlighted: boolean;
};

export const SearchResult: React.FC<SearchResultProps> = ({
  result,
  isHighlighted,
}) => {
  return (
    <div
      className={`search-result-container ${isHighlighted ? "active" : ""}`}
      dangerouslySetInnerHTML={{ __html: result }}
    />
  );
};

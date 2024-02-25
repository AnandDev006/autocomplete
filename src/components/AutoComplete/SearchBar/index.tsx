import * as React from "react";

import "./searchBar.css";
import { useDebounce } from "../../../hooks/useDebounce";

type SearchBarProps = {
  updateSearchResults: (textInput: string) => Promise<void>;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [input, setInput] = React.useState("");

  const updateSearchResults = useDebounce(props.updateSearchResults, 200);

  const updateInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInput(input);
    updateSearchResults(input);
  };

  return (
    <div className="search-container">
      <input
        placeholder="Type to search"
        value={input}
        onChange={updateInput}
        onKeyUp={props.onKeyUp}
      />
    </div>
  );
};

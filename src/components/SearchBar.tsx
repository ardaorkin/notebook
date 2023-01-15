import { Input } from "antd";
import { SearchBarProps } from "../types";
import { memo } from "react";

function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Input.Search
      placeholder="Search for notes..."
      onChange={(event) => onSearch(event.target.value)}
      style={{ width: 200 }}
    />
  );
}

export default memo(SearchBar);

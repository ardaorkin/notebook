import { Input } from "antd";
import { ISearchBarProps } from "../types";

export default function SearchBar({ onSearch }: ISearchBarProps) {
  return (
    <Input.Search
      placeholder="Search for notes..."
      onChange={(event) => onSearch(event.target.value)}
      style={{ width: 200, marginLeft: 5 }}
    />
  );
}

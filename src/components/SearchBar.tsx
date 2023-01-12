import { Input } from "antd";
import { SearchBarProps } from "../types";

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Input.Search
      placeholder="Search for notes..."
      onChange={(event) => onSearch(event.target.value)}
      style={{ width: 200 }}
    />
  );
}

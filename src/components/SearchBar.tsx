import { Input } from "antd";
import { SearchBarProps } from "../types";
import { memo } from "react";
import { SearchOutlined } from "@ant-design/icons";

function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Input
      suffix={<SearchOutlined />}
      placeholder="Search for notes..."
      onChange={(event) => onSearch(event.target.value)}
    />
  );
}

export default memo(SearchBar);

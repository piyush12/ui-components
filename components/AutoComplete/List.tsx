import { memo } from "react";

function List({ item, ...rest }) {
  return <li {...rest}>{item}</li>;
}

export default memo(List);

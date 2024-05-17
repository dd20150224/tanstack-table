import { Header, HeaderGroup } from "@tanstack/react-table";
import { IKeyValue } from "~/config/types";
import TableHeaderRowCell from "./tableHeaderRowCell";

interface Props {
  headerRow: HeaderGroup<any>;
}

export default function TableHeaderRow({ headerRow }: Props) {
  return (
    <tr key={headerRow.id} className="z-10">
      {headerRow.headers.map((column: Header<IKeyValue, unknown>) => {
        return (
          <TableHeaderRowCell header={column} key={column.id} />
        )
      })}
    </tr>
  );
}

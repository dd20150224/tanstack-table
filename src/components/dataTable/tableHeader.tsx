import { HeaderGroup } from "@tanstack/react-table";
import TableHeaderRow from "./tableHeaderRow";

interface Props {
  headerGroups: HeaderGroup<any>[];
}

export default function TableHeader({ headerGroups }: Props) {
  
  return (
    <thead>
      {headerGroups.map((headerRow: HeaderGroup<any>) => {
        return (
          <TableHeaderRow key={headerRow.id} headerRow={headerRow}/>
        )
      })}
    </thead>
  )
}
import { ColumnDef } from "@tanstack/react-table"
import { IKeyValue, ITablePagination } from '~/config/types';

export const indexColumnDef = (): ColumnDef<IKeyValue> => {
  return {
    id: 'rowNo',
    header: () => <div className="text-center">#</div>,
    size: 50,
    enablePinning: true,
    cell: ({ row, table, column }) => {
      const pagination = table.options.state.pagination as ITablePagination
      const pageIndex = pagination.pageIndex
      const pageSize = pagination.pageSize
      console.log('indexColumn column: ' + (column ? 'yes' : 'no'));
      return (
        <div className="px-1 text-center bg-white w-full h-full place-content-center">
          {pageIndex * pageSize + row.index + 1}
        </div>
      )
    },
  }
}

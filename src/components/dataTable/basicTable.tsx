import { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import { PERSONS } from '../data/persons';
import { columnDef } from '../config/columns';
import './table.css';

export default function BasicTable() {

  const [columns] = useState<ColumnDef<any>[]>(columnDef);

  const data = useMemo( () => PERSONS, [] );


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  console.log('test: ', table.getHeaderGroups());
  return (
    <table className="tanstack-table" style={{ width: '100%' }}>
      <thead>
        {table.getHeaderGroups().map((headerEl) => (
          <tr key={headerEl.id}>
            {headerEl.headers.map((columnEl) => (
              <th key={columnEl.id}>
                {flexRender(
                  columnEl.column.columnDef.header,
                  columnEl.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((rowEl) => {
          return (
            <tr key={rowEl.id}>
              {rowEl.getVisibleCells().map((cellEl) => {
                return (
                  <td key={cellEl.id}>
                    {flexRender(
                      cellEl.column.columnDef.cell,
                      cellEl.getContext()
                    )}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
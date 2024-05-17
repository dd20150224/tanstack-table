import { ColumnDef } from '@tanstack/react-table';
import { HTMLProps, useEffect, useRef } from 'react';
import { IKeyValue } from '~/config/types';

export const selectionColumnDef = (): ColumnDef<IKeyValue> => {
  return {
    id: 'select',
    enablePinning: true,
    size: 50,
    // header: ({ table, column }) => (
    header: ({ table }) => (
      <div className="p-0 text-center flex flex-col w-full h-full">
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      </div>
    ),
    // cell: ({ row, column }) => (
    cell: ({ row }) => (
      <div className="p-0 text-center flex flex-row items-center justify-center  w-full bg-white h-full">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  }
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' scale-150 cursor-pointer'}
      {...rest}
    />
  )
}
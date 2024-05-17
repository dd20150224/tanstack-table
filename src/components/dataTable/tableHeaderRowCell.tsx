import { flexRender, Header } from "@tanstack/react-table";
import { IKeyValue } from "~/config/types";
import { cn } from "~/lib/utils";
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
// import { useMemo } from "react";

interface Props {
  header: Header<IKeyValue, unknown>;
}

export default function TableHeaderRowCell({ header }: Props) {

  const headerTitleStyles = cn(
    'relative',
    'group',
    'flex',
    'flex-row',
    'justify-center',
    'items-center',
    'gap-2',
    header.column.getCanSort() ? 'cursor-pointer select-none' : ''
  );

  const sorted = header.column.getIsSorted();

  return (
    <th
      key={header.id}
      colSpan={header.colSpan}
      className="cursor-pointer sticky z-10"
      onClick={header.column.getToggleSortingHandler()}
    >
      <div className="overflow-hidden">
        {header.isPlaceholder ? null : (
          <div className="flex flex-col justify-center w-full h-full">
            <div
              className={headerTitleStyles}
              onClick={header.column.getToggleSortingHandler()}
            >
              <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
              {header.column.getCanSort() && (
                // columnDef.enableSorting && (
                <div className="left-full h-[24px] flex flex-col justify-center items-center">
                  <AiFillCaretUp
                    className={`${
                      sorted === 'asc' ? 'text-primary-foreground' : 'text-primary-foreground/30'
                    } min-w-4 min-h-4 mb-[-3px]`}
                  />
                  <AiFillCaretDown
                    className={`${
                      sorted === 'desc' ? 'text-primary-foreground' : 'text-primary-foreground/30'
                    } min-w-4 min-h-4 mt-[-3px]`}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </th>
  )
}
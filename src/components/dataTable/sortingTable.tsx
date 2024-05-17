import React, { useCallback, useEffect, useState } from 'react'
import './table.css'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  // getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import { sortingColumnDef } from '../../config/columns'
import dataJSON from '../../data/data.json';
import { IGetDataPayload, useTableData } from '~/hooks/useTableData'
import { ITableConfig } from '~/data/types'
import { IPagination } from '~/config/types';

interface ISortTableProps {
  tableConfig: ITableConfig
}
const SortingTable = ({
  tableConfig
}: ISortTableProps) => {
  const { getData } = useTableData(tableConfig);
  const [finalData, setFinalData] = useState<any[]>([])
  // const finalData = React.useMemo(() => dataJSON, [])
  const finalColumnDef = React.useMemo(() => sortingColumnDef, [])

  const [search, setSearch ] = useState<string>('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filter, setFilter] = React.useState<ColumnFiltersState>([]);
  // const [ criteria, setCriteria ] = useState<IGetDataPayload>({
  //   pageIndex: 0, 
  //   pageSize: 20,
  //   sorting: [],
  //   filter: [],
  //   search: '',
  // })
  const [ pagination, setPagination ] = useState<IPagination>({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    console.log('useEffect [ sorting ]: ' + (sorting ? 'yes' : 'no'));
  }, [sorting]);

  useEffect(() => {
    console.log('useEffect [ filter ]: ' + (filter ? 'yes' : 'no'))
  }, [filter])

  useEffect(() => {
    console.log('useEffect [ search ]: ' + (search ? 'yes' : 'no'))
  }, [search])

  useEffect(() => {
    console.log('useEffect [ pagination ]: ' + (pagination ? 'yes' : 'no'))
  }, [pagination])


  console.log('sortingTable - useEffect')
  useEffect(() => {
    const fetch = async() => {
      console.log('fetch');
      const payload: IGetDataPayload = {
        ...pagination,
        sorting,
        filter,
        search,
      }
      const fetchedData = await getData(payload);
      setFinalData(fetchedData);
    }
    fetch();
  }, [getData, sorting, pagination, filter, search])

  const onSortingHandler = useCallback( (updatedSorting: any) => {
    console.log('onSortingHandler: updatedSorting: ', updatedSorting)
    // const updated = updatedSorting(sorting)
    // if (updated.length > 0) {
    //   const sortItem = updated[0]
    //   console.log('updated: ', JSON.stringify(updated, null, 2))
    //   const clonedData = [...dataJSON]
    //   const sortedData = clonedData.sort((data1, data2) => {
    //     const key = sortItem.id as keyof typeof data1
    //     let swap = 0
    //     if (key && data1[key] && data2[key]) {
    //       if (data1[key] > data2[key]) {
    //         swap = 1
    //       } else if (data1[key] < data2[key]) {
    //         swap = -1
    //       }
    //     }
    //     if (sortItem.desc) swap = -swap
    //     return swap
    //   })
    //   console.log('sorted => setFinalData')
    //   setFinalData(() => [...sortedData])
    // } else {
    //   setFinalData(() => [...dataJSON])
    // }
    setSorting(updatedSorting)
  }, []);

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
    manualSorting: true,
    state: {
      sorting,
    },
    onSortingChange: onSortingHandler,
  })

  //   console.log("test", tableInstance.getHeaderGroups());

  console.log('sortingTable - render')
  return (
    <div className="p-2 w-full h-full flex flex-col bg-red-400">
      <div className="flex flex-col items-center w-full grow-0">
        <div 
          className="p-2 w-[480px] my-1 mx-0 inline-block text-left h-[200px]"
          style={{backgroundColor: 'paleturquoise'}}
        >
          <pre>{JSON.stringify(sorting, null, 2)}</pre>
          <div>#1: {finalData[0]?.first_name}</div>
          <div>#2: {finalData[1]?.first_name}</div>
        </div>
      </div>
      <div className="grow w-full bg-green-500 p-1 flex flex-col">
        <div className="h-0 min-h-full w-full overflow-x-scroll overflow-y-scroll">
          <table className="tanstack-table grow w-full">
            <thead>
              {tableInstance.getHeaderGroups().map((header) => {
                return (
                  <tr key={header.id}>
                    {header.headers.map((column) => {
                      return (
                        <th
                          key={column.id}
                          colSpan={column.colSpan}
                          style={{ cursor: 'pointer' }}
                          onClick={column.column.getToggleSortingHandler()}
                        >
                          {column.isPlaceholder
                            ? null
                            : flexRender(
                                column.column.columnDef.header,
                                column.getContext()
                              )}
                          {/* CODE FOR UP AND DOWN SORTING */}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[column.column.getIsSorted() as string] ?? null}
                        </th>
                      )
                    })}
                  </tr>
                )
              })}
            </thead>
            <tbody>
              {tableInstance.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SortingTable;

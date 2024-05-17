import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import './table.css'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  // getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
// import { columnDefs } from '../../config/columns'
// import dataJSON from '~/data/data.json';
import { IGetDataPayload, useTableData } from '~/hooks/useTableData'
import { ITableConfig, IPagination } from '~/config/types';
import TableHeader from './tableHeader'
import * as RENDERERS from './cellRenderers'
import { sortingColumnDef } from '~/config/columns';

interface ISortTableProps {
  tableConfig: ITableConfig
}
const SortingTable = ({
  tableConfig
}: ISortTableProps) => {
  const rerender = useReducer(() => ({}), {})[1]
  // const { getData } = useTableData(tableConfig, RENDERERS);
  const { getData, columnDefs } = useTableData(tableConfig, RENDERERS);

  /// issue:
  // if remark out the "cell" property of columndef, sorting is ok
  // otherwise, sorting not working



  // console.log('dataColumnDefs: ', dataColumnDefs);
  const [finalData, setFinalData] = useState<any[]>([])
  // const finalData = React.useMemo(() => dataJSON, [])
  // const columnDefs = useMemo(() => sortingColumnDef, [])

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

  // useEffect(() => {
  //   console.log('useEffect [ sorting ]: ' + (sorting ? 'yes' : 'no'));
  // }, [sorting]);

  // useEffect(() => {
  //   console.log('useEffect [ filter ]: ' + (filter ? 'yes' : 'no'))
  // }, [filter])

  // useEffect(() => {
  //   console.log('useEffect [ search ]: ' + (search ? 'yes' : 'no'))
  // }, [search])

  // useEffect(() => {
  //   console.log('useEffect [ pagination ]: ' + (pagination ? 'yes' : 'no'))
  // }, [pagination])


  // console.log('sortingTable - useEffect')
  useEffect(() => {
    const fetch = async() => {
      const payload: IGetDataPayload = {
        ...pagination,
        sorting,
        filter,
        search,
      }
      const fetchedData = await getData(payload);
      console.log('sortingTable fetchedData: ', fetchedData);
      setFinalData([...fetchedData]);
      rerender();
    }
    fetch();
  }, [getData, sorting, pagination, filter, search])

  const onSortingHandler = useCallback( (updatedSorting: any) => {
    // console.log('onSortingHandler: updatedSorting: ', updatedSorting)   
    setSorting(updatedSorting)
  }, []);

  const tableInstance = useReactTable({
    columns: columnDefs,
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
      <div className="flex flex-col items-start w-full grow-0">
        <div className="mb-1 text-3xl">Sorting Table</div>
        {/* {JSON.stringify(columnDefs)} */}
        <div
          className="p-2 w-[480px] my-1 mx-0 inline-block text-left h-[200px]"
          style={{ backgroundColor: 'paleturquoise' }}
        >
          <pre>{JSON.stringify(sorting)}</pre>
          <div className="flex flex-row">
            <div>
              #1: {finalData[0]?.firstName} :{' '}
              {tableInstance &&
                tableInstance.getRowModel() &&
                tableInstance.getRowModel().rows.length > 0 && (
                  <div>
                    {tableInstance
                      .getRowModel()
                      .rows[0].getVisibleCells()
                      .map((cell, index) => (
                        <div key={index}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      ))}
                  </div>
                )}
            </div>
            <div>
              2: {finalData[1]?.firstName} :{' '}
              {tableInstance &&
                tableInstance.getRowModel() &&
                tableInstance.getRowModel().rows.length > 0 && (
                  <div>
                    {tableInstance
                      .getRowModel()
                      .rows[1].getVisibleCells()
                      .map((cell, index) => (
                        <div key={index}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="grow w-full bg-green-500 p-1 flex flex-col">
        <div className="h-0 min-h-full w-full overflow-x-scroll overflow-y-scroll">
          <table className="tanstack-table grow w-full">
            <TableHeader headerGroups={tableInstance.getHeaderGroups()} />
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

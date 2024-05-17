import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
// import { sortingColumnDef } from '~/config/columns';
import { IKeyValue, TRenderFunc } from '~/config/types';
import { ITableConfig } from '~/config/types';
import { getColumnDefs } from '~/helpers/column.helper';

interface IDataContext {
  tableConfig?: ITableConfig;
  getData: (payload?: IGetDataPayload) => Promise<IKeyValue[]>;
}
const DataContext = createContext<IDataContext>({
  getData: () => Promise.resolve([]),
});

export interface ISort {
  key: string;
  direction: string;
}

export interface IFilter {
  key: string;
  value: string;
}

export interface IGetDataPayload {
  pageIndex: number;
  pageSize: number;
  sorting: SortingState, // ISort[],
  filter: ColumnFiltersState, // IFilter[],
  search: string;
}

interface IDataProviderProps extends PropsWithChildren {
  children: any;
  getData: (payload?: IGetDataPayload) => Promise<IKeyValue[]>;
}

export const useTableData = (tableConfig: ITableConfig, renderers: any[]) => {
  const { getData } = useContext(DataContext);
  const columnDefs: ColumnDef<IKeyValue>[] = useMemo( () => {
    return getColumnDefs({tableConfig, renderers});
  }, [tableConfig]);
  
  return {
    tableConfig,
    columnDefs,
    getData
  };
}

export const DataProvider = ({ children, getData }: IDataProviderProps) => {
  return (
    <DataContext.Provider value={{ getData }}>{children}</DataContext.Provider>
  )
}
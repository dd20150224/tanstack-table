import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { createContext, PropsWithChildren, useContext } from 'react';
import { IKeyValue } from '~/config/types';
import { ITableConfig } from '~/data/types';

interface IDataContext {
  tableConfig?: ITableConfig;
  getData: (payload?: IGetDataPayload) => Promise<IKeyValue[]>;
}
const DataContext = createContext<IDataContext>({
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

export const useTableData = (tableConfig: ITableConfig) => {
  const { getData } = useContext(DataContext);
  return {
    tableConfig,
    getData
  };
}
export const DataProvider = ({ children, getData }: IDataProviderProps) => {
  return (
    <DataContext.Provider value={{ getData }}>{children}</DataContext.Provider>
  )
}
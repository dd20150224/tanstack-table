import { type DensityState } from '~/components/dataTable/features/densityFeature';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
}

export interface IFieldConfig {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'singleSelection',
  width?: number,
  properties: IKeyValue;
  enableSorting: boolean;
}

export interface ITableConfig {
  id: string;
  name: string;
  fieldIds?: string[];
  fieldConfigs: IFieldConfig[];
  headerGroups: IHeaderGroup[];
  rowSize?: DensityState;
}

export type Person = {
  id: string;
  firstName: string
  lastName: string
  name1: string
  name2: string
  name3: string
  name4: string
  name5: string
  name6: string
  name7: string
  name8: string
  name9: string
  name10: string
  name11: string
  name12: string
  name13: string
  name14: string
  name15: string
  age: number
  visits: number
  status: string
  progress: number
}

export interface IWidgetProps {
  info: IKeyValue;
  fieldConfig: IFieldConfig;
  fieldConfigs: IFieldConfig[];
  renderers: TRenderFunc[];
}

type TFunctionType = () => void;

export interface IKeyValue {
  [key: string]: any | TFunctionType
}

export interface IAction {
  id: string;
  icon: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  color?: string;
  label: string;
  data: string;
  type: 'link' | 'command';
}

export interface IColumnExtra {
  withSelection?: boolean;
  withIndex?: boolean;
  actions?: IAction[];
}

export interface ITablePagination {
  pageIndex: number;
  pageSize: number;
}

export interface IHeaderGroup {
  id: string;
  type: 'field' | 'group';
  label?: string;
  children?: IHeaderGroup[];
}

export type TRenderFunc = (props: IWidgetProps) => React.ReactNode

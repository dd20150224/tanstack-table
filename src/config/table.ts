import { IFieldConfig, IHeaderGroup, ITableConfig } from "./types";

const fieldConfigs: IFieldConfig[] = [
  {
    id: 'firstName',
    label: 'First Name',
    type: 'text',
    width: 6,
    properties: {},
    enableSorting: true,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    type: 'text',
    width: 6,
    properties: {},
    enableSorting: true,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'text',
    width: 6,
    properties: {},
    enableSorting: true,
  },
  {
    id: 'password',
    label: 'Password',
    type: 'text',
    width: 6,
    properties: {},
    enableSorting: true,
  },
  {
    id: 'displayName',
    label: 'Display Name',
    type: 'text',
    width: 6,
    properties: {},
    enableSorting: true,
  }

];

export const tableConfigx: ITableConfig = {
  id: 'userTable',
  name: 'User Table',
  fieldConfigs,
  headerGroups: [],
  rowSize: 'md',
};

const fieldIds: string[] = [
  'firstName',
  'lastName',
  'email',
  'password',
  'displayName',
];

const headerGroups: IHeaderGroup[] = [
  {
    id: 'firstName',
    label: 'First Name',
    type: 'field',
  },
  {
    id: 'lastName',
    label: 'Last Name',
    type: 'field',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'field',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'field',
  },
  {
    id: 'displayName',
    label: 'Display Name',
    type: 'field',
  }
]

export const tableConfig: ITableConfig = {
  id: "table1",
  name: "Payment Table",
  fieldConfigs,
  fieldIds,
  headerGroups

}
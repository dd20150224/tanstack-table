import { IFieldConfig, ITableConfig } from "./types";

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

export const tableConfig: ITableConfig = {
  id: 'userTable',
  name: 'User Table',
  fieldConfigs,
  headerGroups: [],
  rowSize: 'md',
};
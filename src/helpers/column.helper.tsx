import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { IColumnExtra, IFieldConfig, IKeyValue, ITableConfig, TRenderFunc } from "~/config/types"
import { renderDataCell, renderSummaryCell } from "./render.helper"
import { indexColumnDef } from "./columnDefs/index.column-def"
import { selectionColumnDef } from "./columnDefs/selection.column-def"
import { actionsColumnDef } from "./columnDefs/actions.column-def"

interface IGetColumnDefsFromHeaderGroups {
  headerGroups: any[]
  fieldConfigs: IFieldConfig[]
  renderers: TRenderFunc[]
};

const getColumnDefsFromHeaderGroups = ({
  headerGroups=[],
  fieldConfigs=[],
  renderers=[]
}: IGetColumnDefsFromHeaderGroups) => {
  const columnHelper = createColumnHelper<IKeyValue>()

  const result: ColumnDef<IKeyValue>[] = []
  // console.log('getColumnDefsFromHeaderGroups: headerGroups: ', headerGroups);
  for (let i = 0; i < headerGroups.length; i++) {
    const loopHeaderGroup = headerGroups[i]
    // console.log(`i=${i}: loopHeaderGroup: `, loopHeaderGroup);
    if (loopHeaderGroup.type === 'field') {
      const fieldConfig = fieldConfigs.find(
        (config) => config.id === loopHeaderGroup.id
      ) as IFieldConfig
      // console.log('fieldConfig: ', fieldConfig);
      if (!fieldConfig) {
        // console.log(
        //   'getColumnDefsFromHeaderGroups fieldConfig==null: config.id = ' +
        //     loopHeaderGroup.id
        // )
      }
      console.log(
        `getColumnDefs: id=${loopHeaderGroup.id}   enableSorting=${fieldConfig.enableSorting}`
      )

      result.push(
        columnHelper.accessor(loopHeaderGroup.id, {
          id: loopHeaderGroup.id,
          header: () => <span>{fieldConfig!.label}</span>,
          cell: (props: any) => {
            // console.log('columnDef: cell: props: ', props);
            return renderDataCell({ info: props, fieldConfig, fieldConfigs, renderers });
          },
          footer: (info: any) =>
            renderSummaryCell({ info, fieldConfig, fieldConfigs, renderers }),
          enablePinning: false,
          enableResizing: true,
          enableSorting: !(fieldConfig.enableSorting === false),
        })
      )
    } else {
      // group
      const children: ColumnDef<IKeyValue>[] =
        loopHeaderGroup.children?.length > 0
          ? getColumnDefsFromHeaderGroups({
            headerGroups: loopHeaderGroup.children,
            fieldConfigs,
            renderers,
          })
          : []
      result.push({
        id: loopHeaderGroup.id,
        header: () => <span>{loopHeaderGroup.label}</span>,
        columns: children,
      })
    }
  }
  return result
}

interface IGetColumnDefsPayload {
  tableConfig: ITableConfig;
  renderers: TRenderFunc[];
  options?: IColumnExtra;
}

export const getColumnDefs = ({
  tableConfig,
  renderers=[],
  options={},
}: IGetColumnDefsPayload): ColumnDef<IKeyValue>[] => {
  console.log('getColumnDefs: tableConfig.fieldConfigs.length = ' + tableConfig.fieldConfigs.length);
  console.log('getColumnDefs: tableConfig.headerGroups.length = ' + tableConfig.headerGroups.length);
  const fieldConfigs = tableConfig.fieldConfigs
  const headerGroups = tableConfig.headerGroups
  // const fieldIds = table.fieldIds || table.fieldConfigs.map(config => config.id);

  const result: ColumnDef<IKeyValue>[] = getColumnDefsFromHeaderGroups({
    headerGroups,
    fieldConfigs,
    renderers,
})

  // row actions
  if (options?.withIndex) result.unshift(indexColumnDef())
  if (options?.withSelection) result.unshift(selectionColumnDef())
  if (options?.actions) result.push(actionsColumnDef(options?.actions))

  // console.log(`column count = ${result.length}`);
  return result
}
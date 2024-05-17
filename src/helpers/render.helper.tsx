import { capitalize } from 'lodash'
import { IWidgetProps, TRenderFunc } from "~/config/types"

export function renderDataCell(props: IWidgetProps): React.ReactNode {
  const { fieldConfig, renderers } = props
  const fieldType = `${capitalize(fieldConfig.type)}Renderer`
  const Renderer = renderers[fieldType as keyof typeof renderers] as TRenderFunc
  return (
    <div className="w-full h-full">
      <Renderer {...props} />
    </div>
  )
}

export const renderSummaryCell = (props: IWidgetProps) => {
  // console.log(
  //   'summaryCellRender: fields(' +
  //     props.fieldConfigs.length +
  //     ') fieldConfig: ',
  //   props.fieldConfig
  // )
  return <div>{props.info.column.id}</div>
}

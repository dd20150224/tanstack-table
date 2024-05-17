import { IWidgetProps } from '../types'

export default function SingleSelectionRenderer({
  info,
  fieldConfig,
  fieldConfigs,
}: IWidgetProps): React.ReactNode {
  // console.log(fieldConfig || null)
  // console.log(fieldConfigs || null)
  return <div>{info.getValue()}</div>
}

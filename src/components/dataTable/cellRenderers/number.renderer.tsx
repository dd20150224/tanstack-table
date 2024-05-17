import { IWidgetProps } from '../types'

export default function NumberRenderer({
  info,
  fieldConfig,
  fieldConfigs,
}: IWidgetProps): React.ReactNode {
  // console.log(fieldConfig || null)
  // console.log(fieldConfigs || null)
  return <div className="bg-green-500 text-right">{info.getValue()}</div>
}

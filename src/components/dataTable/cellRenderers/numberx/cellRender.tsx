import { IFieldConfig, IKeyValue } from "~/types";

interface Props {
  props: IKeyValue,
  fieldConfig: IFieldConfig,
  fieldConfigs: IFieldConfig[],
}

export default function CellRender({
  props,
  fieldConfig,
  fieldConfigs
}: Props) {
  return (
    <div>{props.getValue()}</div>
  )
}

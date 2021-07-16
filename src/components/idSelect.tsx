import { Select } from "antd"
import { Raw } from "types"

// 获取antd select组件中的所有类型
type SelectProps = React.ComponentProps<typeof Select>
// 继承antd select组件中的类型到自定义select组件中
// 使用Omit去除antd select组件中的原生类型，替换成自己定义的类型
interface IdSelectProps extends Omit<SelectProps,'options' | 'value' | 'onChange'>  {
    value: Raw | null | undefined,
    onChange: (value?:number)=>void,
    defaultOptionName?:string,
    options?:{name:string,id:number}[]
}

export const IdSelect = (props:IdSelectProps) => {
    let { value, onChange, defaultOptionName, options } = props
    return (
        <Select value={options?.length?toNumber(value):0} onChange={value => onChange(toNumber(value) || undefined)}>
            {
                defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
            }
            {
                options?.map(option => <Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>)
            }
        </Select>
    )
}

// 转换成number类型
const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)
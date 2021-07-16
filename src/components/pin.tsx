import { Rate } from "antd"

// 继承Rate组件中的所有属性类型，并拓展新的自定义属性checked，onCheckChange
interface pinProps extends React.ComponentProps<typeof Rate> {
    checked: boolean,
    onCheckChange?: (checked: boolean) => void
}

export const Pin = ({ checked, onCheckChange, ...rest }: pinProps) => {
    return (
        <Rate count={1} value={checked ? 1 : 0} onChange={value => onCheckChange?.(!!value)} {...rest}></Rate>
    )
}
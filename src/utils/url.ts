import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

// 根据指定字符串获取url中参数
export const useUrlQueryParam = <k extends string>(keys: k[]) => {

    const [searchParams, setSearchParam] = useSearchParams()
    console.log(searchParams, 'searchParams')
    return [
        // useEffect 是在 render 之后dom渲染后才执行
        // useCallback 和 useMemo
        // 相同点：
        // useCallback 和 useMemo 都是性能优化的手段，类似于类组件中的 shouldComponentUpdate，在子组件中使用 shouldComponentUpdate，
        // 判定该组件的 props 和 state 是否有变化，从而避免每次父组件render时都去重新渲染子组件。
        // 区别：
        //useCallback 不会调用传入的函数，只返回一个函数，当把它返回的这个函数作为子组件使用时，可以避免每次父组件更新时都重新渲染这个子组件，
        //useMemo 会调用传入的函数，返回函数结果，渲染期间执行,
        useMemo(
            // useMemo针对函数式组件使用
            // 当复杂类型的参数的引用地址改变时,才会重新渲染
            // 这里使用useMemo可以防止无限循环
            () => keys.reduce((prev, key) => {
                return { ...prev, [key]: searchParams.get(key) || '' }
            }, {} as { [key in k]: string }),
            [searchParams]
        ),
        (params: Partial<{ [key in k]: unknown }>) => {
            // fromEntries 把键值对列表（具有iterator可迭代属性）转换为对象
            // searchParams是原生 URLSearchParams对象，具有iterator属性
            const obj = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setSearchParam(obj)
        }
    ] as const // as const 能让数组中值保持各自最初的类型
}
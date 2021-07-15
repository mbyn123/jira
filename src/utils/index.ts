import { useState, useEffect, useRef } from 'react'

// 是否等于0
export const isFalsy = (value: unknown) => value === 0 ? false : !value

// 判断值是否为空
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 清除对象中的空值
export const cleanObject = (object: {[key:string]:unknown}) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}

// 初始化加载
export const useMount = (call: () => void) => {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        call()
    }, []);
}

// 节流方法
export const useDebounce = <V>(value:V, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay]);
    return debouncedValue
}

// 修改页面标题
export const  useDocumentTitle = (title:string,keepOnUnmount:boolean=true)=>{
    // useRef可以保存最初状态的值，不受其它影响
    const oldTile = useRef(document.title).current

    useEffect(()=>{
        document.title = title
    },[title])

    useEffect(()=>{
        return ()=>{
            if(!keepOnUnmount){
                document.title = oldTile
            }
        }
    },[oldTile,keepOnUnmount])
}

export const resetRoute = ()=> window.location.href = window.location.origin
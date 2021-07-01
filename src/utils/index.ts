import { useState, useEffect } from 'react'

// 是否等于0
export const isFalsy = (value: unknown) => value === 0 ? false : !value

// 清除对象中的空值
export const cleanObject = (object: object) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key]
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (call: () => void) => {
    useEffect(() => {
        call()
    }, []);
}

export const useDebounce = <V>(value:V, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay]);
    return debouncedValue
}
import { useCallback, useReducer, useState } from 'react';
import { useMountedRef } from 'utils';


// 使用useReducer改造useAsync
interface State<D> {
    error: Error | null,
    data: D | null,
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialstate: State<null> = {
    stat: 'idle',
    error: null,
    data: null
}

const defaultConfig = {
    throwError: false
}

// 组件挂载完成才修改state中的数据
const useSafeDispatch = <T>(dispatch:(...args:T[])=>void)=>{
    const mountedRef = useMountedRef()
    return useCallback((...args:T[])=>(mountedRef.current?dispatch(...args):void 0),[mountedRef,dispatch])
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig }
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
        ...defaultInitialstate,
        ...initialState
    })
    // 刷新，使用useState保存函数,会出现惰性初始化加载函数，所以在外面包裹一层
    const [retry, setRetry] = useState(() => () => { })

    const safeDispatch = useSafeDispatch(dispatch)

    const setData = useCallback((data: D) => safeDispatch({
        stat: 'success',
        error: null,
        data
    }), [safeDispatch])

    const setError = useCallback((error: Error) => safeDispatch({
        stat: 'error',
        error,
        data: null
    }), [safeDispatch])

    const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error('请传入Promise类型数据')
        }
        // useState具有懒性初始state的特性，一开始会执行函数，所以在外面嵌套一层函数
        // 重新执行传入的方法，刷新页面数据
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        safeDispatch(({ stat: 'loading' }))

        return promise.then(data => {  
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            // 抛出异常
            if (config.throwError)
                return Promise.reject(error)
            return error
        })
    }, [config.throwError, setData, setError,safeDispatch])

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isSuccess: state.stat === 'success',
        isError: state.stat === 'error',
        run,
        retry,
        setData,
        setError,
        ...state
    }
}







// interface State<D> {
//     error: Error | null,
//     data: D | null,
//     stat: 'idle' | 'loading' | 'error' | 'success'
// }

// const defaultInitialstate: State<null> = {
//     stat: 'idle',
//     error: null,
//     data: null
// }

// const defaultConfig = {
//     throwError: false
// }

// export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
//     const config = { ...defaultConfig, ...initialConfig }
//     const [state, setState] = useState<State<D>>({
//         ...defaultInitialstate,
//         ...initialState
//     })
//     // 刷新，使用useState保存函数,会出现惰性初始化加载函数，所以在外面包裹一层
//     const [retry, setRetry] = useState(() => () => {})

//     const mountedRef = useMountedRef()

//     const setData = useCallback((data: D) => setState({
//         stat: 'success',
//         error: null,
//         data
//     }), [])

//     const setError = useCallback((error: Error) => setState({
//         stat: 'error',
//         error,
//         data: null
//     }), [])

//     const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
//         if (!promise || !promise.then) {
//             throw new Error('请传入Promise类型数据')
//         }
//         // useState具有懒性初始state的特性，一开始会执行函数，所以在外面嵌套一层函数
//         // 重新执行传入的方法，刷新页面数据
//         setRetry(() => () => {
//             if (runConfig?.retry) {
//                 run(runConfig?.retry(), runConfig)
//             }
//         })
//         setState(prevState => ({ ...prevState, stat: 'loading' }))

//         return promise.then(data => {
//             // 组件挂载完成才修改state中的数据
//             if (mountedRef.current) {
//                 setData(data)
//                 return data
//             }
//         }).catch(error => {
//             setError(error)
//             // 抛出异常
//             if (config.throwError)
//                 return Promise.reject(error)
//             return error
//         })
//     }, [config.throwError, mountedRef, setData, setError])

//     return {
//         isIdle: state.stat === 'idle',
//         isLoading: state.stat === 'loading',
//         isSuccess: state.stat === 'success',
//         isError: state.stat === 'error',
//         run,
//         retry,
//         setData,
//         setError,
//         ...state
//     }
// }
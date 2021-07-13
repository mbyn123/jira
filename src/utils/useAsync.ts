import { useState } from 'react';

interface State<D> {
    error: Error | null,
    data:  D | null,
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialstate:State<null> = {
    stat: 'idle',
    error: null,
    data: null
}


export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInitialstate,
        ...initialState
    })

    const setData = (data: D) => setState({
        stat: 'success',
        error: null,
        data
    })

    const setError = (error: Error) => setState({
        stat: 'error',
        error,
        data: null
    })

    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入Promise类型数据')
        }
        setState({ ...state, stat: 'loading' })
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            return error
        })
    }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isSuccess: state.stat === 'success',
        isError: state.stat === 'error',
        run,
        setData,
        setError,
        ...state
    }
}
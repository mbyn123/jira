import { useCallback, useReducer } from 'react';

// // 状态回退/前进 
// export const UseUndo = <T>(initiaPresent: T) => {
//     const [past, setPast] = useState<T[]>([]) // 过去的值 集合
//     const [present, setPresent] = useState(initiaPresent) // 传入的值
//     const [future, setFuture] = useState<T[]>([])// 未来的值 集合

//     const canUndo = past.length !== 0
//     const canRedo = future.length !== 0

//     // 回退到上一次的状态
//     const undo = () => {
//         if (!canUndo) { return }
//         const previous = past[past.length - 1]
//         const newPast = past.slice(0, past.length - 1)
//         setPast(newPast) // 存储过去的值
//         setPresent(previous) // 修改当前的值
//         setFuture([present, ...future]) // 存储未来的值
//     }

//     // 前进到下一次状态
//     const redo = () => {
//         if (!canRedo) { return }
//         const next = future[0]
//         const newFuture = future.slice(1)
//         setPast([...past, present])
//         setPresent(next)
//         setFuture(newFuture)
//     }

//     // 设置当前值得状态
//     const set = (newPresent: T) => {
//         if (newPresent === present) { return }
//         setPast([...past, present])
//         setPresent(newPresent)
//         setFuture([])
//     }

//     // 清空
//     const rest = (newPresent: T) => {
//         setPast([])
//         setPresent(newPresent)
//         setFuture([])
//     }

//     return [
//         { past, present, future },
//         { set, rest, undo, redo, canRedo, canUndo }
//     ] as const

// }



// 状态回退/前进   使用useCallback优化hook中导出的函数
// export const UseUndo = <T>(initiaPresent: T) => {
//     const [state, setState] = useState<{
//         past: T[],
//         present: T,
//         future: T[]
//     }>({
//         past: [],
//         present: initiaPresent,
//         future: []
//     })
//     const canUndo = state.past.length !== 0
//     const canRedo = state.future.length !== 0

//     // 回退到上一次的状态 
//     const undo = useCallback(() => {
//         // 使用函数式方法更新state中的值，就不用在依赖中加入state
//         setState(currentState => {
//             const { past, present, future } = currentState
//             if (!past.length) { return currentState }
//             const previous = past[past.length - 1]
//             const newPast = past.slice(0, past.length - 1)
//             return {
//                 past: newPast,
//                 present: previous,
//                 future: [present, ...future]
//             }
//         })
//     }, [])

//     // 前进到下一次状态
//     const redo = useCallback(() => {
//         setState(currentState => {
//             const { past, present, future } = currentState
//             if (!future.length) { return currentState }
//             const next = future[0]
//             const newFuture = future.slice(1)
//             return {
//                 past: [...past, present],
//                 present: next,
//                 future: newFuture
//             }
//         })

//     }, [])

//     // 设置当前值的状态
//     const set = useCallback((newPresent: T) => {
//         setState(currentState => {
//             const { past, present } = currentState
//             if (newPresent === present) { return currentState }
//             return {
//                 past: [...past, present],
//                 present: newPresent,
//                 future: []
//             }
//         })

//     }, [])

//     // 清空
//     const rest = useCallback((newPresent: T) => {
//         setState(() => {
//             return {
//                 past: [],
//                 present: newPresent,
//                 future: []
//             }
//         })
//     }, [])

//     return [
//         state,
//         { set, rest, undo, redo, canRedo, canUndo }
//     ] as const

// }

// 使用useReducer优化
export const UseUndo = <T>(initiaPresent: T) => {
    const UNDO = 'UNDO'
    const REDO = 'REDO'
    const SET = 'SET'
    const REST = 'REST'

    type State<T> = {
        past: T[],
        present: T,
        future: T[]
    }

    type Action<T> = {
        newPresent?: T,
        type: typeof UNDO | typeof REDO | typeof SET | typeof REST
    }

    const undoReducer = <T>(state: State<T>, action: Action<T>) => {
        const { past, present, future } = state
        const { newPresent, type } = action

        switch (type) {
            case UNDO: {
                if (!past.length) { return state }
                const previous = past[past.length - 1]
                const newPast = past.slice(0, past.length - 1)
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                }
            }

            case REDO: {
                if (!future.length) { return state }
                const next = future[0]
                const newFuture = future.slice(1)
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                }
            }

            case SET: {
                if (newPresent === present) { return state }
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                }
            }

            case REST: {
                return {
                    past: [],
                    present: newPresent,
                    future: []
                }
            }

        }

        return state
    }

    // useReducer接收两个参数 一个函数 一个默认数据
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initiaPresent,
        future: []
    } as State<T>)


    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    // 回退到上一次的状态 
    const undo = useCallback(() => dispatch({ type: UNDO }), [])

    // 前进到下一次状态
    const redo = useCallback(() => dispatch({ type: REDO }), [])

    // 设置当前值的状态
    const set = useCallback((newPresent: T) => dispatch({ type: SET, newPresent }), [])

    // 清空
    const rest = useCallback((newPresent: T) => dispatch({ type: REST, newPresent }), [])

    return [
        state,
        { set, rest, undo, redo, canRedo, canUndo }
    ] as const

}

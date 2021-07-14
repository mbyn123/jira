import React from "react";

type FallbacakRender = (props:{error:Error | null})=>React.ReactElement

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbacakRender:FallbacakRender}>,any>{
    state = {error:null}
    
    // 错误边界捕获，当子组件抛出异常，这里会接受到并且调用
    static getDerivedStateFromError(error:Error){
        return {error}
    }

    render(){
        const {error} = this.state 
        const {fallbacakRender,children} = this.props
        if(error){
            return fallbacakRender({error})
        }
        return children
    }
}
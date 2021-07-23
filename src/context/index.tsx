import { ReactNode } from "react";
import { AuthProvider } from 'context/auth-context'
import { QueryClient, QueryClientProvider } from "react-query";
import { DevTools } from "jira-dev-tool";
import { Provider } from "react-redux";
import { store } from "store";

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={new QueryClient()}>
                <DevTools />
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
    )

}
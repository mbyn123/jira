import { ReactNode } from "react";
import { AuthProvider } from 'context/auth-context'
import { QueryClient, QueryClientProvider } from "react-query";
import { DevTools } from "jira-dev-tool";

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <DevTools/>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )

}
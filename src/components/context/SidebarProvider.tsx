import { errorMessage } from "@/constants/error-message";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";
import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
    isSidebarCollapsed: boolean;
    toggleSidebar: VoidFuncNoParam;
}

const initialSidebarContext: SidebarContextType = {
    isSidebarCollapsed: false,
    toggleSidebar: () => {},
};

const SidebarContext = createContext<SidebarContextType>(initialSidebarContext);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

    return (
        <SidebarContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error(
            errorMessage.mustBeUsedWithinProvider
                .replace("{0}", useSidebar.name)
                .replace("{1}", SidebarProvider.name)
        );
    }

    return context;
}

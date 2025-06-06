import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { errorMessage } from "@/constants/error-message";
import { localStorageKeys } from "@/enums/local-storage-keys";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";
import { getSidebarCollapsedStateFromStorage } from "@/components/context/sidebar-provider/sidebarProvider.funcs";
import { setLocalStorageItem } from "@/utils/local-storage";

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
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() =>
        getSidebarCollapsedStateFromStorage(localStorageKeys.isSidebarCollapsed, false)
    );

    const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

    useEffect(() => {
        setLocalStorageItem(localStorageKeys.isSidebarCollapsed, isSidebarCollapsed);
    }, [isSidebarCollapsed]);

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

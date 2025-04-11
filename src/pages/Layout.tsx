import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MdHeader } from "@/components/layout/header/MdHeader";
import { MdSidebar } from "@/components/layout/sidebar/MdSidebar";
import { useAppDispatch } from "@/store/hook";
import { getAllBillingAccounts } from "@/store/slices/billing-account-slice";
import { SidebarProvider } from "@/components/context/SidebarProvider";
import { MdBottomSidebar } from "@/components/layout/bottom-sidebar/BottomSidebar";
import useAdaptiveScreen from "@/hooks/useAdaptiveScreen";
import { breakPoints } from "@/constants/break-points";

export function Layout() {
    const dispatch = useAppDispatch();
    const isMobileView = useAdaptiveScreen({ maxWidth: breakPoints.md });

    useEffect(() => {
        dispatch(getAllBillingAccounts());
    }, [dispatch]);

    return (
        <SidebarProvider>
            <MdHeader />
            {isMobileView ? <MdBottomSidebar /> : <MdSidebar />}
            <Outlet />
        </SidebarProvider>
    );
}

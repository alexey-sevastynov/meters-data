import "@/styles/pages/graphics.scss";
import { useLocation, useParams } from "react-router-dom";
import { navigationItems } from "@/constants/navigation-items";
import { formatDate } from "@/helpers/meters-data/dates/format-date";
import { useAppSelector } from "@/store/hook";
import { filterMeterDataByAddressAndSortByDate } from "@/helpers/meters-data/filters";
import { MdChart } from "@/components/shared/chart/MdChart";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { getBreadcrumbItemsGraphics } from "@/constants/breadcrumb-items";
import { routeNames } from "@/constants/routes";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";

export function Graphics() {
    const sidebarContext = useSidebar();
    const { address } = useParams();
    const { pathname } = useLocation();

    const items = useAppSelector((state) => state.metersData.items);
    const addressCurrentPage = pathname.slice(1).replace("/graphics", "");
    const listMetersData = filterMeterDataByAddressAndSortByDate(items, addressCurrentPage);

    const addressItem = navigationItems.find(({ link }) => link === `/${address}`);

    const dataLight = [];
    const dataGas = [];
    const dataWater = [];

    for (let i = 1; i < listMetersData.length; i++) {
        const currentMonth = listMetersData[i];
        const previousMonth = listMetersData[i - 1];

        const lightDiff = currentMonth.light - previousMonth.light;
        const lightDayDiff = currentMonth.lightDay - previousMonth.lightDay;
        const lightNightDiff = currentMonth.lightNight - previousMonth.lightNight;
        const gasDiff = currentMonth.gas - previousMonth.gas;
        const waterDiff =
            (currentMonth.water && previousMonth.water && currentMonth.water - previousMonth.water) || null;

        const label = formatDate(currentMonth.date);

        dataLight.push({
            label,
            light: lightDiff,
            lightDay: lightDayDiff,
            lightNight: lightNightDiff,
        });

        dataGas.push({
            label,
            gas: gasDiff >= 0 ? gasDiff : 0,
        });

        dataWater.push({ label, water: waterDiff });
    }

    const layoutStyle = sidebarContext.isSidebarCollapsed
        ? "page-layout--collapsed"
        : "page-layout--expanded";

    return (
        <div className="graphics">
            <div className={layoutStyle}>
                <div className="title">
                    <MdBreadcrumb
                        items={getBreadcrumbItemsGraphics(
                            address!,
                            `/${address}/${routeNames.graphics}`,
                            addressItem?.text
                        )}
                    />

                    <div className="items">
                        <MdChart data={dataLight} title={"Light"} />
                        <MdChart data={dataGas} title={"Gas"} />

                        {dataWater.every((item) => item.water !== null) && (
                            <MdChart data={dataWater} title={"Water"} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

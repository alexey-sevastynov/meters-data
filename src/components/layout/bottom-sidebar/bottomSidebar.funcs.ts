import { isBrowser } from "@/lib/environments";
import { SetStateFunc } from "@/types/getter-setter-functions";

const scrollShowThreshold = 60;

export function toggleBottomBarOnScroll(
    lastScrollY: React.MutableRefObject<number>,
    setIsBottomSidebarVisible: SetStateFunc<boolean>
) {
    if (!isBrowser()) return;

    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY.current;

    if (currentScrollY < scrollShowThreshold) {
        setIsBottomSidebarVisible(true);
    } else {
        setIsBottomSidebarVisible(!isScrollingDown);
    }

    lastScrollY.current = currentScrollY;
}

import { MutableRefObject } from "react";
import { isBrowser } from "@/lib/environments";
import { SetStateFunc } from "@/types/getter-setter-functions";

export function updateBottomBarVisibilityOnScroll(
    lastScrollY: React.MutableRefObject<number>,
    setIsBottomSidebarVisible: SetStateFunc<boolean>
) {
    if (!isBrowser()) return;

    if (isScrolledToBottom()) {
        setIsBottomSidebarVisible(false);

        return;
    }

    if (isNearTopEdge()) {
        setIsBottomSidebarVisible(true);

        return;
    }

    if (!isUserScrollingDown(window.scrollY, lastScrollY)) {
        setIsBottomSidebarVisible(true);
    } else {
        setIsBottomSidebarVisible(false);
    }

    lastScrollY.current = window.scrollY;
}

function isUserScrollingDown(currentScrollY: number, lastScrollY: MutableRefObject<number>) {
    return currentScrollY > lastScrollY.current;
}

function isScrolledToBottom() {
    const body = document.documentElement || document.body;

    return Math.ceil(window.innerHeight + window.scrollY) >= body.scrollHeight;
}

function isNearTopEdge() {
    const scrollShowThreshold = 10;

    return window.scrollY <= scrollShowThreshold;
}

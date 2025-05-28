import { useState, useEffect } from "react";
import { eventListenerEvents } from "@/constants/events";

interface MediaQueryParams {
    maxWidth: number;
}

const useAdaptiveScreen = ({ maxWidth }: MediaQueryParams) => {
    const [isScreenAdaptive, setIsScreenAdaptive] = useState(false);

    const checkScreenSize = () => {
        setIsScreenAdaptive(window.innerWidth <= maxWidth);
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener(eventListenerEvents.resize, checkScreenSize);

        return () => {
            window.removeEventListener(eventListenerEvents.resize, checkScreenSize);
        };
    }, [maxWidth]);

    return isScreenAdaptive;
};

export default useAdaptiveScreen;

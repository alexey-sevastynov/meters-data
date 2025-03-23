import { useState, useEffect } from "react";

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
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, [maxWidth]);

    return isScreenAdaptive;
};

export default useAdaptiveScreen;

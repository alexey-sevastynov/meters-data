import React from "react";
import { motion } from "framer-motion";
import Style from "./progressIndicator.module.scss";
import { ProgressIndicatorProps } from "@/components/features/info-panel-month/list-info-panel-month/item-info-panel-month/progress-indicator/progressIndicator.interface";
import {
    calculateBorderRadius,
    calculateWidth,
} from "@/components/features/info-panel-month/list-info-panel-month/item-info-panel-month/progress-indicator/progressIndicator.function";

export function ProgressIndicator({ index, percentDifference, isMinus }: ProgressIndicatorProps) {
    const [animate, setAnimate] = React.useState(false);

    React.useEffect(() => {
        setAnimate(true);
    }, []);

    const width = React.useMemo(
        () => calculateWidth(percentDifference, isMinus),
        [percentDifference, isMinus]
    );

    const borderRadius = React.useMemo(
        () => calculateBorderRadius(percentDifference, isMinus),
        [percentDifference, isMinus]
    );

    return (
        <span className={isMinus ? Style.progressIndicator__left : Style.progressIndicator__right}>
            <motion.span
                className={
                    isMinus ? Style.progressIndicator__left_minus : Style.progressIndicator__right_plus
                }
                initial={{ width: 0 }}
                animate={animate ? { width: `${width}%` } : {}}
                transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.2 }}
                style={{ borderRadius }}
            />
        </span>
    );
}

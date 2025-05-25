import React from "react";
import { motion } from "framer-motion";
import styles from "./progressIndicator.module.scss";
import { ProgressIndicatorProps } from "@/components/features/monthly-utility-report/monthly-info-list/monthly-info-item/progress-indicator/progressIndicator.interface";
import {
    calculateBorderRadius,
    calculateWidth,
} from "@/components/features/monthly-utility-report/monthly-info-list/monthly-info-item/progress-indicator/progressIndicator.function";
import { cn } from "@/lib/cn";

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
        <span className={cn(isMinus ? styles.progressTrackLeft : styles.progressTrackRight)}>
            <motion.span
                className={cn(isMinus ? styles.progressBarMinus : styles.progressBarPlus)}
                initial={{ width: 0 }}
                animate={animate ? { width: `${width}%` } : {}}
                transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.2 }}
                style={{ borderRadius }}
            />
        </span>
    );
}

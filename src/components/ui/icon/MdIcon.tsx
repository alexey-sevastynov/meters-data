import { IconBaseProps } from "react-icons";
import { RefAttributes } from "react";
import { ColorName, colorNames } from "@/enums/color-names";
import { IconName, iconSizes } from "@/components/ui/icon/icon-constants";
import { RiPriceTagFill } from "react-icons/ri";
import { IoBarChartSharp, IoTriangle, IoClose } from "react-icons/io5";
import { BsCopy } from "react-icons/bs";
import {
    FaLongArrowAltDown,
    FaLongArrowAltUp,
    FaEdit,
    FaPlusCircle,
    FaCalendarAlt,
    FaCaretSquareLeft,
    FaCaretSquareRight,
} from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { FaCircle } from "react-icons/fa6";

interface MdIconProps {
    name: IconName;
    id?: string;
    size?: number;
    color?: ColorName;
    className?: string;
}

const iconMap: Record<IconName, React.ComponentType<IconBaseProps & RefAttributes<SVGSVGElement>>> = {
    priceTagFill: RiPriceTagFill,
    barChartSharp: IoBarChartSharp,
    longArrowAltDown: FaLongArrowAltDown,
    longArrowAltUp: FaLongArrowAltUp,
    edit: FaEdit,
    plusCircle: FaPlusCircle,
    triangle: IoTriangle,
    copy: BsCopy,
    home: GoHome,
    circle: FaCircle,
    calendar: FaCalendarAlt,
    close: IoClose,
    caretSquareLeft: FaCaretSquareLeft,
    caretSquareRight: FaCaretSquareRight,
} as const;

export function MdIcon({ name, id, color = colorNames.white, size = iconSizes.medium }: MdIconProps) {
    if (name in iconMap) {
        const IconComponent = iconMap[name];

        return <IconComponent id={id} className={`icon-${color}`} size={size} />;
    } else {
        return null;
    }
}

import { IconBaseProps } from "react-icons";
import { RefAttributes } from "react";
import { ColorName, colorNames } from "@/enums/color-names";
import { IconName, IconSize, iconSizes } from "@/components/ui/icon/icon-constants";
import { RiPriceTagFill } from "react-icons/ri";
import { IoBarChartSharp, IoTriangle, IoClose, IoLanguage, IoSunny } from "react-icons/io5";
import { BsCopy } from "react-icons/bs";
import {
    FaLongArrowAltDown,
    FaLongArrowAltUp,
    FaEdit,
    FaPlusCircle,
    FaCalendarAlt,
    FaCaretSquareLeft,
    FaCaretSquareRight,
    FaAngleDown,
    FaAngleUp,
    FaExpandAlt,
    FaSignOutAlt,
    FaPlus,
    FaSort,
} from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { FaCircle, FaCheck, FaGear, FaArrowRight } from "react-icons/fa6";
import { MdOutlineViewInAr, MdDelete, MdRefresh } from "react-icons/md";

interface MdIconProps {
    name: IconName;
    id?: string;
    size?: IconSize;
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
    check: FaCheck,
    language: IoLanguage,
    arrowDown: FaAngleDown,
    arrowUp: FaAngleUp,
    arrowRight: FaArrowRight,
    expand: FaExpandAlt,
    lightMode: IoSunny,
    gear: FaGear,
    signOut: FaSignOutAlt,
    plus: FaPlus,
    view: MdOutlineViewInAr,
    delete: MdDelete,
    sort: FaSort,
    refresh: MdRefresh,
} as const;

export function MdIcon({ name, id, color = colorNames.white, size = iconSizes.medium }: MdIconProps) {
    if (name in iconMap) {
        const IconComponent = iconMap[name];

        return <IconComponent id={id} className={`icon-${color}`} size={size} />;
    } else {
        return null;
    }
}

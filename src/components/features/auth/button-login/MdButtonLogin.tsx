import { cn } from "@/lib/cn";
import Style from "./buttonLogin.module.scss";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { MdIcon } from "@/components/ui/icon/MdIcon";

export function MdButtonLogin({ ...props }) {
    return (
        <button
            type="button"
            className={cn("text-white hover:bg-blue active:bg-blue", Style.buttonLogin)}
            {...props}
        >
            Log in
            <MdIcon name={iconNames.arrowRight} size={iconSizes.medium} />
        </button>
    );
}

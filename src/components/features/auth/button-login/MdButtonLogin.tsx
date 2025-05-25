import { cn } from "@/lib/cn";
import styles from "./buttonLogin.module.scss";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";

interface MdButtonLoginProps {
    onLoginClick: VoidFuncNoParam;
}

export function MdButtonLogin({ onLoginClick }: MdButtonLoginProps) {
    return (
        <button
            type="button"
            className={cn("text-white hover:bg-green active:bg-green", styles.root)}
            onClick={onLoginClick}
        >
            Sign in
            <MdIcon name={iconNames.arrowRight} size={iconSizes.medium} />
        </button>
    );
}

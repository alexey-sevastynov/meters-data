import Styles from "./header.module.scss";
import useAdaptiveScreen from "@/hooks/useAdaptiveScreen";
import { breakPoints } from "@/constants/break-points";
import { MdLogo } from "@/components/shared/logo/MdLogo";
import { AuthPanel } from "@/components/shared/auth-panel/MdAuthPanel";

export function MdHeader() {
    const isMobileView = useAdaptiveScreen({ maxWidth: breakPoints.xl });

    return (
        <header className={Styles.header}>
            <MdLogo />
            {!isMobileView && <AuthPanel />}
        </header>
    );
}

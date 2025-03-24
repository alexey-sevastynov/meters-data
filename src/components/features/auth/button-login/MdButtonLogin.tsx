import Style from "./buttonLogin.module.scss";
import { getIconUrl } from "@/helpers/get-icon-url";

export function MdButtonLogin({ ...props }) {
    return (
        <button type="button" className={Style.buttonLogin} {...props}>
            Log in
            <img src={getIconUrl("right-arrow.png")} alt="up" width={20} height={20} />
        </button>
    );
}

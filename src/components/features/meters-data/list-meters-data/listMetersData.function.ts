import { SetStateFunc } from "@/types/getter-setter-functions";

export const handleScroll = (
    ref: React.RefObject<HTMLUListElement>,
    setListMetersDataTop: SetStateFunc<number>
) => {
    if (ref.current) {
        setListMetersDataTop(ref.current.getBoundingClientRect().top);
    }
};

export const checkScreenSize = (
    ref: React.RefObject<HTMLUListElement>,
    setListMetersDataWidth: SetStateFunc<number>
) => {
    if (ref.current) {
        setListMetersDataWidth(ref.current.getBoundingClientRect().width);
    }
};

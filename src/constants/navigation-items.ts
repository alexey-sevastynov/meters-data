import { getStringEnv } from "@/infra/env/env-functions";
import { appRoutes } from "@/constants/routes";
import { envKeys } from "@/infra/env/env-keys";
import { v4 } from "uuid";

export interface NavigationItem {
    link: string;
    id: string;
    text: string;
    imageName: string;
}

export const navigationItems: NavigationItem[] = [
    {
        link: appRoutes.home,
        id: v4(),
        text: "Home",
        imageName: "home.svg",
    },
    {
        link: `/${getStringEnv(envKeys.address003)}`,
        id: v4(),
        text: getStringEnv(envKeys.addressName003),
        imageName: "73-8.svg",
    },
    {
        link: `/${getStringEnv(envKeys.address004)}`,
        id: v4(),
        text: getStringEnv(envKeys.addressName004),
        imageName: "75-1.svg",
    },
    {
        link: `/${getStringEnv(envKeys.address005)}`,
        id: v4(),
        text: getStringEnv(envKeys.addressName005),
        imageName: "75-3.svg",
    },
    {
        link: `/${getStringEnv(envKeys.address002)}`,
        id: v4(),
        text: getStringEnv(envKeys.addressName002),
        imageName: "68a-63.svg",
    },
    {
        link: `/${getStringEnv(envKeys.address001)}`,
        id: v4(),
        text: getStringEnv(envKeys.addressName001),
        imageName: "1-12.svg",
    },
] as const;

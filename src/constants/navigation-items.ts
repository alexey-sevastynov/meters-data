import { getStringEnv } from "@/infra/env/env-functions";
import { appRoutes } from "@/constants/routes";
import { envKeys } from "@/infra/env/env-keys";
import { createUniqueId } from "@/utils/id";

export interface NavigationItem {
    link: string;
    id: string;
    text: string;
    imageName: string;
}

export const navigationHomeItem: NavigationItem = {
    link: appRoutes.home,
    id: createUniqueId(),
    text: "Home",
    imageName: "home.svg",
} as const;

export const navigationAddressItems: NavigationItem[] = [
    {
        link: `/${getStringEnv(envKeys.address003)}`,
        id: createUniqueId(),
        text: getStringEnv(envKeys.addressName003),
        imageName: "73-8.svg",
    },
    {
        link: `/${getStringEnv(envKeys.address004)}`,
        id: createUniqueId(),
        text: getStringEnv(envKeys.addressName004),
        imageName: "75-1.svg",
    },
    {
        link: `/${getStringEnv(envKeys.address005)}`,
        id: createUniqueId(),
        text: getStringEnv(envKeys.addressName005),
        imageName: "75-3.svg",
    },
    {
        link: `/${getStringEnv(envKeys.address002)}`,
        id: createUniqueId(),
        text: getStringEnv(envKeys.addressName002),
        imageName: "68a-63.svg",
    },
    {
        link: `/${getStringEnv(envKeys.address001)}`,
        id: createUniqueId(),
        text: getStringEnv(envKeys.addressName001),
        imageName: "1-12.svg",
    },
] as const;

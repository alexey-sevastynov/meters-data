import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./bottomSidebar.module.scss";
import { navigationItems } from "@/constants/navigation-items";
import { iconSizes } from "@/components/ui/icon/icon-constants";
import { MdImage } from "@/components/ui/image/MdImage";
import { updateBottomBarVisibilityOnScroll } from "@/components/layout/bottom-sidebar/bottomSidebar.funcs";
import { eventListenerEvents } from "@/constants/events";

export function MdBottomSidebar() {
    const [isBottomSidebarVisible, setIsBottomSidebarVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => updateBottomBarVisibilityOnScroll(lastScrollY, setIsBottomSidebarVisible);
        window.addEventListener(eventListenerEvents.scroll, onScroll);

        return () => window.removeEventListener(eventListenerEvents.scroll, onScroll);
    }, []);

    return (
        <AnimatePresence>
            {isBottomSidebarVisible && (
                <motion.nav
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={styles.root}
                >
                    <ul className={styles.listLinks}>
                        {navigationItems.map((item) => (
                            <li key={item.id} className={styles.itemLink}>
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) => (isActive ? styles.active : styles.noActive)}
                                >
                                    <MdImage
                                        className={styles.itemLinkIcon}
                                        fileName={item.imageName}
                                        alt={item.text}
                                        width={iconSizes.large}
                                        height={iconSizes.large}
                                    />
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}

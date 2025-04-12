import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import styles from "./dropdown.module.scss";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";
import { dropdownPosition, DropdownPosition } from "@/components/ui/dropdown/dropdown-types";
import { AnimatePresence, motion } from "framer-motion";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";

interface DropdownContextConfig {
    isOpen: boolean;
    toggleDropdown: VoidFuncNoParam;
    closeDropdown: VoidFuncNoParam;
    triggerRef: React.RefObject<HTMLDivElement>;
    contentRef: React.RefObject<HTMLDivElement>;
    position: DropdownPosition;
}

const DropdownContext = createContext<DropdownContextConfig | null>(null);

export function MdDropdown({
    children,
    className,
    position = dropdownPosition.bottom,
}: {
    children: ReactNode;
    className?: string;
    position?: DropdownPosition;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const customClass = className ? className : "";

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const closeDropdown = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node) &&
                contentRef.current &&
                !contentRef.current.contains(event.target as Node)
            ) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <DropdownContext.Provider
            value={{ isOpen, toggleDropdown, closeDropdown, triggerRef, contentRef, position }}
        >
            <div className={styles.dropdown + " " + customClass}>{children}</div>
        </DropdownContext.Provider>
    );
}

export function MdDropdownTrigger({ children, className }: { children: ReactNode; className?: string }) {
    const { isOpen, toggleDropdown: toggle, triggerRef } = useContext(DropdownContext)!;
    const customClass = className ? className : "";

    return (
        <div ref={triggerRef} onClick={toggle} className={styles.trigger + " " + customClass}>
            {children}
            {isOpen ? <MdIcon name={iconNames.arrowUp} /> : <MdIcon name={iconNames.arrowDown} />}
        </div>
    );
}

export function MdDropdownContent({ children, className }: { children: ReactNode; className?: string }) {
    const { isOpen, contentRef, position } = useContext(DropdownContext)!;
    const customClass = className ? className : "";

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                ref={contentRef}
                className={`${styles.content} ${styles[position]} ${customClass}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export function MdDropdownItem({
    children,
    onSelect,
    className,
}: {
    children: ReactNode;
    onSelect?: VoidFuncNoParam;
    className?: string;
}) {
    const { closeDropdown } = useContext(DropdownContext)!;
    const customClass = className ? className : "";

    const handleClick = () => {
        onSelect?.();
        closeDropdown();
    };

    return (
        <div onClick={handleClick} className={styles.item + " " + customClass}>
            {children}
        </div>
    );
}

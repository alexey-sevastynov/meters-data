import { createContext, useContext, useState, useRef, useEffect, ReactNode, RefObject } from "react";
import { cn } from "@/lib/cn";
import styles from "./dropdown.module.scss";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";
import { DropdownIcons, dropdownPosition, DropdownPosition } from "@/components/ui/dropdown/dropdown-types";
import { AnimatePresence, motion } from "framer-motion";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { defaultIcons } from "@/components/ui/dropdown/dropdown-config";

interface DropdownContextConfig {
    isOpen: boolean;
    toggleDropdown: VoidFuncNoParam;
    closeDropdown: VoidFuncNoParam;
    triggerRef: RefObject<HTMLDivElement>;
    contentRef: RefObject<HTMLDivElement>;
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

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const closeDropdown = () => setIsOpen(false);

    useEffect(() => {
        const isClickOutside = (event: MouseEvent) => {
            const target = event.target;

            if (!(target instanceof Node)) return false;

            const clickedOutsideTrigger = !triggerRef.current?.contains(target);
            const clickedOutsideContent = !contentRef.current?.contains(target);

            return clickedOutsideTrigger && clickedOutsideContent;
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (isClickOutside(event)) closeDropdown();
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
            <div className={cn(styles.dropdown, className)}>{children}</div>
        </DropdownContext.Provider>
    );
}

export function MdDropdownTrigger({
    children,
    className,
    icons = defaultIcons,
}: {
    children: ReactNode;
    className?: string;
    icons?: DropdownIcons;
}) {
    const { isOpen, toggleDropdown: toggle, triggerRef } = useContext(DropdownContext)!;

    return (
        <div ref={triggerRef} onClick={toggle} className={cn(styles.trigger, className)}>
            <div className={styles.triggerInner}>{children}</div>
            <MdIcon
                name={isOpen ? icons.iconWhenOpen : icons.iconWhenClosed}
                color={icons.color}
                size={icons.size}
            />
        </div>
    );
}

export function MdDropdownContent({ children, className }: { children: ReactNode; className?: string }) {
    const { isOpen, contentRef, position } = useContext(DropdownContext)!;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                ref={contentRef}
                className={cn(styles.content, styles[position], className)}
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
    disabled = false,
}: {
    children: ReactNode;
    onSelect?: VoidFuncNoParam;
    className?: string;
    disabled?: boolean;
}) {
    const { closeDropdown } = useContext(DropdownContext)!;

    const handleClick = () => {
        if (disabled) return;

        onSelect?.();
        closeDropdown();
    };

    const classes = [styles.item, className, disabled ? styles.disabled : ""].filter(Boolean).join(" ");

    return (
        <div onClick={handleClick} className={classes} aria-disabled={disabled}>
            {children}
        </div>
    );
}

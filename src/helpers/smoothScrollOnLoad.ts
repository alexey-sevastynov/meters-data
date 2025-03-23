export function smoothScrollOnLoad(top = 0) {
    return window.scrollTo({
        top: top,
        behavior: "smooth",
    });
}

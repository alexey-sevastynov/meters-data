export function smoothScrollTo(top = 0) {
    window.scrollTo({
        top: top,
        behavior: "smooth",
    });
}

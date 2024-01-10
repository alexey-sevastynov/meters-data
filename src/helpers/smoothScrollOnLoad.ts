export const smoothScrollOnLoad = (top: number = 0): void => {
  return window.scrollTo({
    top: top,
    behavior: "smooth",
  });
};

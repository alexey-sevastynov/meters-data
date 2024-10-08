export const handleScroll = (
  ref: React.RefObject<HTMLUListElement>,
  setListMetersDataTop: React.Dispatch<React.SetStateAction<number>>
) => {
  if (ref.current) {
    setListMetersDataTop(ref.current.getBoundingClientRect().top);
  }
};

export const checkScreenSize = (
  ref: React.RefObject<HTMLUListElement>,
  setListMetersDataWidth: React.Dispatch<React.SetStateAction<number>>
) => {
  if (ref.current) {
    setListMetersDataWidth(ref.current.getBoundingClientRect().width);
  }
};

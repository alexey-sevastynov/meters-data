import React, { HTMLAttributes, useEffect } from "react";
import "../styles/pages/home.scss";
import { ListUtilityPrices } from "../ui/Home/ListUtilityPrices/ListUtilityPrices";
import { useAppDispatch } from "../redux/hook";
import { fetchAllMetersData } from "../redux/slices/MetersDataSlice";

interface HomeProps extends HTMLAttributes<HTMLDivElement> {}

export const Home: React.FC<HomeProps> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllMetersData());
  }, []);

  return (
    <section className="home" {...props}>
      <h3 className="title">Home</h3>
      <p className="subtitle">Utility prices:</p>

      <ListUtilityPrices />
    </section>
  );
};

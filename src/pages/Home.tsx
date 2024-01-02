import React, { HTMLAttributes } from "react";
import "../styles/pages/home.scss";

interface HomeProps extends HTMLAttributes<HTMLDivElement> {}

export const Home: React.FC<HomeProps> = ({ ...props }) => {
  return (
    <section className="home" {...props}>
      Home
    </section>
  );
};

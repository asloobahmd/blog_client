import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="container mx-auto border-t-2 p-6">
      <h2 className="text-center text-3xl font-light">Developed by Asloob</h2>
    </div>
  );
};

export default Footer;

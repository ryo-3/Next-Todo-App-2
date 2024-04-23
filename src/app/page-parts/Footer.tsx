// Footer.tsx
import React from "react";
import ClearListButton from "@/components/client/ui/ClearListButton.client";

interface FooterProps {
  onClear: () => void;
}

const Footer: React.FC<FooterProps> = ({ onClear }) => {
  return (
    <footer>
      <nav>
        <ClearListButton onClear={onClear} />
      </nav>
    </footer>
  );
};

export default Footer;

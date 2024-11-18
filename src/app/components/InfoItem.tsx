import React from "react";

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <p>
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
};

export default InfoItem;

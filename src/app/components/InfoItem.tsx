import React from "react";

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
};

export default InfoItem;

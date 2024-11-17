interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  level?: "h2" | "h3" | "h4";
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  children,
  level = "h2",
}) => {
  const Heading = level;
  return (
    <div className="mb-4">
      <Heading className="mb-2 text-xl font-semibold">{title}</Heading>
      {children}
    </div>
  );
};

export default InfoSection;

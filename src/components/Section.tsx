const Section = ({
  sectionTitle,
  sectionId,
  children,
  additionClass = "text-2xl",
  margin = "mb-8",
}: {
  sectionTitle: string;
  sectionId: string;
  children: React.ReactNode;
  additionClass?: string;
  margin?: string;
}) => {
  return (
    <section id={sectionId} className={`${margin}`}>
      <h3 className={`font-bold mb-2 ${additionClass}`}>{sectionTitle}</h3>
      {children}
    </section>
  );
};

export default Section;

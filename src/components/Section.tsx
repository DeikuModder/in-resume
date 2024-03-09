const Section = ({
  sectionTitle,
  sectionId,
  children,
  additionClass,
}: {
  sectionTitle: string;
  sectionId: string;
  children: React.ReactNode;
  additionClass?: string;
}) => {
  return (
    <section id={sectionId} className="mb-8">
      <h3 className={`text-2xl font-bold mb-2 ${additionClass}`}>
        {sectionTitle}
      </h3>
      {children}
    </section>
  );
};

export default Section;

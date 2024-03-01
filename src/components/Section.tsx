const Section = ({
  sectionTitle,
  sectionId,
  children,
}: {
  sectionTitle: string;
  sectionId: string;
  children: React.ReactNode;
}) => {
  return (
    <section id={sectionId} className="mb-8">
      <h3 className="text-xl font-bold mb-2">{sectionTitle}</h3>
      {children}
    </section>
  );
};

export default Section;

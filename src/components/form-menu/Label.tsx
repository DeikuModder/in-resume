const Label = ({
  children,
  additionalClass,
  id,
}: {
  children: React.ReactNode;
  additionalClass?: string;
  id?: string;
}) => {
  return (
    <label className={`flex flex-col gap-2 ${additionalClass}`} id={id}>
      {children}
    </label>
  );
};

export default Label;

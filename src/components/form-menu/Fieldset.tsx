type Props = {
  children: React.ReactNode;
  fieldsetTitle?: string;
  fieldsetLegend: string;
};

const Fieldset: React.FC<Props> = ({
  children,
  fieldsetLegend,
  fieldsetTitle,
}) => {
  return (
    <fieldset
      title={fieldsetTitle}
      className="border border-neutral-200 rounded-lg p-4"
    >
      <legend className="text-lg font-bold">{fieldsetLegend}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;

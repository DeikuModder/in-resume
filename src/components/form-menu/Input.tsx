type Props = {
  inputType?: string;
  placeHolder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.LegacyRef<HTMLInputElement>;
};

const Input: React.FC<Props> = ({
  inputType = "text",
  placeHolder,
  value,
  onChange,
  onBlur,
  ref,
}) => {
  return (
    <input
      type={inputType}
      placeholder={placeHolder}
      className="px-2 font-light text-xl text-black rounded-lg"
      value={value || ""}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
    />
  );
};

export default Input;

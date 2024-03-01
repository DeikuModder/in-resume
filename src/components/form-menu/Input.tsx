type Props = {
  inputType?: string;
  placeHolder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const Input: React.FC<Props> = ({
  inputType = "text",
  placeHolder,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <input
      type={inputType}
      placeholder={placeHolder}
      className="px-2 font-light text-xl text-black rounded-lg"
      value={value || ""}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Input;

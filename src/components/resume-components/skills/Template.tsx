type Props = {
  children: React.ReactNode;
  name: string;
};

const Template = ({ children, name }: Props) => {
  return (
    <div className="w-fit h-fit flex gap-2 font-bold border [border-color:var(--accent)] rounded-xl p-2 [color:var(--accent)] bg-neutral-200 items-center">
      <div className="w-[20px]">{children}</div>
      {name}
    </div>
  );
};

export default Template;

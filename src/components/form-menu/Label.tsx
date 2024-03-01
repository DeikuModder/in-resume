const Label = ({ children }: { children: React.ReactNode }) => {
  return <label className="flex flex-col gap-2">{children}</label>;
};

export default Label;

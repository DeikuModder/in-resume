const DesignOption = ({ img, title, selected }: { img: string; title: string; selected?: boolean }) => {
  return (
    <div className={`border transition-transform hover:scale-105 ${selected ? "border-blue-400 ring-2 ring-blue-400" : "border-black"}`}>
      <img src={img} alt="design-preview" className="w-full" />
      <h4 className="text-center bg-neutral-950 font-semibold">{title}</h4>
    </div>
  );
};

export default DesignOption;

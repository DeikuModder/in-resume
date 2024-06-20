const DesignOption = ({ img, title }: { img: string; title: string }) => {
  return (
    <div className="border border-black transition-transform hover:scale-105">
      <img src={img} alt="design-preview" className="w-full" />
      <h4 className="text-center bg-neutral-950 font-semibold">{title}</h4>
    </div>
  );
};

export default DesignOption;

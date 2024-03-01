import Logo from "@/assets/logo curriculum.webp";

const Header = () => {
  return (
    <header className="bg-neutral-900 text-white h-[75px] w-[100%] flex justify-center items-center hideOnPrint">
      <div className="w-[5%]">
        <img src={Logo} className="w-[100%]" />
      </div>
      <h1 className="font-bold text-2xl">IN-RESUMÉ</h1>
    </header>
  );
};

export default Header;

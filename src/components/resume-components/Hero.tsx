import useCVInfo from "@/hooks/useCVInfo";

const Hero = () => {
  const { cvInfo } = useCVInfo();

  return (
    <header className="mb-4" id="hero-header">
      <h3 className="text-5xl font-bold mb-2 w-fit">
        {cvInfo.name ? cvInfo.name : "Type your name here"}
      </h3>
      <h3 className="text-4xl">
        {cvInfo.role ? cvInfo.role : "Your role here"}
      </h3>
      <p className="text-lg text-neutral-800">
        {cvInfo.address ? cvInfo.address : "Address"}
      </p>

      <div className="flex gap-4 text-neutral-800">
        <p>{cvInfo.email ? cvInfo.email : "yourmail@example.com"}</p>
        <p>{cvInfo.phone ? cvInfo.phone : "+55 55555"}</p>
        <a href={cvInfo.linkedinUrl} target="_blank">
          {cvInfo.linkedinUrl ? cvInfo.linkedinUrl : ""}
        </a>
        <a href={cvInfo.gitHubUrl} target="_blank">
          {cvInfo.gitHubUrl ? cvInfo.gitHubUrl : ""}
        </a>
      </div>
    </header>
  );
};

export default Hero;

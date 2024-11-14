import Image from "next/image";

const CameraLogo = () => (
  <div className="flex w-full flex-wrap justify-center">
    <Image
      aria-hidden
      src="/camera.png"
      alt="Camera logo"
      width={256}
      height={256}
    />
  </div>
);

export default CameraLogo;

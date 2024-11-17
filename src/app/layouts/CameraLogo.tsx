import { CAMERA_LOGO_SIZE } from "@/constants";
import Image from "next/image";

const CameraLogo = () => (
  <div className="flex w-full flex-wrap justify-center">
    <Image
      aria-hidden
      src="/camera.png"
      alt="Camera logo"
      width={CAMERA_LOGO_SIZE.width}
      height={CAMERA_LOGO_SIZE.height}
    />
  </div>
);

export default CameraLogo;

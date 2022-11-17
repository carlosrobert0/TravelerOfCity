import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

export function Comment() {
  return (
    <div className="flex items-start">
      <Image src="/imgComment.png" width="64px" height="64px" objectFit="contain" className="rounded-full" />
      <div className="flex flex-col ml-6">
        <div className="flex">
          <h4 className="font-barlow font-semibold text-xl text-text leading-[26px]">Patrickson Vieras</h4>
          <div className="flex gap-2 ml-[65px]">
            <FaStar size={20} color="#F25D27" />
            <FaStar size={20} color="#F25D27" />
            <FaStar size={20} color="#F25D27" />
            <FaStar size={20} color="#F25D27" />
            <FiStar size={20} color="#F25D27" />
          </div>
        </div>
        <h4 className="font-heebo font-regular text-base text-text leading-[26px] mt-4">
          Grande variedade de bolos, cucas, tortas e algumas opções de salgados.
        </h4>
      </div>
    </div>
  )
}
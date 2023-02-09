import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { FiStar } from 'react-icons/fi'

export function Comment() {
    return (
        <div className="flex items-start">
            <Image
                src="/imgComment.png"
                width="64px"
                height="64px"
                objectFit="contain"
                className="rounded-full"
            />
            <div className="ml-6 flex flex-col">
                <div className="flex">
                    <h4 className="font-barlow text-xl font-semibold leading-[26px] text-text">
                        Patrickson Vieras
                    </h4>
                    <div className="ml-[65px] flex gap-2">
                        <FaStar size={20} color="#F25D27" />
                        <FaStar size={20} color="#F25D27" />
                        <FaStar size={20} color="#F25D27" />
                        <FaStar size={20} color="#F25D27" />
                        <FiStar size={20} color="#F25D27" />
                    </div>
                </div>
                <h4 className="font-regular mt-4 font-heebo text-base leading-[26px] text-text">
                    Grande variedade de bolos, cucas, tortas e algumas opções de
                    salgados.
                </h4>
            </div>
        </div>
    )
}

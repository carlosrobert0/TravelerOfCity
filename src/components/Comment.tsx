import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { FiStar } from 'react-icons/fi'

interface CommentProps {
  image: string
  name: string
  description: string
  avaliation?: number
}

export function Comment({
  image,
  name,
  description,
  avaliation,
}: CommentProps) {
  return (
    <div className="flex w-full items-start">
      <Image
        alt=""
        src={`${image}`}
        width="64px"
        height="64px"
        objectFit="contain"
        className="rounded-full"
      />
      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex">
          <h4 className="font-barlow text-xl font-semibold leading-[26px] text-text">
            {name}
          </h4>
          <div className="ml-auto flex gap-2">
            {avaliation > 0 ? (
              <FaStar size={20} color="#F25D27" />
            ) : (
              <FiStar size={20} color="#F25D27" />
            )}
            {avaliation > 1 ? (
              <FaStar size={20} color="#F25D27" />
            ) : (
              <FiStar size={20} color="#F25D27" />
            )}
            {avaliation > 2 ? (
              <FaStar size={20} color="#F25D27" />
            ) : (
              <FiStar size={20} color="#F25D27" />
            )}
            {avaliation > 3 ? (
              <FaStar size={20} color="#F25D27" />
            ) : (
              <FiStar size={20} color="#F25D27" />
            )}
            {avaliation > 4 ? (
              <FaStar size={20} color="#F25D27" />
            ) : (
              <FiStar size={20} color="#F25D27" />
            )}
          </div>
        </div>
        <h4 className="font-regular mt-4 font-heebo text-base leading-[26px] text-text">
          {description}
        </h4>
      </div>
    </div>
  )
}

import Image from 'next/image'
import { useRouter } from 'next/router'

import { renderIcon } from '../../utils/renderIcon'
import { IconsHandleCard } from '../IconsHandleCard'

interface CardPlaceProps {
  name: string
  image: string
  category_name?: string
  city_id?: string
  place_id?: string
  icon?: string
  avaliation: string
  onlyReading?: boolean
}

export function CardPlace({
  name,
  image,
  place_id,
  avaliation,
  category_name,
  icon,
  city_id,
  onlyReading = false,
}: CardPlaceProps) {
  const router = useRouter()

  function handlePlace(place_id: string) {
    onlyReading
      ? router.push(`/place/onlyRead/${place_id}`)
      : router.push(`/place/${place_id}`)
  }

  return (
    <>
      <div
        className="relative h-[307px] w-64 overflow-y-visible rounded-2xl 
				border border-shape_secondary bg-shape"
      >
        <Image
          src={image}
          width="256px"
          height="160px"
          objectFit="cover"
          className="rounded-t-2xl"
          alt="Imagem do lugar"
        />

        <div className="flex h-[147px] flex-col items-start">
          <h1
            className="ml-6 mt-3 mb-6 cursor-pointer font-barlow text-xl max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap
						font-semibold leading-[30px] text-title"
            onClick={() => handlePlace(place_id)}
          >
            {name}
          </h1>

          <hr className="w-full bg-shape_secondary" />

          <div className="ml-6 mt-6 mb-3 flex w-[205px] flex-row justify-between">
            <h2 className="font-barlow text-base font-medium leading-[26px] text-text">
              {category_name}
            </h2>
            {renderIcon(icon, 24, 'ml-8')}
          </div>
        </div>
        {!onlyReading && (
          <div className="absolute top-4 right-4">
            <IconsHandleCard module="place" id={place_id} />
          </div>
        )}

        <div
          className="absolute left-6 -top-4 flex h-[82px] w-14 flex-col 
					items-center justify-center gap-[5px] rounded-[10px] bg-brand-orange"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0003 1.66667L12.5753 6.88334L18.3337 7.72501L14.167 11.7833L15.1503 17.5167L10.0003 14.8083L4.85033 17.5167L5.83366 11.7833L1.66699 7.72501L7.42533 6.88334L10.0003 1.66667Z"
              fill="white"
              stroke="#F5F8FA"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h1 className="font-barlow text-xl font-semibold leading-[25px] text-background">
            {avaliation?.length === 0 && '0'}
          </h1>
        </div>
      </div>
    </>
  )
}

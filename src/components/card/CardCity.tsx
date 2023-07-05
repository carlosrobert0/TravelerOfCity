import Image from 'next/image'
import { useRouter } from 'next/router'

import { IconsHandleCard } from '../IconsHandleCard'

interface CardCityProps {
  id: string
  name: string
  image: string
  countPlaces: number | string
  onlyReading?: boolean
  listCities?: boolean
  module?: string
}

export function CardCity({
  id,
  name,
  image,
  countPlaces,
  onlyReading = false,
  listCities = false,
  module = '/cities/',
}: CardCityProps) {
  const router = useRouter()

  function handleCity(id: string) {
    router.push(`${module}${id}`)
  }

  return (
    <div
      className={`relative ${
        onlyReading && !listCities ? 'h-[316px] w-[304px]' : 'h-[266px] w-64'
      } overflow-hidden rounded-2xl 
            border border-shape_secondary bg-shape`}
    >
      <Image
        src={image}
        width={`${onlyReading && !listCities ? '335px' : '254px'}`}
        height={`${onlyReading && !listCities ? '222px' : '159px'}`}
        objectFit="cover"
      />

      <div className="flex flex-col items-start p-6">
        <h1
          className="cursor-pointer font-barlow text-xl font-semibold leading-[30px] text-title"
          onClick={() => handleCity(id)}
        >
          {name}
        </h1>
        <h4 className="font-regular font-roboto text-base leading-[28px] text-text">
          {countPlaces} {countPlaces > 1 ? 'Locais' : 'Local'}
        </h4>
      </div>
      {!onlyReading && (
        <div className="absolute top-4 right-4">
          <IconsHandleCard module="cities" id={id} />
        </div>
      )}
    </div>
  )
}

import Image from "next/image";

import { useRouter } from "next/router";

import { renderIcon } from "../../utils/renderIcon";
import { CardAvaliation } from "./CardAvaliation";
import { IconsHandleCard } from "../IconsHandleCard";

interface CardCityProps {
  cityId: string;
  name: string;
  countPlaces: number;
}

export function CardCity({ cityId, name, countPlaces }: CardCityProps) {
  const router = useRouter()

  function handleCity(name: string) {
    router.push({
      pathname: `/cities/${name}`, 
      query: { cityId: cityId }
    })
  }

  return (
    <div className="w-64 h-[266px] bg-shape rounded-2xl border border-shape_secondary  relative">
      <Image src="/imgCity.png" width="254px" height="159px" objectFit="cover" />

      <div className="flex flex-col items-start p-6">
        <h1
          className="font-barlow font-semibold text-title text-xl leading-[30px] cursor-pointer"
          onClick={() => handleCity(name)}
        >{name}</h1>
        <h4 className="font-roboto font-regular text-base leading-[28px] text-text">
          {countPlaces} locais</h4>
      </div>
      <IconsHandleCard />
      {/*
        
        {avaliation ?
          (
            <>
              <span className="border border-shape_secondary" />
              <div className="flex">
                <h2 className="font-barlow font-medium text-base leading-[26px] text-text">Comida e Bebida</h2>
                {renderIcon(icon, 24)}
              </div>
            </>
          ) :
          
        }
      </div>
      <IconsHandleCard />
      {avaliation ? (
        <CardAvaliation avaliation={avaliation} />
      ) : null} */}
    </div>
  )
}
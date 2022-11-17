import Image from "next/image";
import { useRouter } from "next/router";
import { CardAvaliation } from "./CardAvaliation";
import { IconsHandleCard } from "./IconsHandleCard";

interface CardProps {
  name: string;
  avaliation?: string;
  route?: string;
}

export function Card({ name, avaliation, route }: CardProps) {
  const router = useRouter()
  const { id } = router.query

  function handleCity(name: string) {
    router.push(`/cities/${name}`)
  } 

  function handlePlace(name: string) {
    router.push(`/place/${name}`)
  }

  return (
    <div className="w-64 h-[266px] rounded-2xl border-[1px] border-shape_secondary bg-background relative">
      <Image src="/imgCity.png" width="254px" height="159px" objectFit="cover" />
      <div className="flex flex-col items-start p-6">
        <h1 
          className="font-barlow font-semibold text-title text-xl leading-[30px] cursor-pointer"
          onClick={route === 'city' ? () => handleCity(name) : () => handlePlace(name)}  
        >{name}</h1>
        <h4 className="font-roboto font-regular text-base leading-[28px] text-text">13 locais</h4>
      </div>
      <IconsHandleCard />
      { avaliation ? (
        <CardAvaliation avaliation={avaliation}/>
      ) : null }
    </div>
  )
}
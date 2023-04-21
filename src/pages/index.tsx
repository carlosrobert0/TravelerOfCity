import Link from "next/link"
import { useEffect, useState } from "react"
import { CardCity } from "../components/card/CardCity"
import { api } from "../services/api"

interface CityData {
    id: string
    name: string
    image?: string
    description?: string
    places?: PlaceData[]
}

interface PlaceData {
    id: string
    name: string
    image: string
    description: string
    category_id: string
    address_id: string
    city_id: string
}

export default function Home() {
    const [cities, setCities] = useState<CityData[]>([])

    async function getCities() {
        try {
            const response = await api.get('cities')
            setCities(response.data)
        } catch (error) {
            console.log(error)
        }
    }        

    useEffect(() => {   
        getCities()
    }, [])

    return (
        <div className="bg-background w-full px-[160px] h-full max-h-[820px] overflow-hidden">
            <header className="flex justify-between mt-6">
                <img src="/traveler.svg" alt="" />
                <Link href="/login">
                    <button className="w-[174px] h-12 bg-blue_light rounded-[10px] font-heebo font-medium text-brand-blue text-base leading-[26px] hover:opacity-90">
                        Acesso restrito
                    </button>
                </Link>
            </header>
            <main className="flex flex-row gap-[150px]">
                <aside className="mt-[138px] flex flex-col gap-10">
                    <h2 className="w-[317px] font-barlow font-semibold text-[80px] leading-[74px] text-title">
                        Viva uma grande aventura
                    </h2>
                    <h3 className="w-[329px] font-heebo font-normal text-[20px] leading-[30px] text-text">
                        Descubra locais incríveis para se visitar em cidades maravilhosas de Minas Gerais.
                    </h3>
                    <Link href="/cities/list">
                        <button className="w-[329px] mt-2 h-[72px] bg-brand-orange rounded-[10px] font-heebo font-medium text-shape text-lg leading-[26px]">Descobrir todos os lugares</button>
                    </Link>
                </aside>
                <article className="flex gap-8 mt-4 w-full">
                    <div className="flex gap-8 flex-col">
                        {
                            cities.slice(0, 3).map(city => (
                                <CardCity
                                    key={city.id}
                                    name={city.name}
                                    image={'/caparao.jpg'}
                                    id={city.id}
                                    countPlaces={city.places.length}
                                    onlyReading
                                />
                            ))
                        }
                    </div>
                    <div className="flex gap-8 flex-col mt-[75px]">
                        {
                            cities.slice(4, 6).map(city => (
                                <CardCity
                                    key={city.id}
                                    name={city.name}
                                    image={'/caparao.jpg'}
                                    id={city.id}
                                    countPlaces={city.places.length}
                                    onlyReading
                                />
                            ))
                        }
                    </div>
                </article>
            </main>
        </div>
    )
}

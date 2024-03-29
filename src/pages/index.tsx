import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CardCity } from '../components/card/CardCity'
import { api } from '../services/api'

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
    <div className="h-full md:max-h-[820px] w-full overflow-hidden bg-background px-8 md:px-[160px]">
      <header className="mt-8 md:mt-6 flex justify-between">
        <img src="/traveler.svg" alt="" />
        <Link href="/login">
          <button className="h-12 w-[174px] rounded-[10px] bg-blue_light font-heebo text-base font-medium leading-[26px] text-brand-blue hover:opacity-90">
            Acesso restrito
          </button>
        </Link>
      </header>
      <main className="flex flex-col md:flex-row gap-24 md:gap-[150px]">
        <aside className="mt-16 md:mt-[138px] flex flex-col md:gap-10 gap-14">
          <h2 className="w-[317px] font-barlow text-6xl md:text-[80px] font-semibold leading-12 md:leading-[74px] text-title">
            Viva uma grande aventura
          </h2>
          <h3 className="w-[329px] font-heebo text-[20px] font-normal leading-[30px] text-text">
            Descubra locais incríveis para se visitar em cidades maravilhosas de
            Minas Gerais e do Brasil.
          </h3>
          <Link href="/cities/list">
            <button className="mt-6 hidden md:block md:mt-2 h-[72px] w-[329px] mx-auto md:mx-0 rounded-[10px] bg-brand-orange font-heebo text-lg font-medium leading-[26px] text-shape">
              Descobrir todos os lugares
            </button>
          </Link>
        </aside>
        <article className="md:mt-4 -mt-6 flex-col md:flex ml-5 w-full gap-8">
          <div className="flex flex-col gap-8">
            {cities.slice(0, 3).map((city) => (
              <CardCity
                key={city.id}
                name={city.name}
                image={city.image}
                id={city.id}
                countPlaces={city.places.length}
                module={`/cities/city/`}
                onlyReading
              />
            ))}
          </div>
          <div className="mt-[75px] md:flex flex-col gap-8 hidden">
            {cities.slice(4, 6).map((city) => (
              <CardCity
                key={city.id}
                name={city.name}
                image={'/caparao.jpg'}
                id={city.id}
                countPlaces={city.places.length}
                onlyReading
              />
            ))}
          </div>
        </article>
        <Link href="/cities/list">
            <button className="mt-6 md:hidden mb-10 md:mb-0 md:mt-2 h-[72px] w-[329px] mx-auto md:mx-0 rounded-[10px] bg-brand-orange font-heebo text-lg font-medium leading-[26px] text-shape">
              Descobrir todos os lugares
            </button>
          </Link>
      </main>
    </div>
  )
}

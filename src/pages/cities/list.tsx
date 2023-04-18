import Link from "next/link"
import { useEffect, useState } from "react"
import { FiSearch, FiX } from 'react-icons/fi'
import { api } from "../../services/api"

interface CityData {
  id: string
  name: string
  image?: string
  description?: string
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

export default function ListCities() {
  const [cities, setCities] = useState<CityData[]>([])
  const [places, setPlaces] = useState<PlaceData[]>([])
  const [search, setSearch] = useState('')

  async function getCities() {
    try {
      const response = await api.get('cities')
      setCities(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getPlaces() {
    try {
      const response = await api.get('places')
      setPlaces(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCities()
    getPlaces()
  }, [])

  function countPlacesToCityId(city_id: string) {
    const filteredArrayToCityId = places.filter(
      (place: PlaceData) => place.city_id === city_id
    )
    return filteredArrayToCityId.length
  }
  return (
    <div className="bg-background w-full h-full max-h-[820px] overflow-hidden">
      <header className="flex justify-around items-center h-24 bg-shape">
        <img src="/traveler.svg" alt="" width={126} height={26} />
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-[18px]">
            <FiSearch size={20} color={`${search === '' ? '#A0ACB2' : '#F25D27'}`} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Qual cidade você procura?"
            className="pl-[54px] w-[416px] text-base leading-[26px] text-title placeholder:text-complement h-12 bg-background rounded-[10px] border border-background_secondary"
          />
          {
            search !== '' && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-[16px]">
                <FiX size={20} color="#A0ACB2" onClick={() => setSearch('')} />
              </div>
            )
          }
        </div>
        <Link href="/login">
          <button className="w-[174px] h-12 bg-blue_light rounded-[10px] font-heebo font-medium text-brand-blue text-base leading-[26px] hover:opacity-90">Acceso restrito</button>
        </Link>
      </header>
      <main className="flex flex-row gap-[150px]">
        {/* {
          cities.map(city => (
            <CardCity
              key={city.id}
              name={city.name}
              image={'/caparao.jpg'}
              id={city.id}
              countPlaces={countPlacesToCityId(city.id)}
              onlyReading
            />
          ))
        } */}
      </main>
    </div>
  )
}

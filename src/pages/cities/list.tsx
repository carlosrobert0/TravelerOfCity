import Link from "next/link"
import { useEffect, useState } from "react"
import { FiChevronDown, FiSearch, FiX } from 'react-icons/fi'
import { CardCity } from "../../components/card/CardCity"
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
  const [filteredCities, setFilteredCities] = useState<CityData[]>([])

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

  function filterCities() {
    const filteredCitiesArray =
      search === '' ? cities :
        cities.filter(city =>
          city.name.toLowerCase().includes(search.toLowerCase())
        )

    setFilteredCities(filteredCitiesArray)
  }

  useEffect(() => {
    getCities()
    getPlaces()
  }, [])

  useEffect(() => {
    filterCities()
  }, [search])

  function countPlacesToCityId(city_id: string) {
    const filteredArrayToCityId = places.filter(
      (place: PlaceData) => place.city_id === city_id
    )
    return filteredArrayToCityId.length
  }
  return (
    <div className="bg-background w-full h-full">
      <header className="flex justify-between items-center h-24 bg-shape px-[160px]">
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
          <button className="w-[174px] h-12 bg-blue_light rounded-[10px] font-heebo font-medium text-brand-blue text-base leading-[26px] hover:opacity-90">
            Acesso restrito
          </button>
        </Link>
      </header>
      <hr className="border-shape_secondary" />
      <main className={`flex flex-col mt-10 px-[160px] gap-10 ${filteredCities.length <= 0 && 'items-center'}`}>
        {
          filteredCities.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="font-barlow font-semibold text-title text-4xl leading-[46px]">Selecione uma cidade</h2>
                <ul className="flex gap-8">
                  <li>
                    Todas
                  </li>
                  <li>
                    Mais acessados
                  </li>
                  <li className="flex items-center gap-[10px]">
                    <p>A - Z</p>
                    <FiChevronDown size={10} color="#F25D27" />
                  </li>
                </ul>
              </div>
              <div className="w-full max-w-[1120px] flex flex-wrap gap-8 m-auto">
                {
                  filteredCities.map(city => (
                    <CardCity
                      key={city.id}
                      name={city.name}
                      image={'/caparao.jpg'}
                      id={city.id}
                      countPlaces={countPlacesToCityId(city.id)}
                      onlyReading
                      listCities
                      module={`/cities/city/${city.id}`}
                    />
                  ))
                }
              </div>
            </>
          ) : (
            <div className="mt-[268px] flex flex-col items-center gap-8">
              <img src="/withoutResult.svg" alt="" width={80} height={80} />
              <h3 className="font-heebo font-medium text-2xl leading-[34px] text-text text-center">Sem resultados. <br /> Tente uma nova busca</h3>
            </div>
          )
        }
      </main>
    </div>
  )
}

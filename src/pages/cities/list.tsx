import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { CardCity } from '../../components/card/CardCity'
import { NavCities } from '../../components/NavCities'
import { api } from '../../services/api'

interface PlaceData {
  id: string
  name: string
  image: string
  description: string
  category_id: string
  address_id: string
  city_id: string
}
interface CityData {
  id: string
  name: string
  image?: string
  description?: string
  places?: PlaceData[]
}

export default function ListCities() {
  const [cities, setCities] = useState<CityData[]>([])
  const [search, setSearch] = useState('')
  const [filteredCities, setFilteredCities] = useState<CityData[]>([])
  const [selectedFilterCities, setSelectedSelectedFilterCities] = useState('')

  async function getCities() {
    try {
      const response = await api.get('cities')
      setCities(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  function filterCities() {
    const filteredCitiesArray =
      search === ''
        ? cities
        : cities.filter((city) =>
            city.name.toLowerCase().includes(search.toLowerCase()),
          )

    setFilteredCities(filteredCitiesArray)
  }

  const citiesFilter = [
    {
      name: 'Mais acessados',
      filterCities: 'mostAccessed',
    },
    {
      name: 'A - Z',
      filterCities: 'az',
    },
  ]

  useEffect(() => {
    getCities()
  }, [])

  useEffect(() => {
    filterCities()
  }, [search, cities])

  return (
    <div className="h-full w-full bg-background">
      <header className="flex h-24 items-center justify-between bg-shape px-[160px]">
        <Image src="/traveler.svg" alt="" width={126} height={26} />
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-[18px]">
            <FiSearch
              size={20}
              color={`${search === '' ? '#A0ACB2' : '#F25D27'}`}
            />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Qual cidade você procura?"
            className="h-12 w-[416px] rounded-[10px] border border-background_secondary bg-background pl-[54px] text-base leading-[26px] text-title placeholder:text-complement"
          />
          {search !== '' && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-[16px]">
              <FiX
                size={20}
                color="#A0ACB2"
                onClick={() => setSearch('')}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
        <Link href="/login">
          <button className="h-12 w-[174px] rounded-[10px] bg-blue_light font-heebo text-base font-medium leading-[26px] text-brand-blue hover:opacity-90">
            Acesso restrito
          </button>
        </Link>
      </header>
      <hr className="border-shape_secondary" />
      <main
        className={`mt-10 flex flex-col gap-10 px-[160px] ${
          filteredCities.length <= 0 && 'items-center'
        }`}
      >
        {filteredCities.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="font-barlow text-4xl font-semibold leading-[46px] text-title">
                Selecione uma cidade
              </h2>
              <div className="flex gap-8">
                <NavCities
                  selectedFilterCities={selectedFilterCities}
                  handleSelectedFilterCities={setSelectedSelectedFilterCities}
                  cities={citiesFilter}
                />
              </div>
            </div>
            <div className="flex w-full flex-wrap gap-8">
              {selectedFilterCities === 'az'
                ? filteredCities
                    .sort((cityA, cityB) =>
                      cityA.name.localeCompare(cityB.name),
                    )
                    .map((city) => (
                      <CardCity
                        key={city.id}
                        name={city.name}
                        image={city.image}
                        id={city.id}
                        countPlaces={city.places.length}
                        onlyReading
                        listCities
                        module={`/cities/city/`}
                      />
                    ))
                : filteredCities
                    .sort((cityA, cityB) =>
                      cityB.name.localeCompare(cityA.name),
                    )
                    .map((city) => (
                      <CardCity
                        key={city.id}
                        name={city.name}
                        image={city.image}
                        id={city.id}
                        countPlaces={city.places.length}
                        onlyReading
                        listCities
                        module={`/cities/city/`}
                      />
                    ))}
            </div>
          </>
        ) : (
          <div className="mt-[268px] flex flex-col items-center gap-8">
            <Image src="/withoutResult.svg" alt="" width={80} height={80} />
            <h3 className="text-center font-heebo text-2xl font-medium leading-[34px] text-text">
              Sem resultados. <br /> Tente uma nova busca
            </h3>
          </div>
        )}
      </main>
    </div>
  )
}

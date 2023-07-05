import { useEffect, useState } from 'react'
import { CardCity } from '../../components/card/CardCity'
import HeaderCity from '../../components/HeaderCity'
import Nav from '../../components/Nav'
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

export default function Cities() {
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
    <div className="flex h-[820px] max-h-[820px] w-full justify-between overflow-hidden overflow-x-hidden">
      <Nav />

      <main className="ml-24 flex w-full flex-col overflow-x-hidden overflow-y-scroll">
        <HeaderCity />
        <hr className="w-full bg-shape_secondary" />
        <div className="xl:28 mt-px-28 mt-12 ml-28 flex h-[862px] w-full flex-wrap gap-x-8 gap-y-8">
          {cities.map((city) => {
            return (
              <CardCity
                key={city.id}
                name={city.name}
                image={city?.image}
                id={city.id}
                countPlaces={city.places.length}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}

import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

import { CardCity } from '../../components/card/CardCity'
import HeaderCity from '../../components/HeaderCity'
import Nav from '../../components/Nav'
import { useAuth } from '../../contexts/AuthContext'
import { api } from '../../services/api'

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

export default function Cities() {
    const [cities, setCities] = useState<CityData[]>([])
    const [places, setPlaces] = useState<PlaceData[]>([])

    const cookies = parseCookies()

    const router = useRouter()

    const { signOutApplication } = useAuth()

    async function getPlaces() {
        try {
            const response = await api.get('places', {
                headers: {
                    Authorization: `Bearer ${cookies['caparao.token']}`,
                },
            })
            setPlaces(response.data)
        } catch (error) {
            if (error.response.status === 401) {
                signOutApplication(router)
            }
        }
    }

    async function getCities() {
        try {
            const response = await api.get('cities', {
                headers: {
                    Authorization: `Bearer ${cookies['caparao.token']}`,
                },
            })
            setCities(response.data)
        } catch (error) {
            if (error.response.status === 401) {
                signOutApplication(router)
            }
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
                                image="/caparao.jpg"
                                id={city.id}
                                countPlaces={countPlacesToCityId(city.id)}
                            />
                        )
                    }
                    )}
                </div>
            </main>
        </div>
    )
}

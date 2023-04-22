import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { CardCategory } from '../../components/card/CardCategory'

import HeaderCategory from '../../components/HeaderCategory'
import Nav from '../../components/Nav'
import { useAuth } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { renderIconNameByCategoryName } from '../../utils/renderIconNameByCategoryName'
interface PlaceData {
    id: string
    name: string
    image: string
    description: string
    category_id: string
    address_id: string
    city_id: string
}

interface CategoryData {
    id: string
    name: string
    Places: PlaceData[]
}

export default function Categories() {
    const [categories, setCategories] = useState<CategoryData[]>([])

    const cookies = parseCookies()

    const router = useRouter()

    const { signOutApplication } = useAuth()

    async function getCategories() {
        try {
            const response = await api.get('categories', {
                headers: {
                    Authorization: `Bearer ${cookies['caparao.token']}`,
                },
            })
            setCategories(response.data)
        } catch (error) {
            if (error.response.status === 401) {
                signOutApplication(router)
            }
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="flex h-[820px] max-h-[820px] w-full justify-between overflow-hidden overflow-x-hidden">
            <Nav />

            <main className="ml-24 flex w-full flex-col overflow-x-hidden overflow-y-scroll">
                <HeaderCategory />
                <hr className="w-full bg-shape_secondary" />
                <div className="xl:28 mt-px-28 mt-12 ml-28 flex h-[862px] w-full flex-wrap gap-x-8 gap-y-8">
                    {categories.map(category => (
                        <CardCategory
                            key={category.id}
                            count={category.Places.length}
                            title={category.name}
                            icon={renderIconNameByCategoryName(`${category.name}`)}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

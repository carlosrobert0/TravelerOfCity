import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { FiAlertCircle, FiCamera, FiEdit3, FiTrash } from 'react-icons/fi'

import Nav from '../../components/Nav'
import CardCategory from '../../components/card/CardCategory'
import { CardCity } from '../../components/card/CardCity'
import { CardPlace } from '../../components/card/CardPlace'
import { api } from '../../services/api'
import { CityFormData } from './create'
import { IconsHandleCard } from '../../components/IconsHandleCard'
import { renderIcon } from '../../utils/renderIcon'
import { NavCategories } from '../../components/NavCategories'
import { renderIconNameByCategoryName } from '../../utils/renderIconNameByCategoryName'

export default function City() {
  const [city, setCity] = useState<CityFormData | null>()
  const [places, setPlaces] = useState([])
  const [categories, setCategories] = useState([])
  const router = useRouter()

  const [hasProminence, setHasProminence] = useState(false)

  const { id } = router.query
  const { cityId } = router.query

  function handleGoBack() {
    router.back()
  }

  async function getCity() {
    const response = await api.get(`/cities/${id}`)
    setCity(response.data)
  }

  async function getPlaces() {
    const response = await api.get('/places')
    console.log(response.data)
    setPlaces(response.data)
  }

  async function getCategories() {
    const response = await api.get('/categories')
    console.log(response.data)
    setCategories(response.data)
  }

  useEffect(() => {
    getCategories()
    getPlaces()
    getCity()
  }, [])

  const placesByCityId = places.filter((place: any) => place.city_id === id)
  
  const placesTuristicsPoints = placesByCityId.filter((place: any) => place.category_id === "34646883-4bc0-4c8c-9536-f513c1165cf9")
  const placesEvents = placesByCityId.filter((place: any) => place.category_id === "4aa4b365-c6bd-4d41-bde4-b5054dd52b69")
  const placesFood = placesByCityId.filter((place: any) => place.category_id === "78aad295-e3d4-475d-930e-39b268fae11d")

  function getCountPlacesByCategoryName(categoryName: string) {
    switch (categoryName) {
      case 'Eventos Organizados':
        return placesTuristicsPoints.length
        break;
      case 'Comidas e Bebidas':
        return placesFood.length
        break;
      case 'Pontos Turísticos':
        return placesEvents.length
        break;
      default:
        ''
        break;
    }
  }

  return (
    <div className="flex h-[2000px] w-full justify-between overflow-hidden overflow-x-hidden">
      <Nav />

      <main className="relative ml-24 flex w-full flex-col overflow-x-hidden overflow-y-scroll">
        <header
          className={`flex h-[96px] w-full items-center bg-shape px-20`}
        >
          <BsArrowLeft
            onClick={handleGoBack}
            className="my-6 w-[128px] font-barlow text-4xl font-semibold leading-10 text-complement"
          />
          <div className="ml-[700px] mr-6 flex gap-1">
            <button 
              onClick={() => router.push(`/cities/edit/${city?.id}`)}
              className="top-4 right-16 flex h-10 w-10 items-center justify-center rounded-l-xl border-[1px] border-shape_secondary bg-shape text-text">
              <FiEdit3 size={20} />
            </button>
            <button 
              onClick={() => router.push(`/cities/delete/${id}`)}
              className="top-4 right-4 flex h-10 w-10 items-center justify-center rounded-r-xl border-[1px] border-shape_secondary bg-shape text-text">
              <FiTrash size={20} />
            </button>
          </div>
          <Link href={`/place/create/${city?.id}`}>
            <a className="flex h-[48px] w-[216px] items-center justify-center rounded-lg bg-success font-heebo text-base font-medium leading-[26px] text-shape">
              + Adicionar um local
            </a>
          </Link>
        </header>
        <hr className="w-[1344px] border bg-shape_secondary" />
        <div className="h-[862px] w-full flex-1">
          <Image
            src={'/imgBanner.png'}
            objectFit="cover"
            width={1440}
            height={340}
          />

          <section className="flex gap-[103px] px-28 pt-20">
            <div className="flex flex-col">
              <h1 className="mb-10 font-barlow text-[54px] font-semibold leading-[54px] text-title">
                {city?.name}
              </h1>
              <h3 className="font-regular mb-8 w-[506px] font-heebo text-xl leading-[30px] text-title">
                {city?.description}
              </h3>
              <h6 className="font-regular w-[506px] font-heebo text-base leading-[26px] text-text">
                {city?.description}
              </h6>
            </div>
            <div className="flex gap-4">
              {categories.map((category: any) => (
                <CardCategory
                  count={getCountPlacesByCategoryName(category?.name)}
                  title={category?.name}
                  icon={renderIconNameByCategoryName(category?.name)}
                />
              ))}
            </div>
          </section>

          <section className="ml-28 mt-[120px] flex flex-col gap-8">
            <h3 className="font-barlow text-4xl font-semibold leading-[46px] text-title">
              Top avaliados
            </h3>
            <div className="flex justify-start gap-8">
              <CardPlace
                name="Morro da Canoa"
                avaliation="5,5"
                category_id="78aad295-e3d4-475d-930e-39b268fae11d"
                image="/caparao.jpg"
              />
              <button className="h-[307px] w-64 rounded-2xl border border-dashed border-shape_secondary bg-shape" />
              <button className="h-[307px] w-64 rounded-2xl border border-dashed border-shape_secondary bg-shape" />
              <button className="h-[307px] w-64 rounded-2xl border border-dashed border-shape_secondary bg-shape" />
            </div>
          </section>

          {
            hasProminence ? (
              <section className="relative mb-20 mt-20 ml-28 flex h-[286px] w-[1120px] items-center justify-center overflow-hidden rounded-2xl border-[2px] border-dashed border-shape_secondary bg-shape">
                <h1 className="text-center font-heebo text-base leading-[26px] text-brand-orange">
                  Crie um destaque arrastando um card aqui
                </h1>
              </section>
            ) : (
              <section className="w-[1120px] h-[286px] overflow-hidden mb-20 mt-20 bg-shape border-[1px] border-shape_secondary rounded-2xl flex justify-between ml-28 relative">
                <div className="flex flex-col w-[560px] h-[194px] mt-[43px] ml-16 mr-[60px] justify-between">
                  <div className="flex justify-between items-center">
                    <span className="w-[119px] gap-2 flex rounded-2xl h-8 bg-brand-orange text-shape items-center justify-center">
                      <FiAlertCircle size={20} />
                      <h6 className="font-barlow font-semibold text-sm leading-4">Destaque</h6>
                    </span>
                    <div className="w-[200px] flex h-[26px] gap-6">
                      <FiCamera size={24} color="#F25D27" />
                      <h4 className="font-barlow font-medium text-base leading-[26px] text-text">Pontos turísticos</h4>
                    </div>
                  </div>
                  <h1 className="font-barlow font-semibold text-4xl leading-9 text-title mt-8 mb-4">Praia dos Ingleses</h1>
                  <h4 className="font-heebo font-regular text-base leading-[26px] text-text">Uma parte do paraíso na terra. Frequentemente com águas
                    claras em tons verdes e azuis. Um dos locais mais preferidos
                    por turistas e viajantes.
                  </h4>
                </div>
                <Image src="/imgDestaque.png" objectFit="cover" width="650px" height="286px" className="ml-10" />
                <IconsHandleCard id={city?.id}/>
              </section>
            )
          }
          <section className="ml-28 flex h-[756px] w-full flex-col">
            <div className="mb-8 flex  items-center justify-between">
              <h1 className="font-barlow text-4xl font-semibold leading-[46px] text-title">
                Conheça todos
              </h1>
              <div className="mr-52 flex w-[538px] flex-col">
                <NavCategories />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-8">
                {
                  placesByCityId.map((placeByCityId: any) => {
                    return (
                      <CardPlace
                        key={placeByCityId.id}
                        name={placeByCityId.name}
                        avaliation="5,5"
                        category_id={
                          placeByCityId.category_id
                        }
                        place_id={
                          placeByCityId.id
                        }
                        image="/caparao.jpg"
                      />
                    )
                  })
                }
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

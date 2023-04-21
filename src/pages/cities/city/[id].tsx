import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiAlertCircle, FiArrowLeft, FiCamera } from 'react-icons/fi'

import CardCountPlacesByCategory from '../../../components/card/CardCountPlacesByCategory'
import { CardPlace } from '../../../components/card/CardPlace'
import { NavCategories } from '../../../components/NavCategories'
import { api } from '../../../services/api'
import { renderIconNameByCategoryName } from '../../../utils/renderIconNameByCategoryName'
import { CityFormData } from './../create'

export default function CityRead() {
  const [city, setCity] = useState<CityFormData | null>()
  const [places, setPlaces] = useState([])
  const [categories, setCategories] = useState([])
  const router = useRouter()

  const [hasProminence, setHasProminence] = useState(false)

  const { id } = router.query

  function handleGoBack() {
    router.back()
  }

  async function getCity() {
    const response = await api.get(`/cities/${id}`)
    console.log(response)
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

  const placesTuristicsPoints = placesByCityId.filter((place: any) => place.category_id === "90f0e4c3-5d55-4b45-b1cd-effbfb515860")
  const placesEvents = placesByCityId.filter((place: any) => place.category_id === "6f811e72-39bc-41e3-98aa-e180d73762d1")
  const placesFood = placesByCityId.filter((place: any) => place.category_id === "6467006b-2c17-4800-9e7e-5dfcb8e27ad9")

  function getCountPlacesByCategoryName(categoryName: string) {
    switch (categoryName) {
      case 'Eventos Organizados':
        if (placesTuristicsPoints.length > 0 && placesTuristicsPoints.length < 9) {
          return `0${placesTuristicsPoints.length}`
        } else {
          return placesTuristicsPoints.length
        }
      case 'Comida e Bebida':
        if (placesFood.length > 0 && placesFood.length < 9) {
          return `0${placesFood.length}`
        } else {
          return placesFood.length
        }
      case 'Pontos Turísticos':
        if (placesEvents.length > 0 && placesEvents.length < 9) {
          return `0${placesEvents.length}`
        } else {
          return placesEvents.length
        }
      default:
        ''
        break;
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex justify-between items-center h-24 bg-shape px-[160px]">
        <div className="flex gap-[34px] items-center">
          <img src="/traveler.svg" alt="" width={126} height={26} />
          <div className="w-10 h-10 rounded-[10px] border border-shape_secondary flex justify-center items-center">
            <FiArrowLeft size={24} onClick={handleGoBack} color="#A0ACB2" />
          </div>
        </div>
        <h2 className="font-barlow font-medium text-xl leading-[30px] text-complement">{city?.name}</h2>
        <Link href="/login">
          <button className="w-[174px] h-12 bg-blue_light rounded-[10px] font-heebo font-medium text-brand-blue text-base leading-[26px] hover:opacity-90">
            Acesso restrito
          </button>
        </Link>
      </header>
      <hr className="border bg-shape_secondary" />
      <main className="relative flex w-full flex-col">
        <Image
          src="/caparao.jpg"
          objectFit="cover"
          width={1440}
          height={340}
          layout="responsive"
        />

        <section className="flex gap-[103px] px-[160px] pt-20">
          <div className="flex flex-col">
            <h1 className="mb-10 font-barlow text-[54px] font-semibold leading-[54px] text-title">
              {city?.name}
            </h1>
            <h3 className="font-regular mb-8 w-[506px] font-heebo text-xl leading-[30px] text-title">
              {city?.description}
            </h3>
          </div>
          <div className="flex gap-4">
            {categories.map((category: any) => (
              <CardCountPlacesByCategory
                count={getCountPlacesByCategoryName(category?.name)}
                title={category?.name}
                icon={renderIconNameByCategoryName(category?.name)}
              />
            ))}
          </div>
        </section>

        <section className="px-[160px] mt-[120px] flex flex-col gap-8">
          <h3 className="font-barlow text-4xl font-semibold leading-[46px] text-title">
            Top avaliados
          </h3>
          <div className="flex justify-start gap-8">
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
                    onlyReading
                  />
                )
              })
            }
            <button className="h-[307px] w-64 rounded-2xl border border-dashed
               border-shape_secondary bg-shape" />
            <button className="h-[307px] w-64 rounded-2xl border border-dashed
               border-shape_secondary bg-shape" />
          </div>
        </section>

        {
          hasProminence ? (
            <section className="relative mb-20 mt-20 mx-[160px] flex h-[286px] 
                w-[1120px] items-center justify-center overflow-hidden rounded-2xl 
                border-2 border-dashed border-shape_secondary bg-shape"
            >
              <h1 className="text-center font-heebo text-base leading-[26px] text-brand-orange">
                Crie um destaque arrastando um card aqui
              </h1>
            </section>
          ) : (
            <section className="w-[1120px] h-[286px] overflow-hidden mb-20 
                mt-20 bg-shape border border-shape_secondary rounded-2xl flex justify-between mx-[160px] relative"
            >
              <div className="flex flex-col w-[560px] h-[194px] mt-[43px] ml-16 mr-[60px] justify-between">
                <div className="flex justify-between items-center">
                  <span className="w-[119px] gap-2 flex rounded-2xl h-8 bg-brand-orange text-shape 
                      items-center justify-center"
                  >
                    <FiAlertCircle size={20} />
                    <h6 className="font-barlow font-semibold text-sm leading-4">Destaque</h6>
                  </span>
                  <div className="w-[200px] flex h-[26px] gap-6">
                    <FiCamera size={24} color="#F25D27" />
                    <h4 className="font-barlow font-medium text-base leading-[26px] text-text">
                      Pontos turísticos
                    </h4>
                  </div>
                </div>
                <h1 className="font-barlow font-semibold text-4xl leading-9 text-title mt-8 mb-4">
                  Praia dos Ingleses
                </h1>
                <h4 className="font-heebo font-regular text-base leading-[26px] text-text">
                  Uma parte do paraíso na terra. Frequentemente com águas
                  claras em tons verdes e azuis. Um dos locais mais preferidos
                  por turistas e viajantes.
                </h4>
              </div>
              <Image src="/imgDestaque.png" objectFit="cover" width="650px" height="286px" className="ml-10" />
            </section>
          )
        }

        <section className="px-[160px] flex h-[756px] w-full flex-col">
          <div className="mb-12 flex items-end justify-between w-[1120px]">
            <h1 className="font-barlow text-4xl font-semibold leading-[46px] text-title">
              Conheça todos
            </h1>
            <div className="flex flex-col">
              <NavCategories />
            </div>
          </div>
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
                    onlyReading
                  />
                )
              })
            }
          </div>
        </section>
      </main>
    </div>
  )
}

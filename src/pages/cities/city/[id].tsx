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
  const [city, setCity] = useState<CityFormData | null | any>()
  const [categories, setCategories] = useState([])
  const router = useRouter()

  const [hasProminence] = useState(false)

  const { id } = router.query

  function handleGoBack() {
    router.back()
  }

  async function getCity() {
    const response = await api.get(`/cities/${id}`)
    console.log(response)
    setCity(response.data)
  }

  async function getCategories() {
    const response = await api.get('/categories')
    console.log(response.data)
    setCategories(response.data)
  }

  useEffect(() => {
    getCategories()
    getCity()
  }, [])

  return (
    <div className="flex flex-col">
      <header className="flex h-24 items-center justify-between bg-shape px-[160px]">
        <div className="flex items-center gap-[34px]">
          <Image src="/traveler.svg" alt="" width={126} height={26} />
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-shape_secondary">
            <FiArrowLeft
              size={24}
              onClick={handleGoBack}
              color="#A0ACB2"
              className="cursor-pointer"
            />
          </div>
        </div>
        <h2 className="font-barlow text-xl font-medium leading-[30px] text-complement">
          {city?.name}
        </h2>
        <Link href="/login">
          <button className="h-12 w-[174px] rounded-[10px] bg-blue_light font-heebo text-base font-medium leading-[26px] text-brand-blue hover:opacity-90">
            Acesso restrito
          </button>
        </Link>
      </header>
      <hr className="border bg-shape_secondary" />
      <main className="relative flex w-full flex-col">
        <Image
          alt=""
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
            {categories.map((category: any) => {
              const places = category.Places.filter(
                (place: any) => place.city_id === id,
              )
              const count = places.length
              return (
                <CardCountPlacesByCategory
                  key={category.id}
                  count={count > 0 && count < 9 ? `0${count}` : `${count}`}
                  title={category.name}
                  icon={renderIconNameByCategoryName(category.name)}
                />
              )
            })}
          </div>
        </section>

        <section className="mt-[120px] flex flex-col gap-8 px-[160px]">
          <h3 className="font-barlow text-4xl font-semibold leading-[46px] text-title">
            Top avaliados
          </h3>
          <div className="flex justify-start gap-8">
            {city?.places.slice(0, 4).map((placeByCityId: any) => {
              return (
                <CardPlace
                  key={placeByCityId.id}
                  name={placeByCityId.name}
                  avaliation="5,5"
                  category_name={renderIconNameByCategoryName(
                    placeByCityId?.category?.name,
                  )}
                  category_id={placeByCityId.category_id}
                  place_id={placeByCityId.id}
                  image="/caparao.jpg"
                  onlyReading
                />
              )
            })}
          </div>
        </section>

        {hasProminence ? (
          <section
            className="relative mx-[160px] mb-20 mt-20 flex h-[286px] 
                w-[1120px] items-center justify-center overflow-hidden rounded-2xl 
                border-2 border-dashed border-shape_secondary bg-shape"
          >
            <h1 className="text-center font-heebo text-base leading-[26px] text-brand-orange">
              Crie um destaque arrastando um card aqui
            </h1>
          </section>
        ) : (
          <section
            className="relative mx-[160px] mb-20 mt-20 
                flex h-[286px] w-[1120px] justify-between overflow-hidden rounded-2xl border border-shape_secondary bg-shape"
          >
            <div className="mt-[43px] ml-16 mr-[60px] flex h-[194px] w-[560px] flex-col justify-between">
              <div className="flex items-center justify-between">
                <span
                  className="flex h-8 w-[119px] items-center justify-center gap-2 rounded-2xl 
                      bg-brand-orange text-shape"
                >
                  <FiAlertCircle size={20} />
                  <h6 className="font-barlow text-sm font-semibold leading-4">
                    Destaque
                  </h6>
                </span>
                <div className="flex h-[26px] w-[200px] gap-6">
                  <FiCamera size={24} color="#F25D27" />
                  <h4 className="font-barlow text-base font-medium leading-[26px] text-text">
                    Pontos turísticos
                  </h4>
                </div>
              </div>
              <h1 className="mt-8 mb-4 font-barlow text-4xl font-semibold leading-9 text-title">
                Praia dos Ingleses
              </h1>
              <h4 className="font-regular font-heebo text-base leading-[26px] text-text">
                Uma parte do paraíso na terra. Frequentemente com águas claras
                em tons verdes e azuis. Um dos locais mais preferidos por
                turistas e viajantes.
              </h4>
            </div>
            <Image
              alt=""
              src="/imgDestaque.png"
              objectFit="cover"
              width="650px"
              height="286px"
              className="ml-10"
            />
          </section>
        )}

        <section className="flex h-[756px] w-full flex-col px-[160px]">
          <div className="mb-12 flex w-[1120px] items-end justify-between">
            <h1 className="font-barlow text-4xl font-semibold leading-[46px] text-title">
              Conheça todos
            </h1>
            <div className="flex flex-col">
              <NavCategories />
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            {city?.places.map((placeByCityId: any) => {
              return (
                <CardPlace
                  key={placeByCityId.id}
                  name={placeByCityId.name}
                  avaliation="5,5"
                  category_name={renderIconNameByCategoryName(
                    placeByCityId?.category?.name,
                  )}
                  category_id={placeByCityId.category_id}
                  place_id={placeByCityId.id}
                  image="/caparao.jpg"
                  onlyReading
                />
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

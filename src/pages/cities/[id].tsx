import { useRouter } from 'next/router'
import Image from 'next/image'
import Nav from '../../components/Nav'
import CardCategory from '../../components/CardCategory'
import { Card } from '../../components/Card'
import { FiAlertCircle, FiCamera, FiEdit3, FiTrash } from 'react-icons/fi'
import { IconsHandleCard } from '../../components/IconsHandleCard'
import { BsArrowLeft } from 'react-icons/bs'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

export default function City() {
  const [places, setPlaces] = useState(null)
  const router = useRouter()
  const { id } = router.query
  function handleGoBack() {
    router.back()
  }

  useEffect(() => {
    async function getPlaces() {
      const response = await api.get('/places')
      setPlaces(response.data)
    }
    getPlaces()
  }, [])

  return (
    <div className="w-full h-[2000px] flex justify-between overflow-x-hidden overflow-hidden">
      <Nav />

      <main className="flex flex-col w-full ml-24 overflow-x-hidden overflow-y-scroll relative">
        <header className={`w-full h-[96px] flex items-center bg-shape px-28`}>
          <BsArrowLeft onClick={handleGoBack} className="font-barlow font-semibold w-[128px] text-4xl leading-10 text-complement my-6" />
          <div className="flex gap-1 ml-[700px] mr-6">
            <button className="w-10 h-10 rounded-l-xl text-text bg-shape top-4 right-16 border-[1px] border-shape_secondary flex items-center justify-center">
              <FiEdit3 size={20} />
            </button>
            <button className="w-10 h-10 rounded-r-xl text-text bg-shape top-4 right-4 border-[1px] border-shape_secondary flex items-center justify-center">
              <FiTrash size={20} />
            </button>
          </div>
          <Link href="/place/create">
            <a className="bg-success w-full h-[48px] flex items-center justify-center font-heebo font-medium text-base leading-[26px] rounded-lg text-shape">+ Adicionar um local</a>
          </Link>
        </header>
        <span className="border-[1px] text-shape_secondary w-[1344px]" />
        <div className="w-full h-[862px] flex-1">
          <Image src="/imgBanner.png" objectFit="cover" width={1440} height={340} />

          <section className="flex pt-20 px-28 gap-[103px]">
            <div className="flex flex-col">
              <h1 className="font-barlow font-semibold text-[54px] leading-[54px] text-title mb-10">{id}</h1>
              <h3 className="w-[506px] font-heebo font-regular text-title text-xl leading-[30px] mb-8">Capital do estado de Santa Catarina no sul do Brasil,
                é maioritariamente constituída pela Ilha de Santa Catarina, com 54 km de comprimento.
              </h3>
              <h6 className="w-[506px] text-text font-heebo font-regular text-base leading-[26px]">É famosa pelas suas praias, incluindo estâncias turísticas
                populares como a Praia dos Ingleses na extremidade norte da ilha.
              </h6>
            </div>
            <div className="flex gap-4">
              <CardCategory count="0" title="Comidas e Bebidas" icon="coffee" />
              <CardCategory count="01" title="Pontos Turísticos" icon="camera" />
              <CardCategory count="0" title="Eventos Organizados" icon="calendar" />
            </div>
          </section>

          <section className="flex flex-col gap-8 ml-28 mt-[120px]">
            <h3 className="font-barlow text-4xl leading-[46px] font-semibold text-title">Top avaliados</h3>
            <div className="gap-8 flex">
              {/* <Card name="Doce & Companhia" avaliation="4,7" route="place" />
              <Card name="Doce & Companhia" avaliation="5,0" route="place" />
              <Card name="Doce & Companhia" avaliation="5,0" route="place" />
              <Card name="Doce & Companhia" avaliation="4,7" route="place" /> */}
              <button className="w-64 h-[307px] rounded-2xl border border-shape_secondary bg-shape border-dashed" />
              <button className="w-64 h-[307px] rounded-2xl border border-shape_secondary bg-shape border-dashed" />
              <button className="w-64 h-[307px] rounded-2xl border border-shape_secondary bg-shape border-dashed" />
              <button className="w-64 h-[307px] rounded-2xl border border-shape_secondary bg-shape border-dashed" />
            </div>
          </section>

          {/* <section className="w-[1120px] h-[286px] overflow-hidden mb-20 mt-20 bg-shape border-[1px] border-shape_secondary rounded-2xl flex justify-between ml-28 relative">
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
            <IconsHandleCard />
          </section> */}
          <section className="w-[1120px] items-center h-[286px] overflow-hidden mb-20 mt-20 bg-shape border-[2px] border-shape_secondary border-dashed rounded-2xl flex justify-center ml-28 relative">
            <h1 className="font-heebo text-base leading-[26px] text-brand-orange text-center">Crie um destaque arrastando um card aqui</h1>
          </section>

          <section className="w-full h-[756px] ml-28 flex flex-col">
            <div className="flex justify-between  items-center mb-8">
              <h1 className="font-barlow font-semibold text-4xl leading-[46px] text-title">Conheça todos</h1>
              <div className="flex flex-col w-[538px] mr-52">
                <nav className="w-[654px] h-[38px] gap-8 flex items-start">
                  <h4 className="font-roboto font-bold text-base leading-[26px] text-title borber-b-[1px] border-brand-orange underline underline-offset-[20px]">Todos</h4>
                  <h4 className="font-heebo font-regular text-base leading-[26px] text-text">Pontos Turísticos</h4>
                  <h4 className="font-heebo font-regular text-base leading-[26px] text-text">Comida & Bebida</h4>
                  <h4 className="font-heebo font-regular text-base leading-[26px] text-text">Eventos Organizados</h4>
                </nav>
                <span className="w-[538px] h-[1px] bg-shape_secondary" />
              </div>
            </div>
            <div>
              <div className="gap-8 flex flex-wrap">
                {places ? places.map((place: any) => (
                  <Card name={place.name} avaliation="4,7" route="place" />
                )) : ''}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
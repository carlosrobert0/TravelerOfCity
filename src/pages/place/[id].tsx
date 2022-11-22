import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import CardCategory from '../../components/card/CardCategory'
import { FaStar } from 'react-icons/fa'
import { RiWhatsappFill } from 'react-icons/ri'
import { IconsHandleCard } from '../../components/IconsHandleCard'
import { Comment } from '../../components/Comment'
import { FiArrowLeft, FiEdit3, FiTrash } from 'react-icons/fi'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'

export default function Place() {
  const router = useRouter()
  
  function handleGoBack() {
    router.back()
  }

  return (
    <div className="w-full h-[1828px] flex justify-between overflow-hidden relative">
      <Nav />

      <main className="flex flex-col w-[688px] ml-24 relative">
        <header className={"w-full h-[96px] flex items-center bg-shape px-28"}>
          <BsArrowLeft onClick={handleGoBack} className="font-barlow font-semibold w-[128px] text-4xl leading-10 text-complement" />
          <div className="flex gap-1 ml-[308px] mr-6">
            <button className="w-10 h-10 rounded-l-xl text-text bg-shape top-4 right-16 border-[1px] border-shape_secondary flex items-center justify-center">
              <FiEdit3 size={20} />
            </button>
            <button className="w-10 h-10 rounded-r-xl text-text bg-shape top-4 right-4 border-[1px] border-shape_secondary flex items-center justify-center">
              <FiTrash size={20} />
            </button>
          </div>
        </header>
        <span className="border-[1px] text-shape_secondary w-[688px]" />
        <section className='w-[453px] h-[1588px] flex flex-col ml-28 mt-[65px]'>
          <div className="flex flex-col gap-8">
            <Link href="/place/places">
              <a className="font-barlow font-semibold text-title text-[54px] leading-[54px]">Doce & Companhia</a>
            </Link>

            <h3 className="font-heebo font-regular text-text text-xl leading-[30px]">
              O melhor lugar da cidade para você tomar um bom café. Fatias de
              tortas artesanais, bolos, lanches e biscoitos caseiros.
            </h3>
          </div>

          <div className="flex flex-col mt-20">
            <h2 className="font-barlow font-semibold text-title text-[24px] leading-[34px]">Atendimento</h2>
            <span className="w-[448px] h-[1px] bg-shape_secondary mt-4 mb-8" />
            <div className="w-[448px] flex flex-wrap gap-2">
              <div className="w-[104px] h-[84px] p-4 flex flex-col items-start justify-center rounded-[10px] border-[1px] border-shape_secondary bg-shape">
                <h6 className="font-barlow font-regular text-title text-base leading-[26px]">Domingo</h6>
                <h6 className="font-barlow font-bold text-base text-title leading-[26px]">Fechado</h6>
              </div>
              <div className="w-[104px] h-[84px] p-4 flex flex-col items-start justify-center rounded-[10px] border-[1px] border-shape_secondary bg-shape">
                <h6 className="font-barlow font-regular text-title text-base leading-[26px]">Segunda</h6>
                <h6 className="font-barlow font-bold text-base text-title leading-[26px]">Fechado</h6>
              </div>
              <div className="w-[104px] h-[84px] p-4 flex flex-col items-start justify-center rounded-[10px] border-[1px] border-shape_secondary bg-shape">
                <h6 className="font-barlow font-regular text-title text-base leading-[26px]">Terça</h6>
                <h6 className="font-barlow font-bold text-base text-title leading-[26px]">Fechado</h6>
              </div>
              <div className="w-[104px] h-[84px] p-4 flex flex-col items-start justify-center rounded-[10px] border-[1px] border-shape_secondary bg-shape">
                <h6 className="font-barlow font-regular text-title text-base leading-[26px]">Quarta</h6>
                <h6 className="font-barlow font-bold text-base text-title leading-[26px]">8h-19h</h6>
              </div>
              <div className="w-[104px] h-[84px] p-4 flex flex-col items-start justify-center rounded-[10px] border-[1px] border-shape_secondary bg-shape">
                <h6 className="font-barlow font-regular text-title text-base leading-[26px]">Quinta</h6>
                <h6 className="font-barlow font-bold text-base text-title leading-[26px]">Fechado</h6>
              </div>
              <div className="w-[104px] h-[84px] p-4 flex flex-col items-start justify-center rounded-[10px] border-[1px] border-shape_secondary bg-shape">
                <h6 className="font-barlow font-regular text-title text-base leading-[26px]">Sexta</h6>
                <h6 className="font-barlow font-bold text-base text-title leading-[26px]">8h-19h</h6>
              </div>
              <div className="w-[104px] h-[84px] p-4 flex flex-col items-start justify-center rounded-[10px] border-[1px] border-shape_secondary bg-shape">
                <h6 className="font-barlow font-regular text-title text-base leading-[26px]">Sábado</h6>
                <h6 className="font-barlow font-bold text-base text-title leading-[26px]">Fechado</h6>
              </div>
            </div>
            <div className="flex gap-8 mt-10 items-center">
              <button className="rounded-xl bg-success text-shape px-8 flex w-[225px] h-[48px] items-center justify-start">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_680_8060)">
                    <path d="M10.0025 0H9.9975C4.48375 0 0 4.485 0 10C0 12.1875 0.705 14.215 1.90375 15.8613L0.6575 19.5763L4.50125 18.3475C6.0825 19.395 7.96875 20 10.0025 20C15.5162 20 20 15.5137 20 10C20 4.48625 15.5162 0 10.0025 0Z" fill="#449C47" />
                    <path d="M15.8207 14.1212C15.5795 14.8025 14.622 15.3675 13.8582 15.5325C13.3357 15.6437 12.6532 15.7325 10.3557 14.78C7.41695 13.5625 5.52445 10.5762 5.37695 10.3825C5.2357 10.1887 4.18945 8.80123 4.18945 7.36623C4.18945 5.93123 4.9182 5.23248 5.21195 4.93248C5.4532 4.68623 5.85195 4.57373 6.23445 4.57373C6.3582 4.57373 6.46945 4.57998 6.56945 4.58498C6.8632 4.59748 7.0107 4.61498 7.20445 5.07873C7.4457 5.65998 8.0332 7.09498 8.1032 7.24248C8.17445 7.38998 8.2457 7.58998 8.1457 7.78373C8.05195 7.98373 7.96945 8.07248 7.82195 8.24248C7.67445 8.41248 7.53445 8.54248 7.38695 8.72498C7.25195 8.88373 7.09945 9.05373 7.26945 9.34748C7.43945 9.63498 8.02695 10.5937 8.89195 11.3637C10.0082 12.3575 10.9132 12.675 11.237 12.81C11.4782 12.91 11.7657 12.8862 11.942 12.6987C12.1657 12.4575 12.442 12.0575 12.7232 11.6637C12.9232 11.3812 13.1757 11.3462 13.4407 11.4462C13.7107 11.54 15.1395 12.2462 15.4332 12.3925C15.727 12.54 15.9207 12.61 15.992 12.7337C16.062 12.8575 16.062 13.4387 15.8207 14.1212Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_680_8060">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h6 className="font-heebo font-medium text-base leading-[26px] text-shape ml-3">Entrar em contato</h6>
              </button>

              <div className="flex flex-col">
                <h4 className="font-heebo font-regular text-base leading-[26px] text-text">Telefone</h4>
                <h3 className="font-barlow font-semibold text-xl leading-[30px] text-title">(47) 3598 7815</h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-20">
            <div className="flex items-end justify-between">
              <h2 className="font-barlow font-semibold text-title text-[24px] leading-[34px]">Endereço</h2>
              <h6 className="font-heebo font-medium text-sm leading-6 text-complement">Ver no Google Maps</h6>
            </div>
            <span className="w-full h-[1px] bg-shape_secondary mt-4 mb-8" />
            <div className="w-[448px] flex flex-wrap gap-6">
              <Image src="/imgMap.png" objectFit="cover" width={450} height={164} />
              <h4 className="w-[295px] font-heebo font-regular text-base leading-[26px] text-text">Rua 7 de Setembro, 319 - Jardim América 89160-170</h4>
            </div>
          </div>

          <div className="flex flex-col mt-20">
            <div className="flex items-center justify-start gap-6">
              <h2 className="font-barlow font-semibold text-title text-[24px] leading-[34px]">Avaliações</h2>
              <div className="flex gap-3 mt-1">
                <FaStar size={20} color="#F25D27" />
                <h6 className="font-barlow font-semibold text-xl leading-5 text-brand-orange">4,5</h6>
              </div>
              <div className="flex gap-4 ml-[95px] mt-1">
                <h6 className="font-heebo font-medium text-sm leading-6 text-complement">Adicionar</h6>
                <h6 className="font-heebo font-medium text-sm leading-6 text-complement">Ver todas</h6>
              </div>
            </div>
            <span className="w-full h-[1px] bg-shape_secondary mt-4 mb-8" />
            <div className="flex flex-col gap-6 items-end">
              <Comment />
              <span className="w-[359px] h-[1px] bg-shape_secondary" />
              <Comment />
              <span className="w-[359px] h-[1px] bg-shape_secondary" />
              <Comment />
            </div>
          </div>
        </section>
      </main>

      <div>
        <Image src="/imgPlace.png" objectFit="cover" width={704} height={821} />
      </div>
    </div>
  )
}
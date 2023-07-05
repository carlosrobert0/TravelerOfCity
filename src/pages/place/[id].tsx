import Image from 'next/image'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { BsArrowLeft } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { FiEdit3, FiTrash } from 'react-icons/fi'

import axios from 'axios'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { Comment } from '../../components/Comment'
import Nav from '../../components/Nav'
import { api } from '../../services/api'
import { calculateAverageRatings } from '../../utils/calculateAverageRatings'

export default function Place() {
  const [place, setPlace] = useState<any>()
  const router = useRouter()
  const { id } = router.query
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const address = `${place?.address?.street}, ${place?.address?.number} - ${place?.address?.neighborhood} ${place?.address?.zip_code}`

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14506.328260665005!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1685052331201!5m2!1spt-BR!2sbr&t=m`

  const avaliationsAccept = place?.Depositions.filter(
    (deposition: any) => deposition.status === 'accept',
  )

  function handleGoBack() {
    router.back()
  }

  const cookies = parseCookies()

  async function getPlace() {
    try {
      const response = await api.get(`places/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies['caparao.token']}`,
        },
      })
      setPlace(response.data)
    } catch (error) {
      if (error.response.status === 401) {
        signOutApplication(router)
      }
    }
  }

  async function onDeletePlace(placeId: string) {
    try {
      await api.delete(`places/${placeId}`)
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDataMaps = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${process.env.NEXT_PUBLIC_CHAVE_API_MAPS}`,
      )

      const { results } = response.data
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location
        setLatitude(lat)
        setLongitude(lng)
      }
    } catch (error) {
      console.log('Erro ao obter as coordenadas:', error)
    }
  }

  useEffect(() => {
    getPlace()
  }, [id])

  useEffect(() => {
    fetchDataMaps()
  }, [address])

  return (
    <div className="relative flex h-[1828px] w-full justify-between overflow-hidden">
      <Nav />

      <main className="relative ml-24 flex h-screen w-[698px] flex-col">
        <header
          className={'flex min-h-[96px] w-full items-center bg-shape px-28'}
        >
          <BsArrowLeft
            onClick={handleGoBack}
            className="w-[128px] font-barlow text-4xl font-semibold leading-10 text-complement"
          />
          <div className="ml-[308px] mr-6 flex gap-1">
            <button
              className="top-4 right-16 flex h-10 w-10 items-center 
                            justify-center rounded-l-xl border-[1px] border-shape_secondary bg-shape text-text"
            >
              <FiEdit3 size={20} />
            </button>
            <button
              onClick={() => onDeletePlace(place?.id as string)}
              className="top-4 right-4 flex h-10 w-10 items-center justify-center 
                                rounded-r-xl border-[1px] border-shape_secondary bg-shape text-text"
            >
              <FiTrash size={20} />
            </button>
          </div>
        </header>
        <hr className="border-[1px] text-shape_secondary" />
        <section className="ml-28 mt-[65px] flex h-[1588px] w-[453px] flex-col">
          <div className="flex flex-col gap-8">
            <Link href="/place/places">
              <a className="font-barlow text-[54px] font-semibold leading-[54px] text-title">
                {place?.name}
              </a>
            </Link>

            <h3 className="font-regular font-heebo text-xl leading-[30px] text-text">
              {place?.description}
            </h3>
          </div>

          <div className="mt-20 flex flex-col">
            <h2 className="font-barlow text-[24px] font-semibold leading-[34px] text-title">
              Atendimento
            </h2>
            <span className="mt-4 mb-8 h-[1px] w-[448px] bg-shape_secondary" />
            <div className="flex w-[448px] flex-wrap gap-2">
              <div
                className="flex h-[84px] w-[104px] flex-col items-start justify-center 
                                rounded-[10px] border-[1px] border-shape_secondary bg-shape p-4"
              >
                <h6 className="font-regular font-barlow text-base leading-[26px] text-title">
                  Domingo
                </h6>
                <h6 className="font-barlow text-base font-bold leading-[26px] text-title">
                  Fechado
                </h6>
              </div>
              <div
                className="flex h-[84px] w-[104px] flex-col items-start 
                                justify-center rounded-[10px] border-[1px] border-shape_secondary bg-shape p-4"
              >
                <h6 className="font-regular font-barlow text-base leading-[26px] text-title">
                  Segunda
                </h6>
                <h6 className="font-barlow text-base font-bold leading-[26px] text-title">
                  Fechado
                </h6>
              </div>
              <div
                className="flex h-[84px] w-[104px] flex-col items-start 
                                justify-center rounded-[10px] border-[1px] border-shape_secondary bg-shape p-4"
              >
                <h6 className="font-regular font-barlow text-base leading-[26px] text-title">
                  Terça
                </h6>
                <h6 className="font-barlow text-base font-bold leading-[26px] text-title">
                  Fechado
                </h6>
              </div>
              <div
                className="flex h-[84px] w-[104px] flex-col items-start justify-center 
                                rounded-[10px] border-[1px] border-shape_secondary bg-shape p-4"
              >
                <h6 className="font-regular font-barlow text-base leading-[26px] text-title">
                  Quarta
                </h6>
                <h6 className="font-barlow text-base font-bold leading-[26px] text-title">
                  8h-19h
                </h6>
              </div>
              <div
                className="flex h-[84px] w-[104px] flex-col items-start justify-center 
                                rounded-[10px] border-[1px] border-shape_secondary bg-shape p-4"
              >
                <h6 className="font-regular font-barlow text-base leading-[26px] text-title">
                  Quinta
                </h6>
                <h6 className="font-barlow text-base font-bold leading-[26px] text-title">
                  Fechado
                </h6>
              </div>
              <div
                className="flex h-[84px] w-[104px] flex-col items-start 
                                justify-center rounded-[10px] border-[1px] border-shape_secondary bg-shape p-4"
              >
                <h6 className="font-regular font-barlow text-base leading-[26px] text-title">
                  Sexta
                </h6>
                <h6 className="font-barlow text-base font-bold leading-[26px] text-title">
                  8h-19h
                </h6>
              </div>
              <div
                className="flex h-[84px] w-[104px] flex-col 
                                items-start justify-center rounded-[10px] border-[1px] 
                              border-shape_secondary bg-shape p-4"
              >
                <h6 className="font-regular font-barlow text-base leading-[26px] text-title">
                  Sábado
                </h6>
                <h6 className="font-barlow text-base font-bold leading-[26px] text-title">
                  Fechado
                </h6>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <button className="flex h-[48px] w-[225px] items-center justify-start rounded-xl bg-success px-8 text-shape">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_680_8060)">
                    <path
                      d="M10.0025 0H9.9975C4.48375 0 0 4.485 0 10C0 12.1875 0.705 14.215 1.90375 15.8613L0.6575 19.5763L4.50125 18.3475C6.0825 19.395 7.96875 20 10.0025 20C15.5162 20 20 15.5137 20 10C20 4.48625 15.5162 0 10.0025 0Z"
                      fill="#449C47"
                    />
                    <path
                      d="M15.8207 14.1212C15.5795 14.8025 14.622 15.3675 13.8582 15.5325C13.3357 15.6437 12.6532 15.7325 10.3557 14.78C7.41695 13.5625 5.52445 10.5762 5.37695 10.3825C5.2357 10.1887 4.18945 8.80123 4.18945 7.36623C4.18945 5.93123 4.9182 5.23248 5.21195 4.93248C5.4532 4.68623 5.85195 4.57373 6.23445 4.57373C6.3582 4.57373 6.46945 4.57998 6.56945 4.58498C6.8632 4.59748 7.0107 4.61498 7.20445 5.07873C7.4457 5.65998 8.0332 7.09498 8.1032 7.24248C8.17445 7.38998 8.2457 7.58998 8.1457 7.78373C8.05195 7.98373 7.96945 8.07248 7.82195 8.24248C7.67445 8.41248 7.53445 8.54248 7.38695 8.72498C7.25195 8.88373 7.09945 9.05373 7.26945 9.34748C7.43945 9.63498 8.02695 10.5937 8.89195 11.3637C10.0082 12.3575 10.9132 12.675 11.237 12.81C11.4782 12.91 11.7657 12.8862 11.942 12.6987C12.1657 12.4575 12.442 12.0575 12.7232 11.6637C12.9232 11.3812 13.1757 11.3462 13.4407 11.4462C13.7107 11.54 15.1395 12.2462 15.4332 12.3925C15.727 12.54 15.9207 12.61 15.992 12.7337C16.062 12.8575 16.062 13.4387 15.8207 14.1212Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_680_8060">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h6 className="ml-3 font-heebo text-base font-medium leading-[26px] text-shape">
                  Entrar em contato
                </h6>
              </button>

              <div className="flex flex-col">
                <h4 className="font-regular font-heebo text-base leading-[26px] text-text">
                  Telefone
                </h4>
                <h3 className="font-barlow text-xl font-semibold leading-[30px] text-title">
                  (47) 3598 7815
                </h3>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col">
            <div className="flex items-end justify-between">
              <h2 className="font-barlow text-[24px] font-semibold leading-[34px] text-title">
                Endereço
              </h2>
              <Link
                href={`https://www.google.com/maps/@${longitude},${latitude}},14790m/data=!3m1!1e3?hl=pt-BR&entry=ttu`}
              >
                <h6 className="cursor-pointer font-heebo text-sm font-medium leading-6 text-complement">
                  Ver no Google Maps
                </h6>
              </Link>
            </div>
            <span className="mt-4 mb-8 h-[1px] w-full bg-shape_secondary" />
            <div className="flex w-[448px] flex-wrap gap-6">
              <iframe
                src={mapSrc}
                width="448"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="h-[164px] overflow-hidden rounded-2xl"
              ></iframe>
              {/* <Image
                alt=""
                src="/imgMap.png"
                objectFit="cover"
                width={450}
                height={164}
              /> */}
              <h4 className="font-regular w-[295px] font-heebo text-base leading-[26px] text-text">
                {`${place?.address?.street}, ${place?.address?.number} - ${place?.address?.neighborhood}`}
                <br />
                {`${place?.address?.zip_code}`}
              </h4>
            </div>
          </div>

          <div className="mt-20 flex flex-col">
            <div className="flex items-center justify-start gap-6">
              <h2 className="font-barlow text-[24px] font-semibold leading-[34px] text-title">
                Avaliações
              </h2>
              <div className="mt-1 flex gap-3">
                <FaStar size={20} color="#F25D27" />
                <h6 className="font-barlow text-xl font-semibold leading-5 text-brand-orange">
                  {calculateAverageRatings(avaliationsAccept)}
                </h6>
              </div>
              <div className="ml-[95px] mt-1 flex gap-4">
                <h6 className="font-heebo text-sm font-medium leading-6 text-complement">
                  Adicionar
                </h6>
                <h6 className="font-heebo text-sm font-medium leading-6 text-complement">
                  Ver todas
                </h6>
              </div>
            </div>
            <span className="mt-4 mb-8 h-[1px] w-full bg-shape_secondary" />
            <div className="flex flex-col items-end gap-6">
              {avaliationsAccept?.slice(0, 3)?.map((comment: any) => (
                <>
                  <Comment
                    image="/imgComment.png"
                    description={comment?.description}
                    name={comment?.name}
                    avaliation={comment?.avaliation}
                    key={comment?.id}
                  />
                  <span className="h-[1px] w-[359px] bg-shape_secondary" />
                </>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="flex-1">
        <Image
          src={'/caparao.jpg'}
          objectFit="cover"
          sizes="fill"
          width={704}
          height={821}
        />
      </div>
    </div>
  )
}
function signOutApplication(router: NextRouter) {
  throw new Error('Function not implemented.')
}

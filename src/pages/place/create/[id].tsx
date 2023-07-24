import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsArrowLeft } from 'react-icons/bs'
import { ImageUploader } from '../../../components/ImageUploader'

import Nav from '../../../components/Nav'
import { api } from '../../../services/api'
import { renderIcon } from '../../../utils/renderIcon'
import { renderIconNameByCategoryName } from '../../../utils/renderIconNameByCategoryName'

interface PlaceData extends AddressData {
  name: string
  image: any
  description: string
  category_id: string
  address_id: string
  city_id: string
}

interface AddressData {
  zip_code: string
  street: string
  neighborhood: string
  number: number | null
}

export interface ImageData {
  id: string
  name: string
  data: string
}

const weekDays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

export default function Create() {
  const router = useRouter()
  const { id } = router.query
  const [categories, setCategories] = useState([])
  const [imageURL, setImageURL] = useState('')

  const { register, handleSubmit, getValues, watch } = useForm()

  function handleGoBack() {
    router.back()
  }

  async function handleCreateSubmit(place: PlaceData) {
    let addressId: any

    try {
      const { data } = await api.post('/address', place)

      addressId = data.id
    } catch (error) {
      console.log(error)
    }

    try {
      const response = await api.post('/place', {
        ...place,
        image: imageURL,
        address_id: addressId,
        city_id: id,
      })

      router.push({
        pathname: `/cities/created/${id}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function getCategories() {
    const response = await api.get('/categories')
    setCategories(response.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  function handleImageURLChange(url: any) {
    setImageURL(url)
  }

  return (
    <div className="relative flex h-[1192px] w-full justify-between overflow-x-hidden">
      <Nav />
      <main
        className="absolute ml-24 flex w-full flex-col items-center justify-around 
        overflow-x-hidden overflow-y-scroll"
      >
        <header
          className={`flex h-[96px] w-full items-center justify-between bg-shape px-28`}
        >
          <button onClick={handleGoBack}>
            <BsArrowLeft className="my-6 w-[128px] font-barlow text-4xl font-semibold leading-10 text-complement" />
          </button>
          <h2 className="font-barlow text-xl font-medium leading-[30px] text-complement">
            Adicionar um perfil
          </h2>
          <div className="flex items-center gap-2">
            <h2 className="font-roboto text-xs font-semibold text-complement">
              01{' '}
            </h2>
            <h2 className="font-roboto text-xs font-semibold text-complement">
              -
            </h2>
            <h2 className="font-roboto text-xs font-semibold text-text"> 02</h2>
          </div>
        </header>
        <span className="w-[1443px] border-[1px] text-shape_secondary" />
        <div className="mb-28 mt-4 flex h-full w-[800px] flex-col rounded-2xl bg-shape">
          <div className="mt-[72px] flex items-center justify-start">
            <div className="ml-[63px] flex h-16 w-16 items-center justify-center rounded-[10px] bg-success">
              <h6 className="text-center font-barlow text-2xl font-semibold leading-[34px] text-shape">
                02
              </h6>
            </div>
            <h1 className="ml-10 font-barlow text-4xl font-semibold leading-[34px] text-success">
              Adicione um local
            </h1>
          </div>
          <span className="mt-10 h-[1px] w-full bg-shape_secondary" />
          <form
            onSubmit={handleSubmit(handleCreateSubmit)}
            className="mx-16 flex flex-col items-start"
          >
            <h2 className="mt-12 font-barlow text-2xl font-medium leading-[30px] text-title">
              Dados Básicos
            </h2>
            <span className="mt-4 h-[1px] w-[673px] bg-shape_secondary" />
            <label className="font-regular mt-6 mb-[10px] font-heebo text-sm leading-[22px] text-text">
              Nome do local
            </label>
            <input
              type="text"
              {...register('name')}
              className="h-[56px] w-[672px] rounded-[10px] border-[1px] border-shape_secondary bg-background p-4"
            />

            <label className="font-regular mt-6 mb-[10px] font-heebo text-sm leading-[22px] text-text">
              Foto do local
            </label>

            <ImageUploader onImageURLChange={handleImageURLChange} />

            <label className="font-regular mt-6 mb-[10px] font-heebo text-sm leading-[22px] text-text">
              Descrição do local
            </label>

            <textarea
              className="h-[202px] w-[672px] rounded-[10px] border-[1px] border-shape_secondary 
              bg-background p-4 text-left font-heebo  text-lg"
              {...register('description')}
            />

            <div className="mt-10 flex flex-col">
              <label
                htmlFor=""
                className="font-regular mb-[18px] font-heebo text-sm leading-[22px] text-text"
              >
                Selecione uma categoria
              </label>
              <div className="flex gap-4">
                {categories.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className="flex h-[204px] w-[213px] flex-col justify-around rounded-[10px] border-[1px] border-shape_secondary bg-background"
                    >
                      <div className="flex justify-between px-[22px]">
                        {renderIcon(renderIconNameByCategoryName(category.name), 40)}
                        <label htmlFor={category.id}>
                          <input
                            type="radio"
                            id={category.id}
                            name="category_id"
                            value={category.id}
                            {...register('category_id')}
                          />
                        </label>
                      </div>
                      <span className="w-full border-[1px] bg-shape_secondary" />
                      <div>
                        <h3 className="w-[156px] px-6 font-barlow text-xl font-semibold leading-[30px] text-title">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* {
              categoryWatch?.startsWith("34") ? (
                <div className="mt-16 flex flex-col">
                  <h2 className="font-barlow text-2xl font-medium leading-[30px] text-title">
                    Próximo acontecimento
                  </h2>
                  <span className="mt-6 mb-10 w-full border-[1px] bg-shape_secondary" />
                  <div className="flex gap-6">
                    <label className="flex gap-4 items-center">
                      <h4 className="font-regular font-heebo text-sm leading-[22px] text-text">
                        De
                      </h4>
                      <input
                        type="text"
                        {...register('zip_code')}
                        placeholder="-"
                        className="h-[56px] w-[104px] rounded-[10px] placeholder-title border-[1px] 
                        border-shape_secondary bg-background p-4"
                      />
                    </label>

                    <label className="flex gap-4 items-center">
                      <h4 className="font-regular font-heebo text-sm leading-[22px] text-text">
                        Até
                      </h4>
                      <input
                        type="text"
                        {...register('zip_code')}
                        placeholder="-"
                        className="h-[56px] w-[104px] placeholder-title rounded-[10px] border-[1px] 
                        border-shape_secondary bg-background p-4"
                      />
                    </label>

                    <label className="flex gap-4 items-center">
                      <h4 className="font-regular font-heebo text-sm leading-[22px] text-text">
                        Ano
                      </h4>
                      <input
                        type="text"
                        {...register('zip_code')}
                        placeholder="-"
                        className="h-[56px] w-[104px] rounded-[10px] placeholder-title 
                        border-[1px] border-shape_secondary bg-background p-4"
                      />
                    </label>
                  </div>
                </div>
              ) : categoryWatch?.startsWith("78") ? (
                <div className="mt-16 flex flex-col">
                  <h2 className="font-barlow text-2xl font-medium leading-[30px] text-title">
                    Atendimento
                  </h2>
                  <span className="mt-6 mb-10 w-full border-[1px] bg-shape_secondary" />
                  {
                    weekDays.map((weekDay, i) => {
                      return (
                        <OpeningHours key={`${i}-${weekDay}`} weekDay={weekDay} />
                      )
                    })
                  }
                </div>
              ) : null
            } */}

            <div className="mt-16 flex h-[525px] w-[672px] flex-col">
              <h2 className="font-barlow text-2xl font-medium leading-[30px] text-title">
                Endereço
              </h2>
              <span className="mt-6 mb-10 w-full border-[1px] bg-shape_secondary" />
              <div className="flex flex-wrap gap-4">
                <label className="flex flex-col">
                  <h4 className="font-regular mb-[10px] font-heebo text-sm leading-[22px] text-text">
                    CEP
                  </h4>
                  <input
                    type="text"
                    {...register('zip_code')}
                    className="h-[56px] w-[168px] rounded-[10px] border-[1px] 
                    border-shape_secondary bg-background p-4"
                  />
                </label>
                <label className="flex flex-col">
                  <h4 className="font-regular mb-[10px] font-heebo text-sm leading-[22px] text-text">
                    Rua
                  </h4>
                  <input
                    type="text"
                    {...register('street')}
                    className="h-[56px] w-[488px] rounded-[10px] border-[1px] 
                    border-shape_secondary bg-background p-4"
                  />
                </label>
                <label className="flex flex-col">
                  <h4 className="font-regular mb-[10px] font-heebo text-sm leading-[22px] text-text">
                    Bairro
                  </h4>
                  <input
                    type="text"
                    {...register('neighborhood')}
                    className="h-[56px] w-[488px] rounded-[10px] border-[1px] 
                    border-shape_secondary bg-background p-4"
                  />
                </label>
                <label className="flex flex-col">
                  <h4 className="font-regular mb-[10px] font-heebo text-sm leading-[22px] text-text">
                    Número
                  </h4>
                  <input
                    type="text"
                    {...register('number')}
                    className="h-[56px] w-[168px] rounded-[10px] border-[1px] 
                    border-shape_secondary bg-background p-4"
                  />
                </label>
              </div>
              <div className="my-12 flex justify-between">
                <div className="flex items-center gap-[26px]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0003 29.3334C23.3641 29.3334 29.3337 23.3639 29.3337 16.0001C29.3337 8.63628 23.3641 2.66675 16.0003 2.66675C8.63653 2.66675 2.66699 8.63628 2.66699 16.0001C2.66699 23.3639 8.63653 29.3334 16.0003 29.3334Z"
                      stroke="#F25D27"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 10.6667V16.0001"
                      stroke="#F25D27"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 21.3333H16.0133"
                      stroke="#F25D27"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="h-11 w-[127px] font-heebo text-sm leading-[22px] text-text">
                    Preencha todos os dados com cuidado
                  </span>
                </div>
                <button
                  className="flex h-12 w-[191px] items-center justify-center 
                  rounded-[10px] bg-success font-heebo text-base font-medium leading-[26px] text-white"
                  type="submit"
                >
                  Concluir cadastro
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

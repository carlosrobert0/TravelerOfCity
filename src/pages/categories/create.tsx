import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsArrowLeft } from 'react-icons/bs'
import { FiAlertCircle } from 'react-icons/fi'
import { v4 } from 'uuid'

import Nav from '../../components/Nav'
import { api } from '../../services/api'
import { ImageData } from '../place/create/[id]'

export interface CityFormData {
  id?: string
  name: string
  image?: string | any
  description: string
}

export default function Create() {
  const [imageData, setImageData] = useState<ImageData>({
    id: '',
    name: '',
    data: ''
  })

  const { register, handleSubmit, watch } = useForm()
  const router = useRouter()

  const handleImageChange = (imageBase64: string) => {
    setImageData({
      id: v4(),
      name: v4(),
      data: imageBase64,
    });
  };

  async function handleCreateCity({
    name,
    image,
    description,
  }: CityFormData) {
    try {
      const { data } = await api.post('city', {
        name,
        image: imageData?.data,
        description,
      })
      router.push(`/place/create/${data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  function handleGoBack() {
    router.back()
  }

  return (
    <div className="relative flex h-[1192px] w-full justify-between overflow-x-hidden">
      <Nav />
      <main className="absolute ml-24 flex w-full flex-col items-center justify-around 
      overflow-x-hidden overflow-y-scroll">
        <header
          className={`flex h-[96px] w-full items-center justify-start bg-shape px-28`}
        >
          <BsArrowLeft
            onClick={handleGoBack}
            className="my-6 w-[128px] font-barlow text-4xl font-semibold leading-10 text-complement"
          />
          <h2 className="font-barlow text-xl font-medium leading-[30px] text-complement ml-[413px]">
            Adicionar uma categoria
          </h2>
        </header>
        <span className="w-[1443px] border-[1px] text-shape_secondary" />
        <div className="mt-[49px] flex h-full w-[800px] flex-col rounded-2xl bg-shape">
          <div className="h-[143px] w-full flex items-center justify-start bg-gradient-to-l from-[#FEF7F5] to-[#dcf5dd] rounded-tr-2xl rounded-tl-2xl">
            <h1 className="ml-10 font-barlow text-4xl font-semibold leading-[34px] text-success">
              Adicione uma categoria
            </h1>
          </div>
          <hr className="bg-shape_secondary" />
          <div className="mx-16 flex flex-col items-start">
            <h2 className="mt-12 font-barlow text-2xl font-medium leading-[30px] text-title">
              Dados
            </h2>
            <span className="mt-4 h-[1px] w-[673px] bg-shape_secondary" />
            <form
              onSubmit={handleSubmit(handleCreateCity)}
              className="flex flex-col gap-2"
            >
              <div className='flex mt-6 gap-10 items-center'>
                <div>
                  <label className="font-regular mt-6 mb-[10px] font-heebo text-sm leading-[22px] text-text">
                    Ícone
                  </label>
                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="dropzone-file"
                      className="dark:hover:bg-bray-800 flex w-full cursor-pointer 
          bg-background flex-col items-center justify-center rounded-lg border-2 border-dashed border-shape-secondary hover:bg-background dark:border-shape-secondary dark:bg-background dark:hover:border-gray-500 dark:hover:bg-background"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 w-[120px] h-[120px]">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-heebo text-base text-brand-orange">
                            +
                          </span>
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-regular font-heebo text-sm leading-[22px] text-text">
                    Nome da categoria
                  </label>
                  <input
                    {...register('name')}
                    className="h-[56px] w-[512px] rounded-[10px] border-[1px] 
                border-shape_secondary bg-background p-4 text-left font-heebo text-lg mt-2"
                  />
                </div>
              </div>

              <div className="mt-[56px] mb-[50px] flex h-[44px] w-full items-center justify-between">
                <div className="mr-10 flex items-center">
                  <FiAlertCircle size={32} color="#F25D27" />
                  <span className="font-regular ml-6 font-heebo text-sm leading-[22px] text-text">
                    Preencha todos os <br /> dados com
                    cuidado.
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
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

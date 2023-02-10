import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsArrowLeft } from 'react-icons/bs'
import { FiAlertCircle, FiEdit3, FiTrash } from 'react-icons/fi'

import Header from '../../components/Header'
import Nav from '../../components/Nav'
import { api } from '../../services/api'

export interface CityFormData {
  id?: string
  name: string
  image?: string | any
  description: string
}

export default function Create() {
  const [imagePreview, setImagePreview] = useState(null)
  const { register, handleSubmit, watch } = useForm()
  const router = useRouter()
  const imageWatch = watch('image')

  function handleImage(e: any) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  async function handleCreateCity({
    name,
    image,
    description,
  }: CityFormData) {
    try {
      const { data } = await api.post('city', {
        name,
        image: imagePreview,
        description,
      })

      setImagePreview(image)
      router.push(`/place/create/${data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  function handleGoBack() {
    router.back()
  }

  useEffect(() => {
    console.log(imagePreview)
  }, [imagePreview])

  return (
    <div className="relative flex h-[1192px] w-full justify-between overflow-x-hidden">
      <Nav />
      <main className="absolute ml-24 flex w-full flex-col items-center justify-around 
      overflow-x-hidden overflow-y-scroll">
        <header
          className={`flex h-[96px] w-full items-center justify-between bg-shape px-28`}
        >
          <BsArrowLeft
            onClick={handleGoBack}
            className="my-6 w-[128px] font-barlow text-4xl font-semibold leading-10 text-complement"
          />
          <h2 className="font-barlow text-xl font-medium leading-[30px] text-complement">
            Adicionar um perfil
          </h2>
          <div className="flex items-center gap-2">
            <h2 className="font-roboto text-xs font-semibold text-text">
              01
            </h2>
            <h2 className="font-roboto text-xs font-semibold text-complement">
              -
            </h2>
            <h2 className="font-roboto text-xs font-semibold text-complement">
              {' '}
              02
            </h2>
          </div>
        </header>
        <span className="w-[1443px] border-[1px] text-shape_secondary" />
        <div className="mb-28 mt-4 flex h-full w-[800px] flex-col rounded-2xl bg-shape">
          <div className="mt-[72px] flex items-center justify-start">
            <div className="ml-[63px] flex h-16 w-16 items-center justify-center rounded-[10px] bg-success">
              <h6 className="text-center font-barlow text-2xl font-semibold leading-[34px] text-shape">
                01
              </h6>
            </div>
            <h1 className="ml-10 font-barlow text-4xl font-semibold leading-[34px] text-success">
              Adicione uma cidade
            </h1>
          </div>
          <span className="mt-10 h-[1px] w-full bg-shape_secondary" />
          <div className="mx-16 flex flex-col items-start">
            <h2 className="mt-12 font-barlow text-2xl font-medium leading-[30px] text-title">
              Dados da cidade
            </h2>
            <span className="mt-4 h-[1px] w-[673px] bg-shape_secondary" />
            <form
              onSubmit={handleSubmit(handleCreateCity)}
              className="flex flex-col gap-2"
            >
              <label className="font-regular mt-6 mb-[10px] font-heebo text-sm leading-[22px] text-text">
                Nome da cidade
              </label>
              <input
                {...register('name')}
                className="h-[56px] w-[672px] rounded-[10px] border-[1px] 
                border-shape_secondary bg-background p-4 text-left font-heebo text-lg"
              />

              <label className="font-regular mt-6 mb-[10px] font-heebo text-sm leading-[22px] text-text">
                Foto da cidade
              </label>

              {imagePreview ? (
                <div className="w-full relative">
                  <img
                    src={imagePreview}
                    className="flex h-64 w-full flex-col object-cover rounded-lg"
                  />
                  <div className="flex gap-1 absolute top-4 right-4">
                    <button
                      onClick={() => setImagePreview(null)}
                      className="top-4 right-4 flex h-10 w-10 items-center justify-center 
                        rounded border-[1px] border-shape_secondary bg-background text-text"
                    >
                      <FiTrash size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer
                  bg-background flex-col items-center justify-center rounded-lg border-2 
                  border-dashed border-shape-secondary hover:bg-background dark:border-shape-secondary 
                  dark:bg-background dark:hover:border-gray-500 dark:hover:bg-background"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-heebo text-base text-brand-orange">
                          + Adicionar uma foto
                        </span>
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      {...register('image')}
                      className="hidden"
                      onChange={handleImage}
                    />
                  </label>
                </div>
              )}

              <label className="font-regular mt-6 mb-[10px] font-heebo text-sm leading-[22px] text-text">
                Descrição da cidade
              </label>
              <textarea
                className="h-[202px] w-[672px] rounded-[10px] border-[1px]
              border-shape_secondary bg-background p-4 text-left font-heebo  text-lg"
                {...register('description')}
              />
              <div className="mt-[56px] mb-[139px] flex h-[44px] w-full items-center justify-between">
                <div className="mr-10 flex items-center">
                  <FiAlertCircle size={32} color="#F25D27" />
                  <span className="font-regular ml-6 font-heebo text-sm leading-[22px] text-text">
                    Preencha todos os <br /> dados com
                    cuidado.
                  </span>
                </div>
                <button
                  type="submit"
                  className="h-[48px] w-[125px] rounded-[10px] bg-[#115D8C] font-heebo text-background"
                >
                  Próximo
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsArrowLeft } from 'react-icons/bs'
import { FiAlertCircle, FiEdit3, FiTrash } from 'react-icons/fi'

import Header from '../../../components/Header'
import Nav from '../../../components/Nav'
import { api } from '../../../services/api'

export interface CityFormData {
  id?: string
  name: string
  image?: string | any
  description: string
}

export default function Edit() {
  const [imagePreview, setImagePreview] = useState(null)
  const [city, setCity] = useState<any>()
  const { register, handleSubmit, watch } = useForm()
  const router = useRouter()
  const { id } = router.query as any

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function getCity(cityId: string) {
    const response = await api.get(`/cities/${cityId}`)

    setCity(response.data)
  }

  async function handleEditCity({ name, image, description }: CityFormData) {
    openModal()
    // try {
    //   const { data } = await api.post('city', {
    //     name,
    //     image: image[0].name,
    //     description
    //   })

    //   console.log(image)
    //   setImagePreview(image)
    //   router.push(`/place/edit/${data.id}`)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  function handleGoBack() {
    router.back()
  }

  useEffect(() => {
    getCity(id)

    return () => {
      getCity(id)
    }
  }, [])

  return (
    <>
      <div className="relative flex h-[1192px] w-full justify-between overflow-x-hidden">
        <Nav />
        <main className="absolute ml-24 flex w-full flex-col items-center 
          justify-around overflow-x-hidden overflow-y-scroll"
        >
          <header
            className={`flex h-[96px] w-full items-center justify-between bg-shape px-28`}
          >
            <BsArrowLeft
              onClick={handleGoBack}
              className="my-6 w-[128px] font-barlow text-4xl font-semibold leading-10 text-complement"
            />
            <h2 className="font-barlow text-xl font-medium leading-[30px] text-complement">
              Editar
            </h2>
            <h2 className="font-barlow text-base font-medium leading-[30px] text-complement">
              {city?.name}
            </h2>
          </header>
          <span className="w-[1443px] border-[1px] text-shape_secondary" />
          <div className="mb-28 mt-4 flex h-full w-[800px] flex-col rounded-2xl bg-shape">
            <div className="flex h-[143px] w-[766px] items-center justify-start 
              rounded-r-2xl bg-gradient-to-r from-[#FEF7F5] to-[#FFF]"
            >
              <h1 className="ml-10 font-barlow text-4xl font-semibold leading-[34px] text-brand-orange">
                Editar cidade
              </h1>
            </div>
            <span className="h-[1px] w-full bg-shape_secondary" />
            <div className="mx-16 flex flex-col items-start">
              <h2 className="mt-12 font-barlow text-2xl font-medium leading-[30px] text-title">
                Dados da cidade
              </h2>
              <span className="mt-4 h-[1px] w-[673px] bg-shape_secondary" />
              <form
                onSubmit={handleSubmit(handleEditCity)}
                className="flex flex-col gap-2"
              >
                <label className="font-regular mt-6 mb-[10px] font-heebo text-sm leading-[22px] text-text">
                  Nome da cidade
                </label>
                <input
                  {...register('name')}
                  value={`${city?.name}`}
                  className="h-[56px] w-[672px] rounded-[10px] border-[1px]
                   border-shape_secondary bg-background pl-6 text-left font-heebo text-lg text-title"
                />

                <label className="font-regular mt-6 mb-[10px] font-heebo text-sm leading-[22px] text-text">
                  Foto da cidade
                </label>

                {imagePreview ? (
                  <img
                    src={imagePreview[0].name}
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer 
                    flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300
                  bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700
                  dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  />
                ) : (
                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="dropzone-file"
                      className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer 
                      flex-col items-center justify-center rounded-lg border-2 
                      border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 
                      dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                        className="hidden"
                        {...register('image')}
                      />
                    </label>
                  </div>
                )}

                <label className="font-regular mt-6 mb-[10px] font-heebo text-sm leading-[22px] text-text">
                  Descrição da cidade
                </label>
                <textarea
                  className="h-[202px] w-[672px] rounded-[10px] border-[1px] border-shape_secondary 
                  bg-background pl-6 pt-[15px] text-left font-heebo text-lg text-title"
                  {...register('description')}
                  value={`${city?.description}`}
                  />
                <div className="mt-[56px] mb-[50px] flex h-[44px] w-full items-center justify-between">
                  <div className="mr-10 flex items-center">
                    <FiAlertCircle
                      size={32}
                      color="#F25D27"
                    />
                    <span className="font-regular ml-6 font-heebo text-sm leading-[22px] text-text">
                      Preencha todos os <br /> dados com
                      cuidado.
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="h-[48px] w-[188px] rounded-[10px] bg-success font-heebo 
                    text-base font-medium leading-[26px] text-shape"
                  >
                    Salvar alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-title bg-opacity-95" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 pt-0 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative flex h-[406px] w-[380px] transform flex-col items-center justify-between transition-all">
                  <svg
                    width="380"
                    height="380"
                    viewBox="0 0 380 380"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.02"
                      d="M380 190C380 294.933 294.933 380 190 380C85.0778 380 0 294.933 0 190C0 85.0778 85.0778 0 190 0C294.933 0 380 85.0778 380 190Z"
                      fill="#51B853"
                    />
                    <path
                      opacity="0.04"
                      d="M330 190C330 267.319 267.319 330 190 330C112.689 330 50 267.319 50 190C50 112.689 112.689 50 190 50C267.319 50 330 112.689 330 190Z"
                      fill="#51B853"
                    />
                    <path
                      opacity="0.04"
                      d="M280 190C280 239.705 239.705 280 190 280C140.3 280 100 239.705 100 190C100 140.3 140.3 100 190 100C239.705 100 280 140.3 280 190Z"
                      fill="#51B853"
                    />
                  </svg>

                  <div className="absolute top-[132px] flex h-full w-[337px] flex-col items-center">
                    <div className="relative mt-[18px] flex flex-col items-center justify-center">
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M80 40C80 62.0911 62.0911 80 40 80C17.9111 80 0 62.0911 0 40C0 17.9111 17.9111 0 40 0C62.0911 0 80 17.9111 80 40Z"
                          fill="#51B853"
                        />
                      </svg>
                      <svg
                        className="absolute top-6 left-6"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30 9L13.5 25.5L6 18"
                          stroke="white"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>

                    <h1 className=" mt-12 w-[261px] text-center font-heebo text-[54px] font-medium leading-[64px] text-shape">
                      Alterações salvas!
                    </h1>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

import { Dialog, Transition } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { ParsedUrlQuery } from 'querystring'
import { ChangeEvent, Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaStar } from 'react-icons/fa'
import { FiAlertCircle, FiStar, FiX } from 'react-icons/fi'
import * as yup from 'yup'
import { api } from '../../services/api'
import { DialogAvaliationSent } from './DialogAvaliationSent'

interface IDialogAddAvaliation {
  isOpen: boolean
  onClose: () => void
  place_id: ParsedUrlQuery | any
  city_id: string | null
}

const schema = yup
  .object({
    name: yup.string().required(),
    avatar: yup.string().required(),
    description: yup.string().required(),
  })
  .required()

interface FormData {
  name: string
  avatar: string
  description: string
  status: string
  avaliation: number
}

export function DialogAddAvaliation({
  isOpen,
  onClose,
  city_id,
  place_id,
}: IDialogAddAvaliation) {
  const [avaliation, setAvaliation] = useState(0)
  const [imageData, setImageData] = useState('')
  const [isOpenAvaliationSent, setIsOpenAvaliationSent] = useState(false)

  function openModalAvaliationSent() {
    setIsOpenAvaliationSent(true)
  }

  function closeModalAvaliationSent() {
    setIsOpenAvaliationSent(false)
  }

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  })

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    console.log(file)

    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        console.log(reader.result as string)
        setImageData(reader.result as string)
      }
    }
  }

  async function handleCreateDeposition({
    name,
    avatar = imageData,
    description,
    status = 'new',
  }: FormData) {
    try {
      await api.post('depositions', {
        name,
        avatar,
        description,
        status,
        avaliation,
        city_id,
        place_id,
      })
      setImageData('')
      setAvaliation(0)
      reset()
      onClose()
      openModalAvaliationSent()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                <Dialog.Panel
                  className="relative mt-16 flex h-[528px] w-[736px] 
          transform flex-col items-center justify-start overflow-hidden rounded-[20px] bg-background transition-all"
                >
                  <header className="flex h-[96px] w-full items-center justify-between overflow-hidden rounded-t-[20px] border border-b-shape_secondary bg-white px-10">
                    <h2 className="font-barlow text-2xl font-semibold leading-9 text-brand-blue">
                      Adicionar avaliação
                    </h2>
                    <button
                      onClick={onClose}
                      className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-shape_secondary bg-shape"
                    >
                      <FiX size={20} color="#AOACB2" />
                    </button>
                  </header>
                  <form
                    onSubmit={handleSubmit(handleCreateDeposition)}
                    className="mt-10 flex w-full flex-wrap justify-start gap-4 px-10"
                  >
                    <div className="flex items-center justify-start">
                      <label
                        htmlFor="dropzone-file"
                        className={`flex cursor-pointer border border-background_secondary
                    ${
                      imageData === ''
                        ? 'bg-brand-blue'
                        : 'bg-gradient-to-r from-success_light to-background'
                    } h-12 w-[199px] flex-col items-center justify-center rounded-[10px]`}
                      >
                        {imageData === '' ? (
                          <p className="font-heebo text-base font-medium leading-[26px] text-white">
                            Upload da sua foto
                          </p>
                        ) : (
                          <div className="flex gap-[52px]">
                            <p className="font-heebo text-base font-medium leading-[26px] text-success">
                              Feito!
                            </p>
                            <p className="font-heebo text-xs leading-[26px] text-success">
                              Trocar foto
                            </p>
                          </div>
                        )}
                        <input
                          name="avatar"
                          {...register('avatar')}
                          id="dropzone-file"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      className="h-12 w-[441px] rounded-[10px] border border-shape_secondary bg-white px-6 py-[11px] font-heebo text-base leading-[26px] text-text placeholder:text-complement"
                      placeholder="Seu nome completo"
                      name="name"
                      {...register('name')}
                    />
                    <div className="relative h-[136px] w-[656px] rounded-[10px] border border-shape_secondary">
                      <textarea
                        maxLength={240}
                        name="description"
                        placeholder="Escreva aqui..."
                        className="h-full w-full rounded-[10px] px-6 pt-[18px] font-heebo text-base leading-[26px] text-text placeholder:text-complement"
                        {...register('description')}
                      />
                      <p className="absolute right-4 bottom-2 font-heebo text-xs leading-[22px] text-complement">
                        Máximo 240 caracteres
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <h3 className="font-heebo text-base font-medium leading-[26px] text-brand-orange">
                        Sua nota de 1 a 5
                      </h3>
                      <div className="relative flex h-12 w-[520px] items-center rounded-t-[10px] rounded-b-[10px]">
                        <button
                          className={`flex h-full w-1/5 items-center justify-center rounded-l-[10px] border transition-all ${
                            avaliation > 0
                              ? 'border-orange_border bg-orange_light'
                              : 'border-background_secondary'
                          }`}
                          onClick={() => setAvaliation(1)}
                          type="button"
                        >
                          {avaliation > 0 ? (
                            <FaStar size={20} color="#F25D27" />
                          ) : (
                            <FiStar size={20} color="#A0ACB2" />
                          )}
                        </button>
                        <button
                          className={`flex h-full w-1/5 items-center justify-center border transition-all ${
                            avaliation > 1
                              ? 'border-orange_border bg-orange_light'
                              : 'border-background_secondary'
                          }`}
                          onClick={() => setAvaliation(2)}
                          type="button"
                        >
                          {avaliation > 1 ? (
                            <FaStar size={20} color="#F25D27" />
                          ) : (
                            <FiStar size={20} color="#A0ACB2" />
                          )}
                        </button>
                        <button
                          className={`flex h-full w-1/5 items-center justify-center border transition-all ${
                            avaliation > 2
                              ? 'border-orange_border bg-orange_light'
                              : 'border-background_secondary'
                          }`}
                          onClick={() => setAvaliation(3)}
                          type="button"
                        >
                          {avaliation > 2 ? (
                            <FaStar size={20} color="#F25D27" />
                          ) : (
                            <FiStar size={20} color="#A0ACB2" />
                          )}
                        </button>
                        <button
                          className={`flex h-full w-1/5 items-center justify-center border transition-all ${
                            avaliation > 3
                              ? 'border-orange_border bg-orange_light'
                              : 'border-background_secondary'
                          }`}
                          onClick={() => setAvaliation(4)}
                          type="button"
                        >
                          {avaliation > 3 ? (
                            <FaStar size={20} color="#F25D27" />
                          ) : (
                            <FiStar size={20} color="#A0ACB2" />
                          )}
                        </button>
                        <button
                          className={`flex h-full w-1/5 items-center justify-center rounded-r-[10px] border transition-all ${
                            avaliation > 4
                              ? 'border-orange_border bg-orange_light'
                              : 'border-background_secondary'
                          }`}
                          onClick={() => setAvaliation(5)}
                          type="button"
                        >
                          {avaliation > 4 ? (
                            <FaStar size={20} color="#F25D27" />
                          ) : (
                            <FiStar size={20} color="#A0ACB2" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex h-[44px] items-center gap-6">
                      <FiAlertCircle size={32} color="#F25D27" />
                      <span className="font-regular text-left font-heebo text-sm leading-[22px] text-text">
                        Sua avaliação será analisada <br />
                        para poder ser publicada.
                      </span>
                    </div>

                    <button
                      className="ml-auto flex h-12 w-[191px] items-center 
                  justify-center rounded-[10px] bg-success font-heebo text-base font-medium leading-[26px] text-white"
                      type="submit"
                    >
                      Enviar avaliação
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <DialogAvaliationSent
        isOpen={isOpenAvaliationSent}
        onClose={closeModalAvaliationSent}
      />
    </>
  )
}

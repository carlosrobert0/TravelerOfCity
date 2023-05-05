import { Dialog, Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { FiAlertCircle, FiStar, FiX } from "react-icons/fi";
import * as yup from 'yup';
import { api } from "../../services/api";
import { DialogAvaliationSent } from "./DialogAvaliationSent";

interface DialogAddAvaliation {
  isOpen: boolean;
  onClose: () => void;
  place_id: string | string[];
  city_id: string | null;
}

const schema = yup
  .object({
    name: yup.string().required(),
    avatar: yup.string().required(),
    description: yup.string().required(),
  })
  .required()

interface FormData {
  name: string,
  avatar: string,
  description: string,
  status: string,
  avaliation: number
}

export function DialogAddAvaliation({ isOpen, onClose, city_id, place_id }: DialogAddAvaliation) {
  const [stars, setStars] = useState(0)
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
    const file = event.target.files?.[0];

    console.log(file)

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log(reader.result as string);
        setImageData(reader.result as string)
      };
    }
  }

  async function handleCreateDeposition({
    name, avatar = imageData, description, status = 'novo',
    avaliation = stars
  }: FormData) {
    try {
      await api.post('depositions', {
        name,
        avatar,
        description,
        status,
        avaliation,
        city_id,
        place_id
      })
      setImageData('')
      setStars(0)
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
                <Dialog.Panel className="relative flex h-[528px] overflow-hidden w-[736px] 
          transform flex-col items-center justify-start transition-all bg-background rounded-[20px] mt-16"
                >
                  <header
                    className="w-full h-[96px] bg-white overflow-hidden px-10 items-center justify-between flex rounded-t-[20px] border border-b-shape_secondary"
                  >
                    <h2 className='font-barlow font-semibold text-2xl leading-9 text-brand-blue'>Adicionar avaliação</h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-[10px] bg-shape border border-shape_secondary flex items-center justify-center">
                      <FiX size={20} color="#AOACB2" />
                    </button>
                  </header>
                  <form onSubmit={handleSubmit(handleCreateDeposition)} className='w-full px-10 flex flex-wrap justify-start mt-10 gap-4'>
                    <div className="flex items-center justify-start">
                      <label
                        htmlFor="dropzone-file"
                        className={`flex cursor-pointer border border-background_secondary
                    ${imageData === '' ? 'bg-brand-blue' : 'bg-gradient-to-r from-success_light to-background'} flex-col items-center justify-center rounded-[10px] w-[199px] h-12`}
                      >
                        {imageData === '' ?
                          (
                            <p className="font-heebo font-medium text-base leading-[26px] text-white">
                              Upload da sua foto
                            </p>
                          ) : (
                            <div className="flex gap-[52px]">
                              <p className="font-heebo font-medium text-base leading-[26px] text-success">
                                Feito!
                              </p>
                              <p className="font-heebo text-xs leading-[26px] text-success">
                                Trocar foto
                              </p>
                            </div>
                          )
                        }
                        <input
                          name="avatar"
                          {...register("avatar")}
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
                      className="w-[441px] h-12 bg-white border px-6 py-[11px] border-shape_secondary rounded-[10px] placeholder:text-complement font-heebo text-base leading-[26px] text-text"
                      placeholder="Seu nome completo"
                      name="name"
                      {...register("name")}
                    />
                    <div className="border border-shape_secondary w-[656px] h-[136px] rounded-[10px] relative">
                      <textarea
                        maxLength={240}
                        name="description"
                        placeholder="Escreva aqui..."
                        className="w-full h-full rounded-[10px] px-6 pt-[18px] placeholder:text-complement font-heebo text-base leading-[26px] text-text"
                        {...register("description")}
                      />
                      <p className="font-heebo text-xs leading-[22px] text-complement absolute right-4 bottom-2">Máximo 240 caracteres</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <h3 className="text-brand-orange font-medium font-heebo text-base leading-[26px]">Sua nota de 1 a 5</h3>
                      <div className="relative w-[520px] h-12 rounded-t-[10px] rounded-b-[10px] flex items-center">
                        <button
                          className={`w-1/5 h-full flex items-center transition-all justify-center border rounded-l-[10px] ${stars > 0 ? 'bg-orange_light border-orange_border' : 'border-background_secondary'}`}
                          onClick={() => setStars(1)}
                        >
                          {stars > 0 ? <FaStar size={20} color="#F25D27" /> : <FiStar size={20} color="#A0ACB2" />}
                        </button>
                        <button
                          className={`w-1/5 h-full flex items-center transition-all justify-center border ${stars > 1 ? 'bg-orange_light border-orange_border' : 'border-background_secondary'}`}
                          onClick={() => setStars(2)}
                        >
                          {stars > 1 ? <FaStar size={20} color="#F25D27" /> : <FiStar size={20} color="#A0ACB2" />}
                        </button>
                        <button
                          className={`w-1/5 h-full flex items-center transition-all justify-center border ${stars > 2 ? 'bg-orange_light border-orange_border' : 'border-background_secondary'}`}
                          onClick={() => setStars(3)}
                        >
                          {stars > 2 ? <FaStar size={20} color="#F25D27" /> : <FiStar size={20} color="#A0ACB2" />}
                        </button>
                        <button
                          className={`w-1/5 h-full flex items-center transition-all justify-center border ${stars > 3 ? 'bg-orange_light border-orange_border' : 'border-background_secondary'}`}
                          onClick={() => setStars(4)}
                        >
                          {stars > 3 ? <FaStar size={20} color="#F25D27" /> : <FiStar size={20} color="#A0ACB2" />}
                        </button>
                        <button
                          className={`w-1/5 h-full flex items-center transition-all justify-center border rounded-r-[10px] ${stars > 4 ? 'bg-orange_light border-orange_border' : 'border-background_secondary'}`}
                          onClick={() => setStars(5)}
                        >
                          {stars > 4 ? <FaStar size={20} color="#F25D27" /> : <FiStar size={20} color="#A0ACB2" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex h-[44px] items-center gap-6">
                      <FiAlertCircle size={32} color="#F25D27" />
                      <span className="font-regular font-heebo text-sm leading-[22px] text-text text-left">
                        Sua avaliação será analisada <br />
                        para poder ser publicada.
                      </span>
                    </div>

                    <button
                      className="flex h-12 w-[191px] items-center justify-center 
                  rounded-[10px] bg-success font-heebo text-base font-medium leading-[26px] text-white ml-auto"
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
      
      <DialogAvaliationSent isOpen={isOpenAvaliationSent} onClose={closeModalAvaliationSent} />
    </>
  )
}
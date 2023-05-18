import { Dialog, Transition } from "@headlessui/react";
import Image from 'next/image';
import { Fragment, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiStar, FiTrash, FiX } from "react-icons/fi";
import DialogDeleteAvaliation from "./DialogDeleteAvaliation";

interface DialogAvaliationDetails {
  isOpen: boolean;
  onClose: () => void;
  dataComment: any
}

export function DialogAvaliationDetails({
  isOpen,
  onClose,
  dataComment,
}: DialogAvaliationDetails) {
  const [isOpenAvaliationDelete, setIsOpenAvaliationDelete] = useState(false)

  function openAvaliationDelete() {
    setIsOpenAvaliationDelete(true)
  }

  function closeAvaliationDelete() {
    setIsOpenAvaliationDelete(true)
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
                <Dialog.Panel className="relative flex h-[366px] overflow-hidden w-[736px] 
          transform flex-col items-center justify-start transition-all bg-background rounded-[20px] mt-16"
                >
                  <header
                    className="w-full h-[96px] bg-white overflow-hidden px-10 items-center justify-between flex rounded-t-[20px] border border-b-shape_secondary"
                  >
                    <div className="flex gap-8 items-center">
                      <h2 className='font-barlow font-semibold text-2xl leading-9 text-brand-orange'>{dataComment?.avaliation ? `Nota ${dataComment?.avaliation}` : 'Sem avaliação'}</h2>
                      {dataComment?.status === 'accept' ? <img src="/accept.svg" alt="" /> :
                        dataComment?.status === 'decline' && <img src="/decline.svg" alt="" />}
                    </div>
                    <div className="flex gap-4 items-center">
                      <button onClick={openAvaliationDelete} className="rounded-[10px] w-[102px] h-10 bg-attention_light flex items-center justify-center gap-[10px]">
                        <FiTrash size={20} color="#DE3838"/>
                        <p className="font-heebo text-base leading-[26px] text-attention">Excluir</p>
                      </button>
                      <button onClick={onClose} className="w-10 h-10 rounded-[10px] bg-shape border border-shape_secondary flex items-center justify-center">
                        <FiX size={20} color="#AOACB2" />
                      </button>
                    </div>
                  </header>
                  <div
                    // onSubmit={handleSubmit(handleCreateDeposition)} 
                    className='w-full px-10 flex flex-wrap justify-start mt-10 gap-4 mb-0'>
                    <div className="flex items-center justify-start flex-col gap-6">
                      <div className="w-[626px] h-[118px] flex gap-6 items-start">
                        <Image
                          src="/imgComment.png"
                          width="64px"
                          height="64px"
                          objectFit="contain"
                          className="rounded-full"
                        />
                        <div className="flex flex-col gap-2 items-start justify-center">
                          <h3 className='font-barlow font-semibold text-xl leading-[26px] text-text'>{dataComment?.name}</h3>
                          <p className='font-heebo text-base leading-[26px] text-text w-[538px] text-left'>{dataComment?.description}</p>
                          <div className="flex gap-2">
                            <FaStar size={20} color="#F25D27" />
                            <FaStar size={20} color="#F25D27" />
                            <FaStar size={20} color="#F25D27" />
                            <FaStar size={20} color="#F25D27" />
                            <FiStar size={20} color="#F25D27" />
                          </div>
                        </div>
                      </div>
                      <div className="flex mb-10 ml-5 gap-[86px]">
                        <div className="flex gap-10">
                          <div className="flex flex-col items-start justify-between">
                            <p className="font-heebo font-medium text-[10px] leading-[22px] text-text uppercase">CATEGORIA</p>
                            <h2 className="font-heebo font-medium text-base leading-[26px] text-text">{dataComment?.place?.category?.name}</h2>
                          </div>
                          <div className="flex flex-col items-start justify-between">
                            <p className="font-heebo font-medium text-[10px] leading-[22px] text-text uppercase">CIDADE</p>
                            <h2 className="font-heebo font-medium text-base leading-[26px] text-text">{dataComment?.city?.name}</h2>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-between">
                          <p className="font-heebo font-medium text-[10px] leading-[22px] text-text uppercase">LOCAL</p>
                          <h2 className="font-heebo font-medium text-base leading-[26px] text-text">{dataComment?.place?.name}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <DialogDeleteAvaliation isOpen={isOpenAvaliationDelete} onCloseDialog={closeAvaliationDelete} dataComment={dataComment}/>
    </>
  )
}
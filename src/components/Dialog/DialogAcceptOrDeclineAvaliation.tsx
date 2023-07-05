import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FiStar, FiX } from 'react-icons/fi'
import { api } from '../../services/api'
import DialogAvaliationAccept from './DialogAvaliationAccept'
import DialogAvaliationDecline from './DialogAvaliationDecline'

interface IDialogAcceptOrDeclineAvaliation {
  isOpen: boolean
  onClose: () => void
  dataComment: any
}

export function DialogAcceptOrDeclineAvaliation({
  isOpen,
  onClose,
  dataComment,
}: IDialogAcceptOrDeclineAvaliation) {
  const [isOpenAvaliationAccept, setIsOpenAvaliationAccept] = useState(false)
  const [isOpenAvaliationDecline, setIsOpenAvaliationDecline] = useState(false)

  function openAvaliationAccept() {
    setIsOpenAvaliationAccept(true)
  }

  function openAvaliationDecline() {
    setIsOpenAvaliationDecline(true)
  }

  function closeAvaliationAccept() {
    setIsOpenAvaliationAccept(false)
  }

  function closeAvaliationDecline() {
    setIsOpenAvaliationDecline(false)
  }

  async function handleUpdateDeposition(newStatus: string) {
    try {
      await api.put(`depositions/${dataComment.id}`, {
        ...dataComment,
        status: newStatus,
      })
      onClose()
      newStatus === 'accept' ? openAvaliationAccept() : openAvaliationDecline()
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
                  className="relative mt-16 flex h-[465px] w-[736px] 
          transform flex-col items-center justify-start overflow-hidden rounded-[20px] bg-background transition-all"
                >
                  <header className="flex h-[96px] w-full items-center justify-between overflow-hidden rounded-t-[20px] border border-b-shape_secondary bg-white px-10">
                    <h2 className="font-barlow text-2xl font-semibold leading-9 text-brand-orange">
                      {dataComment?.avaliation
                        ? `Nota ${dataComment?.avaliation}`
                        : 'Sem avaliação'}
                    </h2>
                    <button
                      onClick={onClose}
                      className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-shape_secondary bg-shape"
                    >
                      <FiX size={20} color="#AOACB2" />
                    </button>
                  </header>
                  <div
                    // onSubmit={handleSubmit(handleCreateDeposition)}
                    className="mt-10 mb-0 flex w-full flex-wrap justify-start gap-4 px-10"
                  >
                    <div className="flex flex-col items-center justify-start gap-6">
                      <div className="flex h-[118px] w-[626px] items-start gap-6">
                        <Image
                          src="/imgComment.png"
                          width="64px"
                          height="64px"
                          objectFit="contain"
                          className="rounded-full"
                        />
                        <div className="flex flex-col items-start justify-center gap-2">
                          <h3 className="font-barlow text-xl font-semibold leading-[26px] text-text">
                            {dataComment?.name}
                          </h3>
                          <p className="w-[538px] text-left font-heebo text-base leading-[26px] text-text">
                            {dataComment?.description}
                          </p>
                          <div className="flex gap-2">
                            <FaStar size={20} color="#F25D27" />
                            <FaStar size={20} color="#F25D27" />
                            <FaStar size={20} color="#F25D27" />
                            <FaStar size={20} color="#F25D27" />
                            <FiStar size={20} color="#F25D27" />
                          </div>
                        </div>
                      </div>
                      <div className="mb-10 ml-5 flex gap-[86px]">
                        <div className="flex gap-10">
                          <div className="flex flex-col items-start justify-between">
                            <p className="font-heebo text-[10px] font-medium uppercase leading-[22px] text-text">
                              CATEGORIA
                            </p>
                            <h2 className="font-heebo text-base font-medium leading-[26px] text-text">
                              {dataComment?.place?.category?.name}
                            </h2>
                          </div>
                          <div className="flex flex-col items-start justify-between">
                            <p className="font-heebo text-[10px] font-medium uppercase leading-[22px] text-text">
                              CIDADE
                            </p>
                            <h2 className="font-heebo text-base font-medium leading-[26px] text-text">
                              {dataComment?.city?.name}
                            </h2>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-between">
                          <p className="font-heebo text-[10px] font-medium uppercase leading-[22px] text-text">
                            LOCAL
                          </p>
                          <h2 className="font-heebo text-base font-medium leading-[26px] text-text">
                            {dataComment?.place?.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <footer className="mt-auto flex h-[96px] w-full items-center justify-between overflow-hidden rounded-b-[20px] border border-b-shape_secondary bg-white px-10">
                    <div className="ml-auto flex gap-2">
                      <button
                        onClick={() => handleUpdateDeposition('decline')}
                        className="flex h-12 w-[123px] items-center justify-center rounded-[10px] bg-attention font-heebo text-base font-medium leading-[26px] text-shape"
                      >
                        Recusar
                      </button>
                      <button
                        onClick={() => handleUpdateDeposition('accept')}
                        className="flex h-12 w-[123px] items-center justify-center rounded-[10px] bg-success font-heebo text-base font-medium leading-[26px] text-shape"
                      >
                        Aceitar
                      </button>
                    </div>
                  </footer>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <DialogAvaliationAccept
        isOpen={isOpenAvaliationAccept}
        onCloseDialog={closeAvaliationAccept}
      />
      <DialogAvaliationDecline
        isOpen={isOpenAvaliationDecline}
        onCloseDialog={closeAvaliationDecline}
      />
    </>
  )
}

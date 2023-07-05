import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { FaStar } from 'react-icons/fa'
import { FiStar, FiX } from 'react-icons/fi'
import { calculateAverageRatings } from '../../utils/calculateAverageRatings'

interface IDialogAvaliations {
  isOpen: boolean
  onClose: () => void
  openModalAddAvaliation: () => void
  comments?: any[]
}

export function DialogAvaliations({
  isOpen,
  onClose,
  openModalAddAvaliation,
  comments,
}: IDialogAvaliations) {
  return (
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
                className="relative mt-16 flex h-[660px] 
          w-[736px] transform flex-col items-center justify-between rounded-[20px] bg-background transition-all"
              >
                <header className="flex h-[96px] w-full items-center justify-between overflow-hidden rounded-t-[20px] border border-b-shape_secondary bg-white px-10">
                  <div className="flex gap-[43px]">
                    <h2 className="font-barlow text-2xl font-semibold leading-9 text-brand-orange">
                      Nota {calculateAverageRatings(comments)}
                    </h2>
                    <div className="flex items-center justify-between gap-[19px]">
                      <img src="/comment.svg" alt="" width={18} height={18} />
                      <h3 className="font-barlow text-base font-semibold leading-[26px] text-text">
                        {comments?.length} comentários
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <button
                      onClick={openModalAddAvaliation}
                      className="font-heebo text-sm font-medium leading-6 text-text"
                    >
                      Adicionar avaliação
                    </button>
                    <button
                      onClick={onClose}
                      className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-shape_secondary bg-shape"
                    >
                      <FiX size={20} color="#AOACB2" />
                    </button>
                  </div>
                </header>
                <div className="h-[564px] w-full px-10">
                  <div className="flex h-full max-h-[524px] flex-col gap-10 overflow-y-auto pt-8">
                    {comments?.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex h-[118px] w-[626px] items-start gap-6"
                      >
                        <Image
                          src="/imgComment.png"
                          width="64px"
                          height="64px"
                          objectFit="contain"
                          className="rounded-full"
                        />
                        <div className="flex flex-col items-start justify-center gap-2">
                          <h3 className="font-barlow text-xl font-semibold leading-[26px] text-text">
                            {comment.name}
                          </h3>
                          <p className="w-[538px] text-left font-heebo text-base leading-[26px] text-text">
                            {comment.description}
                          </p>
                          <div className="flex gap-2">
                            {comment.avaliation > 0 ? (
                              <FaStar size={20} color="#F25D27" />
                            ) : (
                              <FiStar size={20} color="#F25D27" />
                            )}
                            {comment.avaliation > 1 ? (
                              <FaStar size={20} color="#F25D27" />
                            ) : (
                              <FiStar size={20} color="#F25D27" />
                            )}
                            {comment.avaliation > 2 ? (
                              <FaStar size={20} color="#F25D27" />
                            ) : (
                              <FiStar size={20} color="#F25D27" />
                            )}
                            {comment.avaliation > 3 ? (
                              <FaStar size={20} color="#F25D27" />
                            ) : (
                              <FiStar size={20} color="#F25D27" />
                            )}
                            {comment.avaliation > 4 ? (
                              <FaStar size={20} color="#F25D27" />
                            ) : (
                              <FiStar size={20} color="#F25D27" />
                            )}
                          </div>
                          <hr className="mt-4 w-[521px] border border-shape_secondary" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

import { Dialog, Transition } from "@headlessui/react";
import Image from 'next/image';
import { Fragment } from "react";
import { FaStar } from "react-icons/fa";
import { FiStar, FiX } from "react-icons/fi";
import { calculateAverageRatings } from "../../utils/calculateAverageRatings";

interface DialogAvaliations {
  isOpen: boolean;
  onClose: () => void;
  openModalAddAvaliation: () => void;
  comments?: any[]
}

export function DialogAvaliations({ isOpen, onClose, openModalAddAvaliation, comments }: DialogAvaliations) {
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
              <Dialog.Panel className="relative flex h-[660px] w-[736px] 
          transform flex-col items-center justify-between transition-all bg-background rounded-[20px] mt-16"
              >
                <header
                  className="w-full h-[96px] bg-white overflow-hidden px-10 items-center justify-between flex rounded-t-[20px] border border-b-shape_secondary"
                >
                  <div className='flex gap-[43px]'>
                    <h2 className='font-barlow font-semibold text-2xl leading-9 text-brand-orange'>Nota {calculateAverageRatings(comments)}</h2>
                    <div className='flex gap-[19px] items-center justify-between'>
                      <img src="/comment.svg" alt="" width={18} height={18} />
                      <h3 className="font-barlow font-semibold text-text text-base leading-[26px]">{comments?.length} comentários</h3>
                    </div>
                  </div>
                  <div className='flex gap-6 items-center justify-between'>
                    <button onClick={openModalAddAvaliation} className='font-heebo font-medium text-sm leading-6 text-text'>Adicionar avaliação</button>
                    <button onClick={onClose} className="w-10 h-10 rounded-[10px] bg-shape border border-shape_secondary flex items-center justify-center">
                      <FiX size={20} color="#AOACB2" />
                    </button>
                  </div>
                </header>
                <div className='h-[564px] w-full px-10'>
                  <div className='h-full max-h-[524px] overflow-y-auto pt-8 flex flex-col gap-10'>
                    {comments?.map(comment => (
                      <div key={comment.id} className="w-[626px] h-[118px] flex gap-6 items-start">
                        <Image
                          src="/imgComment.png"
                          width="64px"
                          height="64px"
                          objectFit="contain"
                          className="rounded-full"
                        />
                        <div className="flex flex-col gap-2 items-start justify-center">
                          <h3 className='font-barlow font-semibold text-xl leading-[26px] text-text'>{comment.name}</h3>
                          <p className='font-heebo text-base leading-[26px] text-text w-[538px] text-left'>{comment.description}</p>
                          <div className="flex gap-2">
                            {comment.avaliation > 0 ? <FaStar size={20} color="#F25D27" /> : <FiStar size={20} color="#F25D27" />}
                            {comment.avaliation > 1 ? <FaStar size={20} color="#F25D27" /> : <FiStar size={20} color="#F25D27" />}
                            {comment.avaliation > 2 ? <FaStar size={20} color="#F25D27" /> : <FiStar size={20} color="#F25D27" />}
                            {comment.avaliation > 3 ? <FaStar size={20} color="#F25D27" /> : <FiStar size={20} color="#F25D27" />}
                            {comment.avaliation > 4 ? <FaStar size={20} color="#F25D27" /> : <FiStar size={20} color="#F25D27" />}
                          </div>
                          <hr className='w-[521px] border border-shape_secondary mt-4' />
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
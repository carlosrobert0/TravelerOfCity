import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface IDialogAvaliationSent {
  isOpen: boolean
  onClose: () => void
}

export function DialogAvaliationSent({
  isOpen,
  onClose,
}: IDialogAvaliationSent) {
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
              <Dialog.Panel className="flex h-full w-[302px] transform flex-col items-center justify-center transition-all">
                <div className="flex flex-col items-center">
                  <div className="relative flex flex-col items-center justify-center">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M80 40C80 62.0911 62.0911 80 40 80C17.9111 80 0 62.0911 0 40C0 17.9111 17.9111 0 40 0C62.0911 0 80 17.9111 80 40Z"
                        fill="#FFCC66"
                      />
                      <path
                        d="M63.2379 39.5488C63.1046 39.2488 59.9068 32.2222 53.3334 32.2222C46.7623 32.2222 43.5623 39.2488 43.429 39.5488C43.2246 40.0088 43.3579 40.5466 43.7512 40.8622C44.1401 41.1777 44.6979 41.1888 45.1068 40.8933C45.1334 40.8733 47.9112 38.8888 53.3334 38.8888C58.7246 38.8888 61.4979 40.8466 61.5601 40.8911C61.7557 41.0377 61.9912 41.1111 62.2223 41.1111C62.4668 41.1111 62.7134 41.0288 62.9157 40.8688C63.309 40.5533 63.4446 40.0111 63.2379 39.5488ZM36.5712 39.5488C36.4379 39.2488 33.2401 32.2222 26.6668 32.2222C20.0957 32.2222 16.8957 39.2488 16.7623 39.5488C16.5579 40.0088 16.6912 40.5466 17.0823 40.8622C17.4734 41.1777 18.0312 41.1888 18.4379 40.8933C18.4668 40.8733 21.2423 38.8888 26.6668 38.8888C32.0579 38.8888 34.8312 40.8466 34.8934 40.8911C35.089 41.0377 35.3246 41.1111 35.5557 41.1111C35.8001 41.1111 36.0468 41.0288 36.249 40.8688C36.6446 40.5533 36.7757 40.0111 36.5712 39.5488ZM40.0001 48.8888C31.949 48.8888 26.6068 47.9511 20.0001 46.6666C18.4912 46.3755 15.5557 46.6666 15.5557 51.1111C15.5557 59.9999 25.7668 71.1111 40.0001 71.1111C54.2312 71.1111 64.4446 59.9999 64.4446 51.1111C64.4446 46.6666 61.509 46.3733 60.0001 46.6666C53.3934 47.9511 48.0512 48.8888 40.0001 48.8888Z"
                        fill="#474238"
                      />
                      <path
                        d="M20 51.1113C20 51.1113 26.6667 53.3336 40 53.3336C53.3333 53.3336 60 51.1113 60 51.1113C60 51.1113 55.5556 60.0002 40 60.0002C24.4444 60.0002 20 51.1113 20 51.1113Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <h1 className="mt-10 text-center font-heebo text-4xl font-medium leading-[34px] text-shape">
                    Avaliação enviada!
                  </h1>

                  <p className="mt-4 w-[214px] text-center font-heebo text-base leading-[26px]">
                    Agradecemos pelo seu tempo e colaboração.
                  </p>

                  <button
                    onClick={onClose}
                    className="mt-10 h-12 w-[146px] rounded-[10px] bg-brand-orange font-heebo text-base font-medium leading-[26px] text-shape"
                  >
                    Disponha :)
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

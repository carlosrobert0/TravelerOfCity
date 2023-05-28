import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { api } from '../../services/api'

interface DialogDeleteAvaliationProps {
  isOpen: boolean
  onCloseDialog: () => void
  dataComment: any
}

export default function DialogDeleteAvaliation({
  isOpen,
  onCloseDialog,
  dataComment,
}: DialogDeleteAvaliationProps) {
  async function handleDeleteDeposition() {
    try {
      await api.delete(`depositions/${dataComment?.id}`)
      onCloseDialog()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCloseDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background_dark" />
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
              <Dialog.Panel className="relative flex h-screen w-full transform transition-all">
                <main className="absolute top-[93px] flex h-[508px] w-full items-center justify-center">
                  <div className="relative flex h-[546px] w-[337px] flex-col items-center justify-between">
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
                        fill="#DE3838"
                      />
                      <path
                        opacity="0.04"
                        d="M330 190C330 267.319 267.319 330 190 330C112.689 330 50 267.319 50 190C50 112.689 112.689 50 190 50C267.319 50 330 112.689 330 190Z"
                        fill="#DE3838"
                      />
                      <path
                        opacity="0.04"
                        d="M280 190C280 239.705 239.705 280 190 280C140.3 280 100 239.705 100 190C100 140.3 140.3 100 190 100C239.705 100 280 140.3 280 190Z"
                        fill="#DE3838"
                      />
                      <path
                        d="M230 190C230 212.091 212.091 230 190 230C167.911 230 150 212.091 150 190C150 167.911 167.911 150 190 150C212.091 150 230 167.911 230 190Z"
                        fill="#DE3838"
                      />
                    </svg>

                    <div className="absolute top-[104px] flex h-full w-[337px] flex-col items-center">
                      <div className="relative mt-[67px] flex flex-col items-center justify-center">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 10H8.33333H35"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.3335 10V6.66671C13.3335 5.78265 13.6847 4.93481 14.3098 4.30968C14.9349 3.68456 15.7828 3.33337 16.6668 3.33337H23.3335C24.2176 3.33337 25.0654 3.68456 25.6905 4.30968C26.3156 4.93481 26.6668 5.78265 26.6668 6.66671V10M31.6668 10V33.3334C31.6668 34.2174 31.3156 35.0653 30.6905 35.6904C30.0654 36.3155 29.2176 36.6667 28.3335 36.6667H11.6668C10.7828 36.6667 9.93493 36.3155 9.30981 35.6904C8.68469 35.0653 8.3335 34.2174 8.3335 33.3334V10H31.6668Z"
                            stroke="white"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>

                      <h1
                        className="mt-[61px] text-center font-heebo text-[54px] 
                            font-medium leading-[58px] text-shape"
                      >
                        Excluir depoimento
                      </h1>
                      <h2 className="mt-6 text-center font-heebo text-base leading-[26px] text-complement">
                        Tem certeza que quer excluir o depoimento de{' '}
                        {dataComment?.name} do local {dataComment?.place?.name}{' '}
                        da cidade {dataComment?.city?.name}?
                      </h2>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onCloseDialog()}
                          className="mt-10 flex h-[48px] w-[100px] items-center 
                                justify-center rounded-[10px] bg-attention font-heebo 
                                text-base font-medium leading-[26px] text-white"
                        >
                          Não
                        </button>
                        <button
                          onClick={handleDeleteDeposition}
                          className="mt-10 flex h-[48px] w-[100px] items-center 
                                justify-center rounded-[10px] bg-success font-heebo 
                                text-base font-medium leading-[26px] text-white"
                        >
                          Sim
                        </button>
                      </div>
                    </div>
                  </div>
                </main>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

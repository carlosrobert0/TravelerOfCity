import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface DialogAvaliationAcceptProps {
  isOpen: boolean;
  onCloseDialog: () => void;
}

export default function DialogAvaliationDecline({
  isOpen,
  onCloseDialog
}: DialogAvaliationAcceptProps) {
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
                <svg width="380" height="380" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.02" d="M380 190C380 294.933 294.933 380 190 380C85.0778 380 0 294.933 0 190C0 85.0778 85.0778 0 190 0C294.933 0 380 85.0778 380 190Z" fill="#DE3838" />
                  <path opacity="0.04" d="M330 190C330 267.319 267.319 330 190 330C112.689 330 50 267.319 50 190C50 112.689 112.689 50 190 50C267.319 50 330 112.689 330 190Z" fill="#DE3838" />
                  <path opacity="0.04" d="M280 190C280 239.705 239.705 280 190 280C140.3 280 100 239.705 100 190C100 140.3 140.3 100 190 100C239.705 100 280 140.3 280 190Z" fill="#DE3838" />
                </svg>


                <div className="absolute top-[132px] flex h-full w-[337px] flex-col items-center">
                  <div className="relative mt-[18px] flex flex-col items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M80 40C80 62.0911 62.0911 80 40 80C17.9111 80 0 62.0911 0 40C0 17.9111 17.9111 0 40 0C62.0911 0 80 17.9111 80 40Z" fill="#DE3838" />
                    </svg>

                    <svg className="absolute top-[26px] left-6" width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.4815 5.00024L6.51855 25.0002" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M6.51855 5.00024L25.4815 25.0002" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </div>

                  <h1 className="mt-12 w-[294px] text-center font-heebo text-[54px] font-medium leading-[64px] text-shape">
                    Depoimento recusado!
                  </h1>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
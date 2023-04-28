import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment } from "react";
import { FiX } from "react-icons/fi";

interface DialogAddAvaliation {
  isOpen: boolean;
  onClose: () => void;
}

export function DialogAddAvaliation({ isOpen, onClose }: DialogAddAvaliation) {
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    console.log(file)

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log(reader.result as string);
      };
    }
  }

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
                <div className='w-full px-10 flex flex-wrap justify-start mt-10 gap-4'>
                  <div className="flex items-center justify-start">
                    <label
                      htmlFor="dropzone-file"
                      className="flex cursor-pointer 
              bg-brand-blue flex-col items-center justify-center rounded-[10px] w-[199px] h-12"
                    >
                      <p className="font-heebo font-medium text-base leading-[26px] text-white">
                        Upload da sua foto
                      </p>
                      <input
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
                  />
                  <div className="border border-shape_secondary w-[656px] h-[136px] rounded-[10px] relative">
                    <textarea maxLength={240} name="" placeholder="Escreva aqui..." className="w-full h-full rounded-[10px] px-6 pt-[18px] placeholder:text-complement font-heebo text-base leading-[26px] text-text" />
                    <p className="font-heebo text-xs leading-[22px] text-complement absolute right-4 bottom-2">Máximo 240 caracteres</p>
                  </div>

                  <div>
                    <h3 className="text-brand-orange font-medium font-heebo text-base leading-[26px]">Sua nota de 1 a 5</h3>
                    <input type="range" className="appearance-none w-full h-2 bg-gray-300 rounded-full overflow-hidden" />
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
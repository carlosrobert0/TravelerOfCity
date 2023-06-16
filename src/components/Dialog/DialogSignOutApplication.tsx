import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useAuth } from '../../contexts/AuthContext'

interface SignOutApplicationProps {
  isOpen: boolean
  onCloseDialog: () => void
}

export default function DialogSignOutApplication({
  isOpen,
  onCloseDialog,
}: SignOutApplicationProps) {
  const { logOut, user, signOutApplication } = useAuth()
  const router = useRouter()

  async function handleSignOutWhitGoogle() {
    try {
      await logOut()
    } catch (error) {}
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
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="flex h-screen w-full transform transition-all">
            <main className="flex w-full items-center justify-center">
              <div className="flex items-center justify-between gap-16">
                <h1
                  className="text-center font-heebo text-4xl 
                  font-medium leading-[46px] text-shape"
                >
                  Você quer mesmo sair?
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => onCloseDialog()}
                    className="flex h-[48px] w-[94px] items-center 
                    justify-center rounded-[10px] border-2 border-brand-orange"
                  >
                    <p
                      className="font-heebo 
                                text-base font-medium leading-[26px] text-white"
                    >
                      Não
                    </p>
                  </button>
                  <button
                    onClick={
                      user?.displayName
                        ? handleSignOutWhitGoogle
                        : () => signOutApplication(router)
                    }
                    className="flex h-[48px] w-[92px] items-center 
                                justify-center rounded-[10px] bg-brand-orange font-heebo 
                                text-base font-medium leading-[26px] text-white"
                  >
                    Sim
                  </button>
                </div>
              </div>
            </main>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

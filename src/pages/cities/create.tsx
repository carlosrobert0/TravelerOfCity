import Header from '../../components/Header'
import Nav from '../../components/Nav'
import { FiAlertCircle, FiEdit3, FiTrash } from 'react-icons/fi'
import { BsArrowLeft } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { useForm } from 'react-hook-form'

interface CityFormData {
  name: string;
  image?: string | any;
  description: string;
}

export default function Create() {
  const { register, handleSubmit, watch } = useForm()
  const router = useRouter()

  async function handleCreateCity({ name, image, description }: CityFormData) {
    try {
      await api.post('city', {
        name,
        image: image[0].name,
        description
      })

      router.push('/cities')
    } catch (error) {
      console.log(error)
    }
  }

  function handleGoBack() {
    router.back()
  }

  return (
    <div className="w-full h-[1192px] flex justify-between overflow-x-hidden relative">
      <Nav />
      <main className="flex flex-col w-full ml-24 overflow-x-hidden overflow-y-scroll absolute items-center justify-around">
        <header className={`w-full h-[96px] flex items-center bg-shape px-28 justify-between`}>
          <BsArrowLeft onClick={handleGoBack} className="font-barlow font-semibold w-[128px] text-4xl leading-10 text-complement my-6" />
          <h2 className="font-barlow text-complement text-xl font-medium leading-[30px]">
            Adicionar um perfil
          </h2>
          <div className="flex gap-2 items-center">
            <h2 className="font-roboto font-semibold text-text text-xs">01 </h2>
            <h2 className="font-roboto font-semibold text-complement text-xs">-</h2>
            <h2 className="font-roboto font-semibold text-complement text-xs"> 02</h2>
          </div>
        </header>
        <span className="border-[1px] text-shape_secondary w-[1443px]" />
        <div className="w-[800px] h-full mb-28 flex-col flex bg-shape rounded-2xl mt-4">
          <div className="flex items-center justify-start mt-[72px]">
            <div className="w-16 h-16 rounded-[10px] bg-success flex justify-center items-center ml-[63px]">
              <h6 className="font-barlow font-semibold text-2xl leading-[34px] text-center text-shape">01</h6>
            </div>
            <h1 className="font-barlow text-success text-4xl font-semibold leading-[34px] ml-10">Adicione uma cidade</h1>
          </div>
          <span className="h-[1px] w-full bg-shape_secondary mt-10" />
          <div className="flex items-start mx-16 flex-col">
            <h2 className="font-barlow font-medium text-2xl leading-[30px] text-title mt-12">Dados da cidade</h2>
            <span className="h-[1px] w-[673px] bg-shape_secondary mt-4" />
            <form onSubmit={handleSubmit(handleCreateCity)}>
              <label className="font-heebo font-regular text-sm leading-[22px] text-text mt-6 mb-[10px]">Nome da cidade</label>
              <input {...register('name')} className="w-[672px] rounded-[10px] h-[56px] bg-background border-[1px] border-shape_secondary" />

              <label className="font-heebo font-regular text-sm leading-[22px] text-text mt-6 mb-[10px]">Foto da cidade</label>

              <div className="flex justify-center items-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-heebo text-base text-brand-orange">+ Adicionar uma foto</span></p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" {...register('image')} />
                </label>
              </div>

              <label className="font-heebo font-regular text-sm leading-[22px] text-text mt-6 mb-[10px]">Descrição da cidade</label>
              <input type="text" className="w-[672px] rounded-[10px] h-[202px] bg-background border-[1px] border-shape_secondary" {...register("description")} />
              <div className="flex justify-between w-full items-center mt-[56px] mb-[139px] h-[44px]">
                <div className="flex items-center mr-10">
                  <FiAlertCircle size={32} color="#F25D27" />
                  <span className="font-heebo font-regular text-sm leading-[22px] text-text ml-6">Preencha todos os <br /> dados com cuidado.</span>
                </div>
                <button type="submit" className="bg-[#115D8C] rounded-[10px] w-[125px] h-[48px] text-background font-heebo">Próximo</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
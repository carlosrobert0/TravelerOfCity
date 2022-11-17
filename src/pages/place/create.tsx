import { BsArrowLeft } from 'react-icons/bs'

import Nav from '../../components/Nav'
import { useRouter } from 'next/router'

import CardCategoryRadioBox from '../../components/CardCategoryRadioBox'
import { Map } from '../Map'
import { useForm } from 'react-hook-form'
import { api } from '../../services/api'

interface PlaceData extends AddressData{
  name: string;
  image: any;
  description: string;
  category_id: string;
  address_id: string;
}

interface AddressData  {
   zip_code: string;
   street: string;
   neighborhood: string;
   number: number | null;
}
export default function Create() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  function handleGoBack() {
    router.back()
  }

  async function handleCreateSubmit({ name, image, description, category_id, address_id, zip_code, street, neighborhood, number }: PlaceData) {
    try {
      const response = await api.post('/address', {
        zip_code,
        street,
        neighborhood,
        number
      })
      const { id } = response.data
      address_id = id
    } catch (error) { 
      console.log(error)
    }

    try {
      await api.post('/place', {
        name,
        image: image[0].name,
        description,
        category_id: '6fc32598-5e90-46f7-8cac-2719cd3e2da2',
        address_id
      })
      console.log('awui')
    } catch (error) {
      console.log(error)
      console.log('ersa')
    }
  }

  return (
    <div className="w-full h-[1192px] flex justify-between overflow-x-hidden relative">
      <Nav />
      <main className="flex flex-col w-full ml-24 overflow-x-hidden overflow-y-scroll absolute items-center justify-around">
        <header className={`w-full h-[96px] flex items-center bg-shape px-28 justify-between`}>
          <button onClick={handleGoBack}>
            <BsArrowLeft className="font-barlow font-semibold w-[128px] text-4xl leading-10 text-complement my-6" />
          </button>
          <h2 className="font-barlow text-complement text-xl font-medium leading-[30px]">
            Adicionar um perfil
          </h2>
          <div className="flex gap-2 items-center">
            <h2 className="font-roboto font-semibold text-complement text-xs">01 </h2>
            <h2 className="font-roboto font-semibold text-complement text-xs">-</h2>
            <h2 className="font-roboto font-semibold text-text text-xs"> 02</h2>
          </div>
        </header>
        <span className="border-[1px] text-shape_secondary w-[1443px]" />
        <div className="w-[800px] h-full mb-28 flex-col flex bg-shape rounded-2xl mt-4">
          <div className="flex items-center justify-start mt-[72px]">
            <div className="w-16 h-16 rounded-[10px] bg-success flex justify-center items-center ml-[63px]">
              <h6 className="font-barlow font-semibold text-2xl leading-[34px] text-center text-shape">02</h6>
            </div>
            <h1 className="font-barlow text-success text-4xl font-semibold leading-[34px] ml-10">Adicione um local</h1>
          </div>
          <span className="h-[1px] w-full bg-shape_secondary mt-10" />
          <form onSubmit={handleSubmit(handleCreateSubmit)} className="flex items-start mx-16 flex-col">
            <h2 className="font-barlow font-medium text-2xl leading-[30px] text-title mt-12">Dados Básicos</h2>
            <span className="h-[1px] w-[673px] bg-shape_secondary mt-4" />
            <label className="font-heebo font-regular text-sm leading-[22px] text-text mt-6 mb-[10px]">Nome do local</label>
            <input type="text" {...register('name')} className="w-[672px] rounded-[10px] h-[56px] bg-background border-[1px] border-shape_secondary" />

            <label className="font-heebo font-regular text-sm leading-[22px] text-text mt-6 mb-[10px]">Foto do local</label>

            <div className="flex justify-center items-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-heebo text-base text-brand-orange">+ Adicionar uma foto</span></p>
                </div>
                <input id="dropzone-file" type="file" {...register('image')} className="hidden" />
              </label>
            </div>

            <label className="font-heebo font-regular text-sm leading-[22px] text-text mt-6 mb-[10px]">Descrição do local</label>
            <input type="text" {...register('description')} className="w-[672px] rounded-[10px] h-[202px] bg-background border-[1px] border-shape_secondary" />

            <div className="flex flex-col mt-10">
              <label htmlFor="" className="font-heebo mb-[18px] font-regular text-sm leading-[22px] text-text">Selecione uma categoria</label>
              {/* <input type="radio" name="Pontos turisticos" id="turisticos" />
              <input type="radio" name="Comidas e bebidas" id="comidas" />
              <input type="radio" name="Eventos organizados" id="eventos" /> */}
              <div className="flex gap-4">
                <CardCategoryRadioBox />
                <CardCategoryRadioBox />
                <CardCategoryRadioBox />
              </div>
            </div>

            <div className="w-[672px] mt-16 h-[525px] flex flex-col">
              <h2 className="font-barlow font-medium text-2xl leading-[30px] text-title">Endereço</h2>
              <span className="border-[1px] mt-6 mb-10 w-full bg-shape_secondary" />
              <div className="flex flex-wrap gap-4">
                <label className="flex flex-col">
                  <h4 className="font-heebo mb-[10px] font-regular text-sm leading-[22px] text-text">CEP</h4>
                  <input type="text" {...register('zip_code')}className="w-[168px] h-[56px] bg-background border-[1px] border-shape_secondary rounded-[10px]" />
                </label>
                <label className="flex flex-col">
                  <h4 className="font-heebo mb-[10px] font-regular text-sm leading-[22px] text-text">Rua</h4>
                  <input type="text" {...register('street')} className="w-[488px] h-[56px] bg-background border-[1px] border-shape_secondary rounded-[10px]" />
                </label>
                <label className="flex flex-col">
                  <h4 className="font-heebo mb-[10px] font-regular text-sm leading-[22px] text-text">Bairro</h4>
                  <input type="text" {...register('neighborhood')} className="w-[488px] h-[56px] bg-background border-[1px] border-shape_secondary rounded-[10px]" />
                </label>
                <label className="flex flex-col">
                  <h4 className="font-heebo mb-[10px] font-regular text-sm leading-[22px] text-text">Número</h4>
                  <input type="text" {...register('number')} className="w-[168px] h-[56px] bg-background border-[1px] border-shape_secondary rounded-[10px]" />
                </label>
              </div>
              <div className="w-[672px] h-[199px] rounded-2xl orverflow-hidden mt-10">
                <Map />
              </div>
              <div className="flex justify-between my-12">
                <div className="flex items-center gap-[26px]">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0003 29.3334C23.3641 29.3334 29.3337 23.3639 29.3337 16.0001C29.3337 8.63628 23.3641 2.66675 16.0003 2.66675C8.63653 2.66675 2.66699 8.63628 2.66699 16.0001C2.66699 23.3639 8.63653 29.3334 16.0003 29.3334Z" stroke="#F25D27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16 10.6667V16.0001" stroke="#F25D27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16 21.3333H16.0133" stroke="#F25D27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span className="w-[127px] h-11 font-heebo text-sm leading-[22px] text-text">Preencha todos os dados com cuidado</span>
                </div>
                <button className="w-[191px] h-12 rounded-[10px] flex items-center bg-success justify-center font-heebo font-medium text-base leading-[26px] text-white" type="submit" >Concluir cadastro</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
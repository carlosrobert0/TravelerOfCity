import { useRouter } from "next/router"

export default function Header() {
  const router = useRouter()

  function handleCreateCity() {
    router.push('/cities/create')
  }

  return (
    <header className="w-full h-[96px] flex flex-row items-center justify-start bg-shape">
      <>
        <h1 className="font-barlow font-semibold w-[128px] text-4xl leading-10 text-title my-6 ml-28">Cidades</h1>
        <button onClick={handleCreateCity} className="bg-success w-[214px] h-[48px] items-center font-heebo font-medium text-base leading-[26px] rounded-lg text-shape ml-[778px]">+ Adicionar um perfil</button>
      </>
    </header>
  )
}
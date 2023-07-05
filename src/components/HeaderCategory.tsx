import { useRouter } from 'next/router'

export default function HeaderCategory() {
  const router = useRouter()
  function handleCreateCategory() {
    router.push('/categories/create')
  }

  return (
    <header className="flex h-[96px] w-full flex-row items-center justify-between bg-shape px-28">
      <h1 className="my-6 w-[128px] font-barlow text-4xl font-semibold leading-10 text-title">
        Categorias
      </h1>
      <div className="flex items-center justify-center">
        <img src="/alert.svg" alt="" />
        <h3 className="ml-3 w-[204px] font-heebo text-sm text-complement">
          Você pode adicionar apenas três
        </h3>
      </div>
      <button
        onClick={handleCreateCategory}
        disabled
        className="h-[48px] w-[214px] items-center 
                    rounded-lg bg-success font-heebo text-base font-medium leading-[26px] text-shape"
      >
        + Adicionar uma categoria
      </button>
    </header>
  )
}

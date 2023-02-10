import { useRouter } from 'next/router'

export default function Header() {
    const router = useRouter()
    function handleCreateCity() {
        router.push('/cities/create')
    }

    return (
        <header className="flex h-[96px] w-full flex-row items-center justify-start bg-shape">
            <>
                <h1 className="my-6 ml-28 w-[128px] font-barlow text-4xl font-semibold leading-10 text-title">
                    Cidades
                </h1>
                <button
                    onClick={handleCreateCity}
                    className="ml-[778px] h-[48px] w-[214px] items-center 
                    rounded-lg bg-success font-heebo text-base font-medium leading-[26px] text-shape"
                >
                    + Adicionar um perfil
                </button>
            </>
        </header>
    )
}

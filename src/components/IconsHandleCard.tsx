import { useRouter } from 'next/router'
import { FiEdit3, FiTrash } from 'react-icons/fi'

export function IconsHandleCard({ id }) {
    const router = useRouter()

    return (
        <>
            <button
                onClick={() => router.push(`cities/edit/${id}`)}
                className="absolute top-4 right-14 mr-1 flex h-10 w-10 items-center 
                justify-center rounded-l-xl border-[1px] border-shape_secondary bg-shape text-text"
            >
                <FiEdit3 size={20} />
            </button>
            <button
                onClick={() => router.push(`/cities/delete/${id}`)}
                className="absolute top-4 right-4 flex h-10 w-10 items-center 
                    justify-center rounded-r-xl border-[1px] border-shape_secondary bg-shape text-text"
            >
                <FiTrash
                    size={20}
                />
            </button>
        </>
    )
}

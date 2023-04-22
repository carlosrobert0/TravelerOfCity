import { useRouter } from 'next/router'
import { FiEdit3, FiTrash } from 'react-icons/fi'

export function IconsHandleCard({ id, module }) {
    const router = useRouter()

    return (
        <div className="flex gap-1">
            <button
                onClick={() => router.push(`${module}/edit/${id}`)}
                disabled={module === 'categories'}
                className="flex h-10 w-10 items-center 
                justify-center rounded-l-xl border-[1px] border-shape_secondary bg-shape text-text"
            >
                <FiEdit3 size={20} />
            </button>
            <button
                onClick={() => router.push(`/${module}/delete/${id}`)}
                disabled={module === 'categories'}
                className="flex h-10 w-10 items-center 
                    justify-center rounded-r-xl border-[1px] border-shape_secondary bg-shape text-text"
            >
                <FiTrash
                    size={20}
                />
            </button>
        </div>
    )
}

import { FiEdit3, FiTrash } from "react-icons/fi";

export function IconsHandleCard() {
  return (
    <>
      <button className="w-10 h-10 rounded-l-xl text-text bg-shape absolute top-4 right-14 mr-1 border-[1px] border-shape_secondary flex items-center justify-center">
        <FiEdit3 size={20} />
      </button>
      <button className="w-10 h-10 rounded-r-xl text-text bg-shape absolute top-4 right-4 border-[1px] border-shape_secondary flex items-center justify-center">
        <FiTrash size={20} />
      </button>
    </>
  )
}
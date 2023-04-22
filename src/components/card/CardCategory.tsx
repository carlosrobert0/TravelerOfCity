import { renderIcon } from "../../utils/renderIcon";
import { IconsHandleCard } from "../IconsHandleCard";

interface CardCategoryProps {
  icon: string
  title: string
  count: number
}

export function CardCategory({ icon, title, count }: CardCategoryProps) {
  return (
    <div className="w-[354px] px-8 h-[628px] rounded-[20px] bg-shape border border-shape_secondary flex flex-col relative">
      <header className="py-8 flex justify-between items-center">
        <div className="w-10 h-10 rounded-[10px] bg-shape border border-shape_secondary flex items-center justify-center">
          <img src="/adjust.svg" alt="" />
        </div>
        <IconsHandleCard id="1" module="categories"/>
      </header>
      <hr className="w-[354px] overflow-visible -ml-8"/>
      <div className="mt-[88px] flex flex-col gap-10">
        {renderIcon(icon, 58, '')}
        <h3 className="font-semibold w-[210px] font-heebo text-5xl leading-[53px] text-title">
          {title}
        </h3>
      </div>
      <h3 className="font-roboto text-xl leading-[26px] text-text mt-32">{count} locais</h3>
    </div>
  )
}
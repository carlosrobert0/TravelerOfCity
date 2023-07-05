import { renderIcon } from '../../utils/renderIcon'
import { IconsHandleCard } from '../IconsHandleCard'

interface CardCategoryProps {
  icon: string
  title: string
  count: number
}

export function CardCategory({ icon, title, count }: CardCategoryProps) {
  return (
    <div className="relative flex h-[628px] w-[354px] flex-col rounded-[20px] border border-shape_secondary bg-shape px-8">
      <header className="flex items-center justify-between py-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-shape_secondary bg-shape">
          <img src="/adjust.svg" alt="" />
        </div>
        <IconsHandleCard id="1" module="categories" />
      </header>
      <hr className="-ml-8 w-[354px] overflow-visible" />
      <div className="mt-[88px] flex flex-col gap-10">
        {renderIcon(icon, 58, '')}
        <h3 className="w-[210px] font-heebo text-5xl font-semibold leading-[53px] text-title">
          {title}
        </h3>
      </div>
      <h3 className="mt-32 font-roboto text-xl leading-[26px] text-text">
        {count} locais
      </h3>
    </div>
  )
}

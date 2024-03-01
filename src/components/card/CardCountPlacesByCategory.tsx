import { renderIcon } from '../../utils/renderIcon'

interface CardCountPlacesByCategoryProps {
  icon: string
  count: number | string
  title: string
}

export default function CardCountPlacesByCategory({
  count,
  icon,
  title,
}: CardCountPlacesByCategoryProps) {
  return (
    <div
      className={`flex h-[298px] w-[350px] md:w-[160px] flex-col justify-between rounded-[20px] 
      border-[1px] border-shape_secondary bg-shape ${
        count === '0' && 'opacity-40'
      } relative`}
    >
      {renderIcon(icon, 40, 'mt-8 ml-8 hidden md:block')}
      {renderIcon(icon, 0, 'mt-8 ml-8 md:hidden')}
      <hr className="absolute top-[104px] w-full md:w-[160px] bg-shape_secondary" />
      <div className="absolute top-[136px] ml-8 flex flex-col items-start gap-4">
        <h1 className="font-barlow text-5xl md:text-[40px] font-semibold leading-10 text-title">
          {count}
        </h1>
        <h3 className="font-regular w-[120px] md:w-[90px] font-heebo text-3xl md:text-base leading-9 md:leading-[22px] text-text">
          {title}
        </h3>
      </div>
    </div>
  )
}

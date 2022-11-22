import { ComponentType } from 'react';
import { renderIcon } from '../../utils/renderIcon';

interface CardCategoryProps {
  icon: string;
  count: string;
  title: string;
}

export default function CardCategory({
  count,
  icon,
  title
}: CardCategoryProps) {

  
  return (
    <div className={`w-[160px] h-[268] flex flex-col justify-around rounded-[20px] bg-shape border-[1px] border-shape_secondary ${count === '0' && 'opacity-40'} relative`}>
      {renderIcon(icon, 40)}
      <span className="border-[1px] w-[160px] bg-shape_secondary top-[104px] absolute"/>
      <div className="ml-8 flex flex-col items-start gap-4 top-[136px] absolute">
        <h1 className="font-barlow font-semibold text-[40px] leading-10 text-title">{count}</h1>
        <h3 className="text-text font-heebo font-regular text-base leading-[22px] w-[71px]">{title}</h3>
      </div>
    </div>
  )
}
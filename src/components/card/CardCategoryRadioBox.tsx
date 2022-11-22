import { ComponentType } from 'react';
import { FiCamera } from 'react-icons/fi'

interface CardCategoryProps {
  icon: "ComponentType";
  count: string;
  title: string;
}

export default function CardCategoryRadioBox() {
  return (
    <div className="w-[213px] h-[204px] flex flex-col justify-around rounded-[10px] bg-background border-[1px] border-shape_secondary">
      <div className="flex justify-between px-[22px]">
        <FiCamera size={40} color="#F25D27" />
        <input type="radio" />
      </div>
      <span className="border-[1px] w-full bg-shape_secondary"/>
      <div>
        <h3 className="text-title font-barlow font-semibold text-xl leading-[30px] px-6">Pontos <br/> Turísticos</h3>
      </div>
    </div>
  )
}
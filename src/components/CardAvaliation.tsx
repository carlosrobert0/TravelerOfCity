interface CardAvaliationProps {
  avaliation: string;
}

export function CardAvaliation({ avaliation }: CardAvaliationProps) {
  return (
    <div 
      className="w-14 h-[82px] bg-brand-orange items-center absolute left-6 top-[-16px] justify-center rounded-[10px] gap-[5px] flex flex-col"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0003 1.66667L12.5753 6.88334L18.3337 7.72501L14.167 11.7833L15.1503 17.5167L10.0003 14.8083L4.85033 17.5167L5.83366 11.7833L1.66699 7.72501L7.42533 6.88334L10.0003 1.66667Z" fill="white" stroke="#F5F8FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h1 className="font-barlow font-semibold text-xl leading-[25px] text-background">{avaliation}</h1>
    </div>
  )
}
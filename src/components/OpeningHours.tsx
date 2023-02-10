import { useState } from "react"

interface OpeningHoursProps {
  weekDay: string
}

export function OpeningHours({ weekDay }: OpeningHoursProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full flex gap-6 items-center mb-6 justify-between">
      <div className="flex-1 flex gap-6 items-center justify-between">
        <h2 className="font-medium font-heebo text-base leading-[26px] text-text">
          {weekDay}
        </h2>

        <div className="flex">
          <button
            onClick={() => setIsOpen(true)}
            className={`
              ${isOpen && 'text-success font-medium'} bg-background w-[133px] h-[56px] 
              border border-shape_secondary rounded-l-lg text-text text-sm 
              leading-6 font-roboto
            `}
          >Aberto</button>
          <button
            onClick={() => setIsOpen(false)}
            className={`
              ${!isOpen ? 'text-brand-orange bg-orange_light font-medium' : 'bg-background'} 
              w-[133px] h-[56px] border border-shape_secondary rounded-r-lg text-text text-sm 
              leading-6 font-roboto
            `}
          >Fechado</button>
        </div>
      </div>

      <div className={`flex gap-4 ${!isOpen && 'opacity-50'}`}>
        <label className="flex gap-3 items-center">
          <h4 className="font-regular font-heebo text-sm leading-[22px] text-text">
            Das
          </h4>
          <input
            type="text"
            placeholder="-"
            disabled={!isOpen}
            className={`h-[56px] w-[104px] rounded-[10px] placeholder-title 
              border-[1px] border-shape_secondary bg-background p-4
              ${!isOpen && 'cursor-not-allowed'}`}
          />
        </label>

        <label className="flex gap-3 items-center">
          <h4 className="font-regular font-heebo text-sm leading-[22px] text-text">
            Até
          </h4>
          <input
            type="text"
            placeholder="-"
            disabled={!isOpen}
            className={`h-[56px] w-[104px] rounded-[10px] placeholder-title 
              border-[1px] border-shape_secondary bg-background p-4
              ${!isOpen && 'cursor-not-allowed'}`}
          />
        </label>
      </div>
    </div>
  )
}
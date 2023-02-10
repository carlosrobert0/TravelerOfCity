import { useState } from "react"

interface OpeningHoursProps {
  weekDay: string
}

export function OpeningHours({ weekDay }: OpeningHoursProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full flex gap-6 items-center">
      <h2 className="font-medium font-heebo text-base leading-[26px] text-text">{weekDay}</h2>

      <div className="flex">
        <button 
          className="bg-background w-[140px] h-[56px] border border-shape_secondary rounded-l-lg"
        >Aberto</button>
        <button
          className="bg-background w-[140px] h-[56px] border border-shape_secondary rounded-r-lg"
        >Fechado</button>
      </div>

      <div className="flex  gap-4">
        <label className="flex gap-3 items-center">
          <h4 className="font-regular font-heebo text-sm leading-[22px] text-text">
            Das
          </h4>
          <input
            type="text"
            placeholder="-"
            className="h-[56px] w-[104px] rounded-[10px] placeholder-title border-[1px] border-shape_secondary bg-background p-4"
          />
        </label>

        <label className="flex gap-3 items-center">
          <h4 className="font-regular font-heebo text-sm leading-[22px] text-text">
            Até
          </h4>
          <input
            type="text"
            placeholder="-"
            className="h-[56px] w-[104px] rounded-[10px] placeholder-title border-[1px] border-shape_secondary bg-background p-4"
          />
        </label>
      </div>
    </div>
  )
}
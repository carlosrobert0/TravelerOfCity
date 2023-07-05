import { useState } from 'react'

interface OpeningHoursProps {
  weekDay: string
}

export function OpeningHours({ weekDay }: OpeningHoursProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-6 flex w-full items-center justify-between gap-6">
      <div className="flex flex-1 items-center justify-between gap-6">
        <h2 className="font-heebo text-base font-medium leading-[26px] text-text">
          {weekDay}
        </h2>

        <div className="flex">
          <button
            onClick={() => setIsOpen(true)}
            className={`
              ${
                isOpen && 'font-medium text-success'
              } h-[56px] w-[133px] rounded-l-lg 
              border border-shape_secondary bg-background font-roboto text-sm 
              leading-6 text-text
            `}
          >
            Aberto
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className={`
              ${
                !isOpen
                  ? 'bg-orange_light font-medium text-brand-orange'
                  : 'bg-background'
              } 
              h-[56px] w-[133px] rounded-r-lg border border-shape_secondary font-roboto text-sm 
              leading-6 text-text
            `}
          >
            Fechado
          </button>
        </div>
      </div>

      <div className={`flex gap-4 ${!isOpen && 'opacity-50'}`}>
        <label className="flex items-center gap-3">
          <h4 className="font-regular font-heebo text-sm leading-[22px] text-text">
            Das
          </h4>
          <input
            type="text"
            placeholder="-"
            disabled={!isOpen}
            className={`h-[56px] w-[104px] rounded-[10px] border-[1px] 
              border-shape_secondary bg-background p-4 placeholder-title
              ${!isOpen && 'cursor-not-allowed'}`}
          />
        </label>

        <label className="flex items-center gap-3">
          <h4 className="font-regular font-heebo text-sm leading-[22px] text-text">
            Até
          </h4>
          <input
            type="text"
            placeholder="-"
            disabled={!isOpen}
            className={`h-[56px] w-[104px] rounded-[10px] border-[1px] 
              border-shape_secondary bg-background p-4 placeholder-title
              ${!isOpen && 'cursor-not-allowed'}`}
          />
        </label>
      </div>
    </div>
  )
}

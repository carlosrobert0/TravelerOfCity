import { FiChevronDown } from 'react-icons/fi'

interface NavCitiesProps {
  selectedFilterCities: string | ''
  handleSelectedFilterCities: (selectedFilterCities?: string) => void
  cities: any[]
}

export function NavCities({
  selectedFilterCities,
  handleSelectedFilterCities,
  cities,
}: NavCitiesProps) {
  return (
    <>
      <nav className="flex h-[38px] w-full items-start justify-end gap-8">
        <button
          onClick={() => handleSelectedFilterCities('')}
          className={`font-regular font-heebo text-base leading-[26px] text-text ${
            selectedFilterCities === '' &&
            'font-hoboto font-bold text-title underline decoration-brand-orange underline-offset-[20px]'
          }`}
        >
          Todos
        </button>
        {cities.map((city: any) => (
          <button
            key={city.filterCities}
            onClick={() => handleSelectedFilterCities(city.filterCities)}
            className={`font-regular font-heebo text-base leading-[26px] text-text ${
              selectedFilterCities === city.filterCities &&
              'font-hoboto font-bold text-title underline decoration-brand-orange underline-offset-[20px]'
            } ${city.filterCities === 'az' && 'flex items-center gap-[10px]'}`}
          >
            {city.filterCities === 'az' ? (
              <>
                <p>{city.name}</p>
                <FiChevronDown size={10} color="#F25D27" />
              </>
            ) : (
              `${city.name}`
            )}
          </button>
        ))}
      </nav>
      <hr className="bg-shape_secondary" />
    </>
  )
}

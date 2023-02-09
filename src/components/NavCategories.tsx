export function NavCategories() {
  return (
    <>
      <nav className="flex h-[38px] w-[654px] items-start gap-8">
        <button className="font-roboto text-base font-bold leading-[26px] text-title underline underline-offset-[20px]">
          Todos
        </button>
        <button className="font-regular font-heebo text-base leading-[26px] text-text">
          Pontos Turísticos
        </button>
        <button className="font-regular font-heebo text-base leading-[26px] text-text">
          Comida & Bebida
        </button>
        <button className="font-regular font-heebo text-base leading-[26px] text-text">
          Eventos Organizados
        </button>
      </nav>
      <span className="h-[1px] w-[538px] bg-shape_secondary" />
    </>
  )
}
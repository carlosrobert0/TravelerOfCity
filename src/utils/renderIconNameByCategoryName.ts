export function renderIconNameByCategoryName(categoryName: string) {
  switch (categoryName) {
    case 'Eventos Organizados':
      return 'calendar'
    case 'Comida e Bebida':
      return 'coffee'
    case 'Pontos Turísticos':
      return 'camera'
    default:
      return ''
  }
}

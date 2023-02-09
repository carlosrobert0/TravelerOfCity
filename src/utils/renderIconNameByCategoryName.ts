export function renderIconNameByCategoryName(categoryName: string) {
  switch (categoryName) {
    case 'Eventos Organizados':
      return 'calendar'
      break;
    case 'Comidas e Bebidas':
      return 'coffee'
      break;
    case 'Pontos Turísticos':
      return 'camera'
      break;
    default:
      ''
      break;
  }
}
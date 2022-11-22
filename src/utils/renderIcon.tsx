import { FiCalendar, FiCamera, FiCoffee } from 'react-icons/fi'

export function renderIcon(icon: string, size: number) {
    switch (icon) {
      case 'camera':
        return <span><FiCamera size={size} color="#F25D27" className="ml-8 top-8 absolute"/></span>
        break;
      case 'coffee':
        return <span><FiCoffee size={size} color="#F25D27" className="ml-8 top-8 absolute"/></span>
        break;
      case 'calendar': 
        return <span><FiCalendar size={size} color="#F25D27" className="ml-8 top-8 absolute"/></span>
      default:
        break;
    }
  }
import { FiCalendar, FiCamera, FiCoffee } from 'react-icons/fi';

export function renderIcon(icon: string, size?: number, className?: string) {
  switch (icon) {
    case 'camera':
      return <FiCamera size={size ? size : 60 } color="#F25D27" className={className} />;
    case 'coffee':
      return <FiCoffee size={size ? size : 60} color="#F25D27" className={className} />;
    case 'calendar':
      return <FiCalendar size={size ? size : 60} color="#F25D27" className={className} />;
    default:
      break;
  }
}

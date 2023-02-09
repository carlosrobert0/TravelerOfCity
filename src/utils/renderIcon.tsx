import { FiCalendar, FiCamera, FiCoffee } from 'react-icons/fi'

export function renderIcon(icon: string, size: number, className: string) {
    switch (icon) {
        case 'camera':
            return (
                <FiCamera
                    size={size}
                    color="#F25D27"
                    className={className}
                />
            )
            break
        case 'coffee':
            return (
                <FiCoffee
                    size={size}
                    color="#F25D27"
                    className={className}
                />
            )
            break
        case 'calendar':
            return (
                <FiCalendar
                    size={size}
                    color="#F25D27"
                    className={className}
                />
            )
        default:
            break
    }
}

'use client'

interface MenuItemProps {
  onClick: () => void
  label: string
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div className="md:w-auto w-[12.5rem] min-w-[12rem]">
      <div
        className="
        flex flex-col
      "
      >
        <span
          className="
        hover:bg-gray-100
        px-4 py-3
        font-semibold
      "
          onClick={onClick}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

export default MenuItem

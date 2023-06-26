'use client'

import { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CounterProps {
  title?: string
  subTitle?: string
  value: number
  onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({
  title,
  subTitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [onChange, value])

  const onReduce = useCallback(() => {
    if (value > 0) {
      onChange(value - 1)
    }
  }, [onChange, value])

  return (
    <div className="flex justify-between items-center gap-6">
      <div className="text-gray-900 flex-grow flex-shrink-0">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm whitespace-nowrap">{subTitle}</p>
      </div>
      <div className="flex gap-3 items-center text-base flex-grow-0 flex-shrink">
        <div
          onClick={onReduce}
          className="cursor-pointer p-2 flex justify-center items-center border rounded-full w-10 h-10"
        >
          <AiOutlineMinus size={16} />
        </div>
        <span>{value}</span>

        <div
          onClick={onAdd}
          className="cursor-pointer p-2 flex justify-center items-center border rounded-full w-10 h-10"
        >
          <AiOutlinePlus size={16} />
        </div>
      </div>
    </div>
  )
}

export default Counter

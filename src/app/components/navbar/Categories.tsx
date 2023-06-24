'use client'

import Container from '../Container'
import categories from '@/app/constants/categories'
import { FiFilter } from 'react-icons/fi/'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md/'
import { useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import qs from 'query-string'

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const router = useRouter()

  const handleClick = useCallback(
    (label: string) => {
      if (!label) return

      const url = qs.stringifyUrl(
        { url: '/', query: { category: label } },
        { skipNull: true }
      )
      router.push(url)
    },
    [router]
  )
  return (
    <Container>
      <div
        id="categories"
        className="flex justify-center items-center w-full h-async (params:type) => {
            [6.25rem]
        } gap-12"
      >
        <div className="relative flex-grow-0 overflow-hidden h-auto py-4">
          <div className="wrapper-categories flex justify-start items-center w-full h-auto overflow-x-auto gap-12">
            {categories.map((item, index) => (
              <li
                onClick={() => handleClick(item.label)}
                key={index}
                className={`
                ${
                  category === item.label ? 'text-gray-900' : 'text-gray-700'
                } ${
                  category === item.label
                    ? 'border-b-gray-800'
                    : 'border-b-transparent'
                } 
                border-b-2 hover:border-b-gray-800 flex flex-col items-center flex-grow flex-shrink-0 whitespace-nowrap text-xs gap-2 text-gray-700 hover:text-gray-900 cursor-pointer py-2`}
              >
                <item.icon size={24} />
                <span>{item.label}</span>
              </li>
            ))}
          </div>
          {/* <>
            <button
              className={` absolute p-1 border border-gray-600 rounded-full hover:scale-105 hover:shadow-md transition top-[50%] translate-y-[-50%] left-1`}
            >
              <MdOutlineNavigateBefore size={18} />
            </button>
            <button
              className={` absolute p-1 border border-gray-600 rounded-full hover:scale-105 hover:shadow-md transition top-[50%] translate-y-[-50%] right-1`}
            >
              <MdOutlineNavigateNext size={18} />
            </button>
          </> */}
        </div>
        <div className="flex-grow border-gray-500 border p-4 rounded-md flex gap-2 items-center whitespace-nowrap text-xs cursor-pointer text-black font-bold">
          <FiFilter size={18} />
          <span>Bộ lọc</span>
        </div>
      </div>
    </Container>
  )
}

export default Categories

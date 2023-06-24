'use client'

import Container from '../Container'
import { TbBeach } from 'react-icons/tb/'
import { FiFilter } from 'react-icons/fi/'
import { MdOutlineVilla } from 'react-icons/md/'
import { TbMountain, TbPool } from 'react-icons/tb/'
import { FaSkiing } from 'react-icons/fa/'
import { BsSnow } from 'react-icons/bs/'
import { IoDiamond } from 'react-icons/io5/'
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiCactus,
  GiBarn,
} from 'react-icons/gi/'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md/'
import { useCallback, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import qs from 'query-string'

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!',
  },
]
const Categories = () => {
  const params = useSearchParams()
  const router = useRouter()
  const category = params?.get('category')
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  const handleClick = useCallback(
    (label: string) => {
      let currentQuery = {}

      if (params) {
        currentQuery = qs.parse(params.toString())
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      }

      if (params?.get('category') === label) {
        delete updatedQuery.category
      }

      const url = qs.stringifyUrl(
        {
          url: '/',
          query: updatedQuery,
        },
        { skipNull: true }
      )

      router.push(url)
    },
    [router, params]
  )

  if (!isMainPage) {
    return null
  }

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
                className={`${
                  category === item.label ? 'text-gray-900' : 'text-gray-700'
                } flex flex-col items-center flex-grow flex-shrink-0 whitespace-nowrap text-xs gap-2 text-gray-700 hover:text-gray-900 cursor-pointer py-2`}
              >
                <item.icon size={24} />
                <span>{item.label}</span>
              </li>
            ))}
          </div>
          <>
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
          </>
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

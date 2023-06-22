'use client'

import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div
      className="
      flex justify-center
      xl:flex-grow-0 flex-grow
      xl:flex-shrink flex-shrink-0
      basis-auto
     
    "
    >
      <div
        className="
        md:w-auto w-full
        border-[1px] border-gray-300 rounded-full
        shadow-sm hover:shadow-md
        cursor-pointer
    "
      >
        <div
          className="
            flex flex-grow items-center justify-between
            text-sm
      "
        >
          <div
            className="
            font-semibold
            px-4 py-2
        "
          >
            Địa điểm bất kỳ
          </div>
          <span
            className="
            w-[1px] h-6
           bg-gray-300
            md:block hidden
        "
          ></span>
          <div
            className="
            font-semibold
            px-4 py-2
            md:block hidden
        "
          >
            Tuần bất kỳ
          </div>
          <span
            className="
            w-[1px] h-6
           bg-gray-300
            md:block hidden
        "
          ></span>
          <div
            className="
            pl-6 pr-2 py-1
            text-gray-500
            flex flex-row items-center flex-grow-0 justify-between
            gap-2
        "
          >
            <span className="md:block hidden">Thêm khách</span>
            <button
              className="
                p-2
                bg-primary
                rounded-full
                text-white
          "
            >
              <BiSearch size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search

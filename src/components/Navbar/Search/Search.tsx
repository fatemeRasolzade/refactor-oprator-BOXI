import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import {FiX} from "react-icons/fi"
const Search = () => {


    const [search,setSearch]=useState<string>('')

    const submitSearch: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault()
         console.log(search)
      };


  return (
    <div>
         <form className={`w-full  relative flex border-none items-center text-grayColor focus-within:text-numColor mx-auto`} onSubmit={submitSearch}>
                                <BiSearchAlt2 className="absolute right-10 cursor-pointer hover:text-cyan-700 hidden sm:block" size={'20'} />
								
								<input
									type="text"
									id="searchInput"
									value={search}
									className={
										"bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-cyan-50  border-none focus:border-cyan-400 rounded-md py-2 pl-4 pr-10 w-full appearance-none leading-normal hidden sm:block text-gray-700 placeholder-gray-600 shadow-none focus:ring-transparent"
									}
									placeholder="جستجو کنید ..."
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                                    autoComplete={'false'}
								/>
								<FiX
									className="absolute left-10 cursor-pointer text-gray-400 hover:text-red-500 hidden sm:block"
									onClick={() => {setSearch("")}}
								/>
							</form>
    </div>
  )
}

export default Search
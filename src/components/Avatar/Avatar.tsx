import React, { useState } from 'react'
import { BiBell,BiBellOff,BiAlarmExclamation,BiX,BiChevronDown } from "react-icons/bi";
const Avatar = () => {

    const [notifications, setNotifications] = useState(false);
    const [profile, setProfile] = useState(false);

  return (
    <div>
        <div className="flex items-center gap-4 relative" >
								<button
									className="relative border-none text-gray-600 focus:ring-1 focus:outline-none focus:ring-gray-200 font-medium rounded-md  px-3 py-2 text-center inline-flex items-center gap-3 Max-sm:hidden"
									type="button"
									onClick={() => {
										setNotifications(!notifications);
										setProfile(false);
									}}
								>
									{notifications ? (
										<BiBellOff className="w-6 h-6" />
									) : (
										<BiBell className="w-6 h-6" />
									)}

									<span className="absolute right-1.5 top-0 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
									<span className="absolute right-10 top-0 w-4 h-4 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full">
										۳
									</span>
								</button>

								<div
									className={`absolute right-0 top-60 z-20 w-60 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 ${
										!notifications && "hidden"
									}`}
								>
									<div className="p-4">
										<div className="text-base pb-2">عنوان اطلاعیه</div>
										<div className=" text-gray-600">
											من هرگز به طور خودکار بسته نمی شوم. این یک توصیف عمدا بسیار بسیار طولانی است
											که دارای شخصیت ها و کلمات بسیاری است.
										</div>
										<span className="bg-blue-50 text-blue-800 text-xs font-medium inline-flex items-center px-2 mt-2 rounded dark:bg-blue-200 dark:text-blue-800">
											<BiAlarmExclamation className="w-4 ml-1" /> ۴ دقیقه پیش
										</span>
									</div>
									<div className="p-4">
										<div className="text-base pb-2">عنوان اطلاعیه</div>
										<div className=" text-gray-600">
											من هرگز به طور خودکار بسته نمی شوم. این یک توصیف عمدا بسیار بسیار طولانی است
											که دارای شخصیت ها و کلمات بسیاری است.
										</div>
									</div>
								</div>

								<button
									className="text-gray-600 border-none focus:ring-1 focus:outline-none focus:ring-gray-200 font-medium rounded-md  px-3 py-2 text-center inline-flex items-center gap-3"
									type="button"
									onClick={() => {
										setProfile(!profile);
										setNotifications(false);
									}}
								>
									<img
										className="w-8 h-8 rounded-full"
										src={require('../../assets/images/portrait.webp')}
										alt="Rounded avatar"
									></img>
									<span>حسن احمدی</span>{" "}
									{profile ? <BiX className="w-5 h-5" /> : <BiChevronDown className="w-5 h-5" />}
								</button>

								<div
									className={`absolute right-60 top-60 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 Max-sm:right-0 ${
										!profile && "hidden"
									}`}
								>
									<ul
										className="py-1  text-gray-700 dark:text-gray-200"
										aria-labelledby="dropdownDefault"
									>
										<li>
											<a
												href="#"
												className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												داشبورد
											</a>
										</li>
										<li>
											<a
												href="#"
												className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												تنظیمات
											</a>
										</li>
										<li>
											<a
												className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
												onClick={() => {}}
											>
												خروج
											</a>
										</li>
									</ul>
								</div>
							</div>
    </div>
  )
}

export default Avatar
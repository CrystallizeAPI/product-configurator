"use client";

import { useCartContext } from "@/context/cart-context";
import Link from "next/link";

export function Header() {
    const { setIsCartOpen } = useCartContext();

    return (
        <header className="bg-white px-12 py-4 flex border-b justify-between items-center">
            <Link href="/">
                <svg
                    width="68"
                    height="62"
                    viewBox="0 0 68 62"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M34.7389 14.979C35.8325 16.2281 36.5911 17.7846 36.9613 19.563C37.6257 22.7173 36.726 27.0285 34.9616 30.6947C33.2801 34.2151 31.0163 37.0214 28.4119 38.7872C25.6656 40.6757 22.6194 41.3034 19.5977 40.6297L19.4383 40.5886L9.85359 61.5681L6.95557 60.2668L26.7416 17.0238L29.2288 11.5681L31.6983 12.6958C32.8639 13.2335 33.9005 14.0119 34.7389 14.979ZM32.0811 29.3522C31.2523 31.1069 29.7879 33.5763 27.5999 35.4411C25.53 37.2125 23.3133 37.9741 21.0615 37.6951L20.7854 37.6665L30.682 16.0189L30.7635 15.8326L30.9341 15.9491L30.958 15.9665C32.4218 16.8732 33.4683 19.0337 33.6509 20.9048C33.8862 23.3156 33.5449 26.3137 32.0811 29.3522ZM50.9513 21.6942L49.6055 24.5291L47.1795 23.3889L45.0358 22.3958L42.4328 27.8452L45.2311 29.1444L43.3501 33.0337L40.4212 32.0539L37.1692 38.8479L42.6997 39.2273L41.2795 42.2672L32.2876 41.6674L40.1704 25.2021L43.5271 18.2177L50.9513 21.6942ZM63.9924 36.6846C63.1334 38.4274 62.0278 39.6359 59.3054 40.0021L58.9352 40.0481L63.1573 31.2233V31.217L63.2865 30.9444L63.427 31.0427L63.4747 31.0776C63.9629 31.3977 64.3506 31.8043 64.5859 32.3154C65.0741 33.3378 64.6449 35.3421 63.9924 36.6846ZM66.4325 29.4687C66.8464 29.9172 67.191 30.4241 67.4551 30.973V30.9737C68.3731 32.8727 67.944 35.8366 66.8504 38.0612C64.9568 41.931 61.8045 43.482 56.3357 43.2324L53.9547 43.1159L58.124 34.4418L61.8052 26.767C62.1746 26.9239 64.5866 28.0628 65.0151 28.3124C65.3269 28.4868 65.8326 28.8585 66.2267 29.2539C66.2856 29.3076 66.3375 29.3646 66.3878 29.4199L66.3879 29.42C66.3985 29.4316 66.4089 29.4431 66.4194 29.4545C66.4237 29.4593 66.4281 29.464 66.4325 29.4687Z"
                        fill="#232C33"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M30.2424 4.50334C31.7269 5.20164 33.5827 6.88882 33.5827 6.88882V6.88951L35.9547 4.80915C34.6281 3.58937 33.2232 2.44863 31.5821 1.67197C30.0047 0.932744 28.4045 0.551345 26.7974 0.568681C23.3704 0.568681 20.1464 2.27874 17.2168 5.68151C13.2558 10.2743 12.4384 15.5022 12.3164 20.7537C12.2818 22.2557 12.3047 23.7578 12.3282 25.2487C12.4037 30.1764 12.473 34.8385 10.4897 38.8362L10.4814 38.8543C10.1556 39.5 9.77606 40.117 9.34668 40.6988C8.86634 41.3557 8.33721 41.9753 7.76377 42.5524C7.15364 43.1692 6.4953 43.7361 5.79502 44.2479C5.07678 44.7751 4.31072 45.2336 3.50691 45.6175C2.68325 46.0086 1.83188 46.2666 0.955566 46.5079L1.56517 49.5681C1.56517 49.5681 2.25237 49.4336 2.8973 49.22C3.41201 49.0501 3.89692 48.8719 4.38184 48.6611C5.20741 48.3002 6.00269 47.8735 6.76 47.3851C7.50331 46.9073 8.21128 46.3748 8.87977 45.7978C9.52541 45.2397 10.1342 44.6402 10.7024 44.0032C11.2392 43.403 11.7371 42.769 12.1931 42.1052C12.6084 41.5025 12.9811 40.8716 13.3084 40.2169C15.621 35.551 15.5423 30.3107 15.4663 25.2516L15.4656 25.2078L15.4652 25.1839C15.4363 23.4016 15.4078 21.6476 15.4829 19.9396C15.6568 15.4911 16.4805 11.3311 19.595 7.71472C21.897 5.05741 24.3035 3.68853 26.7856 3.67674C27.9231 3.67674 29.0883 3.95412 30.2424 4.50334ZM57.6331 28.7083L58.9556 25.8784L52.4071 22.7932L48.6248 31.0383L48.5576 31.1819L43.412 42.3832L50.9351 42.8638L52.3676 39.8362L48.1219 39.547L50.0241 35.4522L52.3676 36.2358L53.706 33.4169L51.4491 32.3601L53.9554 26.9816L57.6331 28.7083Z"
                        fill="#232C33"
                    />
                </svg>
            </Link>

            <button
                type="button"
                className="p-2 cursor-pointer pr-0"
                onClick={() => setIsCartOpen?.(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 -960 960 960"
                >
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z" />
                </svg>
            </button>
        </header>
    );
}
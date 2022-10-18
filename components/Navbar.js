import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, CloudArrowUpIcon } from '@heroicons/react/24/solid'
import MenuItems from './MenuItems'

export default function Navbar() {
    const [active, setActive] = useState(false);

    const showMenu = () => {
        setActive(!active);
    };
    return (
        <nav>
            <div className="top-0 right-0 z-50 p-4 bg-white/80 dark:bg-stone-900/80 backdrop-blur-lg border-b border-white/80 dark:border-stone-900/80 fixed flex justify-end w-full">
                {!active && (
                    <Bars3Icon
                        onClick={showMenu}
                        className="h-8 w-8 cursor-pointer md:hidden text-teal-600 hover:scale-105 transition ease-in-out duration-75"
                    />
                )}
                <ul className='hidden md:flex md:flex-row space-x-8 text-xl tracking-widest dark:text-white uppercase items-center'>
                    <li>
                        <Link href="/home" onClick={showMenu}>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/upload" onClick={showMenu}>
                            <div className="transition ease-in-out cursor-pointer bg-lime-500 hover:bg-lime-700 duration-75 text-secondary text-white rounded-lg tracking-tight flex space-x-1 py-2 px-4 justify-between flex-row items-center font-semibold"
                            >
                                <p>Upload</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>

            <MenuItems showMenu={showMenu} active={active} onClick={showMenu} />
        </nav >
    )
}
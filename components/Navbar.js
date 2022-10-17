import { useState } from 'react'
import { Bars4Icon } from '@heroicons/react/24/solid'
import MenuItems from './MenuItems'

export default function Navbar() {
    const [active, setActive] = useState(false);

    const showMenu = () => {
        setActive(!active);
    };
    return (
        <nav>
            <div className="absolute right-6 md:hidden top-6 scale-150">
                <Bars4Icon
                    onClick={showMenu}
                    className="scale-150 cursor-pointer"
                />
            </div>

            <MenuItems showMenu={showMenu} active={active} />
        </nav>
    )
}


// function NavLink({ to, children }) {
//     return <Link href={to} className={`mx-4 cursor-pointer`}>
//         {children}
//     </Link>
// }

// function MobileNav({ open, setOpen }) {
//     return (
//         <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
//             <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
//                 <Link className="text-xl font-semibold" href="/">LOGO</Link>
//             </div>
//             <div className="flex flex-col ml-4">
//                 <Link className="text-xl font-medium my-4" href="/about" onClick={() => setTimeout(() => { setOpen(!open) }, 100)}>
//                     About
//                 </Link>
//                 <Link className="text-xl font-normal my-4" href="/contact" onClick={() => setTimeout(() => { setOpen(!open) }, 100)}>
//                     Contact
//                 </Link>
//             </div>
//         </div>
//     )
// }
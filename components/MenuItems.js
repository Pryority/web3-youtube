import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function MenuItems({ showMenu, active }) {
    return (
        <ul
            className={
                active
                    ? "flex-col flex items-end fixed inset-0 left-1/4 uppercase bg-white/80 dark:bg-stone-900/80 text-3xl tracking-tighter font-semibold backdrop-blur-lg space-y-6 z-50 justify-start p-4 md:hidden text-teal-900 dark:text-teal-500"
                    : "hidden"
            }
        >
            <XMarkIcon onClick={showMenu} className="cursor-pointer h-8 w-8 mb-4" />
            <li>
                <Link href="/home" onClick={showMenu}>
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/upload" onClick={showMenu}>
                    <a>Upload</a>
                </Link>
            </li>
        </ul>
    );
};

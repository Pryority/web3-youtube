import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function MenuItems({ showMenu, active }) {
    return (
        <ul
            className={
                active
                    ? "flex-col flex items-center fixed inset-0 left-1/4 uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 md:hidden"
                    : "hidden"
            }
        >
            <XMarkIcon onClick={showMenu} className="cursor-pointer" />
            <li>
                <Link href="/home">
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/upload">
                    <a>Upload</a>
                </Link>
            </li>
        </ul>
    );
};

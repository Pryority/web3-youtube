import React from "react";
import moment from "moment";
import Image from 'next/image';
import { CheckIcon } from "@heroicons/react/24/solid";

export default function Video({ horizontal, video }) {
    return (
        <div
            className='flex flex-col w-full justify-center items-center bg-1 shadow'
        >
            <div
                className='w-full h-48 relative'
            >
                <Image
                    src={`https://ipfs.io/ipfs/${video.thumbnailHash}`}
                    alt=""
                    className="object-cover object-center absolute cursor-pointer"
                    layout="fill"
                />
            </div>
            <div className={horizontal && "w-full p-2"}>
                <h4 className="text-md font-bold dark:text-white mt-3 cursor-pointer">
                    {video.title}
                </h4>
                <p className="text-sm flex items-center text-[#878787] mt-1 cursor-pointer">
                    {video.category + " • " + moment(video.createdAt * 1000).fromNow()}
                </p>
                <p className="text-sm flex items-center text-[#878787] mt-1 cursor-pointer">
                    {video?.author?.slice(0, 9)}...{" "}
                    <CheckIcon className='h-6 w-6 text-green-600 ml-1' />
                </p>
            </div>
        </div >
    );
}

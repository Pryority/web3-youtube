import React from "react";
import { BiCheck } from "react-icons/bi";
import moment from "moment";
import Image from 'next/image';

export default function Video({ horizontal, video }) {
    return (
        <div
            className='flex flex-col w-full justify-center items-center bg-[#1e1e1e] shadow'
        // className={`${horizontal
        //     ? "flex flex-row mx-5 mb-5  item-center justify-center"
        //     : "flex flex-col m-5"
        //     } `}
        >
            <div
                className='w-full h-48 relative'
            >
                <Image
                    src={`https://ipfs.io/ipfs/${video.thumbnailHash}`}
                    alt=""
                    className="object-cover object-center absolute"
                    layout="fill"
                />
            </div>
            <div className={horizontal && "w-full p-2"}>
                <h4 className="text-md font-bold dark:text-white mt-3">
                    {video.title}
                </h4>
                <p className="text-sm flex items-center text-[#878787] mt-1">
                    {video.category + " • " + moment(video.createdAt * 1000).fromNow()}
                </p>
                <p className="text-sm flex items-center text-[#878787] mt-1">
                    {video?.author?.slice(0, 9)}...{" "}
                    <BiCheck size="20px" color="green" className="ml-1" />
                </p>
            </div>
        </div >
    );
}

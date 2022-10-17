import React, { useState, useRef } from "react";
import saveToIPFS from "../../utils/saveToIPFS";
import { useCreateAsset } from "@livepeer/react";
import getContract from "../../utils/getContract";
import Link from "next/link";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { PlusSmallIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'


export default function Upload() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [video, setVideo] = useState("");

    const {
        mutate: createAsset,
        data: asset,
        uploadProgress,
        status,
        error,
    } = useCreateAsset();

    // When a user clicks on the upload button
    const handleSubmit = async () => {
        // Calling the upload video function
        await uploadVideo();
        // Calling the upload thumbnail function and getting the CID
        const thumbnailCID = await uploadThumbnail();
        // Creating a object to store the metadata
        let data = {
            video: asset?.id,
            title,
            description,
            location,
            category,
            thumbnail: thumbnailCID,
            UploadedDate: Date.now(),
        };
        // Calling the saveVideo function and passing the metadata object
        await saveVideo(data);
    };

    // Function to upload the video to IPFS
    const uploadThumbnail = async () => {
        // Passing the file to the saveToIPFS function and getting the CID
        const cid = await saveToIPFS(thumbnail);
        // Returning the CID
        return cid;
    };

    // Function to upload the video to Livepeer
    const uploadVideo = async () => {
        // Calling the createAsset function from the useCreateAsset hook to upload the video
        createAsset({
            name: title,
            file: video,
        });
    };

    // Function to save the video to the Contract
    const saveVideo = async (data) => {
        // Get the contract from the getContract function
        let contract = getContract();

        // Upload the video to the contract
        await contract.uploadVideo(
            data.video,
            data.title,
            data.description,
            data.location,
            data.category,
            data.thumbnail,
            data.UploadedDate
        );
    };

    // Create a ref for thumbnail and video
    const thumbnailRef = useRef();
    const videoRef = useRef();

    return (
        <div className="min-h-screen flex flex-col justify-center p-8 items-center w-full">
            <div className="flex flex-col space-y-8 w-full md:w-2/3 lg:w-3/5 xl:w-1/2">
                <div className="flex justify-between md:justify-end md:space-x-4 w-full">
                    <Link href={'/'}>
                        <button className="bg-transparent text-primary py-2 px-6 border rounded-lg transition ease-in-out bg-1 hover:bg-red-500 duration-300 text-primary hover:text-secondary border-gray-600">
                            Discard
                        </button>
                    </Link>
                    <button
                        onClick={() => {
                            handleSubmit();
                        }}
                        className="transition ease-in-out bg-sky-500 hover:scale-110 hover:bg-teal-500 duration-300 text-secondary rounded-lg flex space-x-1 px-4 justify-between flex-row items-center"
                    >
                        <p>Upload</p>
                        <CloudArrowUpIcon className="h-4 w-4 text-white" />
                    </button>
                </div>


                <div className="flex flex-col w-full">
                    <label className="text-primary text-sm">Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Star Wars: Episode IV - A New Hope"
                        className={`placeholder:text-gray-600 rounded-md mt-2 h-12 p-2 bg-1 verification-outline ${title ? 'border-lime-500 border-solid' : 'hover:border-solid hover:border-teal-500'} focus:outline-none`}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-primary">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="The Imperial Forces -- under orders from cruel Darth Vader (David Prowse) -- hold Princess Leia (Carrie Fisher) hostage, in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker (Mark Hamill) and Han Solo (Harrison Ford), captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 (Kenny Baker) and C-3PO (Anthony Daniels) to rescue the beautiful princess, help the Rebel Alliance, and restore freedom and justice to the Galaxy."
                        className={`w-full h-32 placeholder:text-gray-600 rounded-md mt-2 p-2 bg-1 verification-outline ${description ? 'border-lime-500 border-solid' : 'hover:border-solid hover:border-teal-500'} focus:outline-none`}
                    />
                </div>
                <div className="flex flex-col md:flex-row md:w-[90%] justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex flex-col w-full md:w-2/5">
                        <label className="text-primary text-sm">Location</label>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            placeholder="Bali - Indonesia"
                            className={`placeholder:text-gray-600 rounded-md mt-2 h-12 p-2 bg-1 verification-outline ${location ? 'border-lime-500 border-solid' : 'hover:border-solid hover:border-teal-500'} focus:outline-none`}
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-2/5">
                        <label className="text-primary text-sm">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`placeholder:text-gray-600 cursor-pointer rounded-md mt-2 h-12 p-2 bg-1 verification-outline ${category ? 'border-lime-500 border-solid' : 'hover:border-solid hover:border-teal-500'} focus:outline-none`}
                        >
                            <option>Music</option>
                            <option>Sports</option>
                            <option>Gaming</option>
                            <option>News</option>
                            <option>Entertainment</option>
                            <option>Education</option>
                            <option>Science & Technology</option>
                            <option>Travel</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-primary mt-10 text-sm">Thumbnail</label>
                    <div
                        onClick={() => {
                            thumbnailRef.current.click();
                        }}
                        className={`verification-outline-dashed ${thumbnail ? 'border-lime-500 border-solid' : 'border-dashed hover:border-solid hover:border-teal-500'}`}
                    >
                        {thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                onClick={() => {
                                    thumbnailRef.current.click();
                                }}
                                src={URL.createObjectURL(thumbnail)}
                                alt="thumbnail"
                                className="h-full rounded-md"
                            />
                        ) : (
                            <PlusSmallIcon className="h-6 w-6" />
                        )}
                    </div>
                </div>

                <input
                    type="file"
                    className="hidden"
                    ref={thumbnailRef}
                    onChange={(e) => {
                        setThumbnail(e.target.files[0]);
                        console.log(e.target.files[0]);
                    }}
                />

                <div
                    onClick={() => {
                        videoRef.current.click();
                    }}
                    className={`verification-outline-dashed w-full ${video ? 'border-lime-500 border-solid' : 'border-dashed hover:border-solid hover:border-teal-500'}`}
                >
                    {video ? (
                        <video
                            controls
                            src={URL.createObjectURL(video)}
                            className="h-full rounded-md"
                            autoPlay={false}
                        />
                    ) : (
                        <div className='flex flex-col space-y-2 justify-center items-center'>
                            <ArrowUpCircleIcon className="h-6 w-6" />
                            <p>Upload Video</p>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    className="hidden"
                    ref={videoRef}
                    accept={"video/*"}
                    onChange={(e) => {
                        setVideo(e.target.files[0]);
                        console.log(e.target.files[0]);
                    }}
                />
            </div>
        </div >
    )
}

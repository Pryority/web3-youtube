import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import Video from "../../components/Video";

export default function Main() {
    // Creating a state to store the uploaded video
    const [videos, setVideos] = useState([]);

    // Get the client from the useApolloClient hook
    const client = useApolloClient();

    // Query the videos from the the graph
    const GET_VIDEOS = gql`
    query videos(
        $first: Int
        $skip: Int
        $orderBy: Video_orderBy
        $orderDirection: OrderDirection
        $where: Video_filter
        ) {
        videos(
            first: $first
            skip: $skip
            orderBy: $orderBy
            orderDirection: $orderDirection
            where: $where
        ) {
            id
            hash
            title
            description
            location
            category
            thumbnailHash
            date
        }
        }
    `;

    // Function to get the videos from the graph
    const getVideos = async () => {
        // Query the videos from the graph
        console.log(client)
        await client.query({
            query: GET_VIDEOS,
            variables: {
                first: 200,
                skip: 0,
                orderBy: "date",
                orderDirection: "desc",
            },
            fetchPolicy: "network-only",
        })
            .then(({ data }) => {
                // Set the videos to the state
                console.log(data)
                setVideos(data.videos);
            })
            .catch((err) => {
                alert("Something went wrong. please try again.!", err.message);
            });
    };

    useEffect(() => {
        // Runs the function getVideos when the component is mounted
        getVideos();
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col bg-white/80 dark:bg-stone-900/80 ">
            <div className="flex flex-col w-full h-full py-16">
                <div className="flex flex-col justify-between lg:flex-col">
                    <div className="p-2">
                        {/* <VideoComponent video={video} /> */}
                    </div>
                    <div className="flex flex-col w-full items-center justify-center">
                        <div className="flex flex-col items-start p-4 justify-center w-full">
                            <h4 className="text-4xl lg:text-3xl font-bold text-stone-500 dark:text-stone-200">
                                Recent Uploads
                            </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4 justify-center items-center">
                            {videos.map((video) => (
                                <div key={video.id}
                                    className='justify-center items-center flex relative w-full'
                                >
                                    <div
                                        onClick={() => {
                                            // Navigation to the video screen (which we will create later)
                                            window.location.href = `/video?id=${video.id}`;
                                        }}
                                        className='flex w-full'
                                    >
                                        <Video video={video} horizontal={true} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

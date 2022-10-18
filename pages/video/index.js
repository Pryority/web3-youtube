import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import Video from "../../components/Video";
import VideoComponent from "../../components/VideoContainer";

export default function VideoPage() {
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const client = useApolloClient();
    const getUrlVars = () => {
        var vars = {};
        var parts = window.location.href.replace(
            /[?&]+([^=&]+)=([^&]*)/gi,
            function (m, key, value) {
                vars[key] = value;
            }
        );
        return vars;
    };

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

    const getRelatedVideos = () => {
        client
            .query({
                query: GET_VIDEOS,
                variables: {
                    first: 20,
                    skip: 0,
                    orderBy: "date",
                    orderDirection: "desc",
                    where: {},
                },
                fetchPolicy: "network-only",
            })
            .then(({ data }) => {
                setRelatedVideos(data.videos);
                const video = data?.videos?.find(
                    (video) => video.id === getUrlVars().id
                );
                setVideo(video);
            })
            .catch((err) => {
                alert("Something went wrong. please try again.!", err.message);
            });
    };

    useEffect(() => {
        getRelatedVideos();
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col bg-white/80 dark:bg-stone-900/80 ">
            <div className="flex flex-col w-full h-full pt-24">
                {video && (
                    <div className="flex flex-col justify-between lg:flex-col">
                        <div className="p-2 border-b border-stone-700">
                            <VideoComponent video={video} />
                        </div>
                        <div className="flex flex-col w-full items-center justify-center">
                            <div className="flex flex-col items-start px-4 mt-8 justify-center w-full">
                                <h4 className="text-xl lg:text-3xl font-bold text-stone-500 dark:text-stone-200">
                                    Related Videos
                                </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4 justify-center items-center">
                                {relatedVideos.map((video) => (
                                    <div key={video.id}
                                        className='justify-center items-center flex relative w-full'
                                    >
                                        <div
                                            onClick={() => {
                                                setVideo(video);
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
                )}
            </div>
        </div >
    );
}


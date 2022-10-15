import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";

export default function Main() {
    // Creating a state to store the uploaded videos that are saved on the smart contract
    const [videos, setVideos] = useState([]);

    // Get the client from Apollo using the useApolloClient hook
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
        isAudio
        date
        author
        createdAt
        }
    }
    `;

    // Function to get the videos from the graph
    const getVideos = async () => {
        // Query the videos from the graph
        client.query({
            query: GET_VIDEOS,
            variables: {
                first: 200,
                skip: 0,
                orderBy: 'createdAt',
                orderDirection: 'desc',
            },
            fetchPolicy: 'network-only'
        })
            .then(({ data }) => {
                // Set the queried videos to the state
                setVideos(data.videos);
            })
            .catch((err) => {
                alert('Something went wrong. Please try again!', err.message);
            });
    };

    useEffect(() => {
        // Runs the function getVideos when the component is mounted
        getVideos();
    }, []);

    return (
        <div>Main</div>
    )
}

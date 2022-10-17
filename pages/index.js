import React from 'react';
import Link from 'next/link'
import Landing from "./landing";
import Upload from './upload';
import Video from './video';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-main min-h-screen text-slate-900 dark:text-white">
      <Link href={`/`}>
        <Landing />
      </Link>
      <Link href={`/upload`}>
        <Upload />
      </Link>
      <Link href={`/videos`}>
        <Video />
      </Link>
    </div >
  )
}


import React from 'react';
import Link from 'next/link'
import Landing from "./landing/Landing";
import Upload from './upload/Upload';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen text-slate-900 dark:text-white">
      <Link href={`/`}>
        <Landing />
      </Link>
      <Link href={`#upload`} replace>
        <Upload />
      </Link>
    </div >
  )
}


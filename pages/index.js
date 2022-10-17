import React from 'react';
import Link from 'next/link'
import Landing from "./landing";
import Upload from './upload';
import Video from './video';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-main min-h-screen text-slate-900 dark:text-white">
      <Landing />
    </div >
  )
}


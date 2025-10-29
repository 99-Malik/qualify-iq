import React from 'react'
import Image from 'next/image'

export default function LeftSection() {
    return (
        <div className="hidden md:flex md:w-[40%]  relative">
        <Image
            src="/images/sign-in.png"
            alt="Restaurant interior"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
            style={{ imageRendering: 'auto' }}
        />

    </div>
    )
}

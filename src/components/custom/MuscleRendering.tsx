import Muscle from "@/types/Muscle";
import Image from 'next/image';
import React from "react";

const musclesRendering = (muscle: Muscle, currentMuscleTD: string, height: number = 130) => {
        return (
            <div className="muscle w-full flex flex-col items-center justify-between h-full">
                <div className="flex items-center justify-center overflow-hidden h-full">
                    <Image 
                        src={muscle.src} 
                        alt={muscle.name}
                        className='object-cover rounded-lg shadow-md transition duration-300 ease-in-out transform'
                        height={height}
                    />
                </div>
                <span className="mt-2 text-white font-semibold mb-2">{muscle.name}</span>
            </div>
        )
}

export default musclesRendering;
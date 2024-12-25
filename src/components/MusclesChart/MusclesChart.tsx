"use client";

import { useState } from 'react';
import musclesList from '../musclesList';
import '../styles/index.css';
import Image from 'next/image';
import Muscle from '@/types/Muscle';
import React from 'react';
import Layout from '@/app/page';

const MusclesChart = () => {

    const [currentMuscleTD, setCurrentMuscleTD] = useState<string>('');

    const onMouseOver = (e: React.MouseEvent<HTMLTableCellElement | HTMLDivElement>) => {
        const targetElement = e.currentTarget;
    
        const muscleName = targetElement.querySelector('.muscle')?.textContent;
    
        if (muscleName && currentMuscleTD !== muscleName) {
            setCurrentMuscleTD(muscleName);
        }
    };

    const musclesRendering = (muscle: Muscle) => {
        if (currentMuscleTD === muscle.name) {
            return (
                <div className="flex w-full h-full text-slate-800">
                    <a href={muscle.links.web} className="flex-1 flex items-center justify-center border-r border-slate-700 hover:bg-slate-400 hover:rounded-lg">
                        Web site
                    </a>
                    <a href={muscle.links.video} className="flex-1 flex items-center justify-center hover:bg-slate-400 hover:rounded-lg">
                        Video
                    </a>
                </div>
            )
        } else {
            return (
                // flex flex-col items-center justify-center text-black
                <div className="muscle h-full w-full flex flex-col items-center justify-center">
                    <div className="h-5/6 mt-2 flex items-center justify-center overflow-hidden">
                        <Image 
                            src={muscle.src} 
                            alt={muscle.name}
                            className='h-full w-full object-cover rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-110'
                            width={100}
                            height={100}
                        />
                    </div>
                    <span className="mt-2 text-white font-semibold">{muscle.name}</span>
                </div>
            )
        }
    }
    
    return (
        <div className="musclesChart border border-separate border-spacing-3 border-slate-500 m-auto mt-8 bg-slate-600 mb-8">
            <h2 className="text-center font-bold text-2xl mb-4 mt-4">Muscles Chart</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {musclesList.map((muscle, i) => {
                    return (
                        <React.Fragment key={i}>
                           <div
                                className="border border-slate-700 rounded-lg shadow-lg text-center align-middle hover:bg-slate-500 flex items-center justify-center h-44 transition duration-300 ease-in-out transform hover:scale-105" 
                                onMouseOver={(e) => onMouseOver(e)}>
                                {musclesRendering(muscle)}
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default MusclesChart;
"use client";

import { useState } from 'react';
import musclesLists from '../musclesList';
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
                    <a href={muscle.link} className="flex-1 flex items-center justify-center border-r border-slate-700 hover:bg-slate-400">
                        Web site
                    </a>
                    <a href={muscle.link} className="flex-1 flex items-center justify-center hover:bg-slate-400">
                        Video
                    </a>
                </div>
            )
        } else {
            return (
                <div className="muscle items-center justify-center text-slate-300 h-full">
                   <Image 
                        src={muscle.src} 
                        alt={muscle.name} 
                        height={150} 
                    />

                    {muscle.name}
                </div>
            )
        }
    }
    
    return (
        <div 
            className="musclesChart border border-separate border-spacing-3 border-slate-500 m-auto mt-8 bg-slate-600 mb-8">
            <div className="grid grid-cols-2">
                <div className="border border-slate-700 text-slate-300 text-center py-2">Body back</div>
                <div className="border border-slate-700 text-slate-300 text-center py-2">Body front</div>
            </div>
            <div className="grid grid-cols-2">
                {musclesLists.map((muscle, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div
                                className="border border-slate-700 text-center align-middle hover:bg-slate-500 flex items-center justify-center h-44" 
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
"use client";

import { useState } from 'react';
import musclesList from '../musclesList';
import '../styles/index.css';
import Image from 'next/image';
import Muscle from '@/types/Muscle';
import React from 'react';
import { table } from 'console';

const MusclesChart = () => {

    const [currentMuscleTD, setCurrentMuscleTD] = useState<string>('');
    const [mode, setMode] = useState<string>('table');

    const onMouseOver = (e: React.MouseEvent<HTMLTableCellElement | HTMLDivElement>) => {
        const targetElement = e.currentTarget;
    
        const muscleName = targetElement.querySelector('.muscle')?.textContent;
    
        if (muscleName && currentMuscleTD !== muscleName) {
            setCurrentMuscleTD(muscleName);
        }
    };

    const musclesRendering = (muscle: Muscle, width: number = 100, height: number = 100) => {
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
                <div className="muscle w-full flex flex-col items-center justify-center">
                    <div className="mt-2 flex items-center justify-center overflow-hidden">
                        <Image 
                            src={muscle.src} 
                            alt={muscle.name}
                            className='object-cover rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-110'
                            width={width}
                            height={height}
                        />
                    </div>
                    <span className="mt-2 text-white font-semibold">{muscle.name}</span>
                </div>
            )
        }
    }
    
    const tableRendering = () => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {musclesList.map((muscle: Muscle, i: number) => {
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
        )
    }

    const carouselRendering = () => {
        return (
            <div className="carousel-container relative h-full">
                <div className="carousel flex overflow-x-scroll scrollbar-hide h-full">
                    {musclesList.map((muscle: Muscle, i: number) => (
                        <div
                            key={i}
                            className="carousel-item flex-none w-96 border border-slate-700 rounded-lg shadow-lg text-center align-middle hover:bg-slate-500 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 mx-2 h-96"
                            onMouseOver={(e) => onMouseOver(e)}
                        >
                            {musclesRendering(muscle, 300, 300)}
                        </div>
                    ))}
                </div>
                <button 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-700 text-white p-4 rounded-full hover:bg-slate-500 transition duration-300 ease-in-out ml-4"
                    onClick={() => document.querySelector('.carousel')?.scrollBy({ left: -600, behavior: 'smooth' })}
                >
                    ‹
                </button>
                <button 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-700 text-white p-4 rounded-full hover:bg-slate-500 transition duration-300 ease-in-out mr-4"
                    onClick={() => document.querySelector('.carousel')?.scrollBy({ left: 600, behavior: 'smooth' })}
                >
                    ›
                </button>
            </div>
        )
    }
    
    return (
        <>
            <div className="flex justify-center mb-4">
                <button 
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-500 transition duration-300 ease-in-out"
                    onClick={() => setMode(mode === 'table' ? 'carousel' : 'table')}
                >
                    {mode}
                </button>
            </div>
            <div className="musclesChart border border-separate border-spacing-3 border-slate-500 m-auto mt-8 bg-slate-600 mb-8 p-4 h-full">
                <h2 className="text-center font-bold text-2xl mb-4 mt-4">Muscles Chart</h2>
                {mode === 'table' ? tableRendering() : carouselRendering()}
            </div>
        </>
    );
}

export default MusclesChart;
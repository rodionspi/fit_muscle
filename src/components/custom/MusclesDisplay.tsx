"use client";

import { useState, useEffect, useCallback } from 'react';
import musclesList from '../musclesList';
import Muscle from '@/types/Muscle';
import React from 'react';
import muscleRendering from '@/components/custom/MuscleRendering';

const MusclesDisplay = () => {

    const [currentMuscleTD, setCurrentMuscleTD] = useState<string>('');
    const [mode, setMode] = useState<'Table' | 'Carousel'>('Table');

    useEffect(() => {
        const handleResize = () => {
            const mediaQuery = window.matchMedia('(max-width: 650px)');
            if (mediaQuery.matches) {
                setMode('Table');
            }
        };

        handleResize(); // Initial check

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onMouseEnter = useCallback((muscleName: string) => {
        if (muscleName && currentMuscleTD !== muscleName) {
            setCurrentMuscleTD(muscleName);
        }
    }, [currentMuscleTD]);

    const onMouseLeave = useCallback(() => {
        setCurrentMuscleTD('');
    }, []);
    
    const tableRendering = () => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {musclesList.map((muscle: Muscle, i: number) => {
                    return (
                        <React.Fragment key={i}>
                            <div
                                className="border border-slate-700 rounded-lg shadow-lg text-center align-middle hover:bg-slate-500 flex items-center justify-center h-44 transition duration-300 ease-in-out pt-4"
                                onMouseEnter={() => onMouseEnter(muscle.name)}
                                onMouseLeave={onMouseLeave}
                            >
                                {muscleRendering(muscle, currentMuscleTD)}
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
                <div className="carousel flex overflow-x-scroll scrollbar-hide h-96">
                    {musclesList.map((muscle: Muscle, i: number) => (
                        <div
                            key={i}
                            className="carousel-item flex-none w-96 border border-slate-700 rounded-lg shadow-lg text-center align-middle hover:bg-slate-500 hover:rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 mx-2 h-full"
                            onMouseEnter={() => onMouseEnter(muscle.name)}
                            onMouseLeave={onMouseLeave}
                        >
                            {muscleRendering(muscle, currentMuscleTD, 180)}
                        </div>
                    ))}
                </div>
                <button 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-700 text-white p-2 w-10 rounded-full hover:bg-slate-500 transition duration-300 ease-in-out ml-4"
                    onClick={() => document.querySelector('.carousel')?.scrollBy({ left: -600, behavior: 'smooth' })}
                >
                    ‹
                </button>
                <button 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-700 text-white p-2 w-10 rounded-full hover:bg-slate-500 transition duration-300 ease-in-out mr-4"
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
                onClick={() => setMode(mode === "Table" ? "Carousel" : "Table")}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-500 transition duration-300 ease-in-out md:block hidden"
                >
                {mode === "Table" ? "Carousel" : "Table"}
                </button>
            </div>

            <div className="musclesChart border border-slate-500 bg-slate-600 p-4 mt-8 mb-8 m-auto h-full">
                <h2 className="text-center font-bold text-2xl mb-4 mt-4">Muscles Chart</h2>
                {mode === "Table" ? tableRendering() : carouselRendering()}
            </div>
        </>
    );
}

export default MusclesDisplay;
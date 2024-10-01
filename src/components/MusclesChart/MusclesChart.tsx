"use client";

import { useState } from 'react';
import musclesLists from '../musclesList';
import '../styles/index.css';
import Image from 'next/image';
import Muscle from '@/types/Muscle';

const MusclesChart = () => {

    const [currentMuscleTD, setCurrentMuscleTD] = useState<string>('');

    const onMouseOver = (e: React.MouseEvent<HTMLTableCellElement>) => {
        const tdElement = e.currentTarget;
    
        if (tdElement.tagName === 'TD') {
            const trElement = tdElement.parentElement;
    
            if (trElement) {
                const muscleName = tdElement.querySelector('.muscle')?.textContent;
                if (currentMuscleTD !== muscleName && muscleName) {
                    setCurrentMuscleTD(muscleName);
                }
            }
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
                <div className="muscle flex flex-col items-center justify-center text-slate-300">
                    <Image src={muscle.src} alt={muscle.name} />
                    {muscle.name}
                </div>
            )
        }
    }
    
    return (
        <>
            <table className="border border-separate border-spacing-3 border-slate-500 m-auto mt-8 bg-slate-600 w-2/3 h-1/2">
                <thead>
                    <tr>
                        <th className="border border-slate-700 w-1/2 text-slate-300">Body back</th>
                        <th className="border border-slate-700 w-1/2 text-slate-300">Body front</th>
                    </tr>
                </thead>
                <tbody>
                    {musclesLists['back'].map((muscle, i) => {
                        return (
                        <tr key={i}>
                            <td className="border border-slate-700 w-1/2 text-center align-middle hover:bg-slate-500" onMouseOver={(e) => onMouseOver(e)}>
                                {musclesRendering(muscle)}
                            </td>
                            {i < musclesLists['front'].length ? (
                                <td className="border border-slate-700 w-1/2 text-center align-middle hover:bg-slate-500" onMouseOver={(e) => onMouseOver(e)}>
                                    {musclesRendering(musclesLists['front'][i])}
                                </td>
                            ) : null}
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default MusclesChart


{/* <div className="border flex-1 flex items-center justify-center w-full h-full">
                                            <p>Web site</p>
                                        </div>
                                        <div className="border flex-1 flex items-center justify-center w-full h-full">
                                            <p>Video</p>
                                        </div> */}
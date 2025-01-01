import Muscle from "@/types/Muscle";
import Image from 'next/image';

const musclesRendering = (muscle: Muscle, onMouseOut: React.MouseEventHandler<HTMLDivElement>, currentMuscleTD: string, height: number = 130) => {

    if (currentMuscleTD === muscle.name) {
        return (
            <div className="flex flex-col w-full text-slate-800 h-full hover:rounded-lg">
                <div className="flex flex-1" onMouseOut={(e) => onMouseOut(e)}>
                    <a href={muscle.links.web} className="flex-1 flex items-center justify-center border-r border-slate-700 hover:bg-slate-400 hover:rounded-lg">
                        Web site
                    </a>
                    <a href={muscle.links.video} className="flex-1 flex items-center justify-center hover:bg-slate-400 hover:rounded-lg">
                        Video
                    </a>
                </div>
                <span className="mt-2 text-white font-semibold mb-2">{muscle.name}</span>
            </div>
        )
    } else {
        return (
            <div className="muscle w-full flex flex-col items-center justify-between h-full">
                <div className="flex items-center justify-center overflow-hidden h-full" onMouseOut={(e) => onMouseOut(e)}>
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
}

export default musclesRendering;
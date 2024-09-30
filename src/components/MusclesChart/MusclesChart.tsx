import musclesLists from '../musclesList';
import '../styles/index.css';
import Image from 'next/image';

const MusclesChart = () => {
    return (
        <>
            <table className="border border-separate border-spacing-3 border-slate-500 m-auto mt-8 bg-slate-600 w-2/3 h-1/2">
                <thead>
                    <tr>
                        <th className="border border-slate-700 w-1/2">Body back</th>
                        <th className="border border-slate-700 w-1/2">Body front</th>
                    </tr>
                </thead>
                <tbody>
                    {musclesLists['back'].map((muscle, i) => {
                        return (
                        <tr key={i}>
                            <td className="border border-slate-700 w-1/2 text-center align-middle hover:bg-slate-500">
                                <a href={muscle.link} className="flex flex-col items-center justify-center">
                                    <Image src={muscle.src} alt={muscle.name} />
                                    {muscle.name}
                                </a>
                            </td>

                            {i < musclesLists['front'].length ? (
                                <td className="border border-slate-700 w-1/2 text-center align-middle hover:bg-slate-500">
                                    <a href={musclesLists['front'][i].link} className="flex flex-col items-center justify-center">
                                        <Image src={musclesLists['front'][i].src} alt={musclesLists['front'][i].name} />
                                        {musclesLists['front'][i].name}
                                    </a>
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
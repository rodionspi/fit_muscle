import traziopen_front from '../../public/images/traziopen/front.png';
import traziopen_back from '../../public/images/traziopen/back.png';

import triceps from '../../public/images/triceps.png';

import sholdersBack from '../../public/images/sholders/back.png';
import sholdersFront from '../../public/images/sholders/front.png';

import grip from '../../public/images/grip.png';

import back from '../../public/images/back_muscles.png';

import chest from '../../public/images/chest.png';

import biceps from '../../public/images/biceps.png';

import abs from '../../public/images/abs.png';

import gluteal_muscles from '../../public/images/gluteal_muscles.png';

import legs_back from '../../public/images/legs/back.png';
import legs_front from '../../public/images/legs/front.png';

import calf_muscles from '../../public/images/calf_muscles.png';

const musclesLists = {
    'back': [
        { name: 'Back of Traziopen', src: traziopen_back, link: 'https://www.youtube.com/watch?v=swxXrhPUcN8' },
        { name: 'Back of shoulders', src: sholdersBack, link: 'https://www.bodybuilding.com/exercises/rear-delt-row' },
        { name: 'Back muscles', src: back, link: 'https://www.bodybuilding.com/content/10-best-muscle-building-back-exercises.html' }, 
        { name: 'Triceps', src: triceps, link: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
        { name: 'Gluteal muscles', src: gluteal_muscles, link: 'https://www.youtube.com/watch?v=_M2Etme-tfE' },
        { name: 'Legs', src: legs_back, link: 'https://www.bodybuilding.com/content/10-best-muscle-building-leg-exercises.html' },
        { name: 'Calf muscles', src: calf_muscles, link: 'https://www.youtube.com/watch?v=gwLzBJYoWlI' }
    ],
    'front': [
        { name: 'Front of Traziopen', src: traziopen_front, link: 'https://www.bodybuilding.com/exercises/shrug' },
        { name: 'Front of shoulders', src: sholdersFront, link: 'https://www.bodybuilding.com/exercises/front-dumbbell-raise' },
        { name: 'Chest', src: chest, link: 'https://www.bodybuilding.com/exercises/barbell-bench-press-medium-grip' }, 
        { name: 'Biceps', src: biceps, link: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' }, 
        { name: 'Abs', src: abs, link: 'https://www.youtube.com/watch?v=1919eTCoESo' }, 
        { name: 'Grip', src: grip, link: 'https://www.bodybuilding.com/exercises/grip-crush' },
        { name: 'Legs front', src: legs_front, link: 'https://www.youtube.com/watch?v=1xMaFs0L3ao' } 
    ]
};


export default musclesLists;

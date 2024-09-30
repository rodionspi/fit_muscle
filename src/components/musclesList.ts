import traziopen_front from '../../public/images/traziopen/front.png';
import traziopen_back from '../../public/images/traziopen/back.png';

import triceps from '../../public/images/triceps.png';

import sholdersBack from '../../public/images/sholders/back.png';
import sholdersFront from '../../public/images/sholders/front.png';

import infraspinatus from '../../public/images/infraspinatus.png';

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
        { name: 'traziopen', src: traziopen_back, alt: 'Back of Traziopen', className: 'traziopen' },
        { name: 'sholders_back', src: sholdersBack, alt: 'Back of shoulders', className: 'sholders' },
        { name: 'back', src: back, alt: 'Back muscles', className: 'back' },
        { name: 'triceps', src: triceps, alt: 'Triceps', className: 'triceps' },
        // { name: 'grip_back', src: grip_bac, alt: 'Back of grip', className: 'grip' },
        { name: 'gluteal_muscles', src: gluteal_muscles, alt: 'Gluteal muscles', className: 'gluteal_muscles' },
        { name: 'legs', src: legs_back, alt: 'Legs', className: 'legs' },
        { name: 'calf_muscles', src: calf_muscles, alt: 'Calf muscles', className: 'calf_muscles' }
    ],
    'front': [
        { name: 'traziopen', src: traziopen_front, alt: 'Front of Traziopen', className: 'traziopen' },
        { name: 'sholders_front', src: sholdersFront, alt: 'Front of shoulders', className: 'sholders' },
        { name: 'chest', src: chest, alt: 'Chest', className: 'chest' },
        { name: 'biceps', src: biceps, alt: 'Biceps', className: 'biceps' },
        { name: 'abs', src: abs, alt: 'Abs', className: 'abs' },
        { name: 'grip', src: grip, alt: 'Grip', className: 'grip' },
        { name: 'legs_front', src: legs_front, alt: 'Legs front', className: 'legs_front' },

    ]
};

export default musclesLists;


import traps from '../../public/images/for_muscles_chart/traps.png';

import triceps from '../../public/images/for_muscles_chart/triceps.png';

import sholders from '../../public/images/for_muscles_chart/sholders.png';

import grip from '../../public/images/for_muscles_chart/grip.png';

import back from '../../public/images/for_muscles_chart/back_muscles.png';

import chest from '../../public/images/for_muscles_chart/chest.png';

import biceps from '../../public/images/for_muscles_chart/biceps.png';

import abs from '../../public/images/for_muscles_chart/abs.png';

import glutes from '../../public/images/for_muscles_chart/glutes.png';

import legs_back from '../../public/images/for_muscles_chart/legs/back.png';
import legs_front from '../../public/images/for_muscles_chart/legs/front.png';

import calf_muscles from '../../public/images/for_muscles_chart/calf_muscles.png';
import Muscle from '@/types/Muscle';

const musclesLists: Muscle[] = [
        { name: 'Traps', src: traps, links: 
                {
                video: 'https://www.youtube.com/watch?v=C6sYjDFuq9I',
                web: 'https://athleanx.com/articles/back-for-men/trap-workouts' 
                }
        },
        { name: 'Shoulders', src: sholders, links: 
                {
                video: 'https://www.youtube.com/watch?v=ufrFCjERMDc',
                web: 'https://www.goldsgym.com/blog/7-shoulder-exercises-for-strength-and-stability/?srsltid=AfmBOor42mcdOChboaLNg6oXWmKv0RInNr6FFx1lzyzbjAnDSuDclKrm'
                } 
        },
        { name: 'Back muscles', src: back, links: 
                {
                video: 'https://www.youtube.com/watch?v=12xHxUnBEiI',
                web: 'https://www.menshealth.com/uk/building-muscle/a759269/10-best-back-exercises-for-building-muscle/'
                } 
        }, 
        { name: 'Triceps', src: triceps, links: 
                {
                video: 'https://www.youtube.com/watch?v=tMyFe-IL7Ks',
                web: 'https://www.acefitness.org/resources/pros/expert-articles/6112/6-exercises-for-stronger-triceps/?srsltid=AfmBOoqe3ZQ-cfkp_ChFRJCgXf43mJaCHidMzh5db53FIW6e5RtDgoNc'
                }
        },
        { name: 'Glutes', src: glutes, links: 
                {
                video: 'https://www.youtube.com/watch?v=oGFmeKD5z-E',
                web: 'https://row.gymshark.com/blog/article/best-glute-exercises'
                } 
        },
        { name: 'Hamstrings', src: legs_back, links: 
                {
                video: 'https://www.youtube.com/watch?v=j8X3S98gOQE',
                web: 'https://row.gymshark.com/blog/article/best-hamstring-exercises',
                }
        },
        { name: 'Calves', src: calf_muscles, links: 
                {
                video: 'https://www.youtube.com/watch?v=unJ50MjqhBs',
                web: 'https://www.webmd.com/fitness-exercise/strengthening-calf-muscles'
                }
        },
        { name: 'Chest', src: chest, links: 
                {
                video: 'https://www.youtube.com/watch?v=89e518dl4I8',
                web: 'https://row.gymshark.com/blog/article/best-chest-exercises'
                } 
        }, 
        { name: 'Biceps', src: biceps, links: 
                {
                video: 'https://www.youtube.com/watch?v=i1YgFZB6alI',
                web: 'https://row.gymshark.com/blog/article/the-best-bicep-exercises-for-mass'
                }
        }, 
        { name: 'Abs', src: abs, links:  
                {
                video: 'https://www.youtube.com/watch?v=Tn-XvYG9x7w',
                web: 'https://www.webmd.com/fitness-exercise/best-exercises-abs-general'
                }
        }, 
        { name: 'Grip', src: grip, links: 
                {
                video: 'https://www.youtube.com/watch?v=aVtjSqQTuGs',
                web: 'https://www.goodrx.com/well-being/movement-exercise/exercises-to-improve-grip-strength'
                }
        },
        { name: 'Legs', src: legs_front, links: 
                {
                video: 'https://www.youtube.com/watch?v=FShg92-FF_c',
                web: 'https://row.gymshark.com/blog/article/best-quad-exercises'
                }
        } 
];


export default musclesLists;

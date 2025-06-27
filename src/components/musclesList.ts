import traps from '../../public/images/for_muscles_chart/traps.png';
import triceps from '../../public/images/for_muscles_chart/triceps.png';
import sholders from '../../public/images/for_muscles_chart/sholders.png';
import grip from '../../public/images/for_muscles_chart/grip.png';
import back from '../../public/images/for_muscles_chart/back_muscles.png';
import chest from '../../public/images/for_muscles_chart/chest.png';
import biceps from '../../public/images/for_muscles_chart/biceps.png';
import abs from '../../public/images/for_muscles_chart/abs.png';
import glutes from '../../public/images/for_muscles_chart/glutes.png';
import hamstrings from '../../public/images/for_muscles_chart/hamstrings.png';
import quads from '../../public/images/for_muscles_chart/quads.png';
import calf_muscles from '../../public/images/for_muscles_chart/calf_muscles.png';
import Muscle from '@/types/Muscle';

const musclesList: Muscle[] = [
    {
        id: 1,
        name: 'Traps',
        shortName: 'Trapezius',
        relatedMuscles: ['Deltoids', 'Rhomboids', 'Lats'],
        function: 'Elevates, retracts, and rotates the scapula; supports neck movement.',
        anatomy: 'A large triangular muscle extending from the neck to the middle of the back.',
        src: traps,
        links: {
            video: 'https://www.youtube.com/watch?v=C6sYjDFuq9I',
            web: 'https://athleanx.com/articles/back-for-men/trap-workouts'
        },
        description: 'The trapezius is a large, triangular muscle located in the upper back and neck. It helps with shoulder elevation, scapular retraction, and neck movement, playing a key role in posture and upper body strength.'
    },
    {
        id: 2,
        name: 'Shoulders',
        shortName: 'Deltoids',
        relatedMuscles: ['Traps', 'Pecs', 'Biceps'],
        function: 'Abducts, flexes, and rotates the arm.',
        anatomy: 'A rounded muscle forming the contour of the shoulder.',
        src: sholders,
        links: {
            video: 'https://www.youtube.com/watch?v=ufrFCjERMDc',
            web: 'https://www.goldsgym.com/blog/7-shoulder-exercises-for-strength-and-stability/?srsltid=AfmBOor42mcdOChboaLNg6oXWmKv0RInNr6FFx1lzyzbjAnDSuDclKrm'
        },
        description: 'The deltoid muscles form the rounded contour of the shoulder. They are responsible for arm abduction, flexion, and rotation, making them essential for overhead movements and stability.'
    },
    {
        id: 3,
        name: 'Back muscles',
        shortName: 'Lats',
        relatedMuscles: ['Traps', 'Rhomboids', 'Erector Spinae'],
        function: 'Supports posture, pulls the arms downward and backward.',
        anatomy: 'A large, flat muscle covering the lower and middle back.',
        src: back,
        links: {
            video: 'https://www.youtube.com/watch?v=12xHxUnBEiI',
            web: 'https://www.menshealth.com/uk/building-muscle/a759269/10-best-back-exercises-for-building-muscle/'
        },
        description: 'The back muscles include the lats, rhomboids, and traps, which work together to support posture, pull movements, and spinal stability. They are crucial for pulling exercises like rows and pull-ups.'
    },
    {
        id: 4,
        name: 'Triceps',
        shortName: 'Triceps Brachii',
        relatedMuscles: ['Deltoids', 'Pecs', 'Biceps'],
        function: 'Extends the elbow joint.',
        anatomy: 'A three-headed muscle located on the back of the upper arm.',
        src: triceps,
        links: {
            video: 'https://www.youtube.com/watch?v=tMyFe-IL7Ks',
            web: 'https://www.acefitness.org/resources/pros/expert-articles/6112/6-exercises-for-stronger-triceps/?srsltid=AfmBOoqe3ZQ-cfkp_ChFRJCgXf43mJaCHidMzh5db53FIW6e5RtDgoNc'
        },
        description: 'Located on the back of the upper arm, the triceps are responsible for elbow extension. They are heavily involved in pushing movements like bench presses and dips.'
    },
    {
        id: 5,
        name: 'Glutes',
        shortName: 'Gluteus Maximus',
        relatedMuscles: ['Hamstrings', 'Quads', 'Lower Back'],
        function: 'Extends and rotates the hip joint.',
        anatomy: 'The largest muscle in the body, located in the buttocks.',
        src: glutes,
        links: {
            video: 'https://www.youtube.com/watch?v=oGFmeKD5z-E',
            web: 'https://row.gymshark.com/blog/article/best-glute-exercises'
        },
        description: 'The glutes are the largest muscles in the body, located in the buttocks. They are essential for hip extension, rotation, and stabilization during walking, running, and squatting.'
    },
    {
        id: 6,
        name: 'Hamstrings',
        shortName: 'Hamstrings',
        relatedMuscles: ['Glutes', 'Quads', 'Calves'],
        function: 'Flexes the knee and extends the hip.',
        anatomy: 'A group of three muscles located on the back of the thigh.',
        src: hamstrings,
        links: {
            video: 'https://www.youtube.com/watch?v=j8X3S98gOQE',
            web: 'https://row.gymshark.com/blog/article/best-hamstring-exercises',
        },
        description: 'The hamstrings are a group of muscles on the back of the thigh. They are responsible for knee flexion and hip extension, playing a key role in running, jumping, and bending movements.'
    },
    {
        id: 7,
        name: 'Calves',
        shortName: 'Gastrocnemius',
        relatedMuscles: ['Hamstrings', 'Quads', 'Ankles'],
        function: 'Plantar flexes the foot and stabilizes the ankle.',
        anatomy: 'A pair of muscles located on the back of the lower leg.',
        src: calf_muscles,
        links: {
            video: 'https://www.youtube.com/watch?v=unJ50MjqhBs',
            web: 'https://www.webmd.com/fitness-exercise/strengthening-calf-muscles'
        },
        description: 'The calf muscles are located on the back of the lower leg. They are responsible for plantar flexion (pointing the toes) and are essential for walking, running, and jumping.'
    },
    {
        id: 8,
        name: 'Chest',
        shortName: 'Pectoralis Major',
        relatedMuscles: ['Deltoids', 'Triceps', 'Biceps'],
        function: 'Adducts and flexes the arm at the shoulder joint.',
        anatomy: 'A large, fan-shaped muscle covering the chest.',
        src: chest,
        links: {
            video: 'https://www.youtube.com/watch?v=89e518dl4I8',
            web: 'https://row.gymshark.com/blog/article/best-chest-exercises'
        },
        description: 'The chest muscles are located on the front of the upper body. They are responsible for pushing movements, arm adduction, and shoulder flexion, making them key for exercises like push-ups and bench presses.'
    },
    {
        id: 9,
        name: 'Biceps',
        shortName: 'Biceps Brachii',
        relatedMuscles: ['Triceps', 'Forearms', 'Deltoids'],
        function: 'Flexes the elbow and supinates the forearm.',
        anatomy: 'A two-headed muscle located on the front of the upper arm.',
        src: biceps,
        links: {
            video: 'https://www.youtube.com/watch?v=i1YgFZB6alI',
            web: 'https://row.gymshark.com/blog/article/the-best-bicep-exercises-for-mass'
        },
        description: 'The biceps are located on the front of the upper arm. They are responsible for elbow flexion and forearm supination, playing a key role in pulling movements like curls and rows.'
    },
    {
        id: 10,
        name: 'Abs',
        shortName: 'Abdominals',
        relatedMuscles: ['Obliques', 'Lower Back', 'Hip Flexors'],
        function: 'Flexes and rotates the trunk; stabilizes the core.',
        anatomy: 'A group of muscles located in the front of the torso.',
        src: abs,
        links: {
            video: 'https://www.youtube.com/watch?v=Tn-XvYG9x7w',
            web: 'https://www.webmd.com/fitness-exercise/best-exercises-abs-general'
        },
        description: 'The abdominal muscles are located in the front of the torso. They are responsible for trunk flexion, rotation, and stabilization, making them essential for core strength and posture.'
    },
    {
        id: 11,
        name: 'Grip',
        shortName: 'Forearm Muscles',
        relatedMuscles: ['Biceps', 'Triceps', 'Shoulders'],
        function: 'Controls grip strength and wrist movement.',
        anatomy: 'A group of muscles located in the forearm.',
        src: grip,
        links: {
            video: 'https://www.youtube.com/watch?v=aVtjSqQTuGs',
            web: 'https://www.goodrx.com/well-being/movement-exercise/exercises-to-improve-grip-strength'
        },
        description: 'The forearm muscles control grip strength and wrist movement. They are essential for holding, lifting, and pulling exercises, as well as improving overall hand strength.'
    },
    {
        id: 12,
        name: 'Quads',
        shortName: 'Quadriceps',
        relatedMuscles: ['Hamstrings', 'Glutes', 'Calves'],
        function: 'Extends the knee and flexes the hip.',
        anatomy: 'A group of four muscles located on the front of the thigh.',
        src: quads,
        links: {
            video: 'https://www.youtube.com/watch?v=FShg92-FF_c',
            web: 'https://row.gymshark.com/blog/article/best-quad-exercises'
        },
        description: 'The quadriceps are a group of muscles on the front of the thigh. They are responsible for knee extension and hip flexion, playing a key role in walking, running, and squatting.'
    }
];

export default musclesList;

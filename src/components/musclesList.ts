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
        description: 'The trapezius is a large, triangular muscle located in the upper back and neck. It helps with shoulder elevation, scapular retraction, and neck movement, playing a key role in posture and upper body strength.',
        exercises: [
            {
                image: '/images/for_muscles_chart/traps.png',
                name: 'Barbell Shrug',
                difficulty: 'Beginner',
                equipment: 'Barbell',
                target: 'Trapezius',
                description: 'Lift the barbell by shrugging your shoulders upward, keeping arms straight.',
                sets: 3,
                reps: 12,
                tips: 'Avoid rolling your shoulders. Focus on squeezing at the top.'
            },
            {
                image: '/images/for_muscles_chart/traps.png',
                name: 'Dumbbell Upright Row',
                difficulty: 'Intermediate',
                equipment: 'Dumbbells',
                target: 'Trapezius',
                description: 'Pull dumbbells upward along your body to chest height, elbows out.',
                sets: 3,
                reps: 10,
                tips: 'Keep wrists straight and don’t use excessive weight.'
            }
        ],
        commonInjuries: [
            {
                name: 'Strain',
                description: 'Overstretching or tearing of muscle fibers, often due to excessive load or improper form.',
                prevention: 'Warm up properly, use correct technique, and avoid lifting too heavy.'
            },
            {
                name: 'Tendinitis',
                description: 'Inflammation of the tendon, usually from repetitive movements or overuse.',
                prevention: 'Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'The deltoid muscles form the rounded contour of the shoulder. They are responsible for arm abduction, flexion, and rotation, making them essential for overhead movements and stability.',
        exercises: [
            {
                image: '/images/for_muscles_chart/sholders.png',
                name: 'Overhead Press',
                difficulty: 'Intermediate',
                equipment: 'Barbell',
                target: 'Deltoids',
                description: 'Press the barbell overhead from shoulder height, fully extending arms.',
                sets: 4,
                reps: 8,
                tips: 'Keep your core tight and avoid arching your back.'
            },
            {
                image: '/images/for_muscles_chart/sholders.png',
                name: 'Lateral Raise',
                difficulty: 'Beginner',
                equipment: 'Dumbbells',
                target: 'Deltoids',
                description: 'Raise dumbbells to the sides until arms are parallel to the floor.',
                sets: 3,
                reps: 12,
                tips: 'Use light weight and control the movement.'
            }
        ],
        commonInjuries: [
            {
                name: 'Rotator Cuff Injury',
                description: 'Damage to the muscles or tendons around the shoulder joint, often from overhead movements.',
                prevention: 'Strengthen rotator cuff muscles, avoid excessive overhead lifting, and use proper form.'
            },
            {
                name: 'Impingement Syndrome',
                description: 'Compression of shoulder tendons or bursa, causing pain and limited movement.',
                prevention: 'Maintain good posture, strengthen shoulder stabilizers, and avoid repetitive overhead activity.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'The back muscles include the lats, rhomboids, and traps, which work together to support posture, pull movements, and spinal stability. They are crucial for pulling exercises like rows and pull-ups.',
        exercises: [
            {
                image: '/images/for_muscles_chart/back_muscles.png',
                name: 'Pull-Up',
                difficulty: 'Intermediate',
                equipment: 'Pull-up Bar',
                target: 'Lats',
                description: 'Pull your chin above the bar using your back and arms.',
                sets: 3,
                reps: 8,
                tips: 'Use full range of motion and avoid swinging.'
            },
            {
                image: '/images/for_muscles_chart/back_muscles.png',
                name: 'Seated Row',
                difficulty: 'Beginner',
                equipment: 'Cable Machine',
                target: 'Rhomboids',
                description: 'Pull the handle toward your torso, squeezing your shoulder blades together.',
                sets: 3,
                reps: 10,
                tips: 'Keep your back straight and don’t lean back.'
            }
        ],
        commonInjuries: [
            {
                name: 'Muscle Spasms',
                description: 'Involuntary contractions of back muscles, often due to fatigue or overuse.',
                prevention: 'Stay hydrated, stretch regularly, and avoid overexertion.'
            },
            {
                name: 'Herniated Disc',
                description: 'A spinal disc bulges out and presses on nerves, causing pain or numbness.',
                prevention: 'Use proper lifting technique, strengthen core, and avoid sudden twisting.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'Located on the back of the upper arm, the triceps are responsible for elbow extension. They are heavily involved in pushing movements like bench presses and dips.',
        exercises: [
            {
                image: '/images/for_muscles_chart/triceps.png',
                name: 'Tricep Dips',
                difficulty: 'Beginner',
                equipment: 'Dip Bar',
                target: 'Triceps',
                description: 'Lower your body by bending your elbows, then push back up.',
                sets: 3,
                reps: 10,
                tips: 'Keep your elbows close to your body.'
            },
            {
                image: '/images/for_muscles_chart/triceps.png',
                name: 'Skull Crushers',
                difficulty: 'Intermediate',
                equipment: 'EZ Bar',
                target: 'Triceps',
                description: 'Lie on a bench and lower the EZ bar to your forehead, then extend back up.',
                sets: 3,
                reps: 10,
                tips: 'Keep your upper arms stationary.'
            }
        ],
        commonInjuries: [
            {
                name: 'Tendinitis',
                description: 'Inflammation of the tendon, usually from repetitive movements or overuse.',
                prevention: 'Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles.'
            },
            {
                name: 'Strain',
                description: 'Overstretching or tearing of muscle fibers, often due to excessive load or improper form.',
                prevention: 'Warm up properly, use correct technique, and avoid lifting too heavy.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'The glutes are the largest muscles in the body, located in the buttocks. They are essential for hip extension, rotation, and stabilization during walking, running, and squatting.',
        exercises: [
            {
                image: '/images/for_muscles_chart/glutes.png',
                name: 'Squats',
                difficulty: 'Beginner',
                equipment: 'Bodyweight',
                target: 'Glutes',
                description: 'Lower your body as if sitting back into a chair, then return to standing.',
                sets: 3,
                reps: 15,
                tips: 'Keep your chest up and knees over your toes.'
            },
            {
                image: '/images/for_muscles_chart/glutes.png',
                name: 'Hip Thrust',
                difficulty: 'Intermediate',
                equipment: 'Barbell',
                target: 'Glutes',
                description: 'With your upper back on a bench, roll a barbell over your hips and thrust upward.',
                sets: 3,
                reps: 12,
                tips: 'Squeeze your glutes at the top of the movement.'
            }
        ],
        commonInjuries: [
            {
                name: 'Strain',
                description: 'Overstretching or tearing of muscle fibers, often due to excessive load or improper form.',
                prevention: 'Warm up properly, use correct technique, and avoid lifting too heavy.'
            },
            {
                name: 'Tendinitis',
                description: 'Inflammation of the tendon, usually from repetitive movements or overuse.',
                prevention: 'Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'The hamstrings are a group of muscles on the back of the thigh. They are responsible for knee flexion and hip extension, playing a key role in running, jumping, and bending movements.',
        exercises: [
            {
                image: '/images/for_muscles_chart/hamstrings.png',
                name: 'Deadlift',
                difficulty: 'Intermediate',
                equipment: 'Barbell',
                target: 'Hamstrings',
                description: 'Lift a barbell from the ground to hip level, keeping your back straight.',
                sets: 3,
                reps: 10,
                tips: 'Engage your core and don’t round your back.'
            },
            {
                image: '/images/for_muscles_chart/hamstrings.png',
                name: 'Leg Curl',
                difficulty: 'Beginner',
                equipment: 'Leg Curl Machine',
                target: 'Hamstrings',
                description: 'Curl your legs towards your buttocks while lying face down.',
                sets: 3,
                reps: 12,
                tips: 'Adjust the machine to fit your leg length.'
            }
        ],
        commonInjuries: [
            {
                name: 'Strain',
                description: 'Overstretching or tearing of muscle fibers, often due to excessive load or improper form.',
                prevention: 'Warm up properly, use correct technique, and avoid lifting too heavy.'
            },
            {
                name: 'Tendinitis',
                description: 'Inflammation of the tendon, usually from repetitive movements or overuse.',
                prevention: 'Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'The calf muscles are located on the back of the lower leg. They are responsible for plantar flexion (pointing the toes) and are essential for walking, running, and jumping.',
        exercises: [
            {
                image: '/images/for_muscles_chart/calf_muscles.png',
                name: 'Calf Raise',
                difficulty: 'Beginner',
                equipment: 'Bodyweight',
                target: 'Calves',
                description: 'Stand on the balls of your feet and raise your heels off the ground.',
                sets: 3,
                reps: 15,
                tips: 'Keep your knees straight and don’t bounce.'
            },
            {
                image: '/images/for_muscles_chart/calf_muscles.png',
                name: 'Seated Calf Raise',
                difficulty: 'Intermediate',
                equipment: 'Calf Raise Machine',
                target: 'Calves',
                description: 'Sit on the machine and place the balls of your feet on the platform, then raise your heels.',
                sets: 3,
                reps: 12,
                tips: 'Adjust the machine to your height and use a full range of motion.'
            }
        ],
        commonInjuries: [
            {
                name: 'Strain',
                description: 'Overstretching or tearing of muscle fibers, often due to excessive load or improper form.',
                prevention: 'Warm up properly, use correct technique, and avoid lifting too heavy.'
            },
            {
                name: 'Tendinitis',
                description: 'Inflammation of the tendon, usually from repetitive movements or overuse.',
                prevention: 'Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'The chest muscles are located on the front of the upper body. They are responsible for pushing movements, arm adduction, and shoulder flexion, making them key for exercises like push-ups and bench presses.',
        exercises: [
            {
                image: '/images/for_muscles_chart/chest.png',
                name: 'Bench Press',
                difficulty: 'Intermediate',
                equipment: 'Barbell',
                target: 'Pectoralis Major',
                description: 'Lie on a bench and press the barbell up from chest level.',
                sets: 3,
                reps: 10,
                tips: 'Keep your feet flat on the ground and don’t arch your back.'
            },
            {
                image: '/images/for_muscles_chart/chest.png',
                name: 'Push-Up',
                difficulty: 'Beginner',
                equipment: 'Bodyweight',
                target: 'Pectoralis Major',
                description: 'Lower your body to the ground and push back up, keeping your body straight.',
                sets: 3,
                reps: 15,
                tips: 'Keep your elbows at a 45-degree angle to your body.'
            }
        ],
        commonInjuries: [
            {
                name: 'Strain',
                description: 'Overstretching or tearing of muscle fibers, often due to excessive load or improper form.',
                prevention: 'Warm up properly, use correct technique, and avoid lifting too heavy.'
            },
            {
                name: 'Tendinitis',
                description: 'Inflammation of the tendon, usually from repetitive movements or overuse.',
                prevention: 'Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'The biceps are located on the front of the upper arm. They are responsible for elbow flexion and forearm supination, playing a key role in pulling movements like curls and rows.',
        exercises: [
            {
                image: '/images/for_muscles_chart/biceps.png',
                name: 'Bicep Curl',
                difficulty: 'Beginner',
                equipment: 'Dumbbells',
                target: 'Biceps Brachii',
                description: 'Curl the dumbbells up towards your shoulders, keeping your elbows close to your body.',
                sets: 3,
                reps: 12,
                tips: 'Don’t swing your body; keep the movement controlled.'
            },
            {
                image: '/images/for_muscles_chart/biceps.png',
                name: 'Hammer Curl',
                difficulty: 'Intermediate',
                equipment: 'Dumbbells',
                target: 'Biceps Brachii',
                description: 'Curl the dumbbells with palms facing each other, lifting towards your shoulders.',
                sets: 3,
                reps: 10,
                tips: 'Keep your elbows stationary and focus on your biceps.'
            }
        ],
        commonInjuries: [
            {
                name: 'Strain',
                description: 'Overstretching or tearing of muscle fibers, often due to excessive load or improper form.',
                prevention: 'Warm up properly, use correct technique, and avoid lifting too heavy.'
            },
            {
                name: 'Tendinitis',
                description: 'Inflammation of the tendon, usually from repetitive movements or overuse.',
                prevention: 'Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'The abdominal muscles are located in the front of the torso. They are responsible for trunk flexion, rotation, and stabilization, making them essential for core strength and posture.',
        exercises: [
            {
                image: '/images/for_muscles_chart/abs.png',
                name: 'Plank',
                difficulty: 'Beginner',
                equipment: 'Bodyweight',
                target: 'Abdominals',
                description: 'Hold your body in a straight line from head to heels, resting on your forearms and toes.',
                sets: 3,
                reps: 30,
                tips: 'Keep your body straight and don’t let your hips sag.'
            },
            {
                image: '/images/for_muscles_chart/abs.png',
                name: 'Russian Twist',
                difficulty: 'Intermediate',
                equipment: 'Medicine Ball',
                target: 'Obliques',
                description: 'Sit on the ground with your knees bent, lean back slightly, and twist your torso to touch the ground beside you.',
                sets: 3,
                reps: 15,
                tips: 'Keep your core engaged and don’t rush the movement.'
            }
        ],
        commonInjuries: [
            {
                name: 'Strain',
                description: 'Overstretching or tearing of muscle fibers, often due to excessive load or improper form.',
                prevention: 'Warm up properly, use correct technique, and avoid lifting too heavy.'
            },
            {
                name: 'Tendinitis',
                description: 'Inflammation of the tendon, usually from repetitive movements or overuse.',
                prevention: 'Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'The forearm muscles control grip strength and wrist movement. They are essential for holding, lifting, and pulling exercises, as well as improving overall hand strength.',
        exercises: [
            {
                image: '/images/for_muscles_chart/grip.png',
                name: 'Wrist Curl',
                difficulty: 'Beginner',
                equipment: 'Dumbbells',
                target: 'Forearm Muscles',
                description: 'Sit and rest your forearms on your thighs, curl the dumbbells up using only your wrists.',
                sets: 3,
                reps: 15,
                tips: 'Keep the movement slow and controlled.'
            },
            {
                image: '/images/for_muscles_chart/grip.png',
                name: 'Reverse Wrist Curl',
                difficulty: 'Intermediate',
                equipment: 'Dumbbells',
                target: 'Forearm Muscles',
                description: 'Sit and rest your forearms on your thighs, palms down, curl the dumbbells up using only your wrists.',
                sets: 3,
                reps: 15,
                tips: 'Focus on the contraction at the top of the movement.'
            }
        ],
        commonInjuries: [
            {
                name: 'Strain',
                description: 'Overstretching or tearing of muscle fibers, often due to excessive load or improper form.',
                prevention: 'Warm up properly, use correct technique, and avoid lifting too heavy.'
            },
            {
                name: 'Tendinitis',
                description: 'Inflammation of the tendon, usually from repetitive movements or overuse.',
                prevention: 'Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
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
        description: 'The quadriceps are a group of muscles on the front of the thigh. They are responsible for knee extension and hip flexion, playing a key role in walking, running, and squatting.',
        exercises: [
            {
                image: '/images/for_muscles_chart/quads.png',
                name: 'Leg Press',
                difficulty: 'Beginner',
                equipment: 'Leg Press Machine',
                target: 'Quadriceps',
                description: 'Sit on the machine and press the platform away using your legs.',
                sets: 3,
                reps: 10,
                tips: 'Don’t lock your knees at the top of the movement.'
            },
            {
                image: '/images/for_muscles_chart/quads.png',
                name: 'Lunges',
                difficulty: 'Intermediate',
                equipment: 'Bodyweight',
                target: 'Quadriceps',
                description: 'Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle.',
                sets: 3,
                reps: 12,
                tips: 'Keep your front knee over your ankle and don’t let it cave in.'
            }
        ],
        commonInjuries: [
            {
                name: 'Strain',
                description: 'Overstretching or tearing of muscle fibers, often due to excessive load or improper form.',
                prevention: 'Warm up properly, use correct technique, and avoid lifting too heavy.'
            },
            {
                name: 'Tendinitis',
                description: 'Inflammation of the tendon, usually from repetitive movements or overuse.',
                prevention: 'Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles.'
            }
        ],
        stretchingExercises: [
            {
                name: 'Static Stretch',
                description: 'Hold a static stretch targeting this muscle group.',
                duration: '30s'
            },
            {
                name: 'Dynamic Stretch',
                description: 'Perform slow, controlled movements through the muscle’s range of motion.',
                duration: '30s'
            }
        ]
    }
];

export default musclesList;

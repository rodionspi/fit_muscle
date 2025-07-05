import traps from "../../public/images/for_muscles_chart/traps.png";
import triceps from "../../public/images/for_muscles_chart/triceps.png";
import sholders from "../../public/images/for_muscles_chart/sholders.png";
import grip from "../../public/images/for_muscles_chart/grip.png";
import back from "../../public/images/for_muscles_chart/back_muscles.png";
import chest from "../../public/images/for_muscles_chart/chest.png";
import biceps from "../../public/images/for_muscles_chart/biceps.png";
import abs from "../../public/images/for_muscles_chart/abs.png";
import glutes from "../../public/images/for_muscles_chart/glutes.png";
import hamstrings from "../../public/images/for_muscles_chart/hamstrings.png";
import quads from "../../public/images/for_muscles_chart/quads.png";
import calf_muscles from "../../public/images/for_muscles_chart/calf_muscles.png";
import Muscle from "@/types/Muscle";

const musclesList: Muscle[] = [
    {
        id: 1,
        name: "Traps",
        shortName: "Trapezius",
        relatedMuscles: ["Deltoids", "Rhomboids", "Lats"],
        function: "Supports scapular movement, neck stability, and posture.",
        anatomy: "A large triangular muscle extending from the base of the skull to the middle of the back.",
        src: traps,
        description: "The trapezius is a key muscle for upper body movement and posture, aiding in scapular elevation, retraction, and rotation.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shrug.gif",
                name: "Barbell Shrug",
                difficulty: "Beginner",
                equipment: "Barbell",
                target: "Trapezius",
                description: "Lift the barbell by shrugging your shoulders upward, keeping arms straight.",
                sets: 3,
                reps: 12,
                tips: "Avoid rolling your shoulders. Focus on squeezing at the top.",
                videoLink: "https://www.youtube.com/watch?v=NAqCVe2mwzM"
            },
            {
                image: "https://www.dmoose.com/cdn/shop/articles/1_8db57df7-b8f2-412e-a364-745224090211.jpg?v=1647872727",
                name: "Dumbbell Upright Row",
                difficulty: "Intermediate",
                equipment: "Dumbbells",
                target: "Trapezius",
                description: "Pull dumbbells upward along your body to chest height, elbows out.",
                sets: 3,
                reps: 10,
                tips: "Keep wrists straight and don't use excessive weight.",
                videoLink: "https://www.youtube.com/watch?v=amCU-ziHITM"
            }
        ],
        commonInjuries: [
            {
                name: "Strain",
                description: "Overstretching or tearing of muscle fibers, often due to excessive load or improper form.",
                prevention: "Warm up properly, use correct technique, and avoid lifting too heavy."
            },
            {
                name: "Tendinitis",
                description: "Inflammation of the tendon, usually from repetitive movements or overuse.",
                prevention: "Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle\"s range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 2,
        name: "Shoulders",
        shortName: "Deltoids",
        relatedMuscles: ["Traps", "Pecs", "Biceps"],
        function: "Facilitates arm abduction, flexion, and rotation.",
        anatomy: "A rounded muscle forming the contour of the shoulder.",
        src: sholders,
        description: "The deltoid muscles are essential for arm movement and shoulder stability, playing a key role in overhead activities.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/07/Barbell-Standing-Military-Press.gif",
                name: "Overhead Press",
                difficulty: "Intermediate",
                equipment: "Barbell",
                target: "Deltoids",
                description: "Press the barbell overhead from shoulder height, fully extending arms.",
                sets: 4,
                reps: 8,
                tips: "Keep your core tight and avoid arching your back.",
                videoLink: "https://www.youtube.com/watch?v=2yjwXTZQDDI"
            },
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
                name: "Lateral Raise",
                difficulty: "Beginner",
                equipment: "Dumbbells",
                target: "Deltoids",
                description: "Raise dumbbells to the sides until arms are parallel to the floor.",
                sets: 3,
                reps: 12,
                tips: "Use light weight and control the movement.",
                videoLink: "https://www.youtube.com/watch?v=3VcKaXpzqRo"
            }
        ],
        commonInjuries: [
            {
                name: "Rotator Cuff Injury",
                description: "Damage to the muscles or tendons around the shoulder joint, often from overhead movements.",
                prevention: "Strengthen rotator cuff muscles, avoid excessive overhead lifting, and use proper form."
            },
            {
                name: "Impingement Syndrome",
                description: "Compression of shoulder tendons or bursa, causing pain and limited movement.",
                prevention: "Maintain good posture, strengthen shoulder stabilizers, and avoid repetitive overhead activity."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 3,
        name: "Back muscles",
        shortName: "Lats",
        relatedMuscles: ["Traps", "Rhomboids", "Erector Spinae"],
        function: "Supports posture, pulls the arms downward and backward.",
        anatomy: "A large, flat muscle covering the lower and middle back.",
        src: back,
        description: "The back muscles include the lats, rhomboids, and traps, which work together to support posture, pull movements, and spinal stability. They are crucial for pulling exercises like rows and pull-ups.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif",
                name: "Pull-Up",
                difficulty: "Intermediate",
                equipment: "Pull-up Bar",
                target: "Lats",
                description: "Pull your chin above the bar using your back and arms.",
                sets: 3,
                reps: 8,
                tips: "Use full range of motion and avoid swinging.",
                videoLink: "https://www.youtube.com/watch?v=eGo4IYlbE5g"
            },
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif",
                name: "Seated Row",
                difficulty: "Beginner",
                equipment: "Cable Machine",
                target: "Rhomboids",
                description: "Pull the handle toward your torso, squeezing your shoulder blades together.",
                sets: 3,
                reps: 10,
                tips: "Keep your back straight and don't lean back.",
                videoLink: "https://www.youtube.com/watch?v=GZbfZ033f74"
            }
        ],
        commonInjuries: [
            {
                name: "Muscle Spasms",
                description: "Involuntary contractions of back muscles, often due to fatigue or overuse.",
                prevention: "Stay hydrated, stretch regularly, and avoid overexertion."
            },
            {
                name: "Herniated Disc",
                description: "A spinal disc bulges out and presses on nerves, causing pain or numbness.",
                prevention: "Use proper lifting technique, strengthen core, and avoid sudden twisting."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 4,
        name: "Triceps",
        shortName: "Triceps Brachii",
        relatedMuscles: ["Deltoids", "Pecs", "Biceps"],
        function: "Extends the elbow joint.",
        anatomy: "A three-headed muscle located on the back of the upper arm.",
        src: triceps,
        description: "Located on the back of the upper arm, the triceps are responsible for elbow extension. They are heavily involved in pushing movements like bench presses and dips.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bench-Dips.gif",
                name: "Tricep Dips",
                difficulty: "Beginner",
                equipment: "Dip Bar",
                target: "Triceps",
                description: "Lower your body by bending your elbows, then push back up.",
                sets: 3,
                reps: 10,
                tips: "Keep your elbows close to your body.",
                videoLink: "https://www.youtube.com/watch?v=0326dy_-CzM"
            },
            {
                image: "https://www.fitfatherproject.com/wp-content/uploads/2019/08/Skull-Crusher-exercise-long-image.jpg",
                name: "Skull Crushers",
                difficulty: "Intermediate",
                equipment: "EZ Bar",
                target: "Triceps",
                description: "Lie on a bench and lower the EZ bar to your forehead, then extend back up.",
                sets: 3,
                reps: 10,
                tips: "Keep your upper arms stationary.",
                videoLink: "https://www.youtube.com/watch?v=d_KZxkY_0cM"
            }
        ],
        commonInjuries: [
            {
                name: "Tendinitis",
                description: "Inflammation of the tendon, usually from repetitive movements or overuse.",
                prevention: "Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles."
            },
            {
                name: "Strain",
                description: "Overstretching or tearing of muscle fibers, often due to excessive load or improper form.",
                prevention: "Warm up properly, use correct technique, and avoid lifting too heavy."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 5,
        name: "Glutes",
        shortName: "Gluteus Maximus",
        relatedMuscles: ["Hamstrings", "Quads", "Lower Back"],
        function: "Extends and rotates the hip joint.",
        anatomy: "The largest muscle in the body, located in the buttocks.",
        src: glutes,
        description: "The glutes are the largest muscles in the body, located in the buttocks. They are essential for hip extension, rotation, and stabilization during walking, running, and squatting.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif",
                name: "Squats",
                difficulty: "Beginner",
                equipment: "Bodyweight",
                target: "Glutes",
                description: "Lower your body as if sitting back into a chair, then return to standing.",
                sets: 3,
                reps: 15,
                tips: "Keep your chest up and knees over your toes.",
                videoLink: "https://www.youtube.com/watch?v=aclHkVaku9U"
            },
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif",
                name: "Hip Thrust",
                difficulty: "Intermediate",
                equipment: "Barbell",
                target: "Glutes",
                description: "With your upper back on a bench, roll a barbell over your hips and thrust upward.",
                sets: 3,
                reps: 12,
                tips: "Squeeze your glutes at the top of the movement.",
                videoLink: "https://www.youtube.com/watch?v=Zp26q4BY5HE"
            }
        ],
        commonInjuries: [
            {
                name: "Strain",
                description: "Overstretching or tearing of muscle fibers, often due to excessive load or improper form.",
                prevention: "Warm up properly, use correct technique, and avoid lifting too heavy."
            },
            {
                name: "Tendinitis",
                description: "Inflammation of the tendon, usually from repetitive movements or overuse.",
                prevention: "Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 6,
        name: "Hamstrings",
        shortName: "Hamstrings",
        relatedMuscles: ["Glutes", "Quads", "Calves"],
        function: "Flexes the knee and extends the hip.",
        anatomy: "A group of three muscles located on the back of the thigh.",
        src: hamstrings,
        description: "The hamstrings are a group of muscles on the back of the thigh. They are responsible for knee flexion and hip extension, playing a key role in running, jumping, and bending movements.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif",
                name: "Deadlift",
                difficulty: "Intermediate",
                equipment: "Barbell",
                target: "Hamstrings",
                description: "Lift a barbell from the ground to hip level, keeping your back straight.",
                sets: 3,
                reps: 10,
                tips: "Engage your core and don't round your back.",
                videoLink: "https://www.youtube.com/watch?v=1ZXobu7JvvE"
            },
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif",
                name: "Leg Curl",
                difficulty: "Beginner",
                equipment: "Leg Curl Machine",
                target: "Hamstrings",
                description: "Curl your legs towards your buttocks while lying face down.",
                sets: 3,
                reps: 12,
                tips: "Adjust the machine to fit your leg length.",
                videoLink: "https://www.youtube.com/watch?v=ELOCsoDSmrg"
            }
        ],
        commonInjuries: [
            {
                name: "Strain",
                description: "Overstretching or tearing of muscle fibers, often due to excessive load or improper form.",
                prevention: "Warm up properly, use correct technique, and avoid lifting too heavy."
            },
            {
                name: "Tendinitis",
                description: "Inflammation of the tendon, usually from repetitive movements or overuse.",
                prevention: "Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 7,
        name: "Calves",
        shortName: "Gastrocnemius",
        relatedMuscles: ["Hamstrings", "Quads", "Ankles"],
        function: "Plantar flexes the foot and stabilizes the ankle.",
        anatomy: "A pair of muscles located on the back of the lower leg.",
        src: calf_muscles,
        description: "The calf muscles are located on the back of the lower leg. They are responsible for plantar flexion (pointing the toes) and are essential for walking, running, and jumping.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Standing-Calf-Raise.gif",
                name: "Calf Raise",
                difficulty: "Beginner",
                equipment: "Bodyweight",
                target: "Calves",
                description: "Stand on the balls of your feet and raise your heels off the ground.",
                sets: 3,
                reps: 15,
                tips: "Keep your knees straight and don't bounce.",
                videoLink: "https://www.youtube.com/watch?v=-M4-G8p8fmc"
            },
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/09/Barbell-Seated-Calf-Raise.gif",
                name: "Seated Calf Raise",
                difficulty: "Intermediate",
                equipment: "Calf Raise Machine",
                target: "Calves",
                description: "Sit on the machine and place the balls of your feet on the platform, then raise your heels.",
                sets: 3,
                reps: 12,
                tips: "Adjust the machine to your height and use a full range of motion.",
                videoLink: "https://www.youtube.com/watch?v=JbyjNymZOt0"
            }
        ],
        commonInjuries: [
            {
                name: "Strain",
                description: "Overstretching or tearing of muscle fibers, often due to excessive load or improper form.",
                prevention: "Warm up properly, use correct technique, and avoid lifting too heavy."
            },
            {
                name: "Tendinitis",
                description: "Inflammation of the tendon, usually from repetitive movements or overuse.",
                prevention: "Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 8,
        name: "Chest",
        shortName: "Pectoralis Major",
        relatedMuscles: ["Deltoids", "Triceps", "Biceps"],
        function: "Adducts and flexes the arm at the shoulder joint.",
        anatomy: "A large, fan-shaped muscle covering the chest.",
        src: chest,
        description: "The chest muscles are located on the front of the upper body. They are responsible for pushing movements, arm adduction, and shoulder flexion, making them key for exercises like push-ups and bench presses.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif",
                name: "Bench Press",
                difficulty: "Intermediate",
                equipment: "Barbell",
                target: "Pectoralis Major",
                description: "Lie on a bench and press the barbell up from chest level.",
                sets: 3,
                reps: 10,
                tips: "Keep your feet flat on the ground and don't arch your back.",
                videoLink: "https://www.youtube.com/watch?v=gRVjAtPip0Y"
            },
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif",
                name: "Push-Up",
                difficulty: "Beginner",
                equipment: "Bodyweight",
                target: "Pectoralis Major",
                description: "Lower your body to the ground and push back up, keeping your body straight.",
                sets: 3,
                reps: 15,
                tips: "Keep your elbows at a 45-degree angle to your body.",
                videoLink: "https://www.youtube.com/watch?v=IODxDxX7oi4"
            }
        ],
        commonInjuries: [
            {
                name: "Strain",
                description: "Overstretching or tearing of muscle fibers, often due to excessive load or improper form.",
                prevention: "Warm up properly, use correct technique, and avoid lifting too heavy."
            },
            {
                name: "Tendinitis",
                description: "Inflammation of the tendon, usually from repetitive movements or overuse.",
                prevention: "Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 9,
        name: "Biceps",
        shortName: "Biceps Brachii",
        relatedMuscles: ["Triceps", "Forearms", "Deltoids"],
        function: "Flexes the elbow and supinates the forearm.",
        anatomy: "A two-headed muscle located on the front of the upper arm.",
        src: biceps,
        description: "The biceps are located on the front of the upper arm. They are responsible for elbow flexion and forearm supination, playing a key role in pulling movements like curls and rows.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif",
                name: "Bicep Curl",
                difficulty: "Beginner",
                equipment: "Dumbbells",
                target: "Biceps Brachii",
                description: "Curl the dumbbells up towards your shoulders, keeping your elbows close to your body.",
                sets: 3,
                reps: 12,
                tips: "Don't swing your body; keep the movement controlled.",
                videoLink: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo"
            },
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif",
                name: "Hammer Curl",
                difficulty: "Intermediate",
                equipment: "Dumbbells",
                target: "Biceps Brachii",
                description: "Curl the dumbbells with palms facing each other, lifting towards your shoulders.",
                sets: 3,
                reps: 10,
                tips: "Keep your elbows stationary and focus on your biceps.",
                videoLink: "https://www.youtube.com/watch?v=TwD-YGVP4Bk"
            }
        ],
        commonInjuries: [
            {
                name: "Strain",
                description: "Overstretching or tearing of muscle fibers, often due to excessive load or improper form.",
                prevention: "Warm up properly, use correct technique, and avoid lifting too heavy."
            },
            {
                name: "Tendinitis",
                description: "Inflammation of the tendon, usually from repetitive movements or overuse.",
                prevention: "Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 10,
        name: "Abs",
        shortName: "Abdominals",
        relatedMuscles: ["Obliques", "Lower Back", "Hip Flexors"],
        function: "Flexes and rotates the trunk; stabilizes the core.",
        anatomy: "A group of muscles located in the front of the torso.",
        src: abs,
        description: "The abdominal muscles are located in the front of the torso. They are responsible for trunk flexion, rotation, and stabilization, making them essential for core strength and posture.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/plank.gif",
                name: "Plank",
                difficulty: "Beginner",
                equipment: "Bodyweight",
                target: "Abdominals",
                description: "Hold your body in a straight line from head to heels, resting on your forearms and toes.",
                sets: 3,
                reps: 30,
                tips: "Keep your body straight and don't let your hips sag.",
                videoLink: "https://www.youtube.com/watch?v=pSHjTRCQxIw"
            },
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif",
                name: "Russian Twist",
                difficulty: "Intermediate",
                equipment: "Medicine Ball",
                target: "Obliques",
                description: "Sit on the ground with your knees bent, lean back slightly, and twist your torso to touch the ground beside you.",
                sets: 3,
                reps: 15,
                tips: "Keep your core engaged and don't rush the movement.",
                videoLink: "https://www.youtube.com/watch?v=wkD8rjkodUI"
            }
        ],
        commonInjuries: [
            {
                name: "Strain",
                description: "Overstretching or tearing of muscle fibers, often due to excessive load or improper form.",
                prevention: "Warm up properly, use correct technique, and avoid lifting too heavy."
            },
            {
                name: "Tendinitis",
                description: "Inflammation of the tendon, usually from repetitive movements or overuse.",
                prevention: "Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 11,
        name: "Grip",
        shortName: "Forearm Muscles",
        relatedMuscles: ["Biceps", "Triceps", "Shoulders"],
        function: "Controls grip strength and wrist movement.",
        anatomy: "A group of muscles located in the forearm.",
        src: grip,
        description: "The forearm muscles control grip strength and wrist movement. They are essential for holding, lifting, and pulling exercises, as well as improving overall hand strength.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Seated-Neutral-Wrist-Curl.gif",
                name: "Wrist Curl",
                difficulty: "Beginner",
                equipment: "Dumbbells",
                target: "Forearm Muscles",
                description: "Sit and rest your forearms on your thighs, curl the dumbbells up using only your wrists.",
                sets: 3,
                reps: 15,
                tips: "Keep the movement slow and controlled.",
                videoLink: "https://www.youtube.com/watch?v=qMtmHwaCmYI"
            },
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Barbell-Reverse-Wrist-Curl.gif",
                name: "Reverse Wrist Curl",
                difficulty: "Intermediate",
                equipment: "Dumbbells",
                target: "Forearm Muscles",
                description: "Sit and rest your forearms on your thighs, palms down, curl the dumbbells up using only your wrists.",
                sets: 3,
                reps: 15,
                tips: "Focus on the contraction at the top of the movement.",
                videoLink: "https://www.youtube.com/watch?v=GZbfZ033f74"
            }
        ],
        commonInjuries: [
            {
                name: "Strain",
                description: "Overstretching or tearing of muscle fibers, often due to excessive load or improper form.",
                prevention: "Warm up properly, use correct technique, and avoid lifting too heavy."
            },
            {
                name: "Tendinitis",
                description: "Inflammation of the tendon, usually from repetitive movements or overuse.",
                prevention: "Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    },
    {
        id: 12,
        name: "Quads",
        shortName: "Quadriceps",
        relatedMuscles: ["Hamstrings", "Glutes", "Calves"],
        function: "Extends the knee and flexes the hip.",
        anatomy: "A group of four muscles located on the front of the thigh.",
        src: quads,
        description: "The quadriceps are a group of muscles on the front of the thigh. They are responsible for knee extension and hip flexion, playing a key role in walking, running, and squatting.",
        exercises: [
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
                name: "Leg Press",
                difficulty: "Beginner",
                equipment: "Leg Press Machine",
                target: "Quadriceps",
                description: "Sit on the machine and press the platform away using your legs.",
                sets: 3,
                reps: 10,
                tips: "Don't lock your knees at the top of the movement.",
                videoLink: "https://www.youtube.com/watch?v=IZxyjW7MPJQ"
            },
            {
                image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif",
                name: "Lunges",
                difficulty: "Intermediate",
                equipment: "Bodyweight",
                target: "Quadriceps",
                description: "Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle.",
                sets: 3,
                reps: 12,
                tips: "Keep your front knee over your ankle and don't let it cave in.",
                videoLink: "https://www.youtube.com/watch?v=QOVaHwm-Q6U"
            }
        ],
        commonInjuries: [
            {
                name: "Strain",
                description: "Overstretching or tearing of muscle fibers, often due to excessive load or improper form.",
                prevention: "Warm up properly, use correct technique, and avoid lifting too heavy."
            },
            {
                name: "Tendinitis",
                description: "Inflammation of the tendon, usually from repetitive movements or overuse.",
                prevention: "Allow adequate rest, avoid repetitive strain, and strengthen supporting muscles."
            }
        ],
        stretchingExercises: [
            {
                name: "Static Stretch",
                description: "Hold a static stretch targeting this muscle group.",
                duration: "30s"
            },
            {
                name: "Dynamic Stretch",
                description: "Perform slow, controlled movements through the muscle's range of motion.",
                duration: "30s"
            }
        ],
        frequency: {
            beginner: "1-2",
            intermediate: "2-3",
            advanced: "3-4"
        }
    }
];

export default musclesList;
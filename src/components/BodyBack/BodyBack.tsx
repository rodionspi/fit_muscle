// 'use client'

// import Image from 'next/image';
// import musclesList from '../musclesList';
// import styles from './BodyBack.module.scss';

// //нужно сделать отдельный компонент который будет КЛИЕНТСКИЙ и там будут геренироваться картинки которые будут потом отображаться тут
// //через цикл
// //пример названия: RenderBodyPart

// const BodyBack = () => {
//     const handleImageClick = (muscleGroup: string) => {
//         console.log(`Clicked on ${muscleGroup}`);
//     };

//     return (
//         <div className={styles.main_part}>
//             {musclesList.map((muscle: { name: string, src: any, alt: string, className: string }) => (
//                 <Image
//                     key={muscle.name}
//                     className={`${styles.parts} ${styles[muscle.className]}`}
//                     src={muscle.src}
//                     alt={muscle.alt}
//                     onClick={() => handleImageClick(muscle.name)}
//                 />
//             ))}
//         </div>
//     );
// };

// export default BodyBack;

import Image from 'next/image';
import Link from 'next/link';
import head_back from '../../../public/images/head/head_back.png';
import traziopen_back from '../../../public/images/traziopen/back.png';
import triceps from '../../../public/images/triceps.png';
import sholdersBack from '../../../public/images/sholders/back.png';
import infraspinatus from '../../../public/images/infraspinatus.png';
import grip from '../../../public/images/grip.png';
import back from '../../../public/images/back_muscles.png';
import gluteal_muscles from '../../../public/images/gluteal_muscles.png';
import hands from '../../../public/images/hands.png';
import legs from '../../../public/images/legs.png';
import calf_muscles from '../../../public/images/calf_muscles.png';
import styles from './BodyBack.module.scss';

const BodyBack = () => {
    return (
        <div className={styles.main_part}>
            <Link href="https://www.goldsgym.com/blog/7-shoulder-exercises-for-strength-and-stability/">
                <Image className={`${styles.parts} ${styles.head_back}`} src={head_back} alt="Back of traziopen" />
            </Link>
            <Link href="https://www.goldsgym.com/blog/7-shoulder-exercises-for-strength-and-stability/">
                <Image className={`${styles.parts} ${styles.traziopen_back}`} src={traziopen_back} alt="Back of traziopen" />
            </Link>
            <Link href="https://www.goldsgym.com/blog/7-shoulder-exercises-for-strength-and-stability/">
                <Image className={`${styles.parts} ${styles.sholders}`} src={sholdersBack} alt="Back of sholders" />
            </Link>
            <Link href="https://athleanx.com/articles/back-for-men/trap-workouts">
                <Image className={`${styles.parts} ${styles.infraspinatus}`} src={infraspinatus} alt="Infraspinatus" />
            </Link>
            <Link href="https://athleanx.com/articles/back-for-men/trap-workouts">
                <Image className={`${styles.parts} ${styles.back}`} src={back} alt="Back Muscles" />
            </Link>
            <Link href="https://athleanx.com/articles/back-for-men/trap-workouts">
                <Image className={`${styles.parts} ${styles.triceps}`} src={triceps} alt="Triceps" />
            </Link>
            <Link href="https://athleanx.com/articles/back-for-men/trap-workouts">
                <Image className={`${styles.parts} ${styles.grip}`} src={grip} alt="Back of grip" />
            </Link>
            <Link href="https://athleanx.com/articles/back-for-men/trap-workouts">
                <Image className={`${styles.parts} ${styles.gluteal_muscles}`} src={gluteal_muscles} alt="Glueteal_muscles" />
            </Link>
            <Link href="https://athleanx.com/articles/back-for-men/trap-workouts">
                <Image className={`${styles.parts} ${styles.hands}`} src={hands} alt="Hands" />
            </Link>
            <Link href="https://athleanx.com/articles/back-for-men/trap-workouts">
                <Image className={`${styles.parts} ${styles.legs}`} src={legs} alt="Legs" />
            </Link>
            <Link href="https://athleanx.com/articles/back-for-men/trap-workouts">
                <Image className={`${styles.parts} ${styles.calf_muscles}`} src={calf_muscles} alt="Calf_muscles" />
            </Link>
        </div>
    );
};

export default BodyBack;
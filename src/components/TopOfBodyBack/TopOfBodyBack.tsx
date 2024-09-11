import Image from 'next/image';
import Link from 'next/link';
import triceps from '../../../public/images/triceps.png';
import sholdersBack from '../../../public/images/sholders/back.png';
import infraspinatus from '../../../public/images/sholders/infraspinatus.png';
import grip from '../../../public/images/grip.png';
import back from '../../../public/images/back_muscles.png';
import ass from '../../../public/images/ass.png';
import legs from '../../../public/images/legs.png';
import styles from './TopOfBodyBack.module.scss';

const TopOfBodyBack = () => {
    return (
        <div className={styles.main_part}>

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
                <Image className={`${styles.parts} ${styles.ass}`} src={ass} alt="Ass" />
            </Link>
            <Link href="https://athleanx.com/articles/back-for-men/trap-workouts">
                <Image className={`${styles.parts} ${styles.legs}`} src={legs} alt="Legs" />
            </Link>
        </div>
    );
};

export default TopOfBodyBack;
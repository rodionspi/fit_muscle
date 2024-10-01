import Image from 'next/image';
import trapezoidsFront from '../../../public/images/traziopen/front.png';
import sholdersFront from '../../../public/images/sholders/front.png'
import styles from './BodyFront.module.scss';

const TopOfBodyFront = () => {
    return (
        <div className={styles.main_part}>
            <Image className={`${styles.parts} ${styles.trapezoids}`} src={trapezoidsFront} alt="Front of trapezoids" />
            <Image className={`${styles.parts} ${styles.sholders}`} src={sholdersFront} alt="Front of sholders" />
        </div>
    );
};

export default TopOfBodyFront;
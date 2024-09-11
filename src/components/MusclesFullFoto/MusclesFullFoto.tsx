import TopOfBodyBack from "../TopOfBodyBack/TopOfBodyBack";
import TopOfBodyFront from "../TopOfBodyFront/TopOfBodyFront";
import styles from './MusclesFullFoto.module.scss';

const MusclesFullFoto = () => {
    return ( 
        <div className={styles.body_shell}>
            <div className="back">
                <TopOfBodyBack/>
                <div className="legs">

                </div>
            </div>
            <div className="front">
                <TopOfBodyFront/>
                <div className="legs">

                </div>
            </div>
        </div>
    )
};

export default MusclesFullFoto;
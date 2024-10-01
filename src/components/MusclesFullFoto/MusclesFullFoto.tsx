import BodyBack from "../BodyBack/BodyBack";
import BodyFront from "../BodyFront/BodyFront";
import styles from './MusclesFullFoto.module.scss';
import '../styles/index.css';

const MusclesFullFoto = () => {
    return (
        <>
            <div className={styles.body_shell}>
                <div className="back">
                    <BodyBack/>
                    <div className="legs">

                    </div>
                </div>
                <div className="front">
                    <BodyFront/>
                    <div className="legs">

                    </div>
                </div>
            </div>
        </>
        
    )
};

export default MusclesFullFoto;
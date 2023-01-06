import Image from 'next/image';
import classes from './exerciseCard.module.css'

const ExerciseCard = ({exercise}) => {

    

    return (
        <div className={classes.exerciseCardContainer}>
            <div className={classes.exerciseCardContainerTitle}>
                <h4>{exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)}</h4>
            </div>
            <div className={classes.exerciseCardContainerGif}>
                <Image src={exercise.gifUrl} alt={exercise.name} width={398} height={500} quality={10} />
            </div>
            <div className={classes.exerciseCardContainerbottom}>
                <p>TARGET - MUSCLE :- <span className={classes.exerciseCardSpan}>{exercise.target.charAt(0).toUpperCase() + exercise.target.slice(1)}</span></p>
                <p>EQUIPMENT - REQUIRED :- <span className={classes.exerciseCardSpan}>{exercise.equipment.charAt(0).toUpperCase() + exercise.equipment.slice(1)}</span></p>
            </div>
        </div>
    )
}

export default ExerciseCard;
import Image from 'next/image';
import classes from './exerciseCard.module.css'

const ExerciseCard = ({exercise}) => {

    

    return (
        <div className={classes.exerciseCardContainer}>
            <div className={classes.exerciseCardContainerTitle}>
                <h3>{exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)}</h3>
            </div>
            <div className={classes.exerciseCardContainerGif}>
                <Image src={exercise.gifUrl} alt={exercise.name} fill={true} quality={10} />
            </div>
            <div className={classes.exerciseCardContainerbottom}>
                <p>BODY - PART :- <span className={classes.exerciseCardSpan}>{exercise.bodyPart.charAt(0).toUpperCase() + exercise.bodyPart.slice(1)}</span></p>
                <p>EQUIPMENT - REQUIRED :- <span className={classes.exerciseCardSpan}>{exercise.equipment.charAt(0).toUpperCase() + exercise.equipment.slice(1)}</span></p>
            </div>
        </div>
    )
}

export default ExerciseCard;
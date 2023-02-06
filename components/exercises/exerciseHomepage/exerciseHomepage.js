import { useEffect, useState } from 'react'

import classes from './exerciseHomepage.module.css'
import Lottie from 'react-lottie';

import animationData from '../../loadingSpinner/laodingSpinner.json'
import ExerciseCard from '../exerciseCard/exerciseCard'


const ExerciseHomepage = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };

    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const Abductors = async () => {

            const exercise = await fetch(`https://next-fitness-backend.vercel.app/exercise/abductors`)
            const exerciseResponse = await exercise.json()
            setExercises(exerciseResponse)
            setLoading(false)

        }
        Abductors()

    }, []);

    if (!exercises) {
        <p>loading...</p>
    }

    const exerciseSelector = async (event) => {
        setLoading(true)

        const exercise = await fetch(`https://next-fitness-backend.vercel.app/exercise/${event.target.value}`)
        const exerciseResponse = await exercise.json()
        setExercises(exerciseResponse)
        setLoading(false)

    }

    return (
        <div className={classes.exerciseHomepageContainer}>
            <div className={classes.exerciseHomepageInnerContainer}>
                <div className={classes.exerciseHomepageFilter}>
                    <div className={classes.exerciseHomepageFilterInner}>
                        <h2>Target - Muscle</h2>
                        <form className={classes.exerciseHomepageFilterInnerRadio} onChange={event => exerciseSelector(event)}>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="abductors" name="targetMuscle" value="abductors" defaultChecked={true} />
                                <label id='abductors'>Abductors</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="abs" name="targetMuscle" value="abs" />
                                <label id='abs'>Abs</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="adductors" name="targetMuscle" value="adductors" />
                                <label id='adductors'>Adductors</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="biceps" name="targetMuscle" value="biceps" />
                                <label id='biceps'>Biceps</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="calves" name="targetMuscle" value="calves" />
                                <label id='calves'>Calves</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="cardiovascular-system" name="targetMuscle" value="cardio" />
                                <label id='cardiovascular-system'>Cardio</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="delts" name="targetMuscle" value="shoulders" />
                                <label id='delts'>Shoulders</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="forearms" name="targetMuscle" value="forearms" />
                                <label id='forearms'>Forearms</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="glutes" name="targetMuscle" value="glutes" />
                                <label id='glutes'>Glutes</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="hamstrings" name="targetMuscle" value="hamstrings" />
                                <label id='hamstrings'>Hamstrings</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="lats" name="targetMuscle" value="lats" />
                                <label id='lats'>Lats</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="levator-scapulae" name="targetMuscle" value="neck" />
                                <label id='levator-scapulae'>Levator-Scapulae</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="pectorals" name="targetMuscle" value="chest" />
                                <label id='pectorals'>Chest</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="quads" name="targetMuscle" value="quads" />
                                <label id='quads'>Quads</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="serratus-anterior" name="targetMuscle" value="serratusAnterior" />
                                <label id='serratus-anterior'>Serratus-Anterior</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="spine" name="targetMuscle" value="spine" />
                                <label id='spine'>Spine</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="traps" name="targetMuscle" value="traps" />
                                <label id='traps'>Traps</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="triceps" name="targetMuscle" value="triceps" />
                                <label id='triceps'>Triceps</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="upper-back" name="targetMuscle" value="upperBack"  />
                                <label id='upper-back'>Upper-Back</label>
                            </div>

                        </form>
                    </div>
                </div>
                <div className={classes.exerciseHomepageContent}>
                    {!loading ? (exercises.map( exercise => (
                            <ExerciseCard exercise={exercise} key={exercise.id} />
                    ))) : <Lottie className={classes.spinnerAnimation} options={defaultOptions} height={150} width={150} /> }
                </div>
            </div>
        </div>
    )
}

export default ExerciseHomepage;
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import classes from './exerciseHomepage.module.css'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'

import { DATA } from '../../../data'
import ExerciseCard from '../exerciseCard/exerciseCard'
import db from '../../../lib/initFirebase'

const ExerciseHomepage = () => {

    const router = useRouter()

    const [exercises, setExercises] = useState([])

    useEffect(() => {
        const Abductors = async () => {

            const colRef = collection(db, 'exercises/abductors/abductorsExercises' )
            const snapshots = await getDocs(colRef)
            const docs = snapshots.docs.map(doc => doc.data())
            setExercises(docs)

        }
        Abductors()

    }, []);

    if (!exercises) {
        <p>loading...</p>
    }

    const exerciseSelector = async (event) => {
        const colRef = collection(db, `exercises/${event.target.value}/${event.target.value}Exercises` )
            const snapshots = await getDocs(colRef)
            const docs = snapshots.docs.map(doc => doc.data())
            setExercises(docs)
    }

    return (
        <div className={classes.exerciseHomepageContainer}>
            <div className={classes.exerciseHomepageInnerContainer}>
                <div className={classes.exerciseHomepageFilter}>
                    <div className={classes.exerciseHomepageFilterInner}>
                        <h2>Target - Muscle</h2>
                        <div className={classes.exerciseHomepageFilterInnerRadio}>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="abductors" name="targetMuscle" value="abductors" defaultChecked={true} onChange={event => exerciseSelector(event)} />
                                <label id='abductors'>Abductors</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="abs" name="targetMuscle" value="abs" onChange={event => exerciseSelector(event)} />
                                <label id='abs'>Abs</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="adductors" name="targetMuscle" value="adductors" onChange={event => exerciseSelector(event)} />
                                <label id='adductors'>Adductors</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="biceps" name="targetMuscle" value="biceps" onChange={event => exerciseSelector(event)} />
                                <label id='biceps'>Biceps</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="calves" name="targetMuscle" value="calves" onChange={event => exerciseSelector(event)} />
                                <label id='calves'>Calves</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="cardiovascular-system" name="targetMuscle" value="cardio" onChange={event => exerciseSelector(event)} />
                                <label id='cardiovascular-system'>Cardio</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="delts" name="targetMuscle" value="shoulders" onChange={event => exerciseSelector(event)} />
                                <label id='delts'>Shoulders</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="forearms" name="targetMuscle" value="forearms" onChange={event => exerciseSelector(event)} />
                                <label id='forearms'>Forearms</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="glutes" name="targetMuscle" value="glutes" onChange={event => exerciseSelector(event)} />
                                <label id='glutes'>Glutes</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="hamstrings" name="targetMuscle" value="hamstrings" onChange={event => exerciseSelector(event)} />
                                <label id='hamstrings'>Hamstrings</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="lats" name="targetMuscle" value="lats" onChange={event => exerciseSelector(event)} />
                                <label id='lats'>Lats</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="levator-scapulae" name="targetMuscle" value="neck" onChange={event => exerciseSelector(event)} />
                                <label id='levator-scapulae'>Levator-Scapulae</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="pectorals" name="targetMuscle" value="chest" onChange={event => exerciseSelector(event)} />
                                <label id='pectorals'>Chest</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="quads" name="targetMuscle" value="quads" onChange={event => exerciseSelector(event)} />
                                <label id='quads'>Quads</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="serratus-anterior" name="targetMuscle" value="serratusAnterior" onChange={event => exerciseSelector(event)} />
                                <label id='serratus-anterior'>Serratus-Anterior</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="spine" name="targetMuscle" value="spine" onChange={event => exerciseSelector(event)} />
                                <label id='spine'>Spine</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="traps" name="targetMuscle" value="traps" onChange={event => exerciseSelector(event)} />
                                <label id='traps'>Traps</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="triceps" name="targetMuscle" value="triceps" onChange={event => exerciseSelector(event)} />
                                <label id='triceps'>Triceps</label>
                            </div>
                            <div className={classes.exerciseRadio}>
                                <input type="radio" id="upper-back" name="targetMuscle" value="upperBack" onChange={event => exerciseSelector(event)}  />
                                <label id='upper-back'>Upper-Back</label>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={classes.exerciseHomepageContent}>
                    {exercises.map( exercise => (
                            <ExerciseCard exercise={exercise} key={exercise.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExerciseHomepage;
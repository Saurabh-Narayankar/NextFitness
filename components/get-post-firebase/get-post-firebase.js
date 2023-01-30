import { useState } from 'react';
import classes from './get-post-firebase.module.css'

const GetPost = () => {

    const [Datas, setDatas] = useState([])

    /* const getDocument = async () => {
        const colRef = collection(db, '/recipes/uttarPradesh/uttarPradeshRecipes/sideDish/sideDishes' )
            const snapshots = await getDocs(colRef)
            const recipes = snapshots.docs.map(doc => doc.data())
            console.log(recipes);
            setDatas(recipes)
    }

    const setDocument = async () => {

        Datas.forEach( async (data) => {
            await setDoc(doc(db, `recipes/uttarPradesh/uttarPradeshRecipes/sideDish/sideDishs`, `${data.id}`), data);
        })

    } */

    const getDocuments = async () => {
        
    }

    return (
        <>
            <div className={classes.button}>
                <button type='submit' onClick={() => getDocument()}>getData</button>
                <button type='submit' onClick={() => setDocument()}>postData</button>
            </div>
        </>
    )
}

export default GetPost
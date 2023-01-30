import Link from 'next/link'

import classes from './recipeCard.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faStopwatch, faPizzaSlice } from '@fortawesome/free-solid-svg-icons'

const RecipeCard = ({recipe}) => {

    let bgColor = ''
    let recipesCardContainerTimeAndServing = ''
    let color = 'black'

        if (recipe.dietType === 'Non Vegeterian' || recipe.dietType === 'High Protein Non Vegetarian') {
            bgColor = '#FCB361'
            recipesCardContainerTimeAndServing = "#FFF3E6"
        }  

        if (recipe.dietType === 'Eggetarian') {
            bgColor = '#FCFC61'
            recipesCardContainerTimeAndServing = "#FFFFE6"
        }

        if (recipe.dietType === "Vegan") {
            bgColor = '#19C706'
            recipesCardContainerTimeAndServing = "#E8FFE6"
        }

        if (recipe.dietType === 'Diabetic Friendly' || recipe.dietType === 'Vegetarian' || recipe.dietType === 'High Protein Vegetarian' || recipe.dietType === 'Gluten Free' || recipe.dietType === 'No Onion No Garlic (Sattvic)') {
            bgColor = '#61FC61'
            recipesCardContainerTimeAndServing = "#E7FEE7"
        }



    return (
        
        <>
            <div className={classes.recipesCardContainer}>
                <div className={classes.recipesCardContainerTitle} style={{backgroundColor: `${bgColor}`,color: `${color}`}}>
                    <h4>{recipe.recipeName}</h4>
                    <p>{recipe.cuisine} , {recipe.course} , {recipe.dietType}</p>
                </div>
                <div className={classes.recipesCardContainerTimeAndServing} style={{backgroundColor: `${recipesCardContainerTimeAndServing}`}}>
                    <div className={classes.recipesCardContainerTiming}>
                        <div className={classes.recipesCardContainerPrepTime}>
                            <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faStopwatch} size='lg' />
                            <p>PREP:</p>
                            <p>{recipe.prepTimeInMins} mins</p>
                        </div>
                        <div className={classes.recipesCardContainerCookTime}>
                            <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faStopwatch} size='lg' />
                            <p>COOK:</p>
                            <p>{recipe.cookTimeInMins} mins</p> 
                        </div>
                        <div className={classes.recipesCardContainerTotalTime}>
                            <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faStopwatch} size='lg' />
                            <p>TOTAL:</p>
                            <p>{recipe.totalTimeInMins} mins</p>
                        </div>
                    </div>
                    <div className={classes.recipesCardContainerServing}>
                        <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faPizzaSlice} size='lg' />
                        <p>SERVINGS:</p>
                        <p>{recipe.servings} people</p>
                    </div>
                </div>
                <div className={classes.recipesCardFullDetailsLink} style={{backgroundColor: `${bgColor}`,color: `${color}`}}>
                    <Link href={`/recipes/${recipe.cuisine}/${recipe.course}/${recipe.id}`}><h4><span className={classes.recipeCardFullDetailLinkText}>More Details</span> <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='sm' /></h4></Link>
                </div>
            </div>
        </>
    )

}

export default RecipeCard;
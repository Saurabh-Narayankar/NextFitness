import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch, faUtensils } from '@fortawesome/free-solid-svg-icons'

import classes from './recipeDetailComp.module.css'

const RecipeDetailComp = ({ cuisine, course, id }) => {

    const [recipe, setRecipe] = useState({})

    let bgColor = ''
    let color = 'black'
    if (recipe.dietType === 'Non Vegeterian' || recipe.dietType === 'High Protein Non Vegetarian') {
        bgColor = '#FCB361'
    }  
    if (recipe.dietType === 'Eggetarian') {
        bgColor = '#FCFC61'
    }
    if (recipe.dietType === "Vegan") {
        bgColor = '#19C706'   
    }
    if (recipe.dietType === 'Diabetic Friendly' || recipe.dietType === 'Vegetarian' || recipe.dietType === 'High Protein Vegetarian' || recipe.dietType === 'Gluten Free' || recipe.dietType === 'No Onion No Garlic (Sattvic)') {
        bgColor = '#61FC61'
    }


    useEffect(() => {

        const getRecipeDetail = async () => {
            
            const singleRecipeFetch = await fetch(`https://next-fitness-backend.vercel.app/recipes/singleRecipe/${cuisine}/${course}/${id}`)
            const singleRecipeData = await singleRecipeFetch.json()
            setRecipe(singleRecipeData)

        }

        getRecipeDetail()
        
    }, [course, cuisine, id])


    return (
        <div className={classes.detailRecipeContainer}>
            <div className={classes.detailRecipeInnerContainer}>
                <div className={classes.recipeHeading} style={{backgroundColor: `${bgColor}`,color: `${color}`}}>
                    <h2>{recipe.recipeName}</h2>
                </div>
                <div className={classes.recipeFilters}>
                    <div className={classes.recipeFilter}>
                        <>
                            <p className={classes.recipeFilter1} >Cuisine:-- {recipe.cuisine}</p>
                            <p className={classes.recipeFilter2} >Course:-- {recipe.course}</p>
                            <p className={classes.recipeFilter3} >Diet - Type:-- {recipe.dietType}</p>
                        </>
                    </div>
                    <div className={classes.recipeTimeAndServing}>
                        <div className={classes.recipePrepTime}>
                            <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faStopwatch} size='lg' />
                            <p>PREP:</p>
                            <p>{recipe.prepTimeInMins} mins</p>
                        </div>
                        <div className={classes.recipeCookTime}>
                            <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faStopwatch} size='lg' />
                            <p>COOK:</p>
                            <p>{recipe.cookTimeInMins} mins</p>
                        </div>
                        <div className={classes.recipeTotalTime}>
                            <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faStopwatch} size='lg' />
                            <p>TOTAL:</p>
                            <p>{recipe.totalTimeInMins} mins</p>
                        </div>
                        <div className={classes.recipeServing}>
                            <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faUtensils} size='lg' />
                            <p>SERVINGS:</p>
                            <p>{recipe.servings} people</p>
                        </div>
                    </div>
                </div>
                {recipe.ingredients && recipe.instructions ? <div className={classes.recipeIngredientAndInstructions}>
                    <div className={classes.recipeIngredients}>
                        <p>Ingredients</p>
                        <ul className={classes.IngredientList}>
                            {recipe.ingredients.map((ingredient, index) => (<li className={classes.IngredientItem} key={index}>{ingredient}</li>))}
                        </ul>
                    </div>
                    <div className={classes.recipeInstructions}>
                        <p>Cooking Instructions</p>
                        <ul className={classes.instructionList}>
                            {/* conditional check in map because every instruction array has the last value of it as empty string so if the condition is not checked then extra <li></li> gets created with no value {check any document of a recipe in database recipes for more info} */}
                            {recipe.instructions.map((instruction, index) => {return instruction.length !== 0 ? <li className={classes.instructionItem} key={index}>{instruction}</li> : <p>{``}</p>})}
                        </ul>
                    </div>
                </div> : <p>loading</p>}
            </div>
        </div>
    )

}

export default RecipeDetailComp;
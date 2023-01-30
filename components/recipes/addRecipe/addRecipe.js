import { useState, useRef } from 'react';

import classes from './addRecipe.module.css'



const AddRecipe = () => {

    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])

    const recipeName = useRef(null)
    const cuisine = useRef(null)
    const course = useRef(null)
    const dietType = useRef(null)
    const prepTimeInMins = useRef(null)
    const cookTimeInMins = useRef(null)
    const totalTimeInMins = useRef(null)
    const servings = useRef(null)


    const add_Input_In_Ingredients_And_Instrcutions_List = (input) => {

        if (input === 'ingredient') {
            setIngredients([...ingredients, {ingredient: ''}])
        } else if (input === 'instruction') {
            setInstructions([...instructions, {instruction: ''}])
        }    
    }


    const remove_Last_Input_In_Ingredients_And_Instrcutions_List = (input) => {

        if (input === 'ingredient') {
            let newIngredients = [...ingredients]
            newIngredients.pop()
            setIngredients(newIngredients)
        } else if (input === 'instruction') {
            let newInstructions = [...instructions]
            newInstructions.pop()
            setInstructions(newInstructions)
        }    
    }


    const addRecipeFormData = (event) => {

        event.preventDefault()
        const recipeNameForPost = recipeName.current.value
        const cuisineForPost = cuisine.current.value
        const courseForPost = course.current.value
        const dietTypeForPost = dietType.current.value
        const prepTimeInMinsForPost = prepTimeInMins.current.value
        const cookTimeInMinsForPost = cookTimeInMins.current.value
        const totalTimeInMinsForPost = totalTimeInMins.current.value
        const servingsForPost = servings.current.value
        const ingredientsForPostForPost = ingredients.map((ingredient) => ingredient.ingredient)
        const instructionsForPostForPost = instructions.map((instruction) => instruction.instruction)

        const recipeObj = {}
        recipeObj.recipeName = recipeNameForPost
        recipeObj.cuisine = cuisineForPost
        recipeObj.course = courseForPost
        recipeObj.dietType = dietTypeForPost
        recipeObj.prepTimeInMins = prepTimeInMinsForPost
        recipeObj.cookTimeInMins = cookTimeInMinsForPost
        recipeObj.totalTimeInMins = totalTimeInMinsForPost
        recipeObj.servings = servingsForPost
        recipeObj.ingredients = ingredientsForPostForPost
        recipeObj.instructions = instructionsForPostForPost

        const submitRecipeToBackend = async () => {

            const addRecipeFetch = await fetch(`http://localhost:4000/recipes/addRecipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipeObj)
            })
            const addRecipeResultData = await addRecipeFetch.json()
            console.log(addRecipeResultData);

        }

        submitRecipeToBackend()

        event.target.reset()
        setIngredients([])
        setInstructions([])
    }

    return (
        <>
            <div className={classes.addRecipeContainer}>
                <div className={classes.addRecipeInnerContainer}>
                    <h1>Add Recipe</h1>
                    <form className={classes.addRecipeForm} onSubmit={addRecipeFormData}>
                        <div className={classes.recipeName}>
                            <label id='recipeName'>Recipe Name : </label>
                            <input type='text' id='recipeName' name='recipeName' placeholder='Enter name of recipe' ref={recipeName} required />
                        </div>
                        <div className={classes.recipeCuisineCourseAndDiet_type}>
                            <div className={classes.recipeCuisine}>
                                <label id='cuisine'>Cuisine: </label>
                                    <select name="cuisine" id="cuisine" ref={cuisine} required>
                                        <option value="">Select Cuisine</option>
                                        <option value="assamese">Assamese</option>
                                        <option value="afghan">Afghan</option>
                                        <option value="african">African</option>
                                        <option value="american">American</option>
                                        <option value="bengali">Bengali</option>
                                        <option value="bihari">Bihari</option>
                                        <option value="fusion">Fusion</option>
                                        <option value="gujarati">Gujarati</option>
                                        <option value="himachal">Himachal</option>
                                        <option value="hyderabadi">Hyderabadi</option>
                                        <option value="indoChinese">Indo Chinese</option>
                                        <option value="italian">Italian</option>
                                        <option value="karnataka">Karnataka</option>
                                        <option value="kashmiri">Kashmiri</option>
                                        <option value="kerala">Kerala</option>
                                        <option value="konkan">Konkan</option>
                                        <option value="lucknowi">Lucknowi</option>
                                        <option value="maharashtrian">Maharashtrian</option>
                                        <option value="mughlai">Mughlai</option>
                                        <option value="northEastIndian">North East Indian</option>
                                        <option value="northIndian">North Indian</option>
                                        <option value="punjabi">Punjabi</option>
                                        <option value="rajasthani">Rajasthani</option>
                                        <option value="sindhi">Sindhi</option>
                                        <option value="tamilNadu">TamilNadu</option>
                                        <option value="uttarPradesh">UttarPradesh</option>
                                        <option value="continental">Continental</option>
                                        <option value="other">Others</option>
                                    </select>
                            </div>
                            <div className={classes.recipeCourse}>
                                <label id='course'>Course: </label>
                                    <select name="course" id="course" ref={course} required>
                                        <option value="">Select Course</option>
                                        <option value="mainCourse">Main Course</option>
                                        <option value="breakfast">Breakfast</option>
                                        <option value="dessert">Dessert</option>
                                        <option value="sideDish">Side Dish</option>
                                        <option value="appetizer">Appetizer</option>
                                    </select>
                            </div>
                            <div className={classes.recipeDiet_type}>
                                <label id='diet'>Diet - Type:</label>
                                    <select name="diet" id="diet" ref={dietType} required>
                                        <option value="">Select Diet - Type</option>
                                        <option value="Diabetic Friendly">Diabetic Friendly</option>
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Non Vegeterian">Non Vegeterian</option>
                                        <option value="Eggetarian">Eggetarian</option>
                                        <option value="High Protein Non Vegetarian">High Protein Non Vegetarian</option>
                                        <option value="High Protein Vegetarian">High Protein Vegetarian</option>
                                        <option value="Vegan">Vegan</option>
                                        <option value="Gluten Free">Gluten Free</option>
                                        <option value="No Onion No Garlic (Sattvic)">No Onion No Garlic (Sattvic)</option>
                                    </select>
                            </div>
                        </div>
                        <div className={classes.recipePrep_Cook_TotalTimeAndServings}>
                            <div className={classes.recipePrepTime}>
                                <label id='recipePrepTime'>Preperation Time (in mins) : </label>
                                <input type='number' id='recipePrepTime' name='recipePrepTime' min='1' placeholder='Enter Time Required For Preperation' ref={prepTimeInMins} required />
                            </div>
                            <div className={classes.recipeCookTime}>
                                <label id='recipeCookTime'>Cook Time (in mins) : </label>
                                <input type='number' id='recipeCookTime' name='recipeCookTime' min='1' placeholder='Enter Time Required For Cooking' ref={cookTimeInMins} required />
                            </div>
                            <div className={classes.recipeTotalTime}>
                                <label id='recipeTotalTime'>Total Time (in mins) : </label>
                                <input type='number' id='recipeTotalTime' name='recipeTotalTime' min='1' placeholder='Enter Total Time' ref={totalTimeInMins} required />
                            </div>
                            <div className={classes.recipeServings}>
                                <label id='recipeServings'>Servings : </label>
                                <input type='number' id='recipeServings' name='recipeServings' min='1' placeholder='Enter No. Of Servings' ref={servings} required />
                            </div>
                        </div>
                        <div className={classes.recipeIngredientsAndInstructions}>
                            <div className={classes.recipeIngredients}>
                                <p><b>Ingredients</b> : eg - (20gm - chopped onions) , (1cup - chopped onions)</p>
                                <div className={classes.recipeIngredientsListAndAddButton}>
                                    <ul>
                                        {ingredients.map((ingredient, index) => (<li key={index}><input type='text' id='ingredient' name='ingredient' placeholder={`Enter ingredient ${index + 1}`} required onChange={(e) => {setIngredients(
                                            ingredients.map((ingredient, onChangeIndex) => index === onChangeIndex ? {ingredient: e.target.value} : ingredient)
                                        )}} /></li>) )}
                                    </ul>
                                    <button className={classes.recipeIngredientsAddButton} onClick={() => add_Input_In_Ingredients_And_Instrcutions_List('ingredient')}>add row for ingredient</button>
                                    <button className={classes.recipeIngredientsRemoveButton} onClick={() => remove_Last_Input_In_Ingredients_And_Instrcutions_List('ingredient')}>remove last ingredient row</button>
                                </div>
                            </div>
                            <div className={classes.recipeInstructions}>
                                <p><b>Instructions</b></p>
                                <div className={classes.recipeInstructionsListAndAddButton}>
                                    <ul>
                                        {instructions.map((instruction, index) => (<li key={index}><input type='text' id='instruction' name='instruction' placeholder={`Enter instruction ${index + 1}`} required onChange={(e) => {setInstructions(
                                            instructions.map((instruction, onChangeIndex) => index === onChangeIndex ? {instruction: e.target.value} : instruction)
                                        )}} /></li>) )}
                                    </ul>
                                    <button className={classes.recipeIngredientsAddButton} onClick={() => add_Input_In_Ingredients_And_Instrcutions_List('instruction')}>add row for instruction</button>
                                    <button className={classes.recipeIngredientsRemoveButton} onClick={() => remove_Last_Input_In_Ingredients_And_Instrcutions_List('instruction')}>remove last instruction row</button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.submitButton}>
                            <button type='submit'>Submit recipe</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default AddRecipe;
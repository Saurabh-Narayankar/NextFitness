import { useEffect, useState } from 'react';
import Link from 'next/link';

import classes from './recipesHomepage.module.css'

import RecipeCard from '../recipeCard/recipeCard';
import Lottie from 'react-lottie';
import animationData from '../../loadingSpinner/laodingSpinner.json'




const RecipesHomepage = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };

    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const firstRecipeFetch = async () => {
            const exercise = await fetch(`https://next-fitness-backend.vercel.app/recipes/assamese/mainCourse/none`)
            const exerciseResponse = await exercise.json()
            setRecipes(exerciseResponse)
            setLoading(false)
        }
        firstRecipeFetch()
    }, [])


    const getRecipes = (event) => {

        event.preventDefault()
        setLoading(true)

        const cuisine = event.target.cuisine.value
        const course = event.target.course.value
        const diet = event.target.diet.value

        const findRecipe = async () => {
            const exercise = await fetch(`https://next-fitness-backend.vercel.app/recipes/${cuisine}/${course}/${diet}`)
            const exerciseResponse = await exercise.json()
            setRecipes(exerciseResponse)
            
        }
        findRecipe()
        setLoading(false)
    }
    

    return (
        <>
            <div className={classes.recipeHomepageContainer}>
                <div className={classes.recipeHomepageInnerContainer}>
                    <Link href='/recipes/addRecipePage'> 
                        <div className={classes.addRecipeButton}>
                            <p>Add Recipe</p>
                        </div>
                    </Link>
                    <div className={classes.searchAndAddRecipeTab}>
                        <form className={classes.searchTab} onSubmit={getRecipes}>
                            <div className={classes.cuisineTab}>
                                <label id='cuisine'>Cuisine: <span className={classes.astericCompulsory}>*</span></label>
                                <select name="cuisine" id="cuisine">
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
                            <div className={classes.courseTab}>
                                <label id='course'>Course: <span className={classes.astericCompulsory}>*</span></label>
                                    <select name="course" id="course">
                                        <option value="mainCourse">Main Course</option>
                                        <option value="breakfast">Breakfast</option>
                                        <option value="dessert">Dessert</option>
                                        <option value="sideDish">Side Dish</option>
                                        <option value="appetizer">Appetizer</option>
                                    </select>
                            </div>
                            <div className={classes.dietTab}>
                                <label id='diet'>Diet - Type:</label>
                                    <select name="diet" id="diet">
                                        <option value="none">none</option>
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
                            <div className={classes.submitButton}>
                                <button type='submit'>Get Recipes</button>
                            </div>
                        </form>
                    </div>
                    <div className={classes.recipesTab}>
                    {!loading ? (recipes.length !== 0 ? (
                        recipes.map( recipe => (
                            <RecipeCard recipe={recipe} key={recipe.id} />
                    ))
                    ) : (
                        
                        <p className={classes.noRecipesFound}>No recipes Found</p>
                    )): <Lottie className={classes.spinnerAnimation} options={defaultOptions} height={150} width={150} />}
                    </div>
                </div>
            </div>
        </>
    )
}


export default RecipesHomepage;
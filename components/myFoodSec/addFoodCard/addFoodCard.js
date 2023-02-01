import { useContext } from 'react'
import { useRouter } from 'next/router'

import classes from './addFoodCard.module.css'

import db from '../../../lib/firebase'
import { doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore'
import { UserContext } from '../../../context/userContext'



const AddFoodCard = ({ item, meal, date }) => {

    const router = useRouter()

    const { currentUser } = useContext(UserContext)

    const addFoodItemToFoodPage = async (event) => {
        event.preventDefault()

        const foodItemQuantity = event.target.customQuantity.value
        const newFoodItemObj = CalculateFoodItemUsingCustomQuantity(item, foodItemQuantity)

        const foodDataRef = doc(db, `users/${currentUser.uid}/foodData`, date)
        const foodDataSnapshot = await getDoc(foodDataRef)

        if (foodDataSnapshot.exists()) {
            switch (meal) {
                case 'breakfast':
                    await updateDoc(foodDataRef, {
                        breakfast: arrayUnion(newFoodItemObj),
                        totalCalories: increment(Number(newFoodItemObj.calories)),
                        totalCarb: increment(Number(newFoodItemObj.carbs)),
                        totalProtein: increment(Number(newFoodItemObj.protein)),
                        totalFat: increment(Number(newFoodItemObj.fat)),
                    });
                    break;
                case 'lunch':
                    await updateDoc(foodDataRef, {
                        lunch: arrayUnion(newFoodItemObj),
                        totalCalories: increment(Number(newFoodItemObj.calories)),
                        totalCarb: increment(Number(newFoodItemObj.carbs)),
                        totalProtein: increment(Number(newFoodItemObj.protein)),
                        totalFat: increment(Number(newFoodItemObj.fat)),
                    });
                    break;
                case 'dinner':
                    await updateDoc(foodDataRef, {
                        dinner: arrayUnion(newFoodItemObj),
                        totalCalories: increment(Number(newFoodItemObj.calories)),
                        totalCarb: increment(Number(newFoodItemObj.carbs)),
                        totalProtein: increment(Number(newFoodItemObj.protein)),
                        totalFat: increment(Number(newFoodItemObj.fat)),
                    });
                    break;
                case 'snacks':
                    await updateDoc(foodDataRef, {
                        snacks: arrayUnion(newFoodItemObj),
                        totalCalories: increment(Number(newFoodItemObj.calories)),
                        totalCarb: increment(Number(newFoodItemObj.carbs)),
                        totalProtein: increment(Number(newFoodItemObj.protein)),
                        totalFat: increment(Number(newFoodItemObj.fat)),
                    });
                    break;
                default:
                    alert('something went wrong')
                    break;
            }

            alert(`Food added to your ${meal}`)
            router.push('/myFood')
        }
    }


    const CalculateFoodItemUsingCustomQuantity = (foodItem, quantity) => {

        const newFoodItemObj = {}

        const customQuantityGramsOfCarbs = (foodItem.fields.nf_total_carbohydrate / item.fields.nf_serving_weight_grams) * quantity
        const customQuantityGramsOfProtein = (foodItem.fields.nf_protein / item.fields.nf_serving_weight_grams) * quantity
        const customQuantityGramsOfFat = (foodItem.fields.nf_total_fat / item.fields.nf_serving_weight_grams) * quantity
        const customQuantityGramsOfCalories = (foodItem.fields.nf_calories / item.fields.nf_serving_weight_grams) * quantity

        newFoodItemObj.name = foodItem.fields.item_name
        newFoodItemObj.servingSize = quantity
        newFoodItemObj.carbs = Number(customQuantityGramsOfCarbs.toFixed(2))
        newFoodItemObj.protein = Number(customQuantityGramsOfProtein.toFixed(2))
        newFoodItemObj.fat = Number(customQuantityGramsOfFat.toFixed(2))
        newFoodItemObj.calories = Number(customQuantityGramsOfCalories.toFixed(2))

        return newFoodItemObj
    }

    return (
        <div className={classes.addFoodCardContainer}>
            <div className={classes.addFoodCardInnerContainer}>
                <div className={classes.addFoodCardTitle_BrandAndMacros}>
                    <div className={classes.addFoodCardTitleAndBrand}>
                        <p className={classes.addFoodCardTitle}>{item.fields.item_name}</p>
                        <p className={classes.addFoodCardBrand}>{item.fields.brand_name}, <span className={classes.addFoodCardQuantity}>({item.fields.nf_serving_weight_grams} gms)</span></p>
                    </div>
                    <div className={classes.addFoodCardMacros}>
                        <div className={classes.addFoodCardSingleMacro}>
                            <p>Carbs :</p>
                            <p>{item.fields.nf_total_carbohydrate} gms</p>
                        </div>
                        <div className={classes.addFoodCardSingleMacro}>
                            <p>Protein :</p>
                            <p>{item.fields.nf_protein} gms</p>
                        </div>
                        <div className={classes.addFoodCardSingleMacro}>
                            <p>Fats :</p>
                            <p>{item.fields.nf_total_fat} gms</p>
                        </div>
                        <div className={classes.addFoodCardSingleMacroLast}>
                            <p>Calories :</p>
                            <p>{Math.round(item.fields.nf_calories)} Kcal</p>
                        </div>
                    </div>
                </div>
                <div className={classes.addFoodCardCustomServingAndButton}>
                    <form className={classes.addItemForm} onSubmit={addFoodItemToFoodPage}>
                        <input type='number' name='customQuantity' placeholder='serving size' min={1} required oninvalid="this.setCustomValidity('Enter the serving as per your requirement')"/>
                        <button type='submit'>Add Item</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFoodCard;

{/* <p style={{marginBottom: '20px'}}>{item.fields.item_name}, {item.fields.nf_calories} kcal, {item.fields.nf_total_fat}gms, {item.fields.nf_total_carbohydrate}gms, {item.fields.nf_protein} gms, {item.fields.nf_serving_weight_grams} gms</p> */}
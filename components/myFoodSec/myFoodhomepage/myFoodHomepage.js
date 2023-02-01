import { useEffect, useContext, useState } from 'react';
import Link from 'next/link';

import { doc, setDoc, getDoc } from 'firebase/firestore'
import { UserContext } from '../../../context/userContext'

import db from '../../../lib/firebase'

import classes from './myFoodHomepage.module.css'
import FoodItemCard from './foodItemCard/foodItemCard';

const MyFoodHomepage = () => {

    const { currentUser } = useContext(UserContext)

    const [foodData, setFoodData] = useState([])

    const currentDate = new Date() 
    const day = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`

    useEffect(() => {

        const foodDataTemplateObj = {
            breakfast: [],
            lunch: [],
            dinner: [],
            snacks: [],
            totalCalories: 0,
            totalCarb: 0,
            totalProtein: 0,
            totalfat: 0
        }

        const createFoodDataForGivenDay = async () => {

            if (!currentUser) {
                return;
            }
            const foodDataRef = doc(db, `users/${currentUser.uid}/foodData`, day)
            const foodDataSnapshot = await getDoc(foodDataRef)

            if (!foodDataSnapshot.exists()) {
                try {
                    await setDoc(foodDataRef, foodDataTemplateObj);
                } catch (error) {
                    console.log(error);
                    
                }
            } else {
                try {
                    const foodDataFromDatabase = foodDataSnapshot.data()
                    setFoodData(foodDataFromDatabase)
                } catch (error) {
                    console.log(error);
                }
            }
        }

        createFoodDataForGivenDay()

    }, [currentUser, day])

    return (
        <>
            <div className={classes.foodHomepageContainer}>
                <div className={classes.foodHomepageInnerContainer}>
                    <div className={classes.TotalTab}>
                        <p><span className={classes.TotalTabTitle}>Total Calories:--</span> {foodData.totalCalories.toFixed(2)}</p>
                        <p><span className={classes.TotalTabTitle}>Total Carbs:--</span> {foodData.totalCarb.toFixed(2)}</p>
                        <p><span className={classes.TotalTabTitle}>Total Protein:--</span> {foodData.totalProtein.toFixed(2)}</p>
                        <p><span className={classes.TotalTabTitle}>Total Fat:--</span> {foodData.totalFat.toFixed(2)}</p>
                    </div>
                    <div className={classes.meals}>
                        <p className={classes.mealTitle}>Breakfast</p>
                        <div className={classes.mealData}>
                            <div className={classes.singleFoodData}>
                                {foodData.breakfast && foodData.breakfast.length !== 0 ? 
                                (foodData.breakfast.map((foodItem, index) => 
                                    <FoodItemCard key={index} foodItem={foodItem} />
                                )) 
                                : 
                                (<p>add food items for breakfast</p>)}
                            </div>
                            <Link href={`/myFood/addFood/breakfast/${day}`}><button className={classes.addFoodButton}>add food</button></Link>
                        </div>
                    </div>
                    <div className={classes.meals}>
                        <p className={classes.mealTitle}>Lunch</p>
                        <div className={classes.mealData}>
                            <div className={classes.singleFoodData}>
                                {foodData.lunch && foodData.lunch.length !== 0 ? 
                                (foodData.lunch.map((foodItem, index) => 
                                    <FoodItemCard key={index} foodItem={foodItem} />
                                )) 
                                : 
                                (<p>add food items for lunch</p>)}
                            </div>
                            <Link href={`/myFood/addFood/lunch/${day}`}><button className={classes.addFoodButton}>add food</button></Link>
                        </div>
                    </div>
                    <div className={classes.meals}>
                        <p className={classes.mealTitle}>Dinner</p>
                        <div className={classes.mealData}>
                            <div className={classes.singleFoodData}>
                                {foodData.dinner && foodData.dinner.length !== 0 ? 
                                (foodData.dinner.map((foodItem, index) => 
                                    <FoodItemCard key={index} foodItem={foodItem} />
                                )) 
                                : 
                                (<p>add food items for dinner</p>)}
                            </div>
                            <Link href={`/myFood/addFood/dinner/${day}`}><button className={classes.addFoodButton}>add food</button></Link>
                        </div>
                    </div>
                    <div className={classes.meals}>
                        <p className={classes.mealTitle}>Snacks</p>
                        <div className={classes.mealData}>
                            <div className={classes.singleFoodData}>
                                {foodData.snacks && foodData.snacks.length !== 0 ? 
                                (foodData.snacks.map((foodItem, index) => 
                                    <FoodItemCard key={index} foodItem={foodItem} />
                                )) 
                                : 
                                (<p>add food items for snacks</p>)}
                            </div>
                            <Link href={`/myFood/addFood/snacks/${day}`}><button className={classes.addFoodButton}>add food</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyFoodHomepage;


{/* <div>
                <h3>lunch</h3>
                <div className={classes.breakfast}>
                    {foodData.lunch && foodData.lunch.length !== 0 ? 
                    (foodData.lunch.map((foodItem, index) => 
                        <p key={index}>{foodItem.name}, {foodItem.servingSize}, {foodItem.carbs}</p>
                    )) 
                    : 
                    (<p>add food items for lunch</p>)}
                    <Link href={`/myFood/addFood/lunch/${day}`}><button>add food</button></Link>
                </div>
            </div>
            <div>
                <h3>dinner</h3>
                <div className={classes.breakfast}>
                    {foodData.dinner && foodData.dinner.length !== 0 ?
                    (foodData.dinner.map((foodItem, index) => 
                        <p key={index}>{foodItem.name}, {foodItem.servingSize}, {foodItem.carbs}</p>
                    )) 
                    : 
                    (<p>add food items for dinner</p>)}
                    <Link href={`/myFood/addFood/dinner/${day}`}><button>add food</button></Link>
                </div>
            </div>
            <div>
                <h3>snacks</h3>
                <div className={classes.breakfast}>
                    {foodData.snacks && foodData.snacks.length !== 0 ?
                    (foodData.snacks.map((foodItem, index) => 
                        <p key={index}>{foodItem.name}, {foodItem.servingSize}, {foodItem.carbs}</p>
                    )) 
                    : 
                    (<p>add food items for snacks</p>)}
                    <Link href={`/myFood/addFood/snacks/${day}`}><button>add food</button></Link>
                </div>
            </div> */}
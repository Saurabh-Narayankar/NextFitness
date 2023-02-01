import classes from './foodItemCard.module.css'

const FoodItemCard = ({ foodItem }) => {

    return (
        <div className={classes.foodItemCardContainer}>
            <div className={classes.foodItemCardInnerContainer}>
                <div className={classes.foodItemCardTitle_BrandAndMacros}>
                    <div className={classes.foodItemCardTitleAndBrand}>
                        <p className={classes.foodItemCardTitle}>{foodItem.name}</p>
                        <span className={classes.foodItemCardQuantity}>({foodItem.servingSize} gms)</span>
                    </div>
                    <div className={classes.foodItemCardMacros}>
                        <div className={classes.foodItemCardSingleMacro}>
                            <p>Carbs :</p>
                            <p>{foodItem.carbs} gms</p>
                        </div>
                        <div className={classes.foodItemCardSingleMacro}>
                            <p>Protein :</p>
                            <p>{foodItem.protein} gms</p>
                        </div>
                        <div className={classes.foodItemCardSingleMacro}>
                            <p>Fats :</p>
                            <p>{foodItem.fat} gms</p>
                        </div>
                        <div className={classes.foodItemCardSingleMacroLast}>
                            <p>Calories :</p>
                            <p>{Math.round(foodItem.calories)} Kcal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default FoodItemCard
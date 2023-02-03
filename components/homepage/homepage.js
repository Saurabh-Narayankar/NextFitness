import classes from './homepage.module.css'
import Fitness from '../../assets/fitnessHomepage.svg'
import HomepageFaturesCard from './homepageFeaturesCard/homepageFeaturesCard'


const HomePage = () => {

    const features = [
        {
            title: 'Calculators',
            description: ['Calculate your BMI, Body-Fat, Macros, BMR, Daily calorie intake by simply filling some required weight and height data', 'For Body-Fat calculation you need addition measurements of your belly circumference and neck circumference']
        },
        {
            title: 'Exercises',
            description: ['Filter from over 600 exercises to target the specific muscle group', 'Animated exercise models provoded for properly execution of the exercise ']
        },
        {
            title: 'Recipes',
            description: ['Filter from all the 1000 recipes available from diffrent States of India', 'Get a complete time details required for a recipe to be prepared' ,'If you have some wonderful recipes feel free to share the recipe by adding to our database']
        },
        {
            title: 'My Food Section',
            description: ['Add your daily intake food items to get the exact amount of Calories, Carbohydrates, Protein and fats in your diet for your journey towards weight loss or weight gain --> {NOTE: SignIn or SignUp required} ', 'Simply search the food item then enter the amount of serving in (gms) and add the food item to your My Food Section']
        }
    ]

    return (
        <>
            <div className={classes.homepageContainer}>
                <div className={classes.homepageInnerContainer}>
                    <div className={classes.homepageHeroSec}>
                        <div className={classes.homepageHeroSecHeading}>
                            <div className={classes.homepageHeroSecInnerHeading}>
                                <p>THE JOURNEY TO A HEALTHIER YOU BEGINS NOW</p>
                            </div>
                        </div>
                        <div className={classes.homepageHeroSecImage}>
                            <Fitness className={classes.fitnessImage} />
                        </div>
                    </div>
                    <div className={classes.homepageFeatureSec}>
                        <h1>Features</h1>
                        <div className={classes.homepageFeatureSecInner}>
                            {features.map((feature, index) => 
                                    <HomepageFaturesCard key={index} feature={feature} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;
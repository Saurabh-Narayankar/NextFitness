import ItemCard from '../../ItemCard/Itemcard';
import classes from './calculatorHomepage.module.css'

const CalculatorHomepage = () => {
    return (
        <div className={classes.CalculatorHomepageContainer}>
            <div className={classes.CalculatorHomepageInnerContainer}>
                <ItemCard title={'B.M.I'} subTitle={'Body Mass Index'} description={["BMI is widely used as a general indicator of whether a person has a healthy body weight for their height.", "It is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass." ]} gotoLink={'./calculator/bmi'} />
                <ItemCard title={'B.M.R'} subTitle={'Basal Metabolic Rate'} description={["Basal Metabolic Rate, known as BMR, is the rate at which the body expends energy to maintain essential life functions while at complete rest.", "A BMR calculator measures the sum of kilocalories required to maintain these essential body functions." ]} gotoLink={'./calculator/bmr'} />
                <ItemCard title={'Calories Intake'} subTitle={''} description={["Calorie Intake calculator is a way to know how many calories you may eat in order to maintain or lose weight. ", " This calculator generlly needs an activity factor, dependent on a person's typical levels of exercise." ]} gotoLink={'./calculator/calorieIntake'} />
                <ItemCard title={'Body Fat'} subTitle={''} description={["The Body Fat Calculator can be used to estimate your total body fat based on specific measurements.", "This calculation is based on the U.S. Navy method.", "NOTE: you also need some measurement to take so keep your measuring tape with you." ]} gotoLink={'./calculator/bodyFat'} />
                <ItemCard title={'Macros'} subTitle={'Macro Nutrients'} description={["This calculator can provide a range of suggested values for a person's macronutrient and Calorie needs under normal conditions.", "In the context of fitness, macronutrients are most often defined to be the chemical compounds that humans consume in large quantities that provide bulk energy. Specifically carbohydrates, proteins, and fats." ]} gotoLink={'./calculator/macros'} />
            </div>
        </div>
    )
}

export default CalculatorHomepage;
import { useState } from 'react';
import classes from './macrosCalculatorPage.module.css'


const MacrosCalculatorPage = () => {

    const [calorieIntakeData, setCalorieIntakeData] = useState({isUSUnit: true, isSubmitted: false})
    const [calculatedCalorieIntake, setCalculatedCalorieIntake] = useState(0)


    const changeToUSUnit = () => {
        setCalorieIntakeData({...calorieIntakeData, isUSUnit: true})
    }


    const changeToMetricUnit = () => {
        setCalorieIntakeData({...calorieIntakeData, isUSUnit: false})
    }


    const findCalorieIntake = (event) => {
        event.preventDefault()
        let calorieIntake = 0
        let age = Number(event.target.age.value)
        let gender = event.target.gender.value
        let weight = 0
        let height = 0
        let activityLevel = Number(event.target.activity.value)

        if (calorieIntakeData.isUSUnit) {
            const inches = Number(event.target.inches.value)
            weight = Number(event.target.weight.value) * 0.45359237
            height = ((Number(event.target.feet.value) * 12) + inches) * 2.54
            if (gender === 'male') {
                calorieIntake = ((10 * weight) + (6.25 * height) - (5 * age) + 5 )* activityLevel
                setCalculatedCalorieIntake(calorieIntake)
            } else if (gender === 'female') {
                calorieIntake = ((10 * weight) + (6.25 * height) - (5 * age) - 161) * activityLevel
                setCalculatedCalorieIntake(calorieIntake)
            }
    
        } else {
            age = Number(event.target.age.value)
            weight = Number(event.target.weight.value)
            height = Number(event.target.height.value)
            if (gender === 'male') {
                calorieIntake = ((10 * weight) + (6.25 * height) - (5 * age) + 5) * activityLevel
                setCalculatedCalorieIntake(calorieIntake)
            } else if (gender === 'female') {
                calorieIntake = ((10 * weight) + (6.25 * height) - (5 * age) - 161) * activityLevel
                setCalculatedCalorieIntake(calorieIntake)
            }
        }
        setCalorieIntakeData({...calorieIntakeData, isSubmitted: true})
    }


    const resetCalorieIntake = () => {
        setCalorieIntakeData({...calorieIntakeData, isSubmitted: false})
    }

    const calculateOnePercent = (to) => {
        if (to === 'gain') {
            let toGain = calculatedCalorieIntake + 500
            return toGain / 100
        } else if (to === 'loss') {
            let toGain = calculatedCalorieIntake - 500
            return toGain / 100
        } else {
            return calculatedCalorieIntake / 100
        }
    }

    return (
        <div className={classes.calorieIntakeCalculatorPageContainer}>
            <h1>Macros Calculator</h1>
            <div className={classes.calorieIntakeCalculatorPageInnerContainer}>
                <div className={classes.calorieIntakeDescription}>
                    <p>In the context of health and fitness, macronutrients are most often defined to be the chemical compounds that humans consume in large quantities that provide bulk energy. Specifically, they refer to carbohydrates, proteins, and fats. Some definitions also include water, air, calcium, sodium, chloride ions, and some other substances, along with more typical macronutrients, since they are needed in large quantities by the human body. In this calculator, we only calculate daily carbohydrate, protein, and fat needs.</p>
                    <br></br>
                    <p>Micronutrients are another essential part of human nutrition and consist of vitamins and dietary minerals such as Vitamin A, copper, iron, and iodine. While macronutrients are necessary daily in amounts on the order of grams, humans typically only need fewer than 100 milligrams of micronutrients each day.</p>
                </div>
                <div className={classes.calorieIntakeTableAndAverageValues}>
                    {calorieIntakeData.isSubmitted ? (
                        <div className={classes.outputOfCalorieIntake}>
                            <div className={classes.outputOfCalorieIntakeTop}>
                                <div className={classes.calorieIntakeRange}>
                                    <p>Maintain weight</p>
                                    <table>
                                    <thead>
                                        <tr>
                                            <th>macros</th>
                                            <th>quantity (in gms)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Carbohydrates</td>
                                            <td>{Math.round((calculateOnePercent('') * 50) / 4)}</td>
                                        </tr>
                                        <tr>
                                            <td>Proteins</td>
                                            <td>{Math.round((calculateOnePercent('') * 20) / 4)}</td>
                                        </tr>
                                        <tr>
                                            <td>Fats</td>
                                            <td>{Math.round((calculateOnePercent('') * 30) / 9)}</td>
                                        </tr>
                                        
                                    </tbody>
                                    </table>
                                </div>
                                <div className={classes.calorieIntakeRange}>
                                    <p>Weight loss (0.5kg/week)</p>
                                    <table>
                                    <thead>
                                        <tr>
                                            <th>macros</th>
                                            <th>quantity (in gms)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Carbohydrates</td>
                                            <td>{Math.round((calculateOnePercent('loss') * 45) / 4)}</td>
                                        </tr>
                                        <tr>
                                            <td>Proteins</td>
                                            <td>{Math.round((calculateOnePercent('loss') * 25) / 4)}</td>
                                        </tr>
                                        <tr>
                                            <td>Fats</td>
                                            <td>{Math.round((calculateOnePercent('loss') * 20) / 9)}</td>
                                        </tr>    
                                    </tbody>
                                    </table>
                                    <p>While undergoing through a weight loss plan make sure you drink a lot of water to avoid any kidney problems</p>
                                </div>
                                <div className={classes.calorieIntakeRange}>
                                    <p>Weight gain (0.5kg/week)</p>
                                    <table>
                                    <thead>
                                        <tr>
                                            <th>macros</th>
                                            <th>quantity (in gms)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Carbohydrates</td>
                                            <td>{Math.round((calculateOnePercent('gain') * 60) / 4)}</td>
                                        </tr>
                                        <tr>
                                            <td>Proteins</td>
                                            <td>{Math.round((calculateOnePercent('gain') * 18) / 4)}</td>
                                        </tr>
                                        <tr>
                                            <td>Fats</td>
                                            <td>{Math.round((calculateOnePercent('gain') * 32) / 9)}</td>
                                        </tr>
                                        
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={classes.outputOfCalorieIntakeBottom}>
                                <button onClick={resetCalorieIntake}>Goto BMI Calculator</button>
                            </div>
                        </div>
                        ) : (
                        <div className={classes.calorieIntakeTableOuter}>
                        <div className={classes.calorieIntakeTableToggle}>
                            <button onClick={() => changeToUSUnit()}>US Units</button>
                            <button onClick={() => changeToMetricUnit()}>Metric units</button>
                        </div>
                        <div className={classes.calorieIntakeTableQuantities}>
                        {calorieIntakeData.isUSUnit ? (
                            <form onSubmit={findCalorieIntake}>
                                <div>
                                    <label id='age'>Age: (15-years and above )</label>
                                    <input type='number' id='age' name='age' min='15' max='125' placeholder='Enter age' required />
                                </div>
                                <div>
                                    <label id="gender">Gender: </label>
                                    <div>
                                    <select name="gender" id="gender">
                                        <option id='gender' value="male">Male</option>
                                        <option id='gender' value="female">Female</option>
                                    </select>
                                    </div>
                                </div>
                                <div>
                                    <label id='weight'>Weight: (in pounds)</label>
                                    <input type='number' id='weight' name='weight' min='1' max='1400' step=".01" placeholder='Enter weight' required />
                                </div>
                                <div>
                                    <label id="activity">Activity: </label>
                                    <div>
                                    <select name="activity" id="activity">
                                        <option id='activity' value="1.2">Sedentary (little or no exercise)</option>
                                        <option id='activity' value="1.375">Lightly active (light exercise/work 1-3 days per week)</option>
                                        <option id='activity' value="1.55">Moderately active (moderate exercise/work 3-5 days per week)</option>
                                        <option id='activity' value="1.725">Very active (hard exercise/work 6-7 days a week)</option>
                                        <option id='activity' value="1.9">Extra active (very hard exercise/work 6-7 days a week)</option>
                                    </select>
                                    </div>
                                </div>
                                <fieldset>
                                    <legend>Height: (in ft and inches)</legend>
                                    <div className={classes.innerHeight}>
                                    <label id="feet">Feet</label>
                                    <input type='number' id="feet" name="feet" min='1' max='10' placeholder='feet' required />
                                    </div>
                                    <div className={classes.innerHeight}>
                                    <label id="inches">Inches</label>
                                    <input type='number' id="inches" name="inches" min='1' max='12' step=".01" placeholder='inches' required />
                                    </div>
                                </fieldset>
                                <button type='submit'>Submit</button>
                            </form>
                        ) : (
                            <form onSubmit={findCalorieIntake}>
                                <label id='age'>Age: (15-years and above )</label>
                                <input type='number' id='age' min='15' max='125' placeholder='Enter age' required />
                                <label id="gender">Gender: </label>
                                <select name="gender" id="gender">
                                    <option id='gender' value="male">Male</option>
                                    <option id='gender' value="female">Female</option>
                                </select>
                                <label id='weight'>Weight: (in kgs)</label>
                                <input type='number' id='weight' min='1' max='650' name='weight' step=".01" placeholder='Enter weight' required />
                                <label id="activity">Activity: </label>
                                <select name="activity" id="activity">
                                    <option id='activity' value="1.2">Sedentary (little or no exercise)</option>
                                    <option id='activity' value="1.375">Lightly active (light exercise/work 1-3 days per week)</option>
                                    <option id='activity' value="1.55">Moderately active (moderate exercise/work 3-5 days per week)</option>
                                    <option id='activity' value="1.725">Very active (hard exercise/work 6-7 days a week)</option>
                                    <option id='activity' value="1.9">Extra active (very hard exercise/work 6-7 days a week)</option>
                                </select>
                                <label id='height'>Height: (in cms)</label>
                                <input type='number' id='height' min='1' max='300' name='height' placeholder='Enter height' required />
                                <button type='submit'>Submit</button>
                            </form>
                        )}
                        </div>
                    </div>
                    )}
                    <div className={classes.calorieIntakeEquations}>
                        <p>{/* Different formulas for BMR Calculation : [Out of which Miffin-St jeor equation is most accurate] */}To calculate macros, calculating AMR (Actual Metabolic Rate) is neccessary and it is calculated by following equations</p>
                        <div className={classes.calorieIntakeCalFormula}>
                            <p className={classes.calorieIntakeCalFormulaTitle}>Mifflin-St Jeor Equation: [USING THIS FOR OUR CALCULATION]</p>
                            <p>For men: BMR = 10W + 6.25H - 5A + 5</p>
                            <p>For women: BMR = 10W + 6.25H - 5A - 161</p>
                            <p>AMR = BMR * activity</p>
                        </div>
                        <div className={classes.calorieIntakeCalFormula}>
                            <p className={classes.calorieIntakeCalFormulaTitle}>Revised Harris-Benedict Equation:</p>
                            <p>For men: BMR = 13.397W + 4.799H - 5.677A + 88.362</p>
                            <p>For women: BMR = 9.247W + 3.098H - 4.330A + 447.593</p>
                            <p>AMR = BMR * activity</p>
                        </div>
                        <div className={classes.calorieIntakeCalFormula}>
                            <p className={classes.calorieIntakeCalFormulaTitle}>Katch-McArdle Formula:</p>
                            <p>BMR = 370 + 21.6(1 - F)W</p>
                            <p>AMR = BMR * activity</p>
                            
                        </div>
                        <div className={classes.calorieIntakeCalFormula}>
                            <p className={classes.calorieIntakeCalFormulaTitle}>In above equations:- </p>
                            <p>W = Weight in kgs</p>
                            <p>H = Height in cms</p>
                            <p>A = Age</p>
                            <p>F = Body fat in percentage</p>
                            <p>activity = sedentary(1.2), light active(1.375), moderately active(1.55) very active(1.725)</p>
                        </div>
                    </div>
                </div>
                <div className={classes.risks}>
                    <div className={classes.calorie}>
                        <div className={classes.calorieTitle}>
                            <p>MacroNutrients</p> 
                        </div>
                        <div className={classes.calorieDescription}>
                            <ul>
                                <li><b>Carbohydrates</b>: Carbohydrates, often referred to as simply "carbs," are compounds that are typically classified as sugar, starch, or fiber. Sugar is the simplest form of carbohydrate, while starch and fiber are complex carbohydrates. Carbohydrates are often also classified based on the number of saccharides that comprise them: monosaccharides, disaccharides, oligosaccharides, and polysaccharides. Monosaccharides and disaccharides are often referred to as "simple carbohydrates," while oligosaccharides and polysaccharides are referred to as "complex carbohydrates".Too many carbohydrates in the form of sugar (common in processed foods) can have negative health effects, but more complex carbohydrates (from vegetables, fruits, whole grains, legumes, etc.), particularly those that provide dietary fibers, are beneficial, and necessary for the human body.</li>
                                <li><b>Proteins</b>: They are organic compounds comprised of amino acids, and are one of the types of macronutrients. Amino acids are essential to a person's well-being, and there are certain amino acids that can only be obtained through diet. These amino acids are typically referred to as "essential amino acids," and are obtained by humans and other animals through the consumption of protein.There are numerous sources of protein, both animal (meat, dairy, etc.) and plant-based (beans, legumes, nuts, seeds, etc.). There also exist protein supplements that are sometimes used by people who are trying to build muscle. Although protein is a necessary part of the human diet, as with most things, moderation is important.</li>
                                <li><b>Fats</b>: Fats are molecules that are comprised primarily of carbon and hydrogen atoms. Common examples include cholesterol, phospholipids, and triglycerides. Although fats, in the context of nutrition, are typically viewed as unhealthy, they have both structural as well as metabolic functions, and are a necessary part of the human diet. They are also highly energy dense and are the most efficient form of energy storage.Fats are typically classified based on the bonding of carbon atoms. In terms of dietary fats, the most commonly referenced fats include saturated fats, unsaturated fats, trans fats, monounsaturated fats, polyunsaturated fats, and omega-3 fatty acids. Generally, saturated and trans fats are considered unhealthy fats, while monounsaturated, polyunsaturated, and omega-3 fatty acids are considered to be healthier, better sources of fat for the body.</li>
                            </ul>
                        </div>
                    </div>
                    <div className={classes.calorie}>
                        <div className={classes.calorieTitle}>
                            <p>Daily Calorie Needs</p> 
                        </div>
                        <div className={classes.calorieDescription}>
                            <p>The number of calories a person needs to consume on a daily basis is mainly based on a number of factors including height, weight, age, and activity level, along with whether the person wants to maintain, lose, or gain weight. The values returned by the calculator are based on two equations for estimating the basal metabolic rate (BMR) or resting daily energy expenditure (RDEE) of a person. Once the BMR or RDEE is calculated, they are then multiplied by an activity factor to estimate daily caloric needs. The Mifflin-St Jeor Equation is a widely adopted equation that calculates BMR mainly based on physical characteristics such as body weight and height. The Katch-McArdle Formula calculates RDEE, which takes lean body mass into account. The Katch-McArdle Formula can be more accurate for people who are leaner and know their body fat percentage.</p>
                            <p>Based on the above factors, an average person may need to consume anywhere from 1600-3000 calories a day. The recommendations are generally higher for men (2000-3000) than women (1600-2400), and an increased activity level requires more calories, while a sedentary person would require less.</p>
                            <p>As carbohydrates, proteins, and fats provide nearly the entire energy needs of the human body, their daily needs can be calculated based on the daily caloric need. The values returned by the calculator are an estimate based on standards and guidelines provided by a number of institutions, such as the American Dietetic Association, Centers for Disease Control and Prevention, World Health Organization, and more.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MacrosCalculatorPage;
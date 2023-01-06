import { useState } from 'react';
import classes from './calorieIntakeCalculatorPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const CalorieIntakeCalculatorPage = () => {

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
        }
    }


    return (
        <div className={classes.calorieIntakeCalculatorPageContainer}>
            <h1>calorie Intake Calculator</h1>
            <div className={classes.calorieIntakeCalculatorPageInnerContainer}>
                <div className={classes.calorieIntakeDescription}>
                    <p>The main sources of calories in a typical person's diet are carbohydrates, proteins, and fat, with alcohol also being a significant portion of calorie intake for many people (though ideally this should be limited since alcohol contains many empty calories).Generally, foods that take more effort to chew – fruit, vegetables, lean meats, whole grains, etc. – require the body to burn more calories since more calories are required to digest them. It also results in the feeling of satiety for longer periods of time. Furthermore, certain foods like coffee, tea, chilies, cinnamon, and ginger have been found to increase the rate of calories burned, due to the ingredients they contain.</p>
                    <br></br>
                    <p>The "quality" of calories consumed is also important. There are different classifications of foods in terms of calories. This includes high-calorie foods, low-calorie foods, and empty calories. Consistent with their naming, high-calorie foods are foods that are calorically dense, meaning that there are a high number of calories relative to serving size, while low-calorie foods have fewer calories relative to serving size.</p>
                </div>
                <div className={classes.calorieIntakeTableAndAverageValues}>
                    {calorieIntakeData.isSubmitted ? (
                        <div className={classes.outputOfCalorieIntake}>
                            <div className={classes.outputOfCalorieIntakeTop}>
                                <h3>Your Calorie Intake is = {Math.round(calculatedCalorieIntake)} calories</h3>
                                <div className={classes.calorieIntakeRange}>
                                    <table>
                                    <thead>
                                        <tr>
                                            <th>Calorie Estimates</th>
                                            <th>Calorie/Day</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>mild weight loss (0.25kg/week)</td>
                                            <td>{Math.round(calculatedCalorieIntake) - 250}</td>
                                        </tr>
                                        <tr>
                                            <td>weight loss (0.5kg/week)</td>
                                            <td>{Math.round(calculatedCalorieIntake) - 500}</td>
                                        </tr>
                                        <tr>
                                            <td>maintain weight</td>
                                            <td>{Math.round(calculatedCalorieIntake)}</td>
                                        </tr>
                                        <tr>
                                            <td>mild gain weight (0.25kg/week)</td>
                                            <td>{Math.round(calculatedCalorieIntake) + 250}</td>
                                        </tr>
                                        <tr>
                                            <td>gain weight (0.5kg/week)</td>
                                            <td>{Math.round(calculatedCalorieIntake) + 500}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                <div className={classes.calorieIntakeZigZagPattern}>
                                    <p>Zig-Zag pattern</p>
                                    <table>
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>weight loss</th>
                                            <th>gain weight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Sunday</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake - 500) + (calculateOnePercent('loss') * 20)))}</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake + 500) + (calculateOnePercent('gain') * 20)))}</td>
                                        </tr>
                                        <tr>
                                            <td>Monday</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake - 500) - (calculateOnePercent('loss') * 15)))}</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake + 500) - (calculateOnePercent('gain') * 15)))}</td>
                                        </tr>
                                        <tr>
                                            <td>Tuesday</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake - 500) - (calculateOnePercent('loss') * 10)))}</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake + 500) - (calculateOnePercent('gain') * 10)))}</td>
                                        </tr>
                                        <tr>
                                            <td>Wednesday</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake - 500) + (calculateOnePercent('loss') * 18)))}</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake + 500) + (calculateOnePercent('loss') * 18)))}</td>
                                        </tr>
                                        <tr>
                                            <td>Thursday</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake - 500) - (calculateOnePercent('loss') * 17)))}</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake + 500) - (calculateOnePercent('loss') * 17)))}</td>
                                        </tr>
                                        <tr>
                                            <td>Friday</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake - 500) - (calculateOnePercent('loss') * 8)))}</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake + 500) - (calculateOnePercent('loss') * 8)))}</td>
                                        </tr>
                                        <tr>
                                            <td>Saturday</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake - 500) + (calculateOnePercent('loss') * 12)))}</td>
                                            <td>{Math.round((Math.round(calculatedCalorieIntake + 500) + (calculateOnePercent('loss') * 12)))}</td>
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
                        <p>Different formulas for BMR Calculation : [Out of which Miffin-St jeor equation is most accurate]</p>
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
                            <p>ZigZag Calorie Cycling:</p> 
                        </div>
                        <div className={classes.calorieDescription}>
                            <p>Zigzag calorie cycling is a weight loss approach that aims to counteract the human body's natural adaptive tendencies. Counting and restricting calories, is a viable method to lose weight, but over a period of time, it is possible for the body to adapt to the lower number of calories consumed. In cases where this happens, a plateau in weight loss that can be difficult to surmount can result. This is where zigzag calorie cycling can help, by not allowing the body to adapt to the lower calorie environment.</p>
                            <p>Zigzag calorie cycling involves alternating the number of calories consumed on a given day. A person on a zigzag diet should have a combination of high-calorie and low-calorie days to meet the same overall weekly calorie target. For example, if your target calorie intake is 14,000 calories per week, you could consume 2,300 calories three days a week, and 1,775 the other four days of the week, or you could consume 2,000 calories each day. In both cases, 14,000 calories would be consumed over the week, but the body wouldn't adapt and compensate for a 2,000-calorie diet. This also allows a person more flexibility in their diet, allowing them to plan around occasions, such as work or family gatherings, where a person may consume more calories. Consuming a lower number of calories on other days can allow a person to enjoy these gatherings or even have a "cheat day" where they eat whatever they want without feeling guilty, since they can make up for the excess calories on their low-calorie days.</p>
                        </div>
                    </div>
                    <div className={classes.calorieTable}>
                        <div className={classes.calorieTableTitle}>
                            <p>Calories Burned from Common Exercises:</p>
                        </div>
                        <div className={classes.calorieTableDescription}>
                            <table>
                            <thead>
                                <tr>
                                    <th>Activity (1 hour)</th>
                                    <th>125 lb person</th>
                                    <th>155 lb person</th>
                                    <th>185 lb person</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Golf (using cart)</td>
                                    <td>198</td>
                                    <td>246</td>
                                    <td>294</td>
                                </tr>
                                <tr>
                                    <td>Walking (3.5 mph)</td>
                                    <td>215</td>
                                    <td>267</td>
                                    <td>319</td>
                                </tr>
                                <tr>
                                    <td>Kayaking</td>
                                    <td>283</td>
                                    <td>352</td>
                                    <td>420</td>
                                </tr>
                                <tr>
                                    <td>Softball</td>
                                    <td>289</td>
                                    <td>359</td>
                                    <td>428</td>
                                </tr>
                                <tr>
                                    <td>Swimming (free-style, moderate)	</td>
                                    <td>397</td>
                                    <td>492</td>
                                    <td>587</td>
                                </tr>
                                <tr>
                                    <td>Tennis</td>
                                    <td>399</td>
                                    <td>487</td>
                                    <td>612</td>
                                </tr>
                                <tr>
                                    <td>Running (9 minute mile)</td>
                                    <td>624</td>
                                    <td>773</td>
                                    <td>923</td>
                                </tr>
                                <tr>
                                    <td>Bicycling (12-14 mph, moderate)	</td>
                                    <td>454</td>
                                    <td>562</td>
                                    <td>671</td>
                                </tr>
                                <tr>
                                    <td>Football</td>
                                    <td>399</td>
                                    <td>494</td>
                                    <td>588</td>
                                </tr>
                                <tr>
                                    <td>Basketball</td>
                                    <td>340</td>
                                    <td>422</td>
                                    <td>503</td>
                                </tr>
                                <tr>
                                    <td>Soccer</td>
                                    <td>397</td>
                                    <td>493</td>
                                    <td>587</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default CalorieIntakeCalculatorPage;
import { useState } from 'react';
import classes from './bmrCalculatorPage.module.css'

const BmrCalculatorPage = () => {

    const [bmrData, setBmrData] = useState({isUSUnit: true, isSubmitted: false})
    const [calculatedBmr, setCalculatedBmr] = useState(0)


    const changeToUSUnit = () => {
        setBmrData({...bmrData, isUSUnit: true})
    }


    const changeToMetricUnit = () => {
        setBmrData({...bmrData, isUSUnit: false})
    }


    const findBMR = (event) => {
        event.preventDefault()
        let bmr = 0
        let age = Number(event.target.age.value)
        let gender = event.target.gender.value
        let weight = 0
        let height = 0

        if (bmrData.isUSUnit) {
            const inches = Number(event.target.inches.value)
            weight = Number(event.target.weight.value) * 0.45359237
            height = ((Number(event.target.feet.value) * 12) + inches) * 2.54
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
                setCalculatedBmr(bmr)
            } else if (gender === 'female') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
                setCalculatedBmr(bmr)
            }
    
        } else {
            age = Number(event.target.age.value)
            weight = Number(event.target.weight.value)
            height = Number(event.target.height.value)
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
                setCalculatedBmr(bmr)
            } else if (gender === 'female') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
                setCalculatedBmr(bmr)
            }    
        }
        setBmrData({...bmrData, isSubmitted: true})
    }


    const resetBMR = () => {
        setBmrData({...bmrData, isSubmitted: false})
    }


    return (
        <div className={classes.BmrCalculatorPageContainer}>
            <h1>BMR Calculator</h1>
            <div className={classes.BmrCalculatorPageInnerContainer}>
                <div className={classes.BMRDescription}>
                    <p>The basal metabolic rate (BMR) is the amount of energy needed while resting in a temperate environment when the digestive system is inactive. It is the equivalent of figuring out how much gas an idle car consumes while parked. In such a state, energy will be used only to maintain vital organs, which include the heart, lungs, kidneys, nervous system, intestines, liver, lungs, sex organs, muscles, and skin. For most people, upwards of ~70% of total energy (calories) burned each day is due to upkeep. Physical activity makes up ~20% of expenditure and ~10% is used for the digestion of food, also known as thermogenesis.</p>
                    <br></br>
                    <p>The BMR is measured under very restrictive circumstances while awake. An accurate BMR measurement requires that a persons sympathetic nervous system is inactive, which means the person must be completely rested. Basal metabolism is usually the largest component of a persons total caloric needs. The daily caloric need is the BMR value multiplied by a factor with a value between 1.2 and 1.9, depending on activity level.</p>
                </div>
                <div className={classes.bmrTableAndAverageValues}>
                    {bmrData.isSubmitted ? (
                        <div className={classes.outputOfBmr}>
                            <div className={classes.outputOfBmrTop}>
                                <h3>Your bmr = {Math.round(calculatedBmr)}</h3>
                            </div>
                            <div className={classes.outputOfBmrBottom}>
                                <button onClick={resetBMR}>Goto BMI Calculator</button>
                            </div>
                        </div>
                        ) : (
                        <div className={classes.bmrTableOuter}>
                        <div className={classes.bmrTableToggle}>
                            <button onClick={() => changeToUSUnit()}>US Units</button>
                            <button onClick={() => changeToMetricUnit()}>Metric units</button>
                        </div>
                        <div className={classes.bmrTableQuantities}>
                        {bmrData.isUSUnit ? (
                            <form onSubmit={findBMR}>
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
                                <fieldset>
                                    <legend>Height: (in ft and inches)</legend>
                                    <div className={classes.innerHeight}>
                                    <label id="feet">Feet</label>
                                    <input type='number' id="feet" name="feet" min='1' max='10' placeholder='feet' required />
                                    </div>
                                    <div className={classes.innerHeight}>
                                    <label id="inches">Inches</label>
                                    <input type='number' id="inches" name="inches" min='1' max='12' placeholder='inches' step=".01" required />
                                    </div>
                                </fieldset>
                                <button type='submit'>Submit</button>
                            </form>
                        ) : (
                            <form onSubmit={findBMR}>
                                <label id='age'>Age: (15-years and above )</label>
                                <input type='number' id='age' min='15' max='125' placeholder='Enter age' required />
                                <label id="gender">Gender: </label>
                                <select name="gender" id="gender">
                                    <option id='gender' value="male">Male</option>
                                    <option id='gender' value="female">Female</option>
                                </select>
                                <label id='weight'>Weight: (in kgs)</label>
                                <input type='number' id='weight' min='1' max='650' name='weight' step=".01" placeholder='Enter weight' required />
                                <label id='height'>Height: (in cms)</label>
                                <input type='number' id='height' min='1' max='300' name='height' placeholder='Enter height' required />
                                <button type='submit'>Submit</button>
                            </form>
                        )}
                        </div>
                    </div>
                    )}
                    <div className={classes.bmrEquations}>
                        <p><b>Different formulas for BMR Calculation : [Out of which Miffin-St jeor equation is most accurate]</b></p>
                        <div className={classes.bmrCalFormula}>
                            <p className={classes.bmrCalFormulaTitle}>Mifflin-St Jeor Equation: [USING THIS FOR OUR CALCULATION]</p>
                            <p>For men: BMR = 10W + 6.25H - 5A + 5</p>
                            <p>For women: BMR = 10W + 6.25H - 5A - 161</p>
                        </div>
                        <div className={classes.bmrCalFormula}>
                            <p className={classes.bmrCalFormulaTitle}>Revised Harris-Benedict Equation:</p>
                            <p>For men: BMR = 13.397W + 4.799H - 5.677A + 88.362</p>
                            <p>For women: BMR = 9.247W + 3.098H - 4.330A + 447.593</p>
                        </div>
                        <div className={classes.bmrCalFormula}>
                            <p className={classes.bmrCalFormulaTitle}>Katch-McArdle Formula:</p>
                            <p>BMR = 370 + 21.6(1 - F)W</p>
                        </div>
                        <div className={classes.bmrCalFormula}>
                            <p className={classes.bmrCalFormulaTitle}>In above equations:- </p>
                            <p>W = Weight in kgs</p>
                            <p>H = Height in cms</p>
                            <p>A = Age</p>
                            <p>F = Body fat in percentage</p>
                        </div>
                    </div>
                </div>
                <div className={classes.risks}>
                    <div className={classes.overweightRisk}>
                        <div>
                            <p>Variables affecting BMR: </p>
                        </div>
                        <ul>
                            <li><b>Muscle Mass</b> - Aerobic exercises, such as running or cycling, have no effect on BMR. However, anaerobic exercises, such as weight-lifting, indirectly lead to a higher BMR because they build muscle mass, increasing resting energy consumption. The more muscle mass in the physical composition of an individual, the higher the BMR required to sustain their body at a certain level.</li>
                            <li><b>Age</b> - The more elderly and limber an individual, the lower their BMR, or the lower the minimum caloric intake required to sustain the functioning of their organs at a certain level.</li>
                            <li><b>Genetics</b> - Hereditary traits passed down from ancestors influence BMR.</li>
                            <li><b>Weather</b> - Cold environments raise BMR because of the energy required to create a homeostatic body temperature. Likewise, too much external heat can raise BMR as the body expends energy to cool off internal organs. BMR increases approximately 7% for every increase of 1.36 degrees Fahrenheit in the bodys internal temperature.</li>
                            <li><b>Diet</b> - Small, routinely dispersed meals increase BMR. On the other hand, starvation can reduce BMR by as much as 30%. Similar to a phone that goes into power-saving mode during the last 5% of its battery, a human body will make sacrifices such as energy levels, moods, upkeep of bodily physique, and brain functions in order to more efficiently utilize what little caloric energy is being used to sustain it.</li>
                            <li><b>Pregnancy</b> - Ensuring the livelihood of a separate fetus internally increases BMR. This is why pregnant women tend to eat more than usual. Also, menopause can increase or decrease BMR depending on hormonal changes.</li>
                            <li><b>Supplements</b> - Certain supplements or drugs raise BMR, mostly to fuel weight loss. Caffeine is a common one.</li> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BmrCalculatorPage;
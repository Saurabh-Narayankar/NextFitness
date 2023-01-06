import { useState } from 'react';
import classes from './bmiCalculatorPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons' 

const BmiCalculatorPage = () => {

    const [bmiData, setBmiData] = useState({isUSUnit: true, isSubmitted: false})
    const [calculatedBmi, setCalculatedBmi] = useState(0)
    const [bmiStatus, setBmiStatus] = useState(null)

    const changeToUSUnit = () => {
        setBmiData({...bmiData, isUSUnit: true})
    }

    const changeToMetricUnit = () => {
        setBmiData({...bmiData, isUSUnit: false})
    }

    const findBMI = (event) => {
        event.preventDefault()
        let bmi = 0
        let age = Number(event.target.age.value)
        let weight = 0
        let height = 0

        if (bmiData.isUSUnit) {
            const inches = Number(event.target.inches.value)
            weight = Number(event.target.weight.value)
            height = (Number(event.target.feet.value) * 12) + inches
            bmi = 703 * (weight / Math.pow(height, 2))
            bmi = parseFloat(bmi).toFixed(1)
            if (age <= 20) {
                setCalculatedBmi(bmi)
                setBmiStatus(null)
            } else {
                let bmiStatus = bmiStatusCalForAdult(Number(bmi))
                setCalculatedBmi(bmi)
                setBmiStatus(bmiStatus)
            }
    
        } else {
            age = Number(event.target.age.value)
            weight = Number(event.target.weight.value)
            height = Number(event.target.height.value)
            bmi = (weight / height / height) * 10000
            bmi = parseFloat(bmi).toFixed(1)
            if (age <= 20) {
                setCalculatedBmi(bmi)
                setBmiStatus(null)
            } else {
                let bmiStatus = bmiStatusCalForAdult(Number(bmi))
                setCalculatedBmi(bmi)
                setBmiStatus(bmiStatus)
            }
        }

        setBmiData({...bmiData, isSubmitted: true})
    }

    const bmiStatusCalForAdult = (bmi) => {
        let status = ''
        switch (true) {
            case (0 < bmi && bmi < 16):
                status = 'Severe Thinness'
                break;
            case (16 <= bmi && bmi < 17):
                status = 'Moderate Thinness'
                break;
            case (17 <= bmi && bmi < 18.5):
                status = 'Mild Thinness'
                break;
            case (18.5 <= bmi && bmi < 25):
                status = 'Normal'
                break;
            case (25 <= bmi && bmi < 30):
                status = 'Overweight'
                break;
            case (30 <= bmi && bmi < 35):
                status = 'Obese Class I'
                break;
            case (35 <= bmi && bmi < 40):
                status = 'Obese Class II'
                break;    
            default:
                status = 'Obese Class III'
                break;
        }

        return status

    }

    const resetBMI = () => {
        setBmiData({...bmiData, isSubmitted: false})
    }

    return (
        <div className={classes.BmiCalculatorPageContainer}>
            <h1>BMI Calculator</h1>
            <div className={classes.BmiCalculatorPageInnerContainer}>
                <div className={classes.BMIDescription}>
                    <p>BMI is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height. Specifically, the value obtained from the calculation of BMI is used to categorize whether a person is underweight, normal weight, overweight, or obese depending on what range the value falls between. These ranges of BMI vary based on factors such as region and age, and are sometimes further divided into subcategories such as severely underweight or very severely obese. Being overweight or underweight can have significant health effects, so while BMI is an imperfect measure of healthy body weight, it is a useful indicator of whether any additional testing or action is required. Refer to the table below to see the different categories based on BMI that are used by the calculator.</p>
                    <br></br>
                    <p>The Body Mass Index (BMI) Calculator can be used to calculate BMI value and corresponding weight status while taking age into consideration. Use the "Metric Units" tab for the International System of Units or the "US Units" tab for pound/ft-inches units.</p>
                </div>
                <div className={classes.bmiTableAndAverageValues}>
                    {bmiData.isSubmitted ? (
                        <div className={classes.outputOfBmi}>
                            {bmiStatus === null ? (
                            <>
                                <div className={classes.outputOfBmiTop}>
                                    <h3>Your bmi = {calculatedBmi}</h3>
                                    <p>
                                        NOTE: For Children and Teens having age less than 18 follow the chart given below for exact BMI percentile range
                                    </p>
                                    <div className={classes.chartsForChildrenAndTeens}>
                                        <p>chart for boys : <a href='https://drive.google.com/file/d/1gd377gMsSrIKGag2KeURTBm3E5VS_3Wo/view?usp=share_link' target='_blank'>Click here <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='sm' /></a></p>
                                        <p>chart for girls : <a href='https://drive.google.com/file/d/1_Xr-qi4htH7zEsqE7Q9JyU_-I-EJkYhe/view?usp=share_link' target='_blank'>Click here <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='sm' /></a></p>
                                    </div>
                                </div>
                                <div className={classes.outputOfBmiBottom}>
                                    <button onClick={resetBMI}>Goto BMI Calculator</button>
                                </div>
                            </>
                            ) : (
                            <>
                                <div className={classes.outputOfBmiTop}>
                                    <h3>Your bmi = {calculatedBmi}</h3>
                                    <h3>Your bmi status is {bmiStatus}</h3>
                                </div>
                                <div className={classes.outputOfBmiBottom}>
                                    <button onClick={resetBMI}>Goto BMI Calculator</button>
                                </div>
                            </>
                            )}
                        </div>
                    ) : (
                        <div className={classes.bmiTableOuter}>
                        <div className={classes.bmiTableToggle}>
                            <button onClick={() => changeToUSUnit()}>US Units</button>
                            <button onClick={() => changeToMetricUnit()}>Metric units</button>
                        </div>
                        <div className={classes.bmiTableQuantities}>
                        {bmiData.isUSUnit ? (
                            <form onSubmit={findBMI}>
                                <div>
                                    <label id='age'>Age: (2-years and above )</label>
                                    <input type='number' id='age' name='age' min='2' max='125' placeholder='Enter age' required />
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
                                    <input type='number' id="inches" name="inches" min='1' max='12' step=".01" placeholder='inches' required />
                                    </div>
                                </fieldset>
                                <button type='submit'>Submit</button> 
                            </form>
                        ) : (
                            <form onSubmit={findBMI}>
                                <label id='age'>Age: (2-years and above )</label>
                                <input type='number' id='age' min='2' max='125' placeholder='Enter age' required />
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
                    <div className={classes.bmiAverageValues}>
                        <div className={classes.averageForMen}>
                            <p>For Adults</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>BMI range - kg/m2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Severe Thinness	</td>
                                        <td>less than 16</td>
                                    </tr>
                                    <tr>
                                        <td>Moderate Thinness	</td>
                                        <td>16 - 17</td>
                                    </tr>
                                    <tr>
                                        <td>Mild Thinness</td>
                                        <td>17 - 18.5</td>
                                    </tr>
                                    <tr>
                                        <td>Normal</td>
                                        <td>18.5 - 25</td>
                                    </tr>
                                    <tr>
                                        <td>Overweight</td>
                                        <td>25 - 30</td>
                                    </tr>
                                    <tr>
                                        <td>Obese Class I</td>
                                        <td>30 - 35</td>
                                    </tr>
                                    <tr>
                                        <td>Obese Class II</td>
                                        <td>35 - 40</td>
                                    </tr>
                                    <tr>
                                        <td>Obese Class III</td>
                                        <td>greater than 40</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.averageForChild}>
                            <p>For Children and Teens</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Percentile Range</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Underweight</td>
                                        <td>less than 5%</td>
                                    </tr>
                                    <tr>
                                        <td>Healthy weight	</td>
                                        <td>5% - 85%</td>
                                    </tr>
                                    <tr>
                                        <td>At risk of overweight</td>
                                        <td>85% - 95%</td>
                                    </tr>
                                    <tr>
                                        <td>Overweight</td>
                                        <td> greater than 95%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={classes.risks}>
                    <div className={classes.overweightRisk}>
                        <p>Being overweight has its associated risks listed below according to the Centers for Disease Control and Prevention (CDC):</p>
                        <ul>
                            <li>High blood pressure</li>
                            <li>Higher levels of LDL cholesterol, which is widely considered "bad cholesterol," lower levels of HDL cholesterol, considered to be good cholesterol in moderation, and high levels of triglycerides</li>
                            <li>Type II diabetes</li>
                            <li>Coronary heart disease</li>
                            <li>Stroke</li>
                            <li>Gallbladder disease</li>
                            <li>Osteoarthritis, a type of joint disease caused by breakdown of joint cartilage</li>
                            <li>Sleep apnea and breathing problems</li>
                            <li>Certain cancers (endometrial, breast, colon, kidney, gallbladder, liver)</li>
                            <li>Body pains and difficulty with certain physical functions</li>
                        </ul>
                    </div>
                    <div className={classes.underweightRisk}>
                        <p>Being underweight has its own associated risks listed below according to the Centers for Disease Control and Prevention (CDC):</p>
                        <ul>
                            <li>Malnutrition, vitamin deficiencies, anemia (lowered ability to carry blood vessels)</li>
                            <li>Osteoporosis, a disease that causes bone weakness, increasing the risk of breaking a bone</li>
                            <li>A decrease in immune function</li>
                            <li>Growth and development issues, particularly in children and teenagers</li>
                            <li>Possible reproductive issues for women due to hormonal imbalances that can disrupt the menstrual cycle. Underweight women also have a higher chance of miscarriage in the first trimester</li>
                            <li>Potential complications as a result of surgery</li>
                            <li>Generally, an increased risk of mortality compared to those with a healthy BMI</li>
                            <li>Weakness</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BmiCalculatorPage;
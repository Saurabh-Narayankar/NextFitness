import { useState } from 'react';
import classes from './bodyFatCalculatorPage.module.css'

const BodyFatCalculatorPage = () => {

    const [bodyFatData, setBodyFatData] = useState({isUSUnit: true, isSubmitted: false, isFemale: false})
    const [calculatedBodyFat, setCalculatedBodyFat] = useState(0)
    const [bodyFatStatus, setBodyFatStatus] = useState(null)
    const [fatMass, setFatMass] = useState(0)
    const [leanMass, setLeanMass] = useState(0)
    const [idealBodyFat, setIdealBodyFat] = useState(null)


    const changeToUSUnit = () => {
        setBodyFatData({...bodyFatData, isUSUnit: true})
    }

    const changeToMetricUnit = () => {
        setBodyFatData({...bodyFatData, isUSUnit: false})
    }


    const findBodyFat = (event) => {
        event.preventDefault()
        let bodyFat = 0
        let age = Number(event.target.age.value)
        let gender = event.target.gender.value
        let weight = 0
        let height = 0
        let waist = 0
        let neck = 0
        let hip = 0

        if (bodyFatData.isUSUnit) {
            const inches = Number(event.target.heightinches.value)
            weight = Number(event.target.weight.value)
            height = (Number(event.target.heightfeet.value) * 12) + inches
            waist = (Number(event.target.waistfeet.value) * 12) + Number(event.target.waistinches.value)
            neck = (Number(event.target.neckfeet.value) * 12) + Number(event.target.neckinches.value)
            if (gender === 'male') {
                bodyFat = 86.010 * Math.log10(waist-neck) - 70.041 * Math.log10(height) + 36.76
                let fatMass = (bodyFat.toFixed(1) / 100) * weight
                let leanMass = weight - fatMass
                let bodyFatStatus = bodyFatStatusCal(Number(bodyFat))
                let idealBodyFatStatus = idealBodyFatCal(age.toString())
                setIdealBodyFat(idealBodyFatStatus)
                setCalculatedBodyFat(bodyFat)
                setBodyFatStatus(bodyFatStatus)
                setFatMass(fatMass)
                setLeanMass(leanMass)
            } else if (gender === 'female') {
                hip = (Number(event.target.hipfeet.value) * 12) + Number(event.target.hipinches.value)
                bodyFat = 163.205 * Math.log10(waist+hip-neck) - 97.684 * (Math.log10(height)) - 78.387
                let fatMass = (bodyFat.toFixed(1) / 100) * weight
                let leanMass = weight - fatMass
                let bodyFatStatus = bodyFatStatusCal(Number(bodyFat))
                let idealBodyFatStatus = idealBodyFatCal(age.toString())
                setIdealBodyFat(idealBodyFatStatus)
                setCalculatedBodyFat(bodyFat)
                setBodyFatStatus(bodyFatStatus)
                setFatMass(fatMass)
                setLeanMass(leanMass)
            }
    
        } else {
            weight = Number(event.target.weight.value)
            height = Number(event.target.height.value)
            waist = Number(event.target.waist.value)
            neck = Number(event.target.neck.value)
            if (gender === 'male') {
                bodyFat = ( 495 / (1.0324 - 0.19077 * Math.log10(waist-neck) + 0.15456 * Math.log10(height))) - 450
                let fatMass = (bodyFat.toFixed(1) / 100) * weight
                let leanMass = weight - fatMass
                let bodyFatStatus = bodyFatStatusCal(Number(bodyFat))
                let idealBodyFatStatus = idealBodyFatCal(age.toString())
                setIdealBodyFat(idealBodyFatStatus)
                setCalculatedBodyFat(bodyFat)
                setBodyFatStatus(bodyFatStatus)
                setFatMass(fatMass)
                setLeanMass(leanMass)
            } else if (gender === 'female') {
                hip = Number(event.target.hip.value)
                bodyFat = (495 / (1.29579 - 0.35004 * Math.log10(waist+hip-neck) + 0.22100 * Math.log10(height))) - 450
                let fatMass = (bodyFat.toFixed(1) / 100) * weight
                let leanMass = weight - fatMass
                let bodyFatStatus = bodyFatStatusCal(Number(bodyFat))
                let idealBodyFatStatus = idealBodyFatCal(age.toString())
                setIdealBodyFat(idealBodyFatStatus)
                setCalculatedBodyFat(bodyFat)
                setBodyFatStatus(bodyFatStatus)
                setFatMass(fatMass)
                setLeanMass(leanMass)
            }
        }
        setBodyFatData({...bodyFatData, isSubmitted: true})
    }


    const bodyFatStatusCal = (bodyFat) => {
        let status = ''
        if (bodyFatData.isFemale) {
            switch (true) {
                case (10 < bodyFat && bodyFat < 14):
                    status = 'Essential Fat	'
                    break;
                case (14 <= bodyFat && bodyFat < 21):
                    status = 'Athletes'
                    break;
                case (21 <= bodyFat && bodyFat < 25):
                    status = 'Athletes'
                    break;
                case (25 <= bodyFat && bodyFat < 32):
                    status = 'Average'
                    break;    
                default:
                    status = 'Obese'
                    break;
            }
        } else {
            switch (true) {
                case (2 < bodyFat && bodyFat < 6):
                    status = 'Essential Fat'
                    break;
                case (6 <= bodyFat && bodyFat < 14):
                    status = 'Athletes'
                    break;
                case (14 <= bodyFat && bodyFat < 18):
                    status = 'Athletes'
                    break;
                case (18 <= bodyFat && bodyFat < 25):
                    status = 'Average'
                    break;    
                default:
                    status = 'Obese'
                    break;
            }
        }
        return status
    }


    const idealBodyFatCal = (age) => {
        let idealFat = ''
        if (bodyFatData.isFemale) {
            switch (true) {
                case (age ==='20'):
                    idealFat = `${17.7}%`
                    break;
                case (age ==='25'):
                    idealFat = `${18.4}%`
                    break;
                case (age ==='30'):
                    idealFat = `${19.3}%`
                    break;
                case (age ==='35'):
                    idealFat = `${21.5}%`
                    break;
                case (age ==='40'):
                    idealFat = `${22.2}%`
                    break;
                case (age ==='45'):
                    idealFat = `${22.9}%`
                    break;
                case (age ==='50'):
                    idealFat = `${25.2}%`
                    break;
                case (age ==='55'):
                    idealFat = `${26.3}%`
                    break;
                default:
                    idealFat = ''
                    break;
            }
        } else {
            switch (true) {
                case (age === '20'):
                    idealFat = `${8.5}%`
                    break;
                case (age ==='25'):
                    idealFat = `${10.5}%`
                    break;
                case (age ==='30'):
                    idealFat = `${12.7}%`
                    break;
                case (age ==='35'):
                    idealFat = `${13.7}%`
                    break;
                case (age ==='40'):
                    idealFat = `${15.3}%`
                    break;
                case (age ==='45'):
                    idealFat = `${16.4}%`
                    break;
                case (age ==='50'):
                    idealFat = `${18.9}%`
                    break;
                case (age ==='55'):
                    idealFat = `${20.9}%`
                    break;
                default:
                    idealFat = ''
                    break;    
            }
        }
        return idealFat
    }


    const resetBodyFat = () => {
        setBodyFatData({...bodyFatData, isSubmitted: false})
    }


    const changeGenderProp = (e) => {
        e.preventDefault()
        if (e.target.value === 'male') {
            setBodyFatData({...bodyFatData, isFemale: false})
        } else if (e.target.value === 'female') {
            setBodyFatData({...bodyFatData, isFemale: true})
        }
    }


    return (
        <div className={classes.bodyFatCalculatorPageContainer}>
            <h1>Body Fat Calculator</h1>
            <div className={classes.bodyFatCalculatorPageInnerContainer}>
                <div className={classes.bodyFatDescription}>
                    <p>The scientific term for body fat is adipose tissue. Adipose tissue serves a number of important functions. Its primary purpose is to store lipids from which the body creates energy. In addition, it secretes a number of important hormones, and provides the body with some cushioning as well as insulation.</p>
                    <br></br>
                    <p>Body fat includes essential body fat and storage body fat. Essential body fat is a base level of fat that is found in most parts of the body. It is necessary fat that maintains life and reproductive functions. The amount of essential fat differs between men and women, and is typically around 2-5% in men, and 10-13% in women. The healthy range of body fat for men is typically defined as 8-19%, while the healthy range for women is 21-33%. While having excess body fat can have many detrimental effects on a persons health, insufficient body fat can have negative health effects of its own, and maintaining a body fat percentage below, or even at the essential body fat percentage range is a topic that should be discussed with a medical professional.</p>
                    <br></br>
                    <p>Storage fat is fat that accumulates in adipose tissue, be it subcutaneous fat (deep under the dermis and wrapped around vital organs) or visceral fat (fat located inside the abdominal cavity, between organs), and references to body fat typically refer to this type of fat. While some storage fat is ideal, excess amounts of storage fat can have serious negative health implications.</p>
                    <br></br>
                    <p>Excess body fat leads to the condition of being overweight and eventually to obesity given that insufficient measures are taken to curb increasing body fat. Note that being overweight does not necessarily indicate an excess of body fat. A persons body weight is comprised of multiple factors including (but not limited to) body fat, muscle, bone density, and water content. Thus, highly muscular people are often classified as overweight.</p>
                </div>
                <div className={classes.bodyFatTableAndAverageValues}>
                    {bodyFatData.isSubmitted ? (
                        <div className={classes.outputOfBodyFat}>
                            <div className={classes.outputOfBodyFatTop}>
                                <div className={classes.outputOfBodyFatTopSection}>
                                <h3>Your body-fat = {calculatedBodyFat.toFixed(1)} %</h3>
                                <h3>Your body-fat status = {bodyFatStatus}</h3>
                                <h3>Your fat-mass = {fatMass.toFixed(1)} Kgs</h3>
                                <h3>Your lean-mass = {leanMass.toFixed(1)} Kgs</h3>
                                <h3>Ideal body fat for given age = {idealBodyFat}</h3>
                                </div>
                            </div>
                            <div className={classes.outputOfBodyFatBottom}>
                                <button onClick={resetBodyFat}>Goto BMI Calculator</button>
                            </div>    
                        </div>
                    ) : (
                        <div className={classes.bodyFatTableOuter}>
                        <div className={classes.bodyFatTableToggle}>
                            <button onClick={() => changeToUSUnit()}>US Units</button>
                            <button onClick={() => changeToMetricUnit()}>Metric units</button>
                        </div>
                        <div className={classes.bodyFatTableQuantities}>
                        {bodyFatData.isUSUnit ? (
                            <form onSubmit={findBodyFat}>
                                <div>
                                    <label id='age'>Age: (2-years and above )</label>
                                    <input type='number' id='age' name='age' min='2' max='125' placeholder='Enter age' required />
                                </div>
                                <div>
                                    <label id="gender">Gender: </label>
                                    <div>
                                    <select name="gender" id="gender" onChange={(e) => {changeGenderProp(e)}}>
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
                                    <label id="heightfeet">Feet</label>
                                    <input type='number' id="heightfeet" name="heightfeet" min='1' max='10' placeholder='feet' required />
                                    </div>
                                    <div className={classes.innerHeight}>
                                    <label id="heightinches">Inches</label>
                                    <input type='number' id="heightinches" name="heightinches" min='1' max='12' step=".01" placeholder='inches' required />
                                    </div>
                                </fieldset>
                                <p className={classes.helper}>Check (Measuring Body Fat Percentage) section below for measurement details of waist, neck and hip(for women)</p>
                                <fieldset>
                                    <legend>Waist circumference: (in ft and inches)</legend>
                                    <div className={classes.innerHeight}>
                                    <label id="waistfeet">Feet</label>
                                    <input type='number' id="fewaistfeetet" name="waistfeet" min='1' max='10' placeholder='feet' required />
                                    </div>
                                    <div className={classes.innerHeight}>
                                    <label id="waistinches">Inches</label>
                                    <input type='number' id="waistinches" name="waistinches" min='1' max='12' step=".01" placeholder='inches' required />
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>Neck circumference: (in ft and inches)</legend>
                                    <div className={classes.innerHeight}>
                                    <label id="neckfeet">Feet</label>
                                    <input type='number' id="neckfeet" name="neckfeet" min='1' max='10' placeholder='feet' required />
                                    </div>
                                    <div className={classes.innerHeight}>
                                    <label id="neckinches">Inches</label>
                                    <input type='number' id="neckinches" name="neckinches" min='1' max='12' step=".01" placeholder='inches' required />
                                    </div>
                                </fieldset>
                                {bodyFatData.isFemale && (
                                    <fieldset>
                                    <legend>Hip circumference: (in ft and inches)</legend>
                                    <div className={classes.innerHeight}>
                                    <label id="hipfeet">Feet</label>
                                    <input type='number' id="hipfeet" name="hipfeet" min='1' max='10' placeholder='feet' required />
                                    </div>
                                    <div className={classes.innerHeight}>
                                    <label id="inches">Inches</label>
                                    <input type='number' id="hipfeet" name="hipfeet" min='1' max='12' placeholder='inches' required />
                                    </div>
                                </fieldset>
                                )}
                                <button type='submit'>Submit</button> 
                            </form>
                        ) : (
                            <form onSubmit={findBodyFat}>
                                <label id='age'>Age: (2-years and above )</label>
                                <input type='number' id='age' min='2' max='125' placeholder='Enter age' required />
                                <label id="gender">Gender: </label>
                                <select name="gender" id="gender" onChange={(e) => {changeGenderProp(e)}}>
                                    <option id='gender' value="male">Male</option>
                                    <option id='gender' value="female">Female</option>
                                </select>
                                <label id='weight'>Weight: (in kgs)</label>
                                <input type='number' id='weight' min='1' max='650' name='weight' step=".01" placeholder='Enter weight' required />
                                <label id='height'>Height: (in cms)</label>
                                <input type='number' id='height' min='1' max='300' name='height' placeholder='Enter height' required />
                                <p className={classes.helper}>Check (Measuring Body Fat Percentage) section below for measurement details of waist, neck and hip(for women)</p>
                                <label id='waist'>Waist circumference: (in cms)</label>
                                <input type='number' id='waist' min='1' max='100' name='waist' placeholder='Enter waist circumference' required />
                                <label id='neck'>Neck circumference: (in cms)</label>
                                <input type='number' id='neck' min='1' max='300' name='neck' placeholder='Enter neck circumference' required />
                                {bodyFatData.isFemale && (
                                    <div>
                                        <label id='hip'>Hip circumference: (in cms)</label>
                                        <input type='number' id='hip' min='1' max='300' name='hip' placeholder='Enter hips circumference' required />
                                    </div>
                                )}
                                <button type='submit'>Submit</button>
                            </form>
                        )}
                        </div>
                    </div>
                    )}
                    <div className={classes.bodyFatAverageValues}>
                        <div className={classes.averageForMen}>
                            <p>The American Council on Exercise Body Fat Categorization</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Women</th>
                                        <th>Men</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Essential fat</td>
                                        <td>10-13%</td>
                                        <td>2-5%</td>
                                    </tr>
                                    <tr>
                                        <td>Athletes</td>
                                        <td>14-20%</td>
                                        <td>6-13%</td>
                                    </tr>
                                    <tr>
                                        <td>Fitness</td>
                                        <td>21-24%</td>
                                        <td>14-17%</td>
                                    </tr>
                                    <tr>
                                        <td>Average</td>
                                        <td>25-31%</td>
                                        <td>18-24%</td>
                                    </tr>
                                    <tr>
                                        <td>Obese</td>
                                        <td>32+%</td>
                                        <td>25+%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.averageForChild}>
                            <p>Jackson & Pollard Ideal Body Fat Percentages</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Age</th>
                                        <th>Women</th>
                                        <th>Men</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>20</td>
                                        <td>17.7%</td>
                                        <td>8.5%</td>
                                    </tr>
                                    <tr>
                                        <td>25</td>
                                        <td>18.4%</td>
                                        <td>10.5%</td>
                                    </tr>
                                    <tr>
                                        <td>30</td>
                                        <td>19.3%</td>
                                        <td>12.7%</td>
                                    </tr>
                                    <tr>
                                        <td>35</td>
                                        <td>21.5%</td>
                                        <td>13.7%</td>
                                    </tr>
                                    <tr>
                                        <td>40</td>
                                        <td>22.2%</td>
                                        <td>15.3%</td>
                                    </tr>
                                    <tr>
                                        <td>45</td>
                                        <td>22.9%</td>
                                        <td>16.4%</td>
                                    </tr>
                                    <tr>
                                        <td>50</td>
                                        <td>25.2%</td>
                                        <td>18.9%</td>
                                    </tr>
                                    <tr>
                                        <td>55</td>
                                        <td>26.3%</td>
                                        <td>20.9%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={classes.risks}>
                    <div className={classes.measureBodyFat}>
                        <p className={classes.measureBodyFatTitle}>Measuring Body Fat Percentage:</p>
                        <div className={classes.measureBodyFatDescription}>
                            <h3>U.S. Navy Method:</h3>
                            <br></br>
                            <p>There are many specific techniques used for measuring body fat. The calculator above uses a method involving equations developed at the Naval Health Research Center by Hodgdon and Beckett in 1984. The method for measuring the relevant body parts as well as the specific equations used are provided below:</p>
                            <ul>
                                <li><b>Waist circumference: </b>Measure the circumference of the subjects waist at a horizontal level around the navel for men, and at the level with the smallest width for women. Ensure that the subject does not pull their stomach inwards to obtain accurate measurements.</li>
                                <li><b>neck circumference: </b>Measure the circumference of the subjects neck starting below the larynx, with the tape sloping downward to the front. The subject should avoid flaring their neck outwards.</li>
                                <li><b>Hip circumference: </b>For women only: Measure the circumference of the subjects hips at the largest horizontal measure.</li>
                            </ul>
                            <p>Once these measurements are obtained, use the following formulas to calculate an estimate of body fat. Two equations are provided, one using the U.S. customary system (USC), which uses inches, and the other using the International System of Units, specifically the unit of centimeters:</p>
                            <div className={classes.measureBodyFatDescriptionEquationsForMen}>
                                <p className={classes.measureBodyFatDescriptionEquationsForMenTitle}>Body fat percentage (BFP) formula for males</p>
                                <h4>USC Units:</h4>
                                <p>Body Fat% = 86.010 * log10(waist-neck) - 70.041 * log10(height) + 36.76</p>
                                <br></br>
                                <h4>Metric Units</h4>
                                <p>Body Fat% = ( 495 / 1.0324 - 0.19077 * log10(waist-neck) + 0.15456 * log10(height)) - 450</p>
                                <br></br>
                            </div>
                            <br></br>
                            <div className={classes.measureBodyFatDescriptionEquationsForWomen}>
                                <p className={classes.measureBodyFatDescriptionEquationsForWomenTitle}>Body fat percentage (BFP) formula for females</p>
                                <h4>USC Units:</h4>
                                <p>Body Fat% = 163.205 * log10(waist+hip-neck) - 97.684 * (log10(height)) - 78.387</p>
                                <br></br>
                                <h4>Metric Units</h4>
                                <p>Body Fat% = (495 / 1.29579 - 0.35004 * log10(waist+hip-neck) + 0.22100 * log10(height)) - 450</p>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BodyFatCalculatorPage;
import classes from './homepage.module.css'
import Lottie from 'react-lottie';
import animationData from '../loadingSpinner/laodingSpinner.json'

const HomePage = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <>
            <div className={classes.homepageContainer} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: "1px solid red", height: "70vh"}}>
                <Lottie className={classes.spinnerAnimation} options={defaultOptions} width={150} height={150} />
            </div>
        </>
    )
}

export default HomePage;
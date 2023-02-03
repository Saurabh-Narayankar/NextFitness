import classes from './homepageFaturesCard.module.css'

const HomepageFaturesCard = ({ feature }) => {


    return (
        <div className={classes.homepageFeaturesCardContainer}>
            <div className={classes.homepageFeaturesCardTitle}>
                <p>{feature.title}</p>
            </div>
            <div className={classes.homepageFeaturesCardDescription}>
                <ul>
                    {feature.description.map((descriptionLine, index) => <li key={index}>{descriptionLine}</li> )}
                </ul>
            </div>
        </div>
    )

}

export default HomepageFaturesCard;
import Link from 'next/link';

import classes from './ItemCard.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const ItemCard = ({ title, subTitle, description, gotoLink }) => {

    return (
        <div className={classes.ItemCardContainer}>
            <div className={classes.title}>
                <h1>{title}</h1>
                <p>{subTitle ? subTitle : ''}</p>
            </div>
            <div className={classes.description}>
                <ul>
                    {description.map((sentence, index) => (<li key={index}>{sentence}</li>))}
                </ul>
            </div>
            <div className={classes.gotoLink}>
                <Link href={gotoLink}><p>{`check ${title}`}<FontAwesomeIcon icon={faArrowUpRightFromSquare} size='sm' /></p></Link>
            </div>
        </div>
    )
}

export default ItemCard; 
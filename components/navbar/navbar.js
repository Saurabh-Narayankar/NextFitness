import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import classes from './navbar.module.css'

import { UserContext } from '../../context/userContext'
import { SignOutUser } from '../../lib/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell, faBowlFood, faCalculator, faUtensils, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {

    const { currentUser } = useContext(UserContext)


    return (
        <div className={classes.navbarContainer}>
            <nav className={classes.topNavbar}>
                <Link href='/'><h1>NextFitness</h1></Link>
                <div className={classes.topNavbarRightSideMenu}>
                    <div className={classes.signIn}>
                        { currentUser ? 
                        <div className={classes.profilePicAndName}>
                            <div className={classes.profilePic} />
                            <p>LogOut</p>
                            <div className={classes.logoutButton}>
                                <FontAwesomeIcon className={classes.logoutIcon} onClick={SignOutUser} icon={faRightFromBracket} size='lg' />
                            </div>
                        </div>
                            
                        : 
                        <Link href='/authenticate/signInPage'><p>SignIn</p></Link> }
                    </div>
                </div>
            </nav>
            <nav className={classes.bottomNavbar}>
                {currentUser && <Link className={classes.bottomNavbarLink} href='/calculator'><FontAwesomeIcon icon={faBowlFood} size='lg' /><p>MyFood</p></Link>}
                <Link className={classes.bottomNavbarLink} href='/recipes'><FontAwesomeIcon icon={faUtensils} size='lg' /><p>Recipes</p></Link>
                <Link className={classes.bottomNavbarLink} href='/exercise'><FontAwesomeIcon icon={faDumbbell} size='lg' /><p>Exercises</p></Link>
                <Link className={classes.bottomNavbarLink} href='/calculator'><FontAwesomeIcon icon={faCalculator} size='lg' /><p>Calculator</p></Link>
            </nav>
        </div>
    )
}

export default Navbar;
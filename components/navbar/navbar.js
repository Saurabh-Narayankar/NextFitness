import Link from 'next/link';
import classes from './navbar.module.css'

const Navbar = () => {
    return (
        <div className={classes.navbarContainer}>
            <nav className={classes.topNavbar}>
                <Link href='/'><h1>NextFitness</h1></Link>
                <p>SignIn</p>
            </nav>
            <nav className={classes.bottomNavbar}>
            <Link href='/exercise'><p>Exercises</p></Link>
                <Link href='/calculator'><p>Calculator</p></Link>
            </nav>
        </div>
    )
}

export default Navbar;
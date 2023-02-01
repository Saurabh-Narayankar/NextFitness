import { useRouter } from 'next/router'
import AddFoodComp from "../../components/myFoodSec/addFoodComp/addFoodComp";

const AddFoodPage = () => {

    const router = useRouter()

    const meal = router.query.addFood[1]
    const date = router.query.addFood[2]


    return (
        <AddFoodComp meal={meal} date={date} />
    )
}

export default AddFoodPage;

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
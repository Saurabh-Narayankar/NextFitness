import { useRouter } from 'next/router'
import RecipeDetailComp from '../../components/recipes/recipeDetailComp/recipeDetailComp'

const RecipeDetail = () => {

    const router = useRouter()

    const cuisine = router.query.recipeDetail[0]
    const course = router.query.recipeDetail[1]
    const id = router.query.recipeDetail[2]

    return(
        <RecipeDetailComp cuisine={cuisine} course={course} id={id} />
    )

}

export default RecipeDetail;

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
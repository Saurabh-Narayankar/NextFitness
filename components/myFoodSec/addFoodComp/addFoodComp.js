import { useState } from 'react';

import classes from './addFoodComp.module.css'
import AddFoodCard from '../addFoodCard/addFoodCard';

import Lottie from 'react-lottie';
import animationData from '../../loadingSpinner/laodingSpinner.json'

const AddFoodComp = ({ meal, date }) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f0b847b775mshb318ef219b15657p117e6ajsn5add2bdc82f8',
            'X-RapidAPI-Host': 'nutritionix-api.p.rapidapi.com'
        }
    };

    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const searchItems = async (event) => {
        event.preventDefault()

        setIsLoading(true)
        const searchParam = event.target.foodItem.value

        const itemFetch = await fetch(`https://nutritionix-api.p.rapidapi.com/v1_1/search/${searchParam}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_protein%2Cnf_sugars%2Cnf_serving_size_unit%2Cnf_serving_weight_grams`, options)
        const itemFetchResponse = await itemFetch.json()
        const responseItemArray = itemFetchResponse.hits
        const itemsWithServingWeightInGrams = responseItemArray.filter((item) => item.fields.nf_serving_weight_grams !== null)
        setSearchResult(itemsWithServingWeightInGrams)

        event.target.foodItem.value = ''
        setIsLoading(false)

    }

    return (
        <>
            <div className={classes.AddFoodCompContainer}>
                <div className={classes.AddFoodCompInnerContainer}>
                    <div className={classes.search}>
                        <form className={classes.searchForm} onSubmit={searchItems}>
                            <input className={classes.searchInput} type='text' name='foodItem' placeholder='search food item' />
                            <button className={classes.searchButton} type='submit'>search</button>
                        </form>
                    </div>
                    <div className={classes.searchResults}>
                        {!isLoading ? 
                        (searchResult.length !== 0 ? 
                            <div>
                                {searchResult.map((item, index) => 
                                    <AddFoodCard key={index} item={item} meal={meal} date={date} />  
                                )}
                            </div> : <h1 className={classes.defaultSearchResult}>Search For Results</h1>) 
                        : 
                        <Lottie className={classes.spinnerAnimation} options={defaultOptions} height={150} width={150} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddFoodComp;
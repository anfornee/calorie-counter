import { useState } from 'react'
import { doSignOut } from '../../firebase/auth';
import './styles.css'

function App() {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [foodData, setFoodData] = useState<any>(null);
  const [query, setQuery] = useState<string>('');
  const [dailyFoodList, setDailyFoodList] = useState<{ description: string, calories: string }[] | null>(null);
  const [dailyCaloriesTotal, setDailyCaloriesTotal] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleQueryValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleSearchFoodSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      try {
        console.log("query: ", query)
        const searchFoodResult = await fetch(`${import.meta.env.VITE_FIREBASE_CLOUD_FUNCTIONS_ENDPOINT}searchFood?foodQuery=${query}`);
        const searchFoodData = await searchFoodResult.json();
        if (Array.isArray(searchFoodData) && searchFoodData.length) {
          setSearchResults(searchFoodData);
        } else {
          window.alert('No results found.')
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('There was an error with the request.')
        }
      }
    }
  }

  const handleSearchItemClicked = (itemIndex: number) => {
    const selectedFood = searchResults[itemIndex];
    const foodCalories = selectedFood.foodNutrients.find((nutrient: any) => "KCAL" === nutrient.unitName)
    selectedFood.calories = foodCalories.value;
    setFoodData(selectedFood);
  }

  const handleAddFoodClicked = () => {
    if (foodData) {
      const originalFoodList = dailyFoodList && dailyFoodList.length ? [...dailyFoodList] : [];
      const newDailyCaloriesTotal = dailyCaloriesTotal + foodData.calories;
      setDailyCaloriesTotal(newDailyCaloriesTotal)
      setDailyFoodList([...originalFoodList, foodData])
    }
  }

  return (
    <>
      <button onClick={doSignOut}>Sign Out</button>
      <h1>Count em</h1>
      <p className='read-the-docs'>
        Don't be fat
      </p>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <form onSubmit={handleSearchFoodSubmitted} className='food-query-form' >
        <label className='food-query-form-label'>Search Food</label>
        <input className='food-query-form-input' placeholder='Egg' value={query} onChange={handleQueryValueChanged} />
        <input className='food-query-form-submit' type="submit" value={"Search"} />
      </form>
      {searchResults && searchResults.length && searchResults.map((item: any, i: number) => {
        return (
          <button
            key={`search-result-item-${new Date().getTime()}-${i}`}
            onClick={() => handleSearchItemClicked(i)}
            className='search-result-item-button'
          >
            {item.description}
          </button>
        )
      })}
      {foodData && (
        <div>
          <h3>{foodData.description}</h3>
          <p>
            Calories: {foodData.calories}
          </p>
          <button onClick={handleAddFoodClicked}>Add Food</button>
        </div>
      )}
      <div className='daily-food-list-container'>
        <h3 className='daily-food-list-title'>Daily Food List</h3>
        <ul className='daily-food-list'>
          {dailyFoodList && dailyFoodList.length ? <>
            <li className='daily-food-list-item'>
              <span className='daily-food-list-item-subitem'>Name</span>
              <span className='daily-food-list-item-subitem'>Calories</span>
            </li>
            {dailyFoodList.map((foodItem, i) => <li key={`daily-food-list-item-${new Date().getTime()}-${i}`} className='daily-food-list-item'>
              <span className='daily-food-list-item-subitem'>{foodItem.description}</span>
              <span className='daily-food-list-item-subitem'>{foodItem.calories}</span>
            </li>)}
            <li className='daily-food-list-item'>
              <span className='daily-food-list-item-subitem'>TOTAL</span>
              <span className='daily-food-list-item-subitem'>
                {dailyCaloriesTotal}
              </span>
            </li>
          </> : <li className='daily-food-list-item'>No items added</li>}
        </ul>
      </div>
    </>
  )
}

export default App

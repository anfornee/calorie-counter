import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        // find a food's fdc id
        let response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=cheddar%20cheese&dataType=Foundation,SR%20Legacy&pageSize=10&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=${import.meta.env.VITE_SUPER_SECRET_API_KEY}`, {
          headers: {
            accept: "application/json"
          }
        });
        let resData = await response.json();
        console.log('FIRST all resData: ', resData);
        const foods = resData.foods;
        const firstFood = foods[0];
        const foodFdcId = firstFood.fdcId;

        // get the foods information
        response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodFdcId}?format=abridged&nutrients=208&api_key=${import.meta.env.VITE_SUPER_SECRET_API_KEY}`, {
          headers: {
            accept: "application/json"
          }
        });
        resData = await response.json();
        console.log('SECOND all resData: ', resData);
        const foodName = resData.description;
        const caloriesNutrient = resData.foodNutrients[0];
        const caloriesAmount = caloriesNutrient.number;

        const dataList = [
          {
            name: foodName,
            calories: caloriesAmount
          }
        ];
        setData(dataList);
      } catch (error) {
        setData(error);
      }
    };

    getData();
  }, []);

  console.log('data: ', data);

  return (
    <>
      <h1>Count em</h1>
      <p className="read-the-docs">
        Don't be fat
      </p>
      {data && data.length && data.map((thing: any, i: number) => {
        return <div key={`${new Date().getTime()}-${i}`}>
          <h2>{thing.name}</h2>
          <p>
            Calories: {thing.calories}
          </p>
        </div>
      })}
    </>
  )
}

export default App

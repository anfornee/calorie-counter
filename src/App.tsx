import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://api.api-ninjas.com/v1/nutrition?query=2+scrambled+eggs", {
          headers: {
            "X-Api-Key": import.meta.env.VITE_SUPER_SECRET_API_KEY
          }
        });
        const resData = await response.json();
        setData(resData);
      } catch (error) {
        setData(error);
      }
    };

    getData();
  }, []);
  console.log('import.meta.env.SUPER_SECRET_API_KEY: ', import.meta.env.VITE_SUPER_SECRET_API_KEY)
  console.log('data: ', data);

  return (
    <>
      <h1>Count em</h1>
      <p className="read-the-docs">
        Don't be fat
      </p>
      {data && data.length && data.map((thing: any) => {
        return <div>
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

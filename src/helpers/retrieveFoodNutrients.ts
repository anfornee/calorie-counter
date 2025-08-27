export default async function retrieveFoodNutrients({ fdcId }: { fdcId: string }) {
  try {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?format=full&nutrients=208&api_key=${import.meta.env.VITE_SUPER_SECRET_API_KEY}`, {
      headers: {
        accept: "application/json"
      }
    });
    const resData = await response.json();
    console.log('resData: ', resData)
    const foodName = resData.description;
    const caloriesNutrient = resData.foodNutrients[0];
    const caloriesAmount = caloriesNutrient.amount;
    return {
      name: foodName,
      calories: caloriesAmount
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("There was an error retrieving results.");
    }
  }
};
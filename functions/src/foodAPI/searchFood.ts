import { onCall } from "firebase-functions/v2/https";

const searchFood = async ({
  foodQuery,
  pageSize,
  pageNumber

}: {
  foodQuery: string,
  pageSize: number,
  pageNumber: number
}) => {
  const cleanQuery = encodeURIComponent(foodQuery);
  try {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${cleanQuery}&dataType=Foundation,SR%20Legacy&pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=dataType.keyword&sortOrder=asc&api_key=${process.env.SUPER_SECRET_API_KEY}`, {
      headers: {
        accept: "application/json"
      }
    });
    let resData = await response.json();
    const listOfFoods = resData.foods;
    return listOfFoods
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("There was an error retrieving results.");
    }
  }
}

export default onCall(async (request) => {
  const { foodQuery, pageSize, pageNumber } = request.data;
  try {
    if (!foodQuery || typeof foodQuery !== 'string' || !foodQuery.length) throw new Error("Did not recieve a valid food query.")
    const validatedPageSize = pageSize && typeof pageSize === 'string' ? parseInt(pageSize) : 10;
    const validatedPageNumber = pageNumber && typeof pageNumber === 'string' ? parseInt(pageNumber) : 10;
    const successfulResult = await searchFood({ foodQuery, pageSize: validatedPageSize, pageNumber: validatedPageNumber })
    return successfulResult
  } catch (error) {
    let errorMessage = "There was an error with your request."
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return errorMessage
  }
});

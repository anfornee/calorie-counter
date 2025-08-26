export default async function searchFood({
  query,
  pageSize = 10,
  pageNumber = 1

}: {
  query: string,
  pageSize?: number,
  pageNumber?: number
}) {
  const cleanQuery = encodeURIComponent(query);
  try {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${cleanQuery}&dataType=Foundation,SR%20Legacy&pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=dataType.keyword&sortOrder=asc&api_key=${import.meta.env.VITE_SUPER_SECRET_API_KEY}`, {
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
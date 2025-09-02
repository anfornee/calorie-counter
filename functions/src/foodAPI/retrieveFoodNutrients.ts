import { onRequest } from "firebase-functions/https";

const retrieveFoodNutrients = async ({ fdcId }: { fdcId: string }) => {
  try {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?format=full&nutrients=208&api_key=${process.env.SUPER_SECRET_API_KEY}`, {
      headers: {
        accept: "application/json"
      }
    });
    const resData = await response.json();
    return resData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("There was an error retrieving results.");
    }
  }
};


export default onRequest(
  { cors: true },
  async (request, response) => {
  const { fdcId } = request.query;
  try {
    if (!fdcId || typeof fdcId !== 'string' || !fdcId.length) throw new Error()
    const successfulResult = await retrieveFoodNutrients({ fdcId })
    response.send(successfulResult)
  } catch (error) {
    let errorMessage = "There was an error with your request."
    if (error instanceof Error && error.message) {
      errorMessage = error.message
    }
    response
      .status(400)
      .send(errorMessage)
  }
});
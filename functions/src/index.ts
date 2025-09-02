import { setGlobalOptions } from "firebase-functions";
import searchFood from "./foodAPI/searchFood";
import retrieveFoodNutrients from "./foodAPI/retrieveFoodNutrients";

setGlobalOptions({ maxInstances: 10 });

export {
  searchFood,
  retrieveFoodNutrients
};

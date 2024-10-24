import data from "./mock_joke.json";

export const getAPICall = async (numJokes:number) : Promise<any> => {
    try {
        return data.slice(0, numJokes);
    } catch (error: unknown) {
      return "Falied to fetch jokes. Please try again."
    }
  };
import React, { useState } from "react";

import { Joke } from "./type";
import { getAPICall } from "./Fetch_Jokes";
import JokesUi from "./JokesUi";

const Jokes: React.FC = () => {
  const [numJokes, setNumJokes] = useState<number>(1);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const fetchJokes = async () => {
    setLoader(true);
    setTimeout(async () => {
      const fetchedJokes = await getAPICall(numJokes);
      if (typeof fetchedJokes === "string") {
        setLoader(false);
        setError(fetchedJokes);
        setJokes([]);
        setSnackbarOpen(true);
      } else if (fetchedJokes.length !== 0) {
        setJokes(fetchedJokes);
        setLoader(false);
      } else {
        setJokes([]);
        setLoader(false);
      }
    }, 3000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchJokes();
  };

  const getInput = (number: number) => {
    setNumJokes(number);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <JokesUi
      submit={handleSubmit}
      handleInput={getInput}
      loader={loader}
      jokes={jokes}
      snackbarOpen={snackbarOpen}
      closeSnackbar={handleCloseSnackbar}
      error={error}
    />
  );
};

export default Jokes;

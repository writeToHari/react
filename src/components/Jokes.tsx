import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Snackbar,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";

import "./Jokes.css";
import data from "./mock_joke.json";

interface Joke {
  id: string;
  question: string;
  answer: string;
}

const Jokes: React.FC = () => {
  const [numJokes, setNumJokes] = useState<number>(1);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const fetchJokes = async () => {
    try {
      setLoader(true);
      const fetchedJokes = data.slice(0, numJokes);
      setJokes(fetchedJokes);
      setLoader(false);
      setError(null);
    } catch (error) {
      setError("Falied to fetch jokes. Please try again.");
      setJokes([]);
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchJokes();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container className="wrapper">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Joke Generator</Typography>
        </Toolbar>
      </AppBar>
      <Box my={2} className="list">
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-number"
            label="Jokes"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              htmlInput: {
                min: 1,
                max: 100,
              },
            }}
            onChange={(e) => setNumJokes(Number(e.target.value))}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            Get Jokes
          </Button>
        </form>
        {jokes.length !== 0 && <h1>Jokes List</h1>}
        {loader && (
          <Box className="loader" sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        <div className="jokes_list">
        {jokes.map((joke, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {joke.question}
              </AccordionSummary>
              <AccordionDetails>{joke.answer}</AccordionDetails>
            </Accordion>
          );
        })}
        </div>
      </Box>
      <footer>
        <Typography variant="body2" align="center" style={{ margin: "20px 0" }}>
          @ 2024 Joke Generator
        </Typography>
      </footer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </Container>
  );
};

export default Jokes;

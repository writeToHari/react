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

import { Joke } from "./type";
function JokesUi(props: any) {
  const {
    submit,
    handleInput,
    loader,
    jokes,
    snackbarOpen,
    closeSnackbar,
    error,
  } = props;
  return (
    <Container className="wrapper">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Joke Generator</Typography>
        </Toolbar>
      </AppBar>
      <Box my={2} className="list">
        <form onSubmit={submit}>
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
            onChange={(e) => handleInput(Number(e.target.value))}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px" }}
            disabled={loader ? true : false}
          >
            Get Jokes
          </Button>
        </form>
        {jokes.length !== 0 ? <h1>Jokes List</h1> : <h1>Data Not Found</h1>}
        {loader && (
          <Box className="loader" sx={{ display: "flex" }}>
            <CircularProgress id="loader" />
          </Box>
        )}
        <div className="jokes_list">
          {jokes.map((joke: Joke, index: number) => {
            return (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id={String(index)}
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
        onClose={closeSnackbar}
        message={error}
      />
    </Container>
  );
}

export default JokesUi;

/* eslint-disable testing-library/no-unnecessary-act */
import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Jokes from "./Jokes";

describe("Fetch Joke List", () => {
  it("should fetch jokes and display them", async () => {
    render(<Jokes />);
    fireEvent.change(screen.getByLabelText(/Jokes/i), {
      target: { value: "2" },
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/Get Jokes/i));
    });

    await waitFor(() => {
      expect(screen.getByText(/Nothing, it just waved/i)).toBeInTheDocument();
    });
  });

  it("should not fetch when input is less than 1", async () => {
    render(<Jokes />);
    fireEvent.change(screen.getByLabelText(/Jokes/i), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText(/Get Jokes/i));

    await waitFor(() => {
      expect(
        screen.queryByText(/Value must be greater than or equal to 1/i)
      ).not.toBeInTheDocument();
    });
  });

  it("should not fetch when input is more than 100", async () => {
    render(<Jokes />);
    fireEvent.change(screen.getByLabelText(/Jokes/i), {
      target: { value: "101" },
    });
    fireEvent.click(screen.getByText(/Get Jokes/i));

    await waitFor(() => {
      expect(
        screen.queryByText(/Value must be less than or equal to 100/i)
      ).not.toBeInTheDocument();
    });
  });

  it("should enter number only", async () => {
    render(<Jokes />);
    fireEvent.change(screen.getByLabelText(/Jokes/i), {
      target: { value: "4--" },
    });
    fireEvent.click(screen.getByText(/Get Jokes/i));

    await waitFor(() => {
      expect(
        screen.queryByText(/Please enter a number/i)
      ).not.toBeInTheDocument();
    });
  });
});

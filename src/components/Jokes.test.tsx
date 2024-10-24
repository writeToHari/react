/* eslint-disable testing-library/no-unnecessary-act */
import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Jokes from "./Jokes";
import * as ApiCall from "./Fetch_Jokes";

describe("Fetch Joke List", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it("should fetch jokes and display them", async () => {
    render(<Jokes />);
    fireEvent.change(screen.getByLabelText(/Jokes/i), {
      target: { value: "2" },
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/Get Jokes/i));
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
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

  it("Shows loading indicator when fetching jokes", async () => {
    render(<Jokes />);
    fireEvent.change(screen.getByLabelText(/Jokes/i), {
      target: { value: "2" },
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/Get Jokes/i));
    });
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByRole(/progressbar/i)).not.toBeInTheDocument();
    });
  });

  it("should handle fetchJokes error correctly", async () => {
    const fetchJokesSpy = jest
      .spyOn(ApiCall, "getAPICall")
      .mockResolvedValueOnce("Falied to fetch jokes. Please try again.");

    render(<Jokes />);

    fireEvent.change(screen.getByLabelText(/Jokes/i), {
      target: { value: "2" },
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/Get Jokes/i));
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Falied to fetch jokes. Please try again./i)
      ).toBeInTheDocument();
    });

    expect(fetchJokesSpy).toHaveBeenCalled();
  });

  it("should handle Data Not Found", async () => {
    const fetchJokesSpy = jest
      .spyOn(ApiCall, "getAPICall")
      .mockResolvedValueOnce([]);

    render(<Jokes />);

    fireEvent.change(screen.getByLabelText(/Jokes/i), {
      target: { value: "2" },
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/Get Jokes/i));
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.getByText(/Data Not Found/i)).toBeInTheDocument();
    });

    expect(fetchJokesSpy).toHaveBeenCalled();
  });
});

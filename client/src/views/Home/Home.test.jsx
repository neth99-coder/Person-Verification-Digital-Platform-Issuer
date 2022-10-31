import {render, screen } from "@testing-library/react";
import UsrReg from "./Home";

test("renders user registration form properly", () => {
  render(<UsrReg />);

  const headingOne = screen.getByText(/Get Your Own/i);
  const headingTwo = screen.getByText(/Digital Identity/i);
  const userReg = screen.getByText(/REGISTER AS USER/i);
  const verifierReg = screen.getByText(/REGISTER AS VERIFIER/i);

  expect(headingOne).toBeInTheDocument();
  expect(headingTwo).toBeInTheDocument();
  expect(userReg).toBeInTheDocument();
  expect(verifierReg).toBeInTheDocument();
});

import {render, screen } from "@testing-library/react";
import UsrReg from "./IssuerDashboard";

test("renders user registration form properly", () => {
  render(<UsrReg />);

  const headingOne = screen.getByText(/Person Verification/i);
  const headingTwo = screen.getByText(/Digital Platform/i);
  const userReg = screen.getByText(/View ID Requests/i);
  const verifierReg = screen.getByText(/View Verifier Requests/i);

  expect(headingOne).toBeInTheDocument();
  expect(headingTwo).toBeInTheDocument();
  expect(userReg).toBeInTheDocument();
  expect(verifierReg).toBeInTheDocument();
});

import {render, screen } from "@testing-library/react";
import UsrReg from "./VerReg";

test("renders verifier registration form properly", () => {
  render(<UsrReg />);

  const nameLabel = screen.getByText(/Name of Organization/i);
  const addressLabel = screen.getByText(/Address/i);
  const phoneLabel = screen.getByText(/Contact Number/i);
  const emailLabel = screen.getByText(/E-mail/i);
  const servicesLabel = screen.getByText(/Select required services/i);
  const accountCreationLabel = screen.getByText(/Bank Account Creation/i);
  const banlLoanLabel = screen.getByText(/Bank Loan Services/i);
  const creditCardLabel = screen.getByText(/Credit Card Services/i);
  const companyRegLabel = screen.getByText(/upload proof of company registration/i);
  

  const nextButton = screen.getByText(/NEXT PAGE/i);
  const prevButton = screen.getByText(/PREV PAGE/i);
//   const submitButton = screen.getByText(/Submit/i);


  expect(nameLabel).toBeInTheDocument();
  expect(addressLabel).toBeInTheDocument();
  expect(phoneLabel).toBeInTheDocument();
  expect(servicesLabel).toBeInTheDocument();
  expect(accountCreationLabel).toBeInTheDocument();
  expect(banlLoanLabel).toBeInTheDocument();
  expect(creditCardLabel).toBeInTheDocument();
  expect(companyRegLabel).toBeInTheDocument();
  expect(emailLabel).toBeInTheDocument();

  expect(nextButton).toBeInTheDocument();
  expect(prevButton).toBeInTheDocument();
//   expect(submitButton).toBeInTheDocument();

 

  
});



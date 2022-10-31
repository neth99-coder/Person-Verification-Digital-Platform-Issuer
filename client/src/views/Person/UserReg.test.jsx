import { render, screen } from "@testing-library/react";
import UsrReg from "./UsrReg";

test("renders user registration form properly", () => {
  render(<UsrReg />);

  const firstNameLabel = screen.getByText(/First Name/i);
  const lastNameLabel = screen.getByText(/Last Name/i);
  const materialStatusLabel = screen.getByText(/Marital Status/i);
  const nationalityLabel = screen.getByText(/Nationality/i);
  const nicNumberLabel = screen.getByText(/NIC Number/i);
  const dobLabel = screen.getByText(/DOB/i);
  const phoneNumberLabel = screen.getByText(/Phone Number/i);
  const addressLabel = screen.getByText(/Address/i);
  const emailLabel = screen.getByText(/email/i);
  const nicLabel = screen.getByText(/upload copy of NIC/i);
  const bcLabel = screen.getByText(/upload Birth Certificate copy/i);
  const nextButton = screen.getByText(/NEXT PAGE/i);
  const prevButton = screen.getByText(/PREV PAGE/i);
//   const submitButton = screen.getByText(/Submit/i);


  expect(firstNameLabel).toBeInTheDocument();
  expect(lastNameLabel).toBeInTheDocument();
  expect(materialStatusLabel).toBeInTheDocument();
  expect(nationalityLabel).toBeInTheDocument();
  expect(nicNumberLabel).toBeInTheDocument();
  expect(dobLabel).toBeInTheDocument();
  expect(phoneNumberLabel).toBeInTheDocument();
  expect(addressLabel).toBeInTheDocument();
  expect(emailLabel).toBeInTheDocument();
  expect(nicLabel).toBeInTheDocument();
  expect(bcLabel).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
  expect(prevButton).toBeInTheDocument();
//   expect(submitButton).toBeInTheDocument();

 

  
});



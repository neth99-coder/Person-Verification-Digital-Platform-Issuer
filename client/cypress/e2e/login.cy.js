describe("The Login Page", () => {
  it("successfully loads login", () => {
    cy.visit("http://localhost:3000/login");
  });
});

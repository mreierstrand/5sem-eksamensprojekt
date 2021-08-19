// describe("Create User test", () => {
//   //Refresh appen før hver test
//   beforeEach(() => {
//     cy.visit("http://localhost:8100/Opret");
//     cy.wait(5000);
//   });
//   // Login med korrekt username + password
//   it("Opret med korrekt mail og kodeord (6 tegn)", () => {
//     cy.get("#fornavnInput").type("Test");
//     cy.get("#efternavnInput").type("Testeren");
//     cy.get("#emailInput").type("Test@test.dk");
//     cy.get("#kodeordInput").type("test123");

//     cy.get("#roundedButtonOpret").click();

//     //Validerer login med korrekt username + password
//     cy.wait(10000);
//     cy.get("#velkommenText")
//       .first()
//       .should("contain", "Test Testeren");
//     cy.wait(10000);
//   });

  //En test der tjekker om fortrydknappen fungerer som den skal
  // it("fortrydTest", () => {
  //   cy.get("#fornavnInput").type("Test");

  //   cy.get("#roundedButtonReturn").click();
  //   cy.wait(50000);

  //   //validerer logud
  //   cy.get("#header")
  //     .first()
  //     .should("contain", "Login");
  //   cy.wait(10000);

  // });
//});

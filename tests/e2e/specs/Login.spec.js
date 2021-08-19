// describe("Login test", () => {
//   //Refresh appen før hver test
//   beforeEach(() => {
//     cy.visit("https://hjemhed.web.app/Logud");
//     cy.wait(15000);
//   });
//   //Login med korrekt username + password
//   it("Login med mail og kode", () => {
//     cy.get("#emailInput").type("tada@hotmail.dk");
//     cy.get("#passwordInput").type("123456");

//     cy.get("#roundedButton").click();

//     //Validerer login med korrekt username + password
//     cy.wait(20000);
//     cy.get("#velkommenText")
//       .first()
//       .should("contain", "Talia Damary");
//     cy.wait(5000);

//   });

//   it("Logud", () => {

//     cy.get("#emailInput").type("tada@hotmail.dk");
//     cy.get("#passwordInput").type("123456");
//     cy.get("#roundedButton").click();
//     cy.wait(15000);
//       cy.get("#logoutButton").click();
//       cy.wait(15000);
//       cy.contains("#header", "Login");
//       //validerer logud 
//      cy.get("#header").first().should("contain", "Login");
//   });
// });

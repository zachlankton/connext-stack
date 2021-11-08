describe("Page Tests", () => {
  it("Reset Coverage Counter", () => {
    cy.request("http://localhost:3000/api/__reset_coverage__").then((res) => {
      expect(res.body).to.have.property("message", "global coverage reset!");
    });
  });

  it("Index Page Loads", () => {
    cy.visit("http://localhost:3000");
    cy.request("http://localhost:3000/").its("status").should("equal", 200);
  });

  it("404 Test", () => {
    cy.visit("http://localhost:3000/pageDoesNotExits", {
      failOnStatusCode: false,
      retryOnStatusCodeFailure: false,
    });
    cy.contains("404");
    cy.contains("This page could not be found");
    cy.visit("http://localhost:3000");
  });

  it("API Hello Test", () => {
    cy.request("http://localhost:3000/api/hello")
      .its("status")
      .should("equal", 200);
  });
});

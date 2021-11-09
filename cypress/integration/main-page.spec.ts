describe("Page Tests", () => {
  it("Index Page Loads", () => {
    cy.visit("http://localhost:3000");
    cy.request("http://localhost:3000/").its("status").should("equal", 200);
  });

  it("Next Auth Sign In", () => {
    const username = Cypress.env("GOOGLE_USER");
    const password = Cypress.env("GOOGLE_PW");
    const loginUrl = Cypress.env("SITE_NAME") + "/api/auth/signin";
    const cookieName = Cypress.env("COOKIE_NAME");
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: true,
      logs: false,
      isPopup: false,
      loginSelector: ".button",
      postLoginSelector: ".signed-in-as",
    };

    cy.task("GoogleSocialLogin", socialLoginOptions).then(({ cookies }) => {
      cy.clearCookies();
      const cookie = cookies
        .filter((cookie) => cookie.name === cookieName)
        .pop();
      if (cookie) {
        cy.setCookie("next-auth.session-token", cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure,
        });

        Cypress.Cookies.defaults({
          preserve: "next-auth.session-token",
        });
      }
    });
  });

  it("Signed In and Sign out", () => {
    cy.intercept("/api/auth/session").as("getSession");
    cy.visit("http://localhost:3000");
    cy.wait("@getSession");
    cy.get(".signed-in-as").should("include.text", "@gmail.com");
    cy.contains("Sign out").click();
    cy.wait("@getSession");
    cy.get(".sign-in").click();
    cy.url().should("include", "/api/auth/signin");
    cy.clearCookies();
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

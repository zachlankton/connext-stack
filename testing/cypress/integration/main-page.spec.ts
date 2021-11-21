describe("Page Tests", () => {
  const username = Cypress.env("CYPRESS_GOOGLE_USER");
  const password = Cypress.env("CYPRESS_GOOGLE_PW");
  const loginUrl = Cypress.env("CYPRESS_SITE_NAME");
  const cookieName = Cypress.env("CYPRESS_COOKIE_NAME");
  it("Index Page Loads", () => {
    cy.visit("http://localhost:3000");
    cy.request("http://localhost:3000/").its("status").should("equal", 200);
  });

  it("Docs/Colors Page Loads", () => {
    cy.visit("http://localhost:3000/docs/colors");
    cy.request("http://localhost:3000/docs/colors")
      .its("status")
      .should("equal", 200);
  });

  if (username !== undefined) {
    it("Next Auth Sign In", () => {
      const socialLoginOptions = {
        username,
        password,
        loginUrl,
        headless: true,
        logs: false,
        isPopup: false,
        loginSelector: ".sign-in",
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

    it("User Profile Navigation Test", () => {
      cy.intercept("/api/auth/session").as("getSession");
      cy.visit("http://localhost:3000");
      cy.get(".signed-in-as").click();
      cy.get(".user-profile-title").should("have.text", "User Profile");
      cy.get("header>section.mid").click();
      cy.url().should("include", "/");
    });

    it("Signed In and Sign out", () => {
      cy.intercept("/api/auth/session").as("getSession");
      cy.intercept("/api/auth/providers", (req) => {
        req.redirect("/");
      }).as("signInGoogle");
      cy.visit("http://localhost:3000");
      cy.wait("@getSession");
      cy.get(".signed-in-as")
        .should("have.attr", "alt")
        .and("include", "gmail.com");

      cy.get(".sign-out").click();
      cy.wait("@getSession");
      cy.get(".sign-in").click();
      cy.wait("@signInGoogle");
      cy.url().should("include", "/");
      cy.clearCookies();
    });
  }

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

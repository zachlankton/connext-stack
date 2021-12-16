/* eslint-disable cypress/no-unnecessary-waiting */
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

  it("Logged OUT - Admin Page Should show Not Authorized", () => {
    cy.visit("http://localhost:3000/admin");
    cy.contains("Not Authorized");
  });

  it("Close and Open SideBar", () => {
    cy.get(".sidebar-btn").click();
    cy.get("section.sidebar").should("not.have.class", "show-sidebar");
    cy.get(".main-content").should("not.have.class", "show-sidebar");
    cy.get(".sidebar-btn").click();
    cy.get("section.sidebar").should("have.class", "show-sidebar");
    cy.get(".main-content").should("have.class", "show-sidebar");
  });

  it("Check Sidebar Closes on Smaller Devices", () => {
    cy.viewport("iphone-6");
    cy.wait(1000);
    cy.get("section.sidebar").contains("Home").click();
    cy.wait(1000);
    cy.get("section.sidebar").should("not.have.class", "show-sidebar");
    cy.get(".main-content").should("not.have.class", "show-sidebar");
    cy.get(".sidebar-btn").click();
    cy.get("section.sidebar").should("have.class", "show-sidebar");
    cy.get(".main-content").should("have.class", "show-sidebar");
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

      cy.task("GoogleSocialLogin", socialLoginOptions, {
        timeout: 120000,
      }).then(({ cookies }) => {
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

    it("Logged IN - Admin Page Should show Not Authorized", () => {
      cy.intercept("/api/auth/session").as("getSession");
      cy.visit("http://localhost:3000/admin");
      cy.wait("@getSession");
      cy.get(".signed-in-as")
        .should("have.attr", "alt")
        .and("include", "gmail.com");
      cy.get(".sign-out").should("be.visible");
      cy.contains("Not Authorized");
    });

    it("Add Admin Role thru test API", () => {
      cy.request("http://localhost:3000/api/adminRoleAdd")
        .its("status")
        .should("equal", 200);
    });

    it("Admin User Has Access", () => {
      cy.intercept("/api/auth/session").as("getSession");
      cy.visit("http://localhost:3000/admin");
      cy.wait("@getSession");
      cy.get(".signed-in-as")
        .should("have.attr", "alt")
        .and("include", "gmail.com");
      cy.get(".sign-out").should("be.visible");
      cy.contains("User List");
    });

    it("View/Edit User Details", () => {
      cy.get(".ag-body-viewport").contains(username).click();
      cy.contains("User Profile Form");
      cy.get('[name="user.firstName"]').type("Test First Name");
      cy.get('[name="user.lastName"]').type("Test Last Name");
      cy.get('[name="user.username"]').type("TestUserName");
      cy.get('[name="user.phone"]').type("1234567890");
      cy.get('[name="user.street"]').type("123 Oak Street");
      cy.get('[name="user.city"]').type("SomeCity");
      cy.get('[name="user.state"]').type("SomeState");
      cy.get('[name="user.zipCode"]').type("65432");
      cy.get("form").contains("Add").click();
      cy.wait(1000);
      cy.get('[name="roles.roles[2]"]').select("Sales");
      cy.get("form").contains("Save").click();
    });

    it("Remove ALL Roles thru test API", () => {
      cy.request("http://localhost:3000/api/adminRoleAdd?remove")
        .its("status")
        .should("equal", 200);
    });

    it("Signed In and Sign out", () => {
      cy.intercept("/api/auth/session").as("getSession");
      cy.intercept("/api/auth/providers").as("signInGoogle");
      cy.visit("http://localhost:3000");
      cy.wait("@getSession");
      cy.get(".signed-in-as")
        .should("have.attr", "alt")
        .and("include", "gmail.com");

      cy.get(".sign-out").click();
      cy.wait("@getSession");
      cy.wait(1000);
      cy.get(".sign-in").click();
      cy.wait("@signInGoogle");
      cy.visit("http://localhost:3000");
      cy.url().should("include", "/");
      cy.clearCookies();
    });

    it("User Having No Roles Redirects", () => {
      const socialLoginOptions = {
        username,
        password,
        loginUrl,
        headless: true,
        logs: false,
        isPopup: false,
        loginSelector: ".sign-in",
        postLoginSelector: ".page>.error",
      };

      cy.task("GoogleSocialLogin", socialLoginOptions, {
        timeout: 120000,
      }).then(({ cookies }) => {
        cy.clearCookies();
        console.log(cookies);
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

    it("Reset USER Role thru test API", () => {
      cy.request("http://localhost:3000/api/adminRoleAdd?reset")
        .its("status")
        .should("equal", 200);
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

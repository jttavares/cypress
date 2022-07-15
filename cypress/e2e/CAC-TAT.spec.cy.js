/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("example to-do app", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    //
    cy.visit("./src/index.html");
  });

  it.only('acessa a pagina da politica removendo o target e entao clicando no link',()=>{
     cy.get('#privacy a')
      .invoke('removeAttr','target')
      .click()

      cy.contains('Talking About Testing').should('be.visible')
  })
  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique',()=>{
     cy.get('#privacy a').should('have.attr', 'target','_blank');
  })

  it("seleciona um arquivo utilizando uma fixture para  qual foi dada um alias", () => {
    it("seleciona um arquivo simulando drag an drop", () => {
      cy.fixture("example.json").as("sampleFile");
      cy.get('input[type="file"]#file-upload') //OU cy.get('input[type="file"]')
        .selectFile("@sampleFile", { action: "drag-drop" })
        .should((input) => {
          console.log(input);
          expect(input[0].files[0].name).to.equal("example.json");
        });
    });
  });

  it("seleciona um arquivo simulando drag an drop", () => {
    cy.get('input[type="file"]#file-upload') //OU cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        console.log(input);
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo da pasta feature", () => {
    cy.get('input[type="file"]#file-upload') //OU cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should((input) => {
        console.log(input);
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Jose");
    cy.get("#lastName").type("Tavares");
    cy.get("#email").type("jttavaresg@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Teste");
    //cy.get('button[type="submit"]').click();
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("marca ambo os checkbox, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("Selecionar produto por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("Selecionar produto por seu valor", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("Selecionar produto por seu index", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("Envia o formulário com sucesso usando comandos customizados", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    /*
    cy.get('#firstName')
    cy.get('#lastName')
    cy.get('#email')
    cy.get('#open-text-area')
    */
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

 
  context("with a checked task", () => {
    beforeEach(() => {
      // We'll take the command we used above to check off an element
      // Since we want to perform multiple tests that start with checking
      // one element, we put it in the beforeEach hook
      // so that it runs at the start of every test.
      cy.contains("Pay electric bill")
        .parent()
        .find("input[type=checkbox]")
        .check();
    });

    it("can filter for uncompleted tasks", () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      cy.contains("Active").click();

      // After filtering, we can assert that there is only the one
      // incomplete item in the list.
      cy.get(".todo-list li")
        .should("have.length", 1)
        .first()
        .should("have.text", "Walk the dog");

      // For good measure, let's also assert that the task we checked off
      // does not exist on the page.
      cy.contains("Pay electric bill").should("not.exist");
    });

    it("can filter for completed tasks", () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      cy.contains("Completed").click();

      cy.get(".todo-list li")
        .should("have.length", 1)
        .first()
        .should("have.text", "Pay electric bill");

      cy.contains("Walk the dog").should("not.exist");
    });

   
});

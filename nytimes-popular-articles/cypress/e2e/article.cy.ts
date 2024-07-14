/// <reference types="cypress" />

describe('NY Times Most Popular Articles', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should display a list of articles', () => {
      cy.get('li').should('have.length.greaterThan', 0);
    });
  
    it('should navigate to article detail on click', () => {
      cy.get('li').first().click();
      cy.url().should('include', '/article/');
      cy.get('h2').should('exist');
      cy.get('p').should('exist');
    });
  });

  
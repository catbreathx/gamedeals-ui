const elements = {
  searchResults: 'table tbody',
  dataRows: 'table tbody tr',
  firstDataCell: 'table tbody tr td:first',
  nextPageButton: 'button[aria-label="Goto next page"]',
  pageNumber: '[aria-label="Page Number"]:first',
  previousPageButton: 'button[aria-label="Goto previous page"]',
  searchSubmitButton: 'button[type=submit]',
  steamStoreColumns: 'table tbody tr td:nth-child(2):contains(Steam)',
  storeColumn: 'table tbody tr td:nth-child(2)',
};

const PAGE_SIZE = 60;

describe('Search', () => {
  it('can perform default search', () => {
    cy.visit('/');
    cy.get(elements.dataRows).should('have.length.at.least', 5);
  });

  it('can navigate to next and previous page of search results', () => {
    cy.visit('/');
    cy.get(elements.previousPageButton).first().should('be.disabled');
    cy.get(elements.dataRows).should('have.length.at.least', 5);

    cy.get(elements.searchResults).invoke('text').then(($searchResults) => {
      cy.wrap($searchResults).as('firstGameOnPageOne');
    });

    cy.get(elements.nextPageButton).first().click();

    cy.get(elements.pageNumber).then(($pageNumber) => {
      expect($pageNumber).to.have.text('Page: 2');
    });

    cy.get(elements.previousPageButton).first().click();
    cy.get(elements.pageNumber).then(($pageNumber) => {
      expect($pageNumber).to.have.text('Page: 1');
    });
  });

  it('can perform search by store', () => {
    cy.intercept('GET', '/api/1.0/deals?pageNumber=1&pageSize=60&storeID=1&title=').as('requestSteamGames');

    cy.visit('/');
    cy.get('#store-filter').should('be.visible');
    cy
      .get('#store-filter')
      .type('steam{downarrow}{enter}');

    cy.get(elements.searchSubmitButton).click();
    cy.get(elements.storeColumn).should('not.contain.text', 'AllYouPlay');
    cy.get(elements.steamStoreColumns).should('have.length', PAGE_SIZE);
  });
});
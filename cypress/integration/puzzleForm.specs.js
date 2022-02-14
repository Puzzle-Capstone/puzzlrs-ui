const { cyan } = require("@mui/material/colors")

describe('Add puzzle form page', () => {
  beforeEach(() => {
    // cy.intercept('POST', 'https://puzzlrs.herokuapp.com/api/v1/puzzles', {
    //   statusCode: 200,
    //   body: {
    //     user_id: 6,
    //     category: 'Art',
    //     missing_pieces: '1',
    //     piece_count: '1000',
    //     quality: 'Good',
    //     availability: true,
    //     original_price_point: '15.99',
    //     image: image
    //   }
    // })
    cy.fixture('./user.json').then((user) => {
			// console.log(user)
      cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/6', {
        statusCode: 200,
        body: user
      })
      cy.visit('http://localhost:3000');
      cy.get('.MuiInput-root').click();
      cy.get('[data-value="6"]').click();
      cy.get('.nav-buttons > :nth-child(1) > :nth-child(2) > button').click();
    })
  })

  it('should display a form to submit a puzzle', () => {
    cy.get('form').contains('Submit your puzzle')
  })

  it('should display error messages when trying to submit an empty form', () => {
    cy.get('button').contains('Submit').click();
    cy.get('#errorAlert').contains('Please upload a photo!');
  })

  it('should be able to fill out the form', () => {
    cy.fixture('./newPuzzle.json').then((puzzle) => {
      console.log(puzzle)
      cy.get('#category').click();
      cy.get(`[data-value=${puzzle.category}]`).click();
      cy.get('#missingPieces').click();
      cy.get(`[data-value=${puzzle.missing_pieces}]`).click();
      cy.get('#quality').click();
      cy.get(`[data-value=${puzzle.quality}]`).click();
      cy.get('#price').click().type(`${puzzle.original_price_point}`);
      cy.get('#pieceCount').click().type(`${puzzle.piece_count}`);
      // cy.get('#upload-photo-button').click();
      // cy.get('#uploadPhotoButton').click()
      cy.get('input[type="file"]').focus().click({ force: true})
      cy.wait(5000)
      // cy.get('input[type="file"]').then(function($input) {
      //   const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/png')
      //   $input.fileupload('add', {files: blob})
      // })
    })
    // cy.get('#upload-photo').click()
    // need to get back to this
  })

})
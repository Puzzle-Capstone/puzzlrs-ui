describe('home page', () => {
	beforeEach(() => {
		cy.fixture('./puzzles.json').then((allPuzzles) => {
			cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/puzzles', {
				statusCode: 200,
				body: allPuzzles
			})
			cy.visit('http://localhost:3000/');
		})
		cy.fixture('./user.json').then((user) => {
			cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/1', {
				statusCode: 200,
				body: user
			})
		})
	})
	
	it('should visit the home page on load and show log in dropdown and the information on the site', () => {
		cy.get('h1').contains('puzzlrs')
		.get('h2').contains('Tired of your puzzles? Trade with people like you!')
		.get('button').contains('View Available Puzzles')
		.get('.MuiFormControl-root').contains('Log In')
	})
	
	it('should be able to click the log in dropdown and see users', () => {
		cy.fixture('./user.json').then((user) => {
			cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/1', {
				statusCode: 200,
				body: user
			})
			cy.get('.MuiInput-root').click()
			.get('[data-value="Micha"]').click()
		})
	})

	it('should be able to click a user in the dropdown and then see the nav buttons populate', () => {
		cy.get('.MuiInput-root').click()
		.get('[data-value="Micha"]').click()
		.get(':nth-child(1) > button').contains('View Puzzles')
		.get(':nth-child(2) > button').contains('Add Puzzle')
		.get('.nav-buttons > :nth-child(1) > :nth-child(3) > button').contains('User Profile')
	})

	it('should be able to click the view puzzles button and see the puzzles', () => {
		cy.get('button').click()
		.get('.puzzles-container > section').should('have.length', 4)
	})

	it('should be able to click the add puzzle button and see the add puzzle form', () => {
		cy.get('.MuiInput-root').click()
		.get('[data-value="Micha"]').click()
		.get(':nth-child(2) > button').click()
		.url().should('include', 'add-puzzle')
		.get('form').should('be.visible')
	})

	it('should redirect to homepage by clicking the header', () => {
		cy.get('button').click()
		.get('h1').click()
		.get('.homepage').should('be.visible')
	})

})
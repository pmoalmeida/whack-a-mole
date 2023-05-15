describe('game', () => {
  it('should land on initial page', () => {
    cy.visit('https://whack-a-mole-sooty.vercel.app')
    cy.contains('Whack-a-mole!')
    cy.contains('PLAY')
    cy.contains('LEADERBOARD')
  })

  it('should go to leaderboard page', () => {
    cy.visit('https://whack-a-mole-sooty.vercel.app')
    cy.contains('LEADERBOARD').click()
    cy.contains('Leaderboard') // page title
    cy.contains('BACK TO HOME')
    cy.get('table').should('exist')
  })

  it('should go to player setup screen', () => {
    cy.visit('https://whack-a-mole-sooty.vercel.app')
    cy.contains('PLAY').click()
    cy.contains('BACK TO HOME')
  })

  it('should go to the game screen', () => {
    cy.visit('https://whack-a-mole-sooty.vercel.app')
    cy.contains('PLAY').click()
    cy.get("[id='playerName']").type('Test E2E')
    cy.contains('PLAY NOW!').click()
  })
})

describe('verify', () => {
    it('Navigate', () => {
        
        cy.visit('http://automationexercise.com');
    
        
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('body').should('contain', 'Home'); 
    
        
        cy.contains('Test Cases').click();
    
        
        cy.url().should('include', '/test_cases');
        cy.get('h2').should('contain.text', 'Test Cases'); 
    });
});
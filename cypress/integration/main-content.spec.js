
describe("Main content", () => {
    context("720p resolution", () => {
        beforeEach(() => {
            cy.viewport(1280, 720)
        })
    })

    it('Should visit home page', () => {
        cy.visit('/')
    });

    describe("when you visit home", () => {

        it("You should see content", () => {
            cy.get('[data-cy=main-content]').contains('Hello from pluto')
        })
    })
})
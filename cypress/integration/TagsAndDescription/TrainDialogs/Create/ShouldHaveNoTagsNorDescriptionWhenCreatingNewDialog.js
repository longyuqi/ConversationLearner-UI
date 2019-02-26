const models = require('../../../../support/Models')
const modelPage = require('../../../../support/components/ModelPage')
// const entities = require('../support/Entities')
// const actions = require('../support/Actions')
// const actionsGrid = require('../support/components/ActionsGrid')
// const editDialogModal = require('../support/components/EditDialogModal')
const train = require('../../../../support/Train')

export var testCompletedSuccessfully = false
describe('Create', () => {
  it('Should Have No Tags Nor Description When Creating New Dialog', () => {
    models.CreateNewModel('z-testReorg')
    modelPage.NavigateToTrainDialogs()
    train.CreateNewTrainDialog()
    cy.Enqueue(() => {testCompletedSuccessfully = true})
  })
})

describe('Create', () => {
  it('Just an extra test case to show how it looks', () => {
    cy.log('Always Passes')
    expect(true).to.equal(true)
  })
})
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */

export function CreateNewLogDialogButton() { cy.Get('[data-testid="log-dialogs-new-button"]').Click() }
export function ClickDoneTestingButton() { return cy.Get('[data-testid="chat-session-modal-done-testing-button"]').Click() }
export function ClickSessionTimeoutButton() { cy.Get('[data-testid="chat-session-modal-session-timeout-button"]').Click() }
export function TypeYourMessage(message) { cy.Get('input[placeholder="Type your message..."]').type(`${message}{enter}`) }  // data-testid NOT possible

export function TypeYourMessageValidateResponse(message, expectedResponse) {
  cy.Get('input[placeholder="Type your message..."]').type(`${message}{enter}`)  // data-testid NOT possible

  // Verify both the input message is reflected back and the response is what we are expecting.
  // This also has the useful side effect of blocking this function from returning until after
  // the response has been returned.
  let messageCount = 0
  let expectedUtterance = message.replace(/'/g, "’")
  cy.Get('.wc-message-content').then(elements => {
    messageCount = elements.length
    cy.wrap(elements[elements.length - 1]).contains(expectedUtterance)
  }).then(() => {
    if (expectedResponse) {
      expectedUtterance = expectedResponse.replace(/'/g, "’")
      cy.Get('.wc-message-content', { timeout: 60000 }).then(elements => {
        cy.wrap(elements[messageCount]).contains(expectedUtterance)
      })
    }
    else {
      cy.Get('.wc-message-content', { timeout: 60000 }).then(elements => {
        cy.wrap(elements[messageCount]).DoesNotContain(expectedUtterance)
      })
    }
  })
}
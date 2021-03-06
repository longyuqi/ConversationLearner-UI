/**
* Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
*/

import * as models from '../../support/Models'
import * as homePage from '../../support/components/HomePage'

describe('Create Model', () => {
  it('Tools', () => {
    models.CreateNewModel('z-model')
    homePage.Visit()
    homePage.GetModelListRowCount()
  })
})

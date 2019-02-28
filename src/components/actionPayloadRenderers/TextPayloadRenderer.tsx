/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import * as React from 'react'
import * as OF from 'office-ui-fabric-react'
import './TextPayloadRenderer.css'

interface Props {
    original: string
    currentMemory: string | null
}

interface State {
    isOriginalVisible: boolean
}

export default class Component extends React.Component<Props, State> {
    state: Readonly<State> = {
        isOriginalVisible: false
    }

    onChangedVisible = () => {
        this.setState(prevState => ({
            isOriginalVisible: !prevState.isOriginalVisible
        }))
    }

    render() {
        const showToggle = this.props.currentMemory !== null && this.props.currentMemory !== this.props.original

        return <div className={`${OF.FontClassNames.mediumPlus}`}>
            <div data-testid="action-scorer-text-response">{(this.props.currentMemory === null || this.state.isOriginalVisible)
                ? this.props.original
                : this.props.currentMemory
            }</div>
            {showToggle && <div>
                <OF.Toggle
                    checked={this.state.isOriginalVisible}
                    onChanged={this.onChangedVisible}
                />
            </div>}
        </div>
    }
}
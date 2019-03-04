/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import * as React from 'react'
import * as OF from 'office-ui-fabric-react'
import { FM } from '../../react-intl-messages'
import * as CLM from '@conversationlearner/models'
import * as ExtractorResponseEditor from '../ExtractorResponseEditor'
import { formatMessageId } from '../../Utils/util'
import { injectIntl, InjectedIntlProps } from 'react-intl'
// import { string } from 'prop-types';

// Renaming from Props because of https://github.com/Microsoft/tslint-microsoft-contrib/issues/339
interface ReceivedProps {
    onClose: Function
    onAccept: Function
    open: boolean
    entities: CLM.EntityBase[]
    extractResponse: CLM.ExtractResponse
    message?: () => React.ReactNode
}

type Props = ReceivedProps & InjectedIntlProps

const ExtractConflictModal: React.SFC<Props> = (props) => {
    const { intl } = props
    return (
        <OF.Dialog
            hidden={!props.open}
            className={OF.FontClassNames.mediumPlus}
            onDismiss={() => props.onClose()}
            dialogContentProps={{
                type: OF.DialogType.normal
            }}
            getStyles={() => {
                return {
                    main: [{
                        selectors: {
                            ['@media (min-width: 480px)']: {
                                maxWidth: '900px',
                                minWidth: '800px'
                            }
                        }
                    }]
                }
            }
            }
            modalProps={{
                isBlocking: false
            }}
        >
            {typeof props.message === 'function' && props.message()}
            <h2>
                <OF.Icon className="cl-icon cl-color-error" iconName="IncidentTriangle" />
                {formatMessageId(intl, FM.EXTRACTCONFLICTMODAL_TITLE)}
            </h2>
            <p>{formatMessageId(intl, FM.EXTRACTCONFLICTMODAL_SUBTITLE)}</p>
            <p>{formatMessageId(intl, FM.EXTRACTCONFLICTMODAL_EXISTING)}</p>
            <ExtractorResponseEditor.EditorWrapper
                render={(editorProps, onChangeCustomEntities) =>
                    <ExtractorResponseEditor.Editor
                        readOnly={true}
                        isValid={true}
                        entities={props.entities}
                        {...editorProps}

                        onChangeCustomEntities={onChangeCustomEntities}
                        onClickNewEntity={() => { }}
                    />
                }
                entities={props.entities}
                extractorResponse={props.extractResponse}
                onChange={() => { }}
            />
            <p>{formatMessageId(intl, FM.EXTRACTCONFLICTMODAL_BAD)}</p>
            <ExtractorResponseEditor.EditorWrapper
                render={(editorProps, onChangeCustomEntities) =>
                    <ExtractorResponseEditor.Editor
                        readOnly={true}
                        isValid={true}
                        entities={props.entities}
                        {...editorProps}

                        onChangeCustomEntities={onChangeCustomEntities}
                        onClickNewEntity={() => { }}
                    />
                }
                entities={props.entities}
                extractorResponse={props.extractResponse}
                onChange={() => { }}
            />
            <p>{formatMessageId(intl, FM.EXTRACTCONFLICTMODAL_CALLTOACTION)}</p>
            <OF.DialogFooter>
                <OF.DefaultButton
                    onClick={() => props.onAccept()}
                    text={formatMessageId(intl, FM.BUTTON_ACCEPT)}
                />
                <OF.PrimaryButton
                    onClick={() => props.onClose()}
                    text={formatMessageId(intl, FM.BUTTON_CLOSE)}
                />
            </OF.DialogFooter>
        </OF.Dialog>
    )
}
export default injectIntl(ExtractConflictModal)
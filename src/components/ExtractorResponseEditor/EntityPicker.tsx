/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import * as React from 'react'
import { IOption, IPosition, MatchedOption } from './models'
import FuseMatch from './FuseMatch'
import './EntityPicker.css'

interface MenuProps {
    highlightIndex: number
    isOverlappingOtherEntities: boolean
    isVisible: boolean
    matchedOptions: MatchedOption<IOption>[]
    maxDisplayedOptions: number
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void
    onChangeSearchText: (value: string) => void
    onClickOption: (o: IOption) => void
    onClickNewEntity: (entityTypeFilter: string) => void
    position: IPosition | null
    menuRef: any
    searchText: string
    value: any,
    entityTypeFilter: string
}

interface ComponentState {
    resultsRef: React.RefObject<HTMLDivElement>
}
export default class EntityPicker extends React.Component<MenuProps, ComponentState> {
    state: ComponentState = {
        resultsRef: React.createRef<HTMLDivElement>()
    }

    componentDidUpdate(prevProps: MenuProps, prevState: ComponentState) {
        if (this.props.highlightIndex !== prevProps.highlightIndex && this.state.resultsRef.current) {
            this.scrollHighlightedElementIntoView(this.state.resultsRef.current)
        }
    }

    scrollHighlightedElementIntoView = (resultsElement: HTMLDivElement) => {
        const selectedElement = resultsElement
            ? resultsElement.querySelector('.custom-toolbar__result--highlight') as HTMLUListElement
            : null

        if (selectedElement) {
            setTimeout(() => {
                selectedElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                })
            }, 0)
        }
    }

    render() {
        const style: any = {
            left: this.props.isVisible ? `1em` : null,
            bottom: (this.props.isVisible && this.props.position) ? `${this.props.position.bottom}px` : null,
            height: !this.props.isOverlappingOtherEntities ? "14em" : "4em",
            marginBottom: !this.props.isOverlappingOtherEntities ? "0" : "1em"
        }

        if (this.props.isOverlappingOtherEntities) {
            return null
        }
        return (
            <div
                className={`custom-toolbar ${this.props.isVisible ? "custom-toolbar--visible cl-ux-shadowed" : ""}`}
                onKeyDown={this.props.onKeyDown}
                ref={this.props.menuRef}
                style={style}
                role="button"
            >
                <React.Fragment>
                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => this.props.onClickNewEntity(this.props.entityTypeFilter)}
                    className="custom-toolbar__new-entity-button"
                >
                    New Entity
                </button>
                <div className="custom-toolbar__search">
                    <input
                        data-testid="entity-picker-entity-search"
                        id="toolbar-input"
                        type="text"
                        placeholder="Search for entities"
                        value={this.props.searchText}
                        className="custom-toolbar__input"
                        onChange={event => this.props.onChangeSearchText(event.target.value)}
                    />
                </div>
                <div className="custom-toolbar__results" ref={this.state.resultsRef}>
                    {this.props.matchedOptions.length === 0
                        ? <div className="custom-toolbar__result">No matching entites</div>
                        : this.props.matchedOptions.map((matchedOption, i) =>
                            <div
                                key={matchedOption.original.id}
                                onClick={() => this.props.onClickOption(matchedOption.original)}
                                className={`custom-toolbar__result ${this.props.highlightIndex === i ? 'custom-toolbar__result--highlight' : ''}`}
                                role="button"
                            >
                                <FuseMatch matches={matchedOption.matchedStrings} />
                            </div>
                        )}
                    </div>
                </React.Fragment>
            </div>
        )
    }
}
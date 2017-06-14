import * as React from 'react';
export default class TrainingGroundArenaHeader extends React.Component<any, any> {
    constructor(p: any) {
        super(p)
    }
    render() {
        return (
            <div className='trainingGroundArenaHeader'>
                <span className="ms-font-xxl trainingGroundHeaderContent">{this.props.title}</span>
                <span className="ms-font-m-plus trainingGroundHeaderContent">{this.props.description}</span>
            </div>
        )
    }
}
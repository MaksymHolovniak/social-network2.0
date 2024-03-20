import React, {ChangeEvent} from 'react'
import s from './ProfileInfo.module.css';

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }


    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deActivateMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType){
        if(prevProps.status !== this.props.status) {
            this.setState({
            status: this.props.status
        })
        }
    }

    render() {
        return (
            <div>
                {this.state.editMode?
                <div className={s.inputProfileStatus}><input onChange={this.onStatusChange} autoFocus={true} onBlur={ this.deActivateMode } value={this.state.status}></input></div> :
                <div><p onClick={ this.activateEditMode }>{this.props.status || 'Enter a status'}</p></div>
                }
            </div>
            )
        }
}


export default ProfileStatus
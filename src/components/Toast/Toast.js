import React, {Component} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
class Toast extends Component {


    notify = () => {
        if(this.props.type === 'success') {
            toast.success('Success Notification', {position: toast.POSITION.BOTTOM_RIGHT})
        }
        if(this.props.type === 'error') {
            toast.error('Error Notification', {position: toast.POSITION.TOP_LEFT})
        }
        // toast('Basic Notification', {position: toast.POSITION.TOP_RIGHT});
        //
        // toast.info('Info Notification', {position: toast.POSITION.BOTTOM_LEFT})
        // toast.warn('Warn Notification', {position: toast.POSITION.BOTTOM_CENTER})
    }
    render() {
        return (
            <div>
                {this.notify()}
            </div>

        )
    }
}

export default Toast;
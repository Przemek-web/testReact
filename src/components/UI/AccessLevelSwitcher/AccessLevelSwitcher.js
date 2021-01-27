import React, { Component } from 'react';
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import {Button, Dropdown, Menu} from "antd";
import {supportedLocales} from "../../../config/i18n";
import Item from "antd/es/list/Item";
import {DownOutlined, OrderedListOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {supportedAccessLevels} from "../../../config/accessLevels";

class AccessLevelSwitcher extends Component {

    handleAccessLevelClick = (e, role) => {
        // e.preventDefault();

        this.props.setCurrentAccessLevel(role);
    };
    render() {
        const buttonStyle = {
            backgroundColor: '#ffe0b3',
            borderRadius: '15px'
        }

        const accessLevels = (
            <Menu>

                {this.props.user.roles.map(role => (
                    <Menu.Item
                        href="#"
                        key={role.authority}
                        active={role === this.props.currentRole}
                        onClick={e => this.handleAccessLevelClick(e,role)}
                    >
                        {supportedAccessLevels[role.authority]}
                    </Menu.Item>
                ))}


            </Menu>
        );
        return(
            <div>

                <Dropdown overlay={accessLevels}
                          >
                    <Button style={buttonStyle}>
                        <OrderedListOutlined />
                        AccessLevels <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        currentRole: state.auth.currentRole
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentAccessLevel : (role) => dispatch(actions.setAccessLevel(role))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( AccessLevelSwitcher );
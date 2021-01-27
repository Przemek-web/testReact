import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { supportedLocales } from "../../../config/i18n";
import { setLocaleWithFallback } from "../../../store/actions/i18n";
import {Button, Dropdown, Menu} from "antd";
import {DownOutlined, GlobalOutlined} from "@ant-design/icons";
import {Translate} from "react-redux-i18n";

class LanguageSwitcher extends React.Component {
    handleLanguageLinkClick = (e, code) => {
        //e.preventDefault();

        this.props.setLocaleWithFallback(code);
    };

    render() {
        const buttonStyle = {
            backgroundColor: '#ffe0b3',
            borderRadius: '15px'
        }
        const menu = (
            <Menu theme="light">

                {Object.keys(supportedLocales).map(code => (
                    <Menu.Item
                        style={{float:'center'}}
                        href="#"
                        key={code}
                        active={code === this.props.locale}
                        onClick={e => this.handleLanguageLinkClick(e, code)}
                    >
                        {supportedLocales[code]}
                    </Menu.Item>
                ))}


            </Menu>
        );
        return (
            <div>
            <Dropdown overlay={menu}>
                <Button style={buttonStyle}>
                    <GlobalOutlined />
                    <Translate value="concerts.language" /> <DownOutlined />
                </Button>
            </Dropdown>

            </div>
        );
    }
}

LanguageSwitcher.propTypes = {
    locale: PropTypes.string.isRequired,
    setLocaleWithFallback: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ locale: state.i18n.locale });

const mapDispatchToProps = { setLocaleWithFallback };

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);

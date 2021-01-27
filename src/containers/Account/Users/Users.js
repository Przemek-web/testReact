import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Table, Input, Space, Button, Popconfirm, Card} from 'antd';
import Highlighter from 'react-highlight-words';
import {DownOutlined, EditOutlined, SearchOutlined, UsergroupAddOutlined, UserOutlined} from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import Avatar from "antd/es/avatar/avatar";



class Users extends Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data:null
    };
    componentDidMount () {
        //console.log(this.props);
        this.props.onStoreResult();

    }


    onUpdateHandler = (id) => {
        console.log('update ' + id)
        this.props.history.push(`/users/${id}`)
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    conditionalCheck = (image) => {

        if(image !== null) {
            return (
                <Avatar src={`data:image/jpeg;base64, ${image.lob}`} size={40}
                        style={{
                            backgroundColor: '#ff8080'

                        }}/>
            )
        } else {
            return (
                <Avatar
                    size={40}
                    style={{
                        backgroundColor: '#ff8080'

                    }}
                    icon={<UserOutlined />}/>
                )

        }
    }

    render() {
        let result =
                <Avatar src={`data:image/jpeg;base64, ${'image'}`} size={30}
                        style={{
                            backgroundColor: '#ff8080'

                        }}/>

        // let result = <Avatar
        //     size={40}
        //     style={{
        //         backgroundColor: '#ff8080'
        //
        //     }}
        //     icon={<UserOutlined />}/>
        const tableStyle = {
            width: '70%',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            border:'none'

        };

        const buttonStyle = {
            backgroundColor: '#ffe0b3',
            borderRadius: '15px'
        }

        const columns = [
            {
                title: 'Image',
                dataIndex: 'image',
                key: 'image',
                width: '25%',
                render: (image) => this.conditionalCheck(image)

            },

            {
                title: 'Login',
                dataIndex: 'login',
                key: 'login',
                width: '25%',
                ...this.getColumnSearchProps('login'),
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width: '25%',
                ...this.getColumnSearchProps('email'),
            },

            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: (text,record) => (
                    // <Button onClick={console.log("Record: " +record.key)}>Edytuj</Button>
            <Popconfirm title="Sure to
            ?" onConfirm={() => this.onUpdateHandler(record.id)}>
                <Button style={buttonStyle}>
                    <EditOutlined />
                    Details</Button>
            </Popconfirm>
                ),
            },
        ];
        return (
            <div>
                <Card style={tableStyle} headStyle={{backgroundColor:'#ff8080', borderRadius:'15px', color:'white', fontSize:'20px'}}
                      title={<div style={{color:'white'}} ><UsergroupAddOutlined /> Users</div>}> </Card>
                <Table style={tableStyle} columns={columns} dataSource={this.props.storedResults}  />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        storedResults: state.user.users
    }
};

const mapDispatchToProps = dispatch => {
    return {

        onStoreResult: () => dispatch(actionCreators.initUsers()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
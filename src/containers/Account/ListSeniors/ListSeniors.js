import React, {Component} from "react";
import {List, Avatar, Space, Card, Row, Col, Checkbox, Button, Popconfirm, Input, Table} from 'antd';
import {
    MessageOutlined,
    LikeOutlined,
    StarOutlined,
    UserOutlined,
    EditOutlined,
    SearchOutlined, UsergroupAddOutlined
} from "@ant-design/icons";
import UserDataService from "../../../service/UserDataService";
import axios from "axios";
import Highlighter from "react-highlight-words";


const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

class ListSeniors extends Component {

    state = {
        // volunteers: [],
        //
        // checkedCooking: false,
        // checkedCleanup: false,
        // checkedTransport: false,
        // checkedShopping: false,
        // checkedRehabilitation: false,
        // checkedNursing: false,
        //
        // checkedMonday: false,
        // checkedTuesday: false,
        // checkedWednesday: false,
        // checkedThursday: false,
        // checkedFriday: false,
        // checkedSaturday: false
        seniors: []

    }

    componentDidMount() {



        UserDataService.getAllSeniors()
            .then(response => {
                console.log('Response seniors ' + JSON.stringify(response));
                this.setState({
                    seniors: response.data,

                })




            })
    }




    conditionalCheck = (seniorDetails) => {

        let array = []




            if (seniorDetails.acceptCertificate === false) {
                array.push("Do sprawdzenia")

            } else if (seniorDetails.acceptCertificate === null) {
                array.push("Brak oświadczenia")
            } else {
                array.push("Sprawdzone")
            }




        return array;
    }




    onUpdateHandler = (id) => {
        console.log('update ' + id)
        this.props.history.push(`/senior/${id}`)
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


    render() {
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

            // {
            //     title: 'Login seniora rezerwującego usługę',
            //     dataIndex: 'senior',
            //     key: 'senior',
            //     width: '25%',
            //     render: (senior) => <div>{senior.login}</div>
            //
            // },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width: '25%',
                ...this.getColumnSearchProps('email'),

            },
            // {
            //     title: 'Koszt rezerwacji w punktach',
            //     dataIndex: 'totalPoints',
            //     key: 'totalPoints',
            //     width: '25%',
            //     ...this.getColumnSearchProps('totalPoints'),
            //
            // },
            {
                title: 'Orzeczenie o niepełnosprawności',
                dataIndex: 'seniorDetails',
                key: 'seniorDetails',
                width: '25%',
                render: (seniorDetails) => this.conditionalCheck(seniorDetails)

            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: (text,record) => (

                    <Popconfirm title="Sure to
            ?" onConfirm={() => this.onUpdateHandler(record.id)}>
                        <Button style={buttonStyle}>
                            <EditOutlined />
                            Zobacz szczegóły</Button>
                    </Popconfirm>
                ),
            },


        ];

        return(
            <div>

                <Card style={tableStyle} headStyle={{backgroundColor:'#ff8080', borderRadius:'15px', color:'white', fontSize:'20px'}}
                      title={<div style={{color:'white'}} ><UsergroupAddOutlined /> Seniorzy</div>}> </Card>
                <Table style={tableStyle} columns={columns} dataSource={this.state.seniors}  />



            </div>
        )
    }
}

export default ListSeniors;
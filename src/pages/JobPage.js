import React, { useState } from 'react'
import HeaderLogo from '../components/HeaderLogo';
import NewJob from '../components/NewJob';

// Ant Design
import { Col, Divider, Input, Row, Space, Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PrioritySelect from '../components/PrioritySelect';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Priority',
    key: 'priority',
    dataIndex: 'priority',
    render: (_, { tags }) => (
      <React.Fragment>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </React.Fragment>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

function JobPage() {
  const [jobs, setJobs] = useState([]);

  return (
    <React.Fragment>
      <div className='header'>
        <HeaderLogo />
      </div>
      <Divider />
      <NewJob />

      <div className='job-wrapper' style={{ marginTop: 30 }}>
        <p className='title'>Job List</p>
      </div>

      <div className='list-count'>
        <span>(3/3)</span>
      </div>
      <div className='list-wrapper'>
        <Row gutter={[16, 16]} className='job-content'>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Input size="large" placeholder="Job Name" prefix={<SearchOutlined />} />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <PrioritySelect defaultValue="all" />
          </Col>
        </Row>
      </div>
      <Table columns={columns} dataSource={jobs} />
    </React.Fragment>
  )
}
export default JobPage;
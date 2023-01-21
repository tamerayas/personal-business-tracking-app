import React, { useState, useEffect } from 'react'
import HeaderLogo from '../components/HeaderLogo';
import NewJob from '../components/NewJob';

// Ant Design
import { Button, Col, Divider, Input, Row, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import PrioritySelect from '../components/PrioritySelect';

function JobPage() {
  const [jobs, setJobs] = useState(JSON.parse(localStorage.getItem('jobs')) || []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'jobName',
      key: 'jobName',
      width: '70%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Priority',
      key: 'priority',
      dataIndex: 'priority',
      width: '20%',
      render: (_, {priority}) => {
        const color = priority === 'Urgent' ? '#3b5999' : priority === 'Regular' ? '#87d068' : '#108ee9'
        return (
          <React.Fragment>
            <Tag color={color} >
              {priority}
            </Tag>
          </React.Fragment>
        )}
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />}></Button>
          <Button icon={<DeleteOutlined />} onClick={()=> handleDelete(record.id)}></Button>
        </Space>
      ),
    },
  ];

  const handleDelete = value => {
    const jobsCopy = [...jobs];

    const index = jobsCopy.findIndex(data => data.id === value);
    jobsCopy.splice(index, 1)
    setJobs(jobsCopy);
  }

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  return (
    <React.Fragment>
      <div className='header'>
        <HeaderLogo />
      </div>
      <Divider />
      <NewJob setJobData={(value) => setJobs(value)}/>

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
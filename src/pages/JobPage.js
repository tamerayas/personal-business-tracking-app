import React, { useState, useEffect } from 'react'
import HeaderLogo from '../components/HeaderLogo';
import NewJob from '../components/NewJob';
import PrioritySelect from '../components/PrioritySelect';
import EditModal from '../components/EditModal';

// Ant Design
import { Button, Col, Divider, Input, Modal, Row, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';

const { confirm } = Modal;


function JobPage() {
  const [jobs, setJobs] = useState(JSON.parse(localStorage.getItem('jobs')) || []);
  const [isEditActive, setIsEditActive] = useState(false);
  const [selectedEditRecord, setSelectedEditRecord] = useState(null);

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
      render: (_, { priority }) => {
        const color = priority === 'Urgent' ? '#3b5999' : priority === 'Regular' ? '#87d068' : '#108ee9'
        return (
          <React.Fragment>
            <Tag color={color} >
              {priority}
            </Tag>
          </React.Fragment>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {
            setIsEditActive(true);
            setSelectedEditRecord(record);
          }}>
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record.id)}></Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = id => {
    confirm({
      title: 'Are you sure you want to delete it?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
      okText: 'Approve',
      bodyStyle: {
        display: 'flex',
      }
    });
  };

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
      {isEditActive &&
        <EditModal handleCancel={() => setIsEditActive(false)} data={selectedEditRecord} />
      }
      <div className='header'>
        <HeaderLogo />
      </div>
      <Divider />
      <NewJob setJobData={(value) => setJobs(value)} />

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
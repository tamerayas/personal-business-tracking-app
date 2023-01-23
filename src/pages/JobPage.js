import React, { useState } from 'react'

//components
import HeaderLogo from '../components/HeaderLogo';
import NewJob from '../components/NewJob';
import PrioritySelect from '../components/PrioritySelect';
import EditModal from '../components/EditModal';
import sortJobs from '../utils/sortJobs';
import setLocalJobs from '../utils/setLocalJobs';

// Ant Design
import { Button, Col, Divider, Input, Modal, Row, Space, Table, Tag, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function JobPage() {
  const initialJobs = JSON.parse(localStorage.getItem('jobs')) || [];

  const [jobs, setJobs] = useState(initialJobs);
  const [totalCount, setTotalCount] = useState(jobs.length);
  const [isEditActive, setIsEditActive] = useState(false);
  const [selectedEditRecord, setSelectedEditRecord] = useState(null);
  const [priority, setPriority] = useState('Choose');
  const [paging, setPaging] = useState({
    current: 1,
    defaultPageSize: 5,
    pageSize: 5
  });
  const [filterData, setFilterData] = useState({
    priority: "all",
    jobName: ""
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'jobName',
      key: 'jobName',
      width: '70%',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Priority',
      key: 'priority',
      width: '20%',
      dataIndex: 'priority',
      render: (_, { priority }) => {
        const color = priority === 'Urgent' ? '#3b5999' : priority === 'Regular' ? '#87d068' : '#108ee9'
        return (
          <React.Fragment key={priority}>
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
    setLocalJobs(jobsCopy);
    setTotalCount(totalCount - 1);
  };

  const editRecord = value => {
    const jobsCopy = [...jobs];
    const selectedRecord = selectedEditRecord;

    jobsCopy.find(data => data.id === selectedRecord.id).priority = value;
    sortJobs(jobsCopy);
    setJobs(jobsCopy);
    setLocalJobs(jobsCopy);
    setIsEditActive(false);
  }

  const filterJobs = () => {
    let filtered = [];
    initialJobs.filter(job => {
      const isJobNameMatched = job.jobName.toLowerCase().includes(filterData.jobName.toLowerCase());
      const isPriorityMatched = filterData.priority === 'all' || job.priority === filterData.priority;

      if (isJobNameMatched && isPriorityMatched) {
        filtered.push(job);
      }

      setJobs(filtered);
      return filtered;

    })
  }

  return (
    <React.Fragment>
      {isEditActive &&
        <EditModal
          handleCancel={() => setIsEditActive(false)}
          data={selectedEditRecord}
          editRecord={editRecord}
          priority={selectedEditRecord.priority}
        />
      }
      <div className='header'>
        <HeaderLogo />
      </div>
      <Divider />
      <NewJob
        setJobData={(value) => {
          setJobs(value);
          setTotalCount(totalCount + 1);
          setLocalJobs(value);
        }}
        priority={priority}
        setPriorityData={(value) => setPriority(value)}
      />

      <div className='job-wrapper' style={{ marginTop: 30 }}>
        <p className='title'>Job List</p>
        <span>
          ({paging.pageSize * paging.current > totalCount ? totalCount : paging.pageSize * paging.current}/{totalCount})
        </span>
      </div>
      <div className='list-wrapper'>
        <Row gutter={[16, 16]} className='job-content'>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Input
              size="large"
              placeholder="Job Name"
              prefix={<SearchOutlined />}
              onChange={(event) => {
                let value = event.target.value;
                setFilterData(Object.assign(filterData, { jobName: value }))
                filterJobs();
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <PrioritySelect
              defaultValue="all"
              handleSelect={(value) => {
                setFilterData(Object.assign(filterData, { priority: value }))
                filterJobs();
              }}
            />
          </Col>
        </Row>
      </div>
      <Table
        columns={columns}
        dataSource={jobs}
        scroll={{ x:  300 }}
        rowKey={data => data.id}
        pagination={{ defaultPageSize: 5 }}
        onChange={(paging) => setPaging(paging)}
      />
    </React.Fragment>
  )
}
export default JobPage;
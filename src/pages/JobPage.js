import React, { useState } from 'react'
import HeaderLogo from '../components/HeaderLogo';
import NewJob from '../components/NewJob';
import PrioritySelect from '../components/PrioritySelect';
import EditModal from '../components/EditModal';

// Ant Design
import { Button, Col, Divider, Input, Modal, Row, Space, Table, Tag, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import sortJobs from '../utils/sortJobs';

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
      render: (text) => <Typography.Text key={text} ellipsis={true}>{text}</Typography.Text>,
    },
    {
      title: 'Priority',
      key: 'priority',
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
      render: (_, record) => (
        <Space size="middle" key={record.id}>
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
    setLocalJobsData(jobsCopy);
    setTotalCount(totalCount - 1);
  };

  const editRecord = value => {
    const jobsCopy = [...jobs];
    const selectedRecord = selectedEditRecord;

    jobsCopy.find(data => data.id === selectedRecord.id).priority = value;
    sortJobs(jobsCopy);
    setJobs(jobsCopy);
    setLocalJobsData(jobsCopy);
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

  const setLocalJobsData = jobs => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
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
          setLocalJobsData(value);
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
                setFilterData(Object.assign(filterData, { jobName: event.target.value }))
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
        pagination={{ defaultPageSize: 5 }}
        onChange={(paging) => setPaging(paging)}
      />
    </React.Fragment>
  )
}
export default JobPage;
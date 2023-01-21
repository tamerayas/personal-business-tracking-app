import React, { useState } from 'react'
import { Button, Col, Input, Row, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PrioritySelect from './PrioritySelect';

function NewJob(props) {
	const [jobName, setJobName] = useState("");
	const [priority, setPriority] = useState('Choose');
	const [messageApi, contextHolder] = message.useMessage();
	const { setJobData } = props;
	/**
	 * It removes non alphanumeric chars from input value.
	 */
	const handleInputChange = event => {
		const value = event.target.value;
		const replacedValue = value.replace(/[^0-9a-z]/gi, '');
		setJobName(replacedValue)
	}

	const handleCreate = () => {

		if (!priority || !jobName) {
			messageApi.info('Please fill all inputs!');
			return;
		}

		const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
		const newValue = JSON.stringify([...jobs, { id: Math.floor(Math.random() * 10000), priority, jobName }]);
		setJobName("");
		setPriority('Choose');
		setJobData(JSON.parse(newValue));
	}

	return (
		<React.Fragment>
			{contextHolder}
			<div className='job-wrapper'>
				<p className='title'>Create New Job</p>
			</div>
			<Row gutter={[16, 16]} className='job-content'>
				<Col xs={24} sm={10} md={12} lg={12} xl={16}>
					<div>
						<label>Job Name</label>
					</div>
					<Input size="large" maxLength="255" onChange={handleInputChange} value={jobName} />
				</Col>
				<Col xs={24} sm={8} md={8} lg={8} xl={5}>
					<div>
						<label>Job Priority</label>
					</div>

					<PrioritySelect defaultValue="" handleSelect={(value) => setPriority(value)} priority={priority}/>

				</Col>
				<Col xs={24} sm={6} md={4} lg={4} xl={3}>
					<Button size='large' type='primary' icon={<PlusOutlined />} style={{ width: '100%' }} onClick={handleCreate}>
						Create
					</Button>
				</Col>
			</Row>
		</React.Fragment>
	)
}
export default NewJob;

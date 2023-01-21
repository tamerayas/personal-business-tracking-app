import React, { useState } from 'react'
import { Button, Col, Input, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PrioritySelect from './PrioritySelect';

function NewJob() {
	const [jobName, setJobName] = useState("");

	/**
	 * It removes non alphanumeric chars from input value.
	 */
	const handleInputChange = event => {
		const value = event.target.value;
		const replacedValue = value.replace(/[^0-9a-z]/gi, '');
		setJobName(replacedValue)
	}

	return (
		<React.Fragment>
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

					<PrioritySelect defaultValue="" />

				</Col>
				<Col xs={24} sm={6} md={4} lg={4} xl={3}>
					<Button size='large' type='primary' icon={<PlusOutlined />} style={{ width: '100%' }}>
						Create
					</Button>
				</Col>
			</Row>
		</React.Fragment>
	)
}
export default NewJob;

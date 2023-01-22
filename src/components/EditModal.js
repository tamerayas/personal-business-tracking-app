import React, { useState } from 'react'
import { Input, Modal } from 'antd';
import PrioritySelect from './PrioritySelect';

function EditModal(props) {
  const { handleCancel, data, editRecord, priority } = props;
  const [selectedPriority, setSelectedPriority] = useState(priority);
  return (
    <Modal
      title="Job Edit"
      className="job-content"
      open={true}
      okText="Save"
      okType='danger'
      onCancel={() => handleCancel()}
      onOk={() => editRecord(selectedPriority)}
    >
      <div className='mt-10'>
        <label>Job Name</label>
      </div>
      <Input size="large" maxLength="255" value={data.jobName} disabled />
      <div className='mt-10'>
        <label>Job Priority</label>
      </div>
      <PrioritySelect priority={selectedPriority} handleSelect={value => setSelectedPriority(value)} />
    </Modal>
  )
}
export default EditModal;
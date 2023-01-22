import React from 'react'
import { Input, Modal } from 'antd';
import PrioritySelect from './PrioritySelect';

function EditModal(props) {
  const { handleCancel, data } = props;
  return (
    <Modal title="Job Edit" open={true} onCancel={() => handleCancel()} className="job-content">
      <div>
        <label>Job Name</label>
      </div>
      <Input size="large" maxLength="255" value={data.jobName} disabled/>
      <div>
        <label>Priority</label>
      </div>
      <PrioritySelect priority={data.priority}/>

    </Modal>
  )
}
export default EditModal;
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'

const initialOptions = [
  { value: 'Urgent', label: 'Urgent' },
  { value: 'Regular', label: 'Regular' },
  { value: 'Trivial', label: 'Trivial' },
];

function PrioritySelect(props) {
  const [options, setOptions] = useState(initialOptions);
  
  const { defaultValue, handleSelect, priority } = props;

  useEffect(() => {
    if (defaultValue) {
      const optionsCopy = [...options];
      optionsCopy.unshift({ value: 'all', label: 'Priority (all)' })
      setOptions(optionsCopy);
    }
  }, [defaultValue]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Select
      size='large'
      value={priority}
      defaultValue={defaultValue ? defaultValue : 'Choose'}
      style={{ width: '100%' }}
      onChange={handleSelect}
      options={options}
    />
  )
}
export default PrioritySelect;
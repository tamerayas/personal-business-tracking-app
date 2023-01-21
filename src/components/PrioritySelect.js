import React, { useEffect, useState } from 'react'
import { Select } from 'antd'

const initialOptions = [
  { value: 'Acil', label: 'Acil' },
  { value: 'Önemli', label: 'Önemli' },
  { value: 'Normal', label: 'Normal' },
];

function PrioritySelect(props) {
  const [options, setOptions] = useState(initialOptions);
  
  const { defaultValue } = props;

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
      defaultValue={defaultValue ? defaultValue : 'Choose'}
      style={{ width: '100%' }}
      // onChange={handleChange}
      options={options}
    />
  )
}
export default PrioritySelect;
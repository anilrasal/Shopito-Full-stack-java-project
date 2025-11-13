import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react'

const SizeSelector = ({category,selected, setSelected}) => {
    const options = category ==='fasion'?
    ['XS','S','M','L','XL']:['128GB','256GB','512GB'];
  return (
    <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={(e,val)=>setSelected(val)}
        sx={{gap:1, mb:2,flexWrap:'wrap',display:'flex'}}
    >
        <Stack spacing={1} direction='row'>
        {options.map((opt)=>(
            <ToggleButton key={opt} value={opt}>
                {opt}
            </ToggleButton>
        ))}
        </Stack>
    </ToggleButtonGroup>
  )
}

export default SizeSelector;
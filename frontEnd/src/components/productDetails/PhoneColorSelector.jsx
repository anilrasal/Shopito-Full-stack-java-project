import { Stack, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import React from 'react'

const PhoneColorSelector = ({selectedColor, setSelectedColor}) => {
    const colors =[
        {name:'Midnight', hex:'#1c1c1e' },
    { name: 'Starlight', hex: '#f5f5dc' },
    { name: 'Blue', hex: '#007aff' },
    ]
    return (
    <ToggleButtonGroup
        value={selectedColor}
        exclusive
        onChange={(e, val)=>setSelectedColor(val)}
        sx={{gap:1,mb:2}}
    >
        <Stack direction='row' spacing={1}>
        {colors.map(({name, hex})=>(
            
                <Tooltip title={name} key={name}>
                    
                    <ToggleButton
                        value={name}
                        sx={{
                            width:32,
                            height:32,
                            borderRadius:'50%',
                            backgroundColor:hex,
                            border: selectedColor===name?'2px solid #000':'1px solid #cccc',
                            '&.Mui-selected':{
                                backgroundColor:hex, // preserves original color
                                borderColor:'#000'
                            },
                            '&:hover':{
                                backgroundColor: hex,
                                opacity:0.8
                            }
                        }}
                    />
                </Tooltip>
            
        ))}
        </Stack>
    </ToggleButtonGroup>
  )
}

export default PhoneColorSelector
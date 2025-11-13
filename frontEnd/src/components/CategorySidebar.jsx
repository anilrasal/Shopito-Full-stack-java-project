import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CategoryIcon from '@mui/icons-material/Category';
import DevicesIcon from '@mui/icons-material/Devices'; // or use category-specific icons
import CheckroomIcon from '@mui/icons-material/Checkroom';
import KitchenIcon from '@mui/icons-material/Kitchen';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'
import SportsIcon from '@mui/icons-material/Sports';

import {Box, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'

const CategorySidebar = ({categories, selectedCategory, onSelect}) => {
  const categoryIcons={
    Electronics: <DevicesIcon/>,
    Fashion: <CheckroomIcon />,
    "Home & Kitchen": <KitchenIcon />,
    Beauty: <FaceRetouchingNaturalIcon />,
    Sports: <SportsIcon />
  }
  return (
    
      <Box>
        <Typography sx={{display:'flex',justifyContent:"center"}} variant='h6' gutterBottom>
          Categories
        </Typography>
        <List disablePadding>
        {categories.map((category)=>(
          <ListItemButton 
            key={category}
            selected={selectedCategory === category}
            onClick={()=>onSelect(category)}
            >
              <ListItemIcon sx={{minWidth: 32}}>
                {categoryIcons[category] || <CategoryIcon />}
              </ListItemIcon>
              <ListItemText primary={category}
              />
          </ListItemButton>
        ))}
        {selectedCategory && (
          <ListItemButton onClick={() => onSelect('')} sx={{ mt: 1 }}>
            <ListItemText primary="Show All" />
          </ListItemButton>
        )}
        </List>
      </Box>

  )
}

export default CategorySidebar
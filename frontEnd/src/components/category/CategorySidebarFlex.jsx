import React, { useState } from 'react'
import CategorySidebar from '../CategorySidebar'
import { Box, IconButton, SwipeableDrawer, Tooltip } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category';

const CategorySidebarFlex = ({categories,selectedCategory,onSelect,}) => {
    // This component is used to display the category sidebar in a responsive way.
    // It will show the sidebar in a drawer on small screens and as a sidebar on larger screens.
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleCategorySelect = (category) => {
        onSelect(category);
        setDrawerOpen(false); // Close the drawer when a category is selected
    }
  return (
    
    <>
        {/* Phone screen */}
        {/* Categories icon button will be displayed only in small screen */}
        <Tooltip title="Categories" placement="right" arrow>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'flex-start', md: 'none' } }}>
                <CategoryIcon/>
            </IconButton>
        </Tooltip> 

        <SwipeableDrawer 
            anchor='left'
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
        > 
            <Box sx={{display: { xs: 'block', md: 'none' } }}>
                <CategorySidebar 
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={handleCategorySelect}//Passing setSelected category funtion to handle from CategorySidebar.jsx
                />
            </Box>
        </SwipeableDrawer>
        {/* Large screen */}
        <Box sx={{display: { xs: 'none', md: 'block' } }}>
            <CategorySidebar 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={onSelect}//Passing setSelected category funtion to handle from CategorySidebar.jsx
            />
        </Box>
    </>
  )
}

export default CategorySidebarFlex
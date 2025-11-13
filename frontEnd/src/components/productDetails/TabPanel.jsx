import { Box, Typography } from '@mui/material';

const TabPanel = (props) => {
  const {children, value, index} =props;
  return (
    <div hidden={value!== index}>
      {value===index&&(
        <Box p={3}>
          <Typography component='div'>{children||'No content available'}</Typography>
        </Box>
      )}
    </div>
  )
}

export default TabPanel
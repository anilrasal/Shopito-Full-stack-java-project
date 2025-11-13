import { Box, Container, Typography, Stack, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
        component='footer'
        sx={{
        backgroundColor: '#1c1c1c', // dark grey
        color: 'white',
        py: 4,
        mt: 'auto',// this is to allow footer to stay and the bottom for all the content size.
      }}
    >
        <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Shopito. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Link href="/privacy" color="inherit" underline="hover">
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover">
              Terms of Service
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contact Us
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
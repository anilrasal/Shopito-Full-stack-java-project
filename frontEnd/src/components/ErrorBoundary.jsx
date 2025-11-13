import { Box, Button, Typography } from "@mui/material";
import React from "react";
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return {hasError: true};
    }
    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error:", error, info);
    }

    handleRestry=()=>{
        this.setState({hasError: false});
    }
    render () {
        if(this.state.hasError) {
            return (
                <Box textAlign='center' mt={10}>
                    <Typography variant='h5' gutterBottom>
                        Something went wrong
                    </Typography>
                    <Typography variant='body2' mb={3}>
                        The component encountered an error. Try reloading the section.
                    </Typography>
                    <Button
                        variant="contained"
                        color="customOrange"
                        sx={{
                            color:'white',
                            textTransform:'none'
                        }}
                        onClick={this.handleRetry}
                    >
                        Retry
                    </Button>
                </Box>
            )
        }
        return this.props.children; // Render children if no error
    }
}



export default ErrorBoundary
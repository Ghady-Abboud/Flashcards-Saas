'use client';

import {AppBar, Container, Toolbar, Typography, Button, Box} from '@mui/material'
import Link from 'next/link';
import { SignUp } from '@clerk/nextjs'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: "#F2A71B",
        light: "#025E73",
        dark: "#011F26",
      },
      secondary: {
        main: "#023047",
        light: "#BFB78F",
      },
    },
  });
  
  export default function SignUpPage() {
    return (
      <ThemeProvider theme={theme}>
        <AppBar position="static" sx={{ width: '100%', backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
                <Typography 
                variant="h6" 
                sx={{ flexGrow: 1, cursor: 'pointer' }} 
                onClick={() => window.location.href = '/'}
                >
                Flashcard SaaS
              </Typography>
              <Button color="inherit">
                <Link href="/sign-in" passHref sx = {{textDecoration : 'none'}}>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/sign-up" passHref>
                  Sign Up
                </Link>
              </Button>
            </Toolbar>
          </AppBar>
          <Container maxWidth={false} disableGutters>
          <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ padding: 4, marginTop: 4 }} // Adjust marginTop for gap
        >
            <Typography variant="h4">Sign Up</Typography>
            <SignUp />
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
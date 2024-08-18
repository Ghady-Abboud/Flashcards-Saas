'use client';

import {AppBar, Container, Toolbar, Typography, Button, Box} from '@mui/material'
import Link from 'next/link';
import { SignIn } from '@clerk/nextjs'
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6F61",
      light: "#FFA07A",
      dark: "#D9534F",
    },
    secondary: {
      main: "#4A4E69",
      light: "#9A8C98",
    },
  },
});
  
  export default function SignInPage() {
    return (
      <ThemeProvider theme={theme}>
        <AppBar position="static" sx={{ width: '100%', backgroundColor: theme.palette.primary.main }}>
          <Toolbar>
            <Typography 
              variant='h6' 
              sx={{ flexGrow: 1, cursor: 'pointer' }} 
              onClick={() => window.location.href = '/'}
            >
              Flashcard SaaS
            </Typography>
            <Button color="inherit">
              <Link href="/sign-in" passHref sx={{ textDecoration: 'none'}}>
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/sign-up" passHref sx={{ textDecoration: 'none'}}>
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
            <Typography variant="h4">Sign In</Typography>
            <SignIn />
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
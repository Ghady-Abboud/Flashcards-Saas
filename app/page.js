import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";

export default function Home() {
  return (
    <>
    <CssBaseline />
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content=" Create flashcard from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1 }}>Flashcard Saas</Typography>
          <SignedOut>
            <Button color='inherit' href = "/sign-in">Log In</Button>
            <Button color='inherit' href = "/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box
      sx={{
        textAlign: 'center',
        my: 4,
      }}>
        <Typography variant = "h2" gutterBottom>Welcome to Flashcard SaaS</Typography>
        <Typography variant = "h5" gutterBottom>
          {''}
          The easiest way to make flashcards from your text
          </Typography>
          <Button variant="contained" color="primary" sx={{mt:2}}>
            Get Started
          </Button>
      </Box>
      <Box
      sx={{my:6}}>
        <Typography variant="h4" component="h2" gutterBottom textAlign='center'>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant = "h6">Feature1</Typography>
            <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier!</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Typography variant = "h6">Feature2</Typography>
            <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier!</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Typography variant = "h6">Feature3</Typography>
            <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier!</Typography>
            </Grid>
        </Grid>
      </Box>
      <Box sx={{my:6, textAlign: 'center'}}>
        <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={4} md={4}>
            <Box 
              sx={{
                p:3,
                border: '1px solid',
                borderColor: 'grey',
                borderRadius: 2,
              }}>
            <Typography variant = "h5" gutterBottom>Basic</Typography>
            <Typography variant = "h6" gutterBottom>$5/Month</Typography>
            <Typography>
              {' '}
              Access to basic flashcards and limited storage.</Typography>
              <Button variant="contained" color="primary" sx={{mt:2}}>
                Choose Basic
                </Button>
            </Box>
            </Grid>
            <Grid item xs={4} md={4}>
            <Box 
              sx={{
                p:3,
                border: '1px solid',
                borderColor: 'grey',
                borderRadius: 2,
              }}>
            <Typography variant = "h5" gutterBottom>Pro</Typography>
            <Typography variant = "h6" gutterBottom>$10/Month</Typography>
            <Typography>
              {' '}
              Unlimited flashcards and storage.</Typography>
              <Button variant="contained" color="primary" sx={{mt:2}}>
                Choose Pro
                </Button>
            </Box>
            </Grid>
            <Grid item xs={4} md={4}>
            <Box 
              sx={{
                p:3,
                border: '1px solid',
                borderColor: 'grey',
                borderRadius: 2,
              }}>
            <Typography variant = "h5" gutterBottom>Premium Pro</Typography>
            <Typography variant = "h6" gutterBottom>$15/Month</Typography>
            <Typography>
              {' '}
              Unlimited flashcards, storage and latest features.</Typography>
              <Button variant="contained" color="primary" sx={{mt:2}}>
                Choose Premium
                </Button>
            </Box>
            </Grid>
        </Grid>
      </Box>
    </Container>
  </>
  );
}
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  createTheme,
  ThemeProvider,
} from "@mui/material";

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

export default function Home() {
  const handleSubmit = async (subscriptionName, subscriptionValue) => {
    try {
      const checkoutSession = await fetch("api/generate/checkout-session", {
        method: "POST",
        headers: {
          origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          subscriptionName: subscriptionName,
          subscriptionValue: subscriptionValue,
        }),
      });

      console.log(checkoutSession);
      const checkoutSessionJson = await checkoutSession.json();
      if (checkoutSessionJson.statusCode === 500) {
        console.error("Error:", checkoutSessionJson.message);
        return;
      }
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });
      if (error) {
        console.error(error);
      }
    } catch (err) {
      console.error("Error handling checkout session:", err);
    }
  };

  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/generate");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="100vw" disableGutters>
          <Head>
            <title>Flashcard SaaS</title>
            <meta
              name="description"
              content=" Create flashcard from your text"
            />
          </Head>

          <AppBar position="static" sx={{ backgroundColor: '#FF6F61', boxShadow: 'none', borderBottom: '2px solid #D9534F' }}>
            <Toolbar>
              <Typography
                variant="h6"
                sx={{ flexGrow: 1, cursor: "pointer", fontWeight: 'bold', color: '#FFFFFF', letterSpacing: '0.5px'}}
                onClick={() => (window.location.href = "/")}
              >
                Flashcard SaaS
              </Typography>
              <SignedOut>
                <Button color="inherit" href="/sign-in" sx={{ marginRight: 2, color: '#FFFFFF', fontWeight: 'bold', '&:hover': { color: '#D9534F' } }}>
                  Log In
                </Button>
                <Button color="inherit" href="/sign-up" sx={{ color: '#FFFFFF', fontWeight: 'bold', '&:hover': { color: '#D9534F' } }}>
                  Sign Up
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Toolbar>
          </AppBar>
          <Box
            sx={{ textAlign: 'center', my: 4, background: 'linear-gradient(135deg, #FFD7B5 0%, #FF8A65 100%)', 
            padding: '64px 16px', 
            borderRadius: '16px', 
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
          >
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#4A4E69' }}>
              Generate Flashcards Quickly
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#4A4E69', fontStyle: "italic" }}>
              {""}
              The easiest way to make flashcards from your text
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2, padding: '12px 24px', borderRadius: '30px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </Box>
          <Box sx={{ my: 6 }}>
            <Box>
              
            </Box>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              textAlign="center"
              color="main"
              sx={{
                padding: '24px',
                backgroundColor: '#FFAB91',
                borderRadius: '8px',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  backgroundColor: '#FF8A65',
                },
              }}
            >
              Features
            </Typography>
            <Grid container spacing={4} display={"flex"} px={4} py={2}>
              <Grid item xs={12} md={4} textAlign={"center"}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A4E69' }}>Easy</Typography>
                <Typography>
                Quickly create flashcards—just input your text, and let our tool do the rest.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} textAlign={"center"}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A4E69' }}>Efficient</Typography>
                <Typography>
                Streamlined input process for fast and productive study prep.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} textAlign={"center"}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A4E69' }}>Customizable</Typography>
                <Typography>
                Tailor your flashcards to suit your needs.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography variant="h4"
              component="h2"
              gutterBottom
              textAlign="center"
              color="main"
              sx={{
                padding: '20px',
                backgroundColor: '#ECEFF1',
                borderRadius: '8px',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  backgroundColor: '#B0BEC5',
                },
              }} >
  
    Pricing
  </Typography>

            <Grid container spacing={4} display={"flex"} px={4}>
              <Grid item xs={4} md={4}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid #D9534F",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    backgroundColor: '#FFFFFF',
                    '&:hover': { backgroundColor: '#FFA07A' },
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Basic
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    $5 / Month
                  </Typography>
                  <Typography>
                    {" "}
                    Access to basic flashcards and limited storage.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, width: "50%", alignSelf: "center" }}
                    onClick={() => handleSubmit("Basic Subscription", 0.5)}
                  >
                    Choose Basic
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid #D9534F",
                    borderColor: "grey",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    backgroundColor: '#FFFFFF',
                    '&:hover': { backgroundColor: '#FFA07A' },
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Pro
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    $10 / Month
                  </Typography>
                  <Typography> Unlimited flashcards and storage.</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, width: "50%", alignSelf: "center" }}
                    onClick={() => handleSubmit("Pro Subscription", 1)}
                  >
                    Choose Pro
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid #D9534F",
                    borderColor: "grey",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    backgroundColor: '#FFFFFF',
                    '&:hover': { backgroundColor: '#FFA07A' },
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Premium Pro
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    $15 / Month
                  </Typography>
                  <Typography>
                    {" "}
                    Unlimited flashcards, storage and latest features.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, alignSelf: "center" }}
                    onClick={() =>
                      handleSubmit("Premium Pro Subscription", 1.5)
                    }
                  >
                    Choose Premium
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

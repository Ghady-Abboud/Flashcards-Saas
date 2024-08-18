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

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("api/generate/checkout-session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });
    const checkoutSessionJson = await checkoutSession.json();
    if (checkoutSessionJson.statusCode === 500) {
      console.error("Error:", checkoutSessionJson.message);
      return;
    }
    const stripe = await getStripe();
    const { res } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });
    if (!res.ok) {
      console.warn(error.message);
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

          <AppBar position="static" mx="0">
            <Toolbar>
              <Typography
                variant="h6"
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => (window.location.href = "/")}
              >
                Flashcard SaaS
              </Typography>
              <SignedOut>
                <Button color="inherit" href="/sign-in">
                  Log In
                </Button>
                <Button color="inherit" href="/sign-up">
                  Sign Up
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              textAlign: "center",
              my: 4,
            }}
          >
            <Typography variant="h2" gutterBottom>
              Generate Flashcards Quickly
            </Typography>
            <Typography variant="h5" gutterBottom>
              {""}
              The easiest way to make flashcards from your text
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </Box>
          <Box sx={{ my: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              textAlign="center"
              color="main"
              sx={{
                textDecoration: "underline",
                fontStyle: "italic",
              }}
            >
              Features
            </Typography>
            <Grid container spacing={4} display={"flex"} px={4}>
              <Grid item xs={12} md={4} textAlign={"center"}>
                <Typography variant="h6">Feature1</Typography>
                <Typography>
                  Simply input your text and let our software do the rest.
                  Creating flashcards has never been easier!
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} textAlign={"center"}>
                <Typography variant="h6">Feature2</Typography>
                <Typography>
                  Simply input your text and let our software do the rest.
                  Creating flashcards has never been easier!
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} textAlign={"center"}>
                <Typography variant="h6">Feature3</Typography>
                <Typography>
                  Simply input your text and let our software do the rest.
                  Creating flashcards has never been easier!
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ my: 6, textAlign: "center" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Pricing
            </Typography>
            <Grid container spacing={4} display={"flex"} px={4}>
              <Grid item xs={4} md={4}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "grey",
                    borderRadius: 2,
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
                    onClick={handleSubmit}
                  >
                    Choose Basic
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "grey",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
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
                    onClick={handleSubmit}
                  >
                    Choose Pro
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "grey",
                    borderRadius: 2,
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
                    onClick={handleSubmit}
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

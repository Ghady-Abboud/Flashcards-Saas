'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { db } from '../firebase.js';
import { Button, Container, Typography, Box, Paper, TextField, Grid, CardActionArea, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {doc, setDoc, getDoc, writeBatch, collection} from 'firebase/firestore'; 

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

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                body: text,
            });
            if (!res.ok) throw new Error('Failed to generate flashcards');
            const data = await res.json();
            setFlashcards(data.flashcards);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate flashcards. Please try again.');
        }
    };


    const handleCardSubmit = (id) => {
        setFlipped(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name for your flashcard collection.');
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            if (collections.find(f => f.name === name)) {
                alert('Flashcard collection with this name already exists.');
                return;
            } else {
                collections.push({ name });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] });
        }

        const colRef = collection(userDocRef, name);
        flashcards.forEach(flashcard => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
        });

        try {
            await batch.commit();
            handleClose();
            router.push('/flashcards');
        } catch (error) {
            console.error('Error saving flashcards:', error);
            alert('Failed to save flashcards. Please try again.');
        }
    };

    if (!isLoaded) return <p>Loading...</p>;
    if (!isSignedIn) return <p>Please sign in to access this page.</p>;

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    mt: 4,
                    mb: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4">Generate Flashcards</Typography>
                <Paper sx={{ p: 4, width: '100%' }}>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        label="Enter text to generate flashcards"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        fullWidth
                        sx={{
                            backgroundColor: '#F2A71B',
                            color: 'black',
                            '&:hover': {
                              backgroundColor: '#D49117', // Darker shade of #F2A71B
                              color: 'black'
                            }
                          }}
                    >
                        Generate Flashcards
                    </Button>
                </Paper>
            </Box>
    
            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Flashcards
                    </Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardSubmit(index)}>
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    perspective: '1000px',
                                                    '& > div': {
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        transition: 'transform 0.6s',
                                                        width: '100%',
                                                        height: '200px',
                                                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                        transform: flipped[index]
                                                            ? 'rotateY(180deg)'
                                                            : 'rotateY(0deg)',
                                                    },
                                                    '& > div > div ': {
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 2,
                                                        boxSizing: 'border-box',
                                                    },
                                                    '& > div > div:nth-of-type(2)': {
                                                        transform: 'rotateY(180deg)',
                                                    },
                                                }}
                                            >
                                                <div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpen}
                        >
                            Save
                        </Button>
                        </Box>
                </Box>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a name for your flashcard collection.
                    </DialogContentText>
                    <TextField autoFocus margin='dense' label="Collection Name" type="text" fullWidth  value={name} onChange={(e) => setName(e.target.value)} variant='outlined'/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveFlashcards}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
    
}

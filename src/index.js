import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new ReactDOM client
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            paper: '#ffffff', // Define a valid color for the background
        },
    },
});

// Create the root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
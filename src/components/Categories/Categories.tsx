import { Box, Button, CssBaseline, IconButton, Paper, styled, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Toolbar } from '@mui/material'
import Header from 'components/Header/Header'
import Navbar from 'components/Navbar/Navbar'
import { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './Categories.scss';
import React from 'react';
import ExpensesContent from './ExpensesContent/ExpensesContent';



// Define a component for Income tab content
const IncomeContent = () => (
  <div>
    <h2>Income Content</h2>
    {/* Add your content specific to Income tab */}
  </div>
);
const StyledTabs = styled(Tabs)(({ theme }: any) => ({
  '& .MuiTabs-indicator': { display: 'none' },
  '& .MuiTabs-flexContainer': {
    borderRadius: '10px',
    backgroundColor: 'white',
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '15px'
  },
  '& .MuiTab-root': {
    padding: theme.spacing(0.5),
    textTransform: 'none',
    minWidth: 'auto',
    width: '100px',
    '&.Mui-selected': {
      backgroundColor: '#C7DFF6',
      color: '#0B6EC8',
      fontWeight: 'bold',
      // boxShadow: theme.shadows[1],
      borderRadius: '10px',
    },
  },
}));

const Categories = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  useEffect(() => {
    // Change body background color when the component mounts
    document.body.style.backgroundColor = '#f0f0f0';

    // Revert back to original background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', margin: '30px' }}>
        <CssBaseline />
        <Header />
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, padding: '0px 24px', overflowY: 'auto' }}>
          <Toolbar />

          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <Tab disableRipple label="Expenses" />
            <Tab disableRipple label="Income" />
          </StyledTabs>
          {value === 0 && <ExpensesContent />}
          {value === 1 && <IncomeContent />}
        </Box>

      </Box>

    </div>
  )
}

export default Categories

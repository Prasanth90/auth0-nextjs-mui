import * as React from 'react'
import Box from '@mui/material/Box'

import { getAccessToken, getSession } from '@auth0/nextjs-auth0'
import { Container, Link, Typography } from '@mui/material';
import Copyright from '@/components/Copyright';

const getItemsFromAPI = async (): Promise<any[]> => {
  const  { accessToken } = await getAccessToken();
  console.log(accessToken, "Access token");
  const response = await fetch('https://express-ts-mongoose.onrender.com/trips', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  const items = await response.json();
  console.log(items, "ITEM$$$$$$$$$$$");
  return [];
}

async function Dashboard() {
  const session = await getSession();
  const items = await getItemsFromAPI();

  return (
     <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Welcome {session?.user.email} to the dashboard
        </Typography>

        <Box>
          {items.map((item, i) => (
             <Typography key={i} variant="h5" sx={{ mb: 2 }}>
               {item.name}
             </Typography>)
          )}
        </Box>
        <Copyright />
      </Box>
    </Container>
  )
}
export default Dashboard

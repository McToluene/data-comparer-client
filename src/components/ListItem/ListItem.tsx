import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

export const mainListItems = (
  <div>
    <ListItem>
      <ListItemIcon>{/* <DashboardIcon /> */}</ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItem>
    <ListItem>
      <ListItemIcon>{/* <ShoppingCartIcon /> */}</ListItemIcon>
      <ListItemText primary='Orders' />
    </ListItem>
    <ListItem>
      <ListItemIcon>{/* <PeopleIcon /> */}</ListItemIcon>
      <ListItemText primary='Customers' />
    </ListItem>
    <ListItem>
      <ListItemIcon>{/* <BarChartIcon /> */}</ListItemIcon>
      <ListItemText primary='Reports' />
    </ListItem>
    <ListItem>
      <ListItemIcon>{/* <LayersIcon /> */}</ListItemIcon>
      <ListItemText primary='Integrations' />
    </ListItem>
  </div>
);

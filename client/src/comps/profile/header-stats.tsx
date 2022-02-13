
// material
import { Grid, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';

import { IProfileStats } from "../../models/profile";



const  StatsItem = ( statsItem:IProfileStats) => {

  return (
    <Grid item xs={6}>
      <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
        <Typography variant="h6">{statsItem.name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {statsItem.value}
        </Typography>
      </Paper>
    </Grid>
  );
}

const  ProfileHeaderStats = (statsItems:Array<IProfileStats>) => {
  return (
    <Card>
      <CardHeader title="Traffic by Site" />
      <CardContent>
        <Grid container spacing={2}>
          {statsItems.map((statsItem) => (
            <StatsItem {...statsItem} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProfileHeaderStats;
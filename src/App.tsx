import { Typography, Box } from '@mui/material';
import { InputFormula } from './InputFormula';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <Typography variant="h1">
          Pry test
        </Typography>
        <InputFormula />
      </Box>
    </QueryClientProvider>
  );
};

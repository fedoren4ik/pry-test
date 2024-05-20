import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Autocomplete, TextField, Chip, Box, IconButton, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { useFormulaStore } from './store';
import { useQuery } from 'react-query';

type Tag = {
  id: string;
  category: string;
  name: string;
  value: string;
};

const fetchSuggestions = async () => {
  const response = await fetch('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete');
  return response.json();
};

export const InputFormula = () => {
  const { formula, addTag, removeTag, editTag, setFormula } = useFormulaStore();
  const { data: tags, isLoading } = useQuery('tags', fetchSuggestions);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const operands = ['+', '-', '*', '/', '(', ')', '^'];

  const handleInputChange = (newInputValue: string) => {
    setInputValue(newInputValue);
  };

  const handleAddTag = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      addTag(inputValue.trim());
      setInputValue('');
      setEditIndex(null);
    }
  };

  const handleTagChange = (newValue: string[]) => {
    setFormula(newValue);
  };

  const handleEditClick = (index: number, value: string) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleEditValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleEditSave = () => {
    if (editIndex !== null) {
      editTag(editIndex, editValue);
      setEditIndex(null);
      setEditValue('');
    }
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditValue('');
  };

  if (isLoading) {
    return (<CircularProgress />);
  }

  return (
    <>
      <Autocomplete
        multiple
        freeSolo
        options={(tags?.map((tag: Tag) => tag.name) || []).concat(operands)}
        value={formula}
        onChange={(_, newValue) => handleTagChange(newValue)}
        inputValue={inputValue}
        onInputChange={(_, newValue) => handleInputChange(newValue)}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                {...getTagProps({ index })}
                key={`${option}-${index}`}
                label={
                  operands.includes(option) ? (
                    option
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {option}
                      <IconButton size="small" onClick={() => handleEditClick(index, option)}>
                        <EditOutlined />
                      </IconButton>
                    </Box>
                  )
                }
                onDelete={() => removeTag(index)}
                sx={{ height: 'auto' }}
              />
            </Box>
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Formula"
            variant="outlined"
            onKeyDown={handleAddTag}
          />
        )}
      />
      <Dialog open={editIndex !== null} onClose={handleEditCancel}>
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tag"
            type="text"
            fullWidth
            value={editValue}
            onChange={handleEditValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

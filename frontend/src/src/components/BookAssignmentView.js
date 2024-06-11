import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const BookAssignmentView = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [readingList, setReadingList] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleAddBook = (book) => {
    setReadingList([...readingList, book]);
  };

  const handleRemoveBook = (title) => {
    setReadingList(readingList.filter(book => book.title !== title));
  };

  const filteredBooks = data.books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {filteredBooks.map((book) => (
          <ListItem key={book.title}>
            <ListItemText primary={book.title} secondary={book.author} />
            <IconButton edge="end" onClick={() => handleAddBook(book)}>
              <AddIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <h2>Reading List</h2>
      <List>
        {readingList.map((book) => (
          <ListItem key={book.title}>
            <ListItemText primary={book.title} secondary={book.author} />
            <IconButton edge="end" onClick={() => handleRemoveBook(book.title)}>
              <RemoveIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BookAssignmentView;

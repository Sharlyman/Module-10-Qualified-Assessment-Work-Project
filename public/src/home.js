function getTotalBooksCount(books) {
  //returns the number of book objects inside the array
  count = books.reduce((acc, book) =>
  {acc++; return acc;}, 0) 
  return count;
}

function getTotalAccountsCount(accounts) {
  //returns the number of accounts
  return accounts.length;
}

function getBooksBorrowedCount(books) {
 /* It returns a _number_ that represents the number of books _that are currently checked out of the library._ 
 This number can be found by looking at the first transaction object in the `borrows` array of each book. 
 If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed. */
 let numBooksBorrowed = 0;

 books.forEach(book => {
     if (book.borrows[0].returned === false) numBooksBorrowed++;
   });
 return numBooksBorrowed;
 }
}

function getMostCommonGenres(books) {
  /*It returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.

Each object in the returned array has two keys:

- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the genre occurs.

Even if there is a tie, the array should only contain no more than five objects. */
const bookGenres = books.map(book => book.genre);
const genreArray = [];

bookGenres.map((genre) => {
  const genreLocation = genreArray.findIndex((element) => element.name === genre);
  if (genreLocation >= 0) {
    genreArray[genreLocation].count = genreArray[genreLocation].count + 1;
       } else {
    genreArray.push({ name: genre, count: 1 });
  }
});
return helper(genreArray);
}

function getMostPopularBooks(books) {
  /* 
It returns an array containing five objects or fewer that represents the most popular books in the library. Popularity is represented by the number of times a book has been borrowed.

Each object in the returned array has two keys:

- The `name` key which represents the title of the book.
- The `count` key which represents the number of times the book has been borrowed.

Even if there is a tie, the array should only contain no more than five objects.*/
const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
  
return helper(borrows);
}

function helper(array) {
  let newArray = array.sort((a, b) => b.count - a.count).slice(0, 5)
  
  return newArray;
  }

function getMostPopularAuthors(books, authors) {
/* - An array of book objects.
- An array of author objects.

It returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.

Each object in the returned array has two keys:

- The `name` key which represents the first and last name of the author.
- The `count` key which represents the number of times the author's books have been borrowed.

Even if there is a tie, the array should contain no more than five objects.*/
let result = [];

authors.forEach((author) => {
 let authorObject = {
  name: `${author.name.first} ${author.name.last}`,
  count: 0
 };

 books.forEach((book) => {
  if (book.authorId === author.id) {
   authorObject.count += book.borrows.length;
  }
 });
  result.push(authorObject);
});
return helper(result);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

function findAuthorById(authors, id) {
  // returns the author object with the matching ID
  let authorId= authors.find((author) => author.id === id); 
  return authorId;
}


function findBookById(books, id) {
  // returns the book object with the matching ID
  let booksId=books.find((book) => book.id===id);
  return booksId;
}

function partitionBooksByBorrowedStatus(books) {
  /* It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.

The first array contains book objects that represent the books _that are currently checked out_,

 while the second array contains book objects that represent the books _that have been returned._ 

You can check for the return status by looking at the first transaction object in the `borrows` array. */
// filter() - This method builds a new array of only the items that match a certain condition.
// It's pretty similar to find(), except that it returns an array of all the matching items instead of just the new match
// Keep in mind that filter() returns a new array
//The some() method accepts a callback function that implements a comparison that is executed for each item in the array
// If the callback function returns true for any item in the array, then the entire some() method returns true.
// The every() method works by checking the condition given against every item in the array. If that condition ever fails, it will return false. 
//Otherwise, it will return true
let booksOut = books.filter((book) =>
book.borrows.some((borrow)=> borrow.returned === false)); // books that are checked out 
let returnedBooks = books.filter((book) =>
book.borrows.every((borrow) => borrow.returned===true)); // books that have been returned
let allBooks = [...booksOut], [...returnedBooks]
return allBooks;
}

function getBorrowersForBook(book, accounts = 10) {
  // It should return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's `borrows` array.
 //each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.
 // map() creates a new array from calling a function for every array element. 
 // use map() to loop through borrows array in books (object)
 return book.borrows
 .map((borrow) => {
   let account = accounts.find((account) => account.id === borrow.id);
   return {...borrow, ...account}
 })
 .slice(0,10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

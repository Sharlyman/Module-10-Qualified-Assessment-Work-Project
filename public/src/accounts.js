function findAccountById(accounts, id) {   
  // this function should return an array of account objects with a matching ID
let foundId = accounts.find((account) => account.id === id); //use .find
return foundId;
}

function sortAccountsByLastName(accounts) { 
  // returns a sorted array with accounts sorted alphabetically by last name
  const account = accounts.sort((accountA, accountB) =>  //use sort.
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
// It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.
let totalBorrows=0; //set to 0
for (let i=0; i < books.length; i++) {
  for (let j=0; j < books[i].borrows.length; j++) {
    if (account.id===books[i].borrows[j].id) {
      totalBorrows +=1; //to add 1 
    }
  }
}
return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  // It returns an array of book objects, including author information, 
  //that represents all books _currently checked out_ by the given account. 
  //_Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.
  let result=[]; //empty array
  let borrowActually=[]; //empty
  /* foreach  forEach() Method: This is one of the most used method.
  accepts function as an arguement. 
  The function that you pass to the method is referred to as a callbackfunction.
  callback function=function that is passed into another function as an arguement.
  ForEach takes a callback function as its arguement. 
  the arrow will define the function rather than using the word */
  books.forEach((item) => {
    const borrowed = item.borrows;
    const book = {
      id: item.id,
      title: item.title,
      genre: item.genre,
      authorId: item.authorId,
      author: {},
      borrows: {}
    };
    const {id,title,genre,authorId,author,borrows} = book;
    borrowed.forEach((borrow) => {
    if (borrow.id=== account.id && borrow.returned === false) {
      result.push(book);
      borrowActually.push(borrow);
      book.borrows=borrowActually;
      book.author=authors.filter((auth) => auth.id === book.authorId)[0];

    }
  });
});
return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

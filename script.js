const students = {};
const books = {};

function addStudent() {
    const studentId = document.getElementById("studentId").value;
    const studentName = document.getElementById("studentName").value;
    students[studentId] = { name: studentName, booksIssued: [] };
    alert(`Student "${studentName}" added.`);
}

function addBook() {
    const bookId = document.getElementById("bookId").value;
    const bookTitle = document.getElementById("bookTitle").value;
    books[bookId] = { title: bookTitle, isIssued: false, issuedTo: null };
    alert(`Book "${bookTitle}" added.`);
}

function issueBook() {
    const studentId = document.getElementById("studentIdIssue").value;
    const bookId = document.getElementById("bookIdIssue").value;
    
    if (students[studentId] && books[bookId] && !books[bookId].isIssued) {
        students[studentId].booksIssued.push(bookId);
        books[bookId].isIssued = true;
        books[bookId].issuedTo = studentId;
        alert(`Book "${books[bookId].title}" issued to ${students[studentId].name}.`);
    } else {
        alert("Invalid student or book, or the book is already issued.");
    }
}

function returnBook() {
    const studentId = document.getElementById("studentIdIssue").value;
    const bookId = document.getElementById("bookIdIssue").value;

    if (students[studentId] && books[bookId] && books[bookId].issuedTo === studentId) {
        const bookIndex = students[studentId].booksIssued.indexOf(bookId);
        students[studentId].booksIssued.splice(bookIndex, 1);
        books[bookId].isIssued = false;
        books[bookId].issuedTo = null;
        alert(`Book "${books[bookId].title}" returned by ${students[studentId].name}.`);
    } else {
        alert("Invalid student or book, or the book is not issued to the student.");
    }
}

function showStudentHistory() {
    const studentId = document.getElementById("studentIdHistory").value;
    const historyResult = document.getElementById("historyResult");

    if (students[studentId]) {
        historyResult.innerHTML = `<h3>Student: ${students[studentId].name}</h3>`;
        historyResult.innerHTML += "<h4>Books Issued:</h4>";
        historyResult.innerHTML += "<ul>";
        for (const bookId of students[studentId].booksIssued) {
            historyResult.innerHTML += `<li>${books[bookId].title}</li>`;
        }
        historyResult.innerHTML += "</ul>";
    } else {
        historyResult.innerHTML = "Student not found.";
    }
}

function listBooks() {
    const bookListResult = document.getElementById("bookListResult");
    bookListResult.innerHTML = "<h3>Book List:</h3><ul>";
    
    for (const bookId in books) {
        const book = books[bookId];
        const status = book.isIssued ? `Issued to: ${students[book.issuedTo].name}` : "Available";
        bookListResult.innerHTML += `<li>${book.title} (${status})</li>`;
    }

    bookListResult.innerHTML += "</ul>";
}

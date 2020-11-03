PART ONE
1. Setting up Express
2. Hooking up MongoDB
3. Setting up local ENV variables
4. Creating base layout HTML file
5. Setting up MVC folder structure

>>> Heroku login (web sign-on portal)
>>> localhost:3000 or access app thru heroku "open app"
>>> (if issues, check env variables)

>>> To fix invalid URI string 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
>>> To fix DeprecationWarning: current Server Discovery and Monitoring engine pass option { useUnifiedTopology: true } to the MongoClient constructor

PART TWO
1. Create author model
2. create author controller
3. create author views
4. interact with db to find and create authors
5. handle validation errors
6. set up shared page header

PART THREE
1. Create a book model
2. Create a book controller
3. Create book views
4. Interact w/ b to find and create bookes
5. Handle validation errors
6. Set up file upload
7. Store uploaded files

PART FOUR
1. Impliment FilePong
2. Adding file upload preview
3. Implement drag and drop upload
4. Store files in db for Heroku

PART FIVE
1. Add routes to author's controller
2. Add views for author's views
3. Add data validation checks for deletion
4. Create delete form
5. Interact w our database to update and delete authors
6. Finish nav for authors in our views


PART SIX
1. Add routes to the book's controller
2. Add views for the books views
3. Interact with our database to update and delete books
4. Finish nav for books in our views
5. Polish our backend code and views
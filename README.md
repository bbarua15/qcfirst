## Link to app
Our website can be viewed here: https://qcfirst--marinosdakis.repl.co/
_______________________________
## Contributors:
**Marinos Dakis** (https://github.com/MarinosDakis) Role: Front & Backend-development.

**Badhan Barua** (https://github.com/bbarua15) Role: Front & Backend-development.
____________
***Final Deliverable***

Marinos: From the previous deliverable I had hoped to incorporate JQuery for a majority of the DOM manipulation; however, the professor recommended using a templating engine, and so I looked into ejs.

The main issue from the previous deliverable was that any user was able to access any page that they wanted, and I wanted an effective way to incorporate DOM manipulation into the project. So, I refactored the entire project we had at the time and transformed everything to work with ejs so that information could be rendered when required.

The solution to the page navigation issue was solved by creating middleware functions to check what type of user logged in; for instance, only students have access student pages, instructors have access to instructor pages and admins have access to admin pages. Given that each appropriate middleware function was passed through the appropriate GET function the issue was resolved.

To preface, the entire back-end code was initially all on one file, but I split different sections appropriate to make it more viable when making changes.

The back-end sections that I created specifically with the help of my sources were: 

**app.js:** this file has a majority of the essential items required to run the project. Since last time, the session package was introduced to deal with user sessions as well as passport to help authenticate users. Flash messages were also introduced to be used when a user needed to be notified because of an event; for example, an invalid username or password. The way this was implemented was with the use of global flash variables that would store specific messages to be displayed using one of the partial ejs file messages that displayed in the area it was included. Lastly the two routes were added to help split up GET/POST methods from those of logged in users.

**users.js:** this is one of the route files that deals with a majority of the functionality of users who have not signed in yet. So, this includes the login page, sign-up page and forgot password page. For the registration POST function, I collected all the form details from the bodyparser middleware and then ran a series of checks using REGEX. Each time an error had occurred I stored an error message in an array. If the length of the array was greater than 0 the page would render the error messages until the user passed through all the checks. Now, if a user managed to pass through all the checks then the entered password would be encrypted using bcrypt and then a check would see if the account already existed in the database. If it did than another error was outputted to the user until they created a unique account. If everything succeeded then a new user would have been created and then stored in the database and a success message should appear. The forgot password POST method creates a temporary 5-digit number that replaces an existing user's password and is then sent to that user's registered email address. The way this happens is with the nodemailer package that allows me to send emails with an email account I created. Once the email is sent, the temporary password is encrypted and stored in the database until a user changes it once they've logged in again. The login POST method authenticates when a user is logged in and depending on what their user type is they get redirected to their appropriate dashboard. Lastly, the logout handle logs a user out of the current session.

**index.js:** this is the other route file that deals with all the user GET/POST methods. All the GET methods were created with the appropriate values passed in to be rendered. My partner dealt with the difficult GET methods that involved DOM manipulation. Now, the change password POST method was similar to all types of users, and it involves a series of validation checks to make sure the appropriate information was inputted and that the old password entered matches the one stored in the database (which is confirmed using the bcrypt compare method). So, if any error occurs, then it is displayed to the user using flash messages. If everything succeeds then the new password is encrypted and then replaces the password that was stored in the database. Similarly, the course dictionary POST method works the same for all types of users. The main feature of that page is the search function that takes an inputted search query and then passes it in a find() method as a REGEX and checks through each of the class schema's values for a match. The main way that it's able to do this is with the use of the OR conditional which allows each schema value to be searched for a match as opposed to individually. Next, if a match is found a new value is stored in the database that contains all information about what was searched so that an admin will be able to access it later in their dashboard. After that, all the related results of the REGEX are displayed in the course dictionary. One point of conflict that was thought through is whether the class description should be searched with the REGEX query, because in some cases it dramatically increases the search results. However, in my opinion it is more beneficial for users to be able to find all the possible search results in something they are searching for specifically and that is why I implemented it like that. The drop class POST method checks to see if a class exists before it proceeds, and if the test fails the page is rendered with an error message. If the tests succeed then the class is dropped from a user's classes array and then their name is also removed from the class' student roster. The add class POST initially does some validation check and checks the criteria set in the assignment of whether the deadline date to register has already passed, or if there is still available space in a class, or to see if a student is already enrolled in a class with the same name. Otherwise, it adds the student to the class roster and adds the class to the student's classes array. The create class POST method has some initial REGEX checks and displays errors if those don't pass. Otherwise a class is added to the database and the instructor's class list. The delete class POST method has some inital checks and then it removes the class from all students and then deletes the class from the database. For the admin user search POST, it finds the inputted user and then displays all the information about them when the page renders again. Similarly, the search history POST uses the student's username to match the search history collection and then renders all the search queries from that specific user.

**passport.js:** this is used to authenticate whether an existing user has entered the correct information to log in (mainly adapted from sources).

**auth.js:** this file contains all the middleware functions used to authenticate each user type, and is passed through each associated GET method.

**userHistory.js:** simple schema used for the search history admin feature.

**additional:** slight modifications to existing ejs pages and css, and updated the README.

Badhan: In the previous deliverable, I attempted to implmement user session authentication so that any user types would not have access to all pages without being logged into their rightful account with their specific user type. I also tried using role-based authentication to do the same job, however, my partner was able to solve this issue by using middleware functions. 

In the Add Class page, all the available classes are listed in the table, however, we wanted a way so that when a specific department/subject is clicked on the dropdown menu, it would only show those classes in the table. Therefore, I used Javascript by adding onchange event to select based on the element by the id. Then, by using that function it would redirect to whichever department is clicked. The select object and set selected function were defined so that it would show correctly without an error. The selectedDepart was also defined in index.js for add-class GET method and by using find to look through the specific department that's been selected in the class list, it would redirect and display what's needed. 

In the Instructor Dashboard, we implemented student roster so that instructors can view the students who are enrolled in the class. By typing in the course number, the instructors will be able to see the roster. For the GET method of instructor-dashboard, the roster list is defined as an array. If the course number that's typed in matches the one in query, isFound will be true and if isFound is true, it will filter the array of roster list. 

For the course directory of student and instructor, all of the available classes needed to be shown in a table so the data needed to be displayed from database. For the GET method of the course directories, the data was fetched by using find to search for all the documents in the database. The data displayed is also sorted by the semester so that it's in order. The ejs files were edited to display that data by the classList that was defined in the GET method. This was also similar to available courses for admin which lists all the courses.

The class deadline for enrollment shows specific deadline date and time for students and instructor. It was implemented in a way that if the semester is Fall 2021, the deadline would be 8/27/2021 and if the semester is Summer 2021, the deadline would be 6/6/2021. These dates were selected because this was chosen as the start date when instructors created the class. 

Additional changes were added and made to ejs files and css. The admin dashboard summarizes what the user can do. In a box layout there's a navigation link to each of the features, such as go to search user's history, view available courses and to view user's search queries. 

***User Management Deliverable***

Marinos: For this deliverable I integrated the current webpage we had to Replit so that Nodejs could be integrated. Initially, I had major issues in getting the website to show its attributes, but learned after searching online that the root issue was due to pathing mistakes. Moreover, I was unable to find a solution to send multiple html files to users so I added the header and footer attributes to each HTML page. 

Afterwards I created the GET methods to all the HTML pages and worked on creating the post requests for the user creation page, and the login page. I used the body-parser module to help get information from the forms and then integrated Mongodb to store the user's account details. When I got the account creation and user login POST requests working I then focused on the additional detail required for the deliverable, i.e. using regex to make sure a user puts a secure password and their starting email ends like a CUNY (@login.cuny.edu) email. All passwords in the database are also secured by the bcrypt module to make sure that each user's password is secure.

What stands next is to get user sessions to work effectively so that only authorized users can go to their respected pages and I believe I will have to integrate some middleware functions to accomplish this. Also, getting JQuery to work as intended for user login errors.

***HTML Deliverable***

For the first project deliverable we split up the task of creating the HTML for the pages from how we divided the site map originally.
For the navigation bars, I created 3 separate versions for each instance (i.e. no user, student user, and instructor user) of the web application using online resources.
Each instance has different html pages associated with them and will contain their corresponding navigation bar inserted using Javascript.
Similarly, this is done with the footer for the website as well; however it will be placed on all pages of the web application and then modified once a user logs in. 

***CSS Deliverable***

Marinos: For this deliverable we were able to use the navigation bars and footer I created using online resources from the previous HTML deliveriable which included its CSS with it. Then, I created some images for the logo to add to the header and footer of the webpages. In addition, I created some classes to help utilize flexbox functionality for the elements used throughout the pages. Moreover, additional CSS was adapted to help improve the overall design of the website, including its responsiveness for mobile and tablets. Some functionality using Bootstrap were also implemented to improve the look of some of the tables.

Badhan: Using CSS, we implemented styling to the form (such as the log in, sign up, change password, create class for instructor and add class for student pages) so that it would look more presentable to the user. With media queries and sizing, we made sure it's responsive in mobile and tablet. In order to make the table responsive, we used bootstrap so that when it's on mobile and tablet, the tables are scrollable horizontally. Overall, we implemented design to the website and made it responsive for mobile and tablet. 
____
# qcfirst

**QCFirst** is a prototype course enrollment application where users (i.e. students, instructors and admins)
can access features to help simulate an online enrollment environment.

The following application will contain features of: **User Management**, **Course Management**, **Enrollment Management**, and an **Administrator view**.

**User Management** will focus on creating a responsive environment for both students and instructors when
accessing the course enrollment application.

**Course Management** will be managed by instructors and will allow them to create and delete courses through a database.

**Enrollment Management** will focus on allowing students to register for classes for an upcoming semester.

**Administrator view** will provide front-end access to data stored in the database.

## Features:

### Users
* Users are able to create an account and identify as either a student or an instructor; moreover, users are able to reset their password without being logged, where a temporary password is sent to their registered email address.
### Students
* Logged in students can view the classes they have enrolled in on their student dashboard. Additionally, they can add and drop classes to their course table. Students can also view all the available courses in the database with their details in the course dictionary page, and have the ability to change their password.
### Instructors 
* Logged in instructors can view the classes they created on their instructor dashboard, as well as view all the students registered for one of their classes. As mentioned, instructors can create classes that are added to their class list and course dictionary, and delete classes that they created. Similarly, instructors can view all available courses in the course dictionary and can change their password as well.
### Administrators
* Logged in administrators have privileged access to data stored in the database. These privileges include: a user search, which allows admins to view all the data associated with a registered user in the database. An available courses page which works similarly to the course dictionary except it also shows all the students registered for a class. A search history page that allows an admin to view a user's search history from the course dictionary. Lastly, they can also change their password like other users as well.
### Miscellaneous
* The website is responsive on mobile, tablet and desktop.
* All pages associated with specific users are enclosed in a private session where that specific user must be signed in to access the features associated with that user.

___
## Feature links:

### All users
**Login Page**: https://qcfirst.marinosdakis.repl.co/users/login

**Create Account Page:** https://qcfirst.marinosdakis.repl.co/users/register

**Forgot Password Page:** https://qcfirst.marinosdakis.repl.co/users/forgot

### Students

**Student Dashboard:** https://qcfirst.marinosdakis.repl.co/student-dashboard

**Add Class Page:** https://qcfirst.marinosdakis.repl.co/add-class

**Drop Class Page:** https://qcfirst.marinosdakis.repl.co/drop-class

**Course dictionary:** https://qcfirst.marinosdakis.repl.co/student-course-dictionary

**Change Password:** https://qcfirst.marinosdakis.repl.co/change-password-student

### Instructors

**Instructor Dashboard:** https://qcfirst.marinosdakis.repl.co/instructor-dashboard

**Create Class Page:** https://qcfirst.marinosdakis.repl.co/create-class

**Delete Class Page:** https://qcfirst.marinosdakis.repl.co/delete-class

**Course dictionary:** https://qcfirst.marinosdakis.repl.co/instructor-course-dictionary

**Change Password:** https://qcfirst.marinosdakis.repl.co/change-password-instructor

### Administrators
**User search:** https://qcfirst.marinosdakis.repl.co/user-search

**Available courses:** https://qcfirst.marinosdakis.repl.co/available-courses

**Search history:** https://qcfirst.marinosdakis.repl.co/search-history

**Change Password:** https://qcfirst.marinosdakis.repl.co/change-password-admin
___

## Client-side Technologies:
* HTML
* CSS
* JavaScript
* jQuery
* Ejs
* Bootstrap
___
## Server-side Technologies:
* Node-js
___
## Database management system:
* MongoDB/Mongoose

___
## Visual Designs

### Site Map
This is the course enrollment's site map. It will contain essential pages to help a user navigate through all the website's features.
The rest of the README will contain wireframes for each individual page of the site map and will contain additional information about what a user will
be able to do on each individual webpage(depending on whether they are signed in as a user or instructor).
Each wireframe has its own responsive design transitioning from [Webpage -> Tablet -> Mobile] to ensure that the application is accessible on different platforms.
Each arrow on the site map shows which pages are connected to each other via an internal link; for example, a user will be able to navigate to the Login Page and Create account page from the Home Page.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/Web%201920%20%E2%80%93%20SITE%20MAP.png)

### Homepage
The Homepage is the root web page that a user will start at. Here a user will be able to choose whether they want to sign in as a student or an instructor.
If a user does not have an account, they will be able to press the sign up hyperlink underneath the buttons to go to the Create Account page.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/WEB/Web%201920%20%E2%80%93%201%20%5BHOMEPAGE%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/TABLET/iPad%2C%20Nexus%209%20%E2%80%93%201%20%5BHOMEPAGE%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/MOBILE/Samsung%20Galaxy%20S10%20%E2%80%93%201%20%5BHOMEPAGE%5D.jpg)

### Login Page
The Login Page contains textboxes for a user to enter their credentials. Afterwards, they will be redirected to their respected Dashboards.
In the case that a user had forgotten their password, they will be able to press the hyperlink under the textboxes to move to the forgot password page.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/WEB/Web%201920%20%E2%80%93%202%20%5BLOGIN%20PAGE%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/TABLET/iPad%2C%20Nexus%209%20%E2%80%93%202%20%5BLOGIN%20PAGE%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/MOBILE/Samsung%20Galaxy%20S10%20%E2%80%93%202%20%5BLOGIN%20PAGE%5D.jpg)

### Create Account Page
The create account page will contain a form for a user to enter their new account details to be stored in the database.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/WEB/Web%201920%20%E2%80%93%203%20%5BCREATE%20ACCOUNT%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/TABLET/iPad%2C%20Nexus%209%20%E2%80%93%203%20%5BCREATE%20ACCOUNT%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/MOBILE/Samsung%20Galaxy%20S10%20%E2%80%93%203%20%5BCREATE%20ACCOUNT%5D.jpg)

### Forgot Password Page
The Forgot password page will allow a user to send a link to their email to reset their password.
The email will contain a temporary password that a user will be able to sign in again with and from there they can navigate to the
change password page to change it.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/WEB/Web%201920%20%E2%80%93%204%20%5BFORGOT%20PASSWORD%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/TABLET/iPad%2C%20Nexus%209%20%E2%80%93%204%20%5BFORGOT%20PASSWORD%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/MOBILE/Samsung%20Galaxy%20S10%20%E2%80%93%204%20%5BFORGOT%20PASSWORD%5D.jpg)

### Student Dashboard Page
The Student dashboard will contain a list of all the classes a student is registered for the next upcoming term.
The dashboard will also contain a navigation bar at the top which will navigate a user to the Add Class Page, the Drop Class Page, and the Change Password Page.
On the top right of the navigation bar a user will be able to log out from their session. Moreover, below the table with the registered class information a user will be able to
navigate to the course dictionary page, and the course deadline page. 
The footer will contain information about the signed-in user, whenever a user is in an active session.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/WEB/Web%201920%20%E2%80%93%205%20%5BSTUDENT%20DASHBOARD%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/TABLET/iPad%2C%20Nexus%209%20%E2%80%93%205%20%5BSTUDENT%20DASHBOARD%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/MOBILE/Samsung%20Galaxy%20S10%20%E2%80%93%205%20%5BSTUDENT%20DASHBOARD%5D.jpg)

### Instructor Dashboard Page
Similarly, an Instructor dashboard will contain similar features to the student dashboard.
The only difference being that the navigation bar will have a create class and delete class hyperlink to those pages.
The center of the Dashboard will contain classes that the instructor has created.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/WEB/Web%201920%20%E2%80%93%206%20%5BINSTRUCTOR%20DASHBOARD%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/TABLET/iPad%2C%20Nexus%209%20%E2%80%93%206%20%5BINSTRUCTOR%20DASHBOARD%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/MOBILE/Samsung%20Galaxy%20S10%20%E2%80%93%206%20%5BINSTRUCTOR%20DASHBOARD%5D.jpg)

### Change Password Instructor Page
The change password page will allow a user to change their password by validating their current password and then inputting a new password.
The new password will then be validated to make sure that it is secure (similarly this happens when a user creates their account).
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/WEB/Web%201920%20%E2%80%93%207%20%5BCHANGE%20PASSWORD%20INSTRUCTOR%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/TABLET/iPad%2C%20Nexus%209%20%E2%80%93%207%20%5BCHANGE%20PASSWORD%20INSTRUCTOR%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/MOBILE/Samsung%20Galaxy%20S10%20%E2%80%93%207%20%5BCHANGE%20PASSWORD%20INSTRUCTOR%5D.jpg)

### Change Password Student Page
This page is identical to the instructor version and has the same functionality.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/WEB/Web%201920%20%E2%80%93%208%20%5BCHANGE%20PASSWORD%20STUDENT%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/TABLET/iPad%2C%20Nexus%209%20%E2%80%93%208%20%5BCHANGE%20PASSWORD%20STUDENT%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/MOBILE/Samsung%20Galaxy%20S10%20%E2%80%93%208%20%5BCHANGE%20PASSWORD%20STUDENT%5D.jpg)

### Course Dictionary Student Page
The Course Dictionary will contain a table with all the classes that have been created. Here any user will be able to view what classes are available.
It will also contain a search feature in the top left corner of the navigation bar that will allow users to filter the results.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/WEB/Web%201920%20%E2%80%93%209%20%5BCOURSE%20DISCTIONARY%20STUDENT%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/TABLET/iPad%2C%20Nexus%209%20%E2%80%93%209%20%5BCOURSE%20DICTIONARY%20STUDENT%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/MOBILE/Samsung%20Galaxy%20S10%20%E2%80%93%209%20%5BCOURSE%20DICTIONARY%20STUDENT%5D.jpg)

### Course Dictionary Instructor Page
The Course Dictionary will contain a table with all the classes that have been created. Here any user will be able to view what classes are available.
It will also contain a search feature in the top left corner of the navigation bar that will allow users to filter the results.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/WEB/Web%201920%20%E2%80%93%2010%20%5BCOURSE%20DICTIONARY%20INSTRUCTOR%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/TABLET/iPad%2C%20Nexus%209%20%E2%80%93%2010%20%5BCOURSE%20DICTIONARY%20INSTRUCTOR%5D.jpg)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Marinos%20Images/MOBILE/Samsung%20Galaxy%20S10%20%E2%80%93%2010%20%5BCOURSE%20DICTIONARY%20INSTRUCTOR%5D.jpg)

### Add Class Page
Students will be able to search for a specific class by the course title and course number. The course title will have a drop down menu with all the subjects listed, and the students can then search up the specific course number. Afterwards, a table of available classes and its information, such as instructor and time/day, will show up. From the options, students will be able to choose and add classes that fits to their liking by adding them to shopping cart.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Desktop/Desktop%20-%20Add%20Class.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Tablet/Tablet%20-%20Add%20Class.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Mobile/Mobile%20-%20Add%20Class.png)


### Class Deadline Page
The class deadline page will contain a table showing which term and what time/day the student(s) can start enrolling in class. With this, the students can keep track of when they can start enrolling and when is the last day to enroll in a class.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Desktop/Desktop%20-%20Class%20Deadline.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Tablet/Tablet%20-%20Class%20Deadline.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Mobile/Mobile%20-%20Class%20Deadline.png)


### Create Class Page
In this page, instructors will be able to create a class. The instructor must fill out the required information so that it can be found in the course directory. The required information includes term, course name, course number, time and days, description of course and capacity. Clicking on submit will make the created class show up on Course Directory for student and instructor as well as Add Class page for students to see.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Desktop/Desktop%20-%20Create%20Class.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Tablet/Tablet%20-%20Create%20Class.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Mobile/Mobile%20-%20Create%20Class.png)


### Delete Class Page
Instructors can delete a class they created. In a table, there will be a list of classes they have created to teach with its information, such as time and days, and they can select a specific class they're deleting. After clicking on submit, the class will no longer show up on Course Directory and Add Class pages.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Desktop/Desktop%20-%20Delete%20Class.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Tablet/Tablet%20-%20Delete%20Class.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Mobile/Mobile%20-%20Delete%20Class.png)


### Drop Class Page
This page has a table of classes that a student selected. The table has information about the classes they picked, such as instructor, credits and time/days. From the table, the student can select the checkbox to specify which class they want to drop.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Desktop/Desktop%20-%20Drop%20Class.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Tablet/Tablet%20-%20Drop%20Class.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Mobile/Mobile%20-%20Drop%20Class.png)


### Shopping Cart Page
Students will be able to view the classes they have selected to take and enroll in classes in the shopping cart page. This page has information on the class's instructor, credits, room and time/days which they have picked. If they don't want to take a certain class, they can select it and then delete it. They can also select all the classes and enroll.
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Desktop/Desktop%20-%20Shopping%20Cart.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Tablet/Tablet%20-%20Shopping%20Cart.png)
![alt text](https://github.com/bbarua15/qcfirst/blob/main/Deliverable%201%20-%20Images/Mobile/Mobile%20-%20Shopping%20Cart.png)

___
## Differences between wireframes and final outcome:

For the most part our web application follows our wireframes closely. Some noticeable differences are: the structure of some elements (i.e. they follow more of a vertical placement on top of each other as opposed to being horizontal in some cases); a navigation bar has been added to the first 4 pages of the site map for users who have not logged in; additional footer details have been added; more images utilized throughout the website (and can be seen on the footer, header, add class page, and the course dictionary pages); additional textboxes added in the account creation page; and lastly, the log out button was integrated into the navigation bar.

Following the initial changes above, we decided to remove the shopping cart page entirely and integrate it into the add class page. Moreover, when the requirements for the project requested for an admin section we integrated pages with a similar aesthetic to both the instructor and student pages.

Finally, additional hyperlinks were added to the starting pages of the application to make it more convenient for users to navigate, and the instructor dashboard has a section on the bottom to show the students who are entrolled in the class.





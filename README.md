# qcfirst

**QCFirst** is a prototype course enrollment application where users (i.e. students and instructors)
can access features to help simulate an online enrollment environment. 

The following application will contain features of: **User Management**, **Course Management**, and **Enrollment Management**.

**User Management** will focus on creating a responsive environment for both students and instructors when
accessing the course enrollment application.

**Course Management** will be managed by instructors and will allow them to create and delete courses through a database.

**Enrollment Management** will focus on allowing students to register for classes for an upcoming semester.


## Link to app
Our website can be viewed here: 

## Contributors:
Marinos Dakis (https://github.com/MarinosDakis)

Badhan Barua (https://github.com/bbarua15) 

***HTML Deliverable***
For the first project deliverable we split up the task of creating the HTML for the pages from how we divided the site map originally.
For the navigation bars, I created 3 separate versions for each instance (i.e. no user, student user, and instructor user) of the web application using online resources.
Each instance has different html pages associated with them and will contain their corresponding navigation bar inserted using Javascript.
Similarly, this is done with the footer for the website as well; however it will be placed on all pages of the web application and then modified once a user logs in. 

***CSS Deliverable***
Marinos: For this deliverable we were able to use the navigation bars and footer I created using online resources from the previous HTML deliveriable which included its CSS with it. Then, I created some images for the logo to add to the header and footer of the webpages. In addition, I created some classes to help utilize flexbox functionality for the elements used throughout the pages. Moreover, additional CSS was adapted to help improve the overall design of the website, including its responsiveness for mobile and tablets. Some functionality using Bootstrap were also implemented to improve the look of some of the tables.

Badhan: Using CSS, we implemented styling to the form (such as the log in, sign up, change password, create class for instructor and add class for student pages) so that it would look more presentable to the user. With media queries and sizing, we made sure it's responsive in mobile and tablet. In order to make the table responsive, we used bootstrap so that when it's on mobile and tablet, the tables are scrollable horizontally. Overall, we implemented design to the website and made it responsive for mobile and tablet. 


## Features
* Students and instructors can access our website by creating an account and then logging in
* Students can enroll in classes, drop classes and view their current enrolled courses.
* Instructors are able to create and delete classes. They can view which classes they're teaching and the roster of students. 
* The website is repsonive to mobile, tablet and desktop

## Additional links
* Login Page: 
* Create Account Page: 

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

## Differences between wireframes and deliverable:

For the most part our web application follows our wireframes closely. Some noticeable differences are: the structure of some elements (i.e. they follow more of a vertical placement on top of each other as opposed to being horizontal in some cases); a navigation bar has been added to the first 4 pages of the site map for users who have not logged in; additional footer details have been added; more images utilized throughout the website (and can be seen on the footer, header, shopping-cart page, and the course dictionary pages); additional textboxes added in the account creation page; and lastly, the log out button was integrated into the navigation bar.





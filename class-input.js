/*
const ClassModel = require("app");

class ClassInput {
    static async getAll() {
        return ClassModel.find({}).sort({ createdAt: -1 }).exec();
    }

    static async getOne(classId) {
        return ClassModel.findById(classId).exec();
    }

    static async create(data) {
        const course = new ClassModel(data);
        return course.save();
    }

    static async update(classId, data) {
        return ClassModel.findByIdAndUpdate(classId, data).exec();
    }

    static async remove(classId) {
        return ClassModel.deleteOne({ _id: classId }).exec();
    }
}

module.exports = ClassInput;
*/

// code below was moved from app.js since it was underneath it

// Adapted from: https://www.youtube.com/watch?v=-RCnNyD0L-s
// app.set('view engine', 'html');
// app.use(bodyParser.urlencoded({extended:true}));


// const mySecret = process.env['SESSION_SECRET']
// app.use(require("express-session")({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

// // set passport up to use in the application
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// passport.use(new LocalStrategy(User.authenticate()));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + "/views/html/index.html");
// });

// app.get('/student-dashboard-html.html', isLoggedIn, (req, res) => {
//     res.sendFile(__dirname + "/views/html/student-dashboard-html.html");
// });

// app.get('/create-account-page.html', (req, res) => {
//     res.sendFile(__dirname + "/views/html/create-account-page.html");
// });

// // passport will authenticate the user using local and redirect the page to the student dashboard
// app.post("//create-account-page.html", function(req, res){
//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.sendFile(__dirname + "/views/html/create-account-page.html");
//         } else {
//             passport.authenticate("local")(req, res, function(){
//                 res.redirect("/views/html/student-dashboard-html.html");
//             });
//         }
//     });
// });

// app.get('/login-page-html.html', (req, res) => {
//     res.sendFile(__dirname + "/views/html/login-page-html.html");
// });

// //login
// app.post("/login-page-html.html", passport.authenticate("local", {
//     successRedirect: "/views/html/student-dashboard-html.html",
//     failureRedirect: "/login-page-html.html"
// }), function(req, res){
//     //Do nothing
// });

// //sign out
// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/");
// });

// //check to see if user is loggen in
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login-page-html.html");
// }

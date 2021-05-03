// const express = require("express");

// const ItemService = require("class-input");

// module.exports = () => {
//   const router = express.Router();

//   router.get("/:classId?", async (req, res, next) => {
//     try {
//       const courses = await ItemService.getAll();
//       let course = null;

//       // The optional param classId is present
//       if (req.params.classId) {
//         item = await ItemService.getOne(req.params.classId);
//       }

//       return res.render("app", {
//         courses,
//         course,
//       });
//     } catch (err) {
//       return next(err);
//     }
//   });

// router.post("/", async (req, res) => {

//     // Massage the passed in form data a bit
//     const term = req.body.term.trim();
//     const courseName = req.body.courseName.trim();
//     const courseNumber = req.body.courseNumber.trim();
//     const classDate = req.body.classDate.trim();
//     const classDescription = req.body.classDescription.trim();
//     const capacity = req.body.capacity.trim();

//     // Make sure that the passed data is complete
//     if (!term || !courseName || !courseNumber || !classDate || !classDescription || !capacity) {
//       req.session.messages.push({
//         type: "warning",
//         text: "Please enter the required information!",
//       });
//       return res.redirect("app");
//     }


//   // Delete class
//   router.get("/delete/:classId", async (req, res) => {

//     try {
//       await ClassInput.remove(req.params.classId);
//     } catch (err) {
//       // Error handling
//       req.session.messages.push({
//         type: "danger",
//         text: "There was an error while deleting the class!",
//       });
//       console.error(err);
//       return res.redirect("app");
//     }
//     // Let the class knows that everything went fine
//     req.session.messages.push({
//       type: "success",
//       text: "The class was successfully deleted!",
//     });
//     return res.redirect("app");
//   });
//   return router;
// };
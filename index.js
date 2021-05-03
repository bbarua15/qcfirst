// const express = require("express");

// const ItemService = require("class-input");

// module.exports = () => {
//   const router = express.Router();

//   router.get("/:classId?", async (req, res, next) => {
//     try {
//       const courses = await ItemService.getAll();
//       let course = null;

//       // The optional param itemId is present
//       if (req.params.itemId) {
//         item = await ItemService.getOne(req.params.itemId);
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


//   // Delete item
//   router.get("/delete/:classId", async (req, res) => {

//     try {
//       await ClassInput.remove(req.params.itemId);
//     } catch (err) {
//       // Error handling
//       req.session.messages.push({
//         type: "danger",
//         text: "There was an error while deleting the item!",
//       });
//       console.error(err);
//       return res.redirect("app");
//     }
//     // Let the item knows that everything went fine
//     req.session.messages.push({
//       type: "success",
//       text: "The class was successfully deleted!",
//     });
//     return res.redirect("app");
//   });
//   return router;
// };
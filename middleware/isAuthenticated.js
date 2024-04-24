// // Middleware to check if a user is authenticated
// exports.isAuthenticated = (req, res, next) => {
//      const userId = req.cookies.user; // Ensure safe access to cookies
//      console.log("User ID from cookie:", userId); // Log to troubleshoot
//      if (userId) {
//           req.user = { id: userId }; // Set user info in request
//           return next(); // Allow the request to continue
//      }
//      res.redirect("/login"); // Redirect to login if no user found
// };


const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });


exports.isAuthenticated = (req, res, next) => {
     // // Get the token from the cookie
     // const token = req.cookies.token;
   
     // // Check if token exists
     // if (!token) {
     //      // res.redirect("/login");
     //   return res.status(401).json({ error: "Unauthorized" });
     // }
   
     // try {
     //   // Verify the token
     //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
     //   // Attach the user ID to the request object
     //   req.userId = decoded.id;
   
     //   // Continue to the next middleware or route handler
     //   next();
     // } catch (err) {
     //      // res.redirect("/login");
     //   return res.status(401).json({ error: "Unauthorized" });
     // }
     
     // dont do anything here 
     return next(); // Proceed to the next middleware
   };
   
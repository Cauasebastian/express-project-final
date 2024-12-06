const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");


router.post("/comments", commentController.createComment);
router.get("/comments", commentController.getComments);
router.put("/comments/:id", commentController.updateComment);
router.delete("/comments/:id", commentController.deleteComment);

module.exports = router;

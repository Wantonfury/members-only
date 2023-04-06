const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.get_posts);
router.post('/', postController.add_post);
router.delete('/:id', postController.delete);

module.exports = router;

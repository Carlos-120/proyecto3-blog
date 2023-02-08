const postControllers = require('./posts.controllers')

const getAllPosts = (req, res) => {
    postControllers.findAllPosts()
        .then(data => {
            if (data.content == null) {
                res.status(401)
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const getPostById = (req, res) => {
    const id = Number(req.param.id)
    postControllers.findPostById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                req.status(404).json({ message: 'Post not found' })
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
}
const PostNewPost = (req, res) => {
    const postObj = req.body
    postControllers.createPost(postObj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            req.status(400).json(err)
        })
}
const deletePost = (req, res) => {
    const id = req.params.id

    postControllers.deletePost(id)
        .then(data => {
            if (data) {
                res.status(204).json()
            } else {
                res.status(404).json({ message: 'Post not found' })
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const patchPost = (req, res) => {
    const id = req.params.id
    const postObj = req.body
    postControllers.updatePost(id, postObj)
        .then(data => {
            if (data[[1]]) {
                res.json(data[[1]])
            } else {
                res.json(data[[0]])
            }

        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const putPost = (req, res) => {
    const id = req.params.id
    const postObj = req.body

    if (!postObj.content || !postObj.userName || !postObj.isPublished) {
        return res.status(400).json({
            message: 'Missing Data',
            example_fields: {
                content: 'String',
                userName: 'fashion',
                isPublished: true
            }
        })
    }

    postControllers.updatePost(id, postObj)
        .then(data => {
            if (data) {
                res.status(200).json({ message: `Post with id: ${id} updated succesfully` })
            } else {
                res.status(404).json({ message: 'Post not found' })
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

module.exports = {
    getAllPosts,
    getPostById,
    PostNewPost,
    deletePost,
    patchPost,
    putPost
}
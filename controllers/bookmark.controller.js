const Bookmark = require('../models/bookmark.models');

const searchBookmark = async (req, res) => {
    const { query } = req.query;
    try {
        const bookmarks = await Bookmark.find({ $text: { $search: query } });
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getBookmarksByUser = async (req, res) => {
    const { user } = req.params;
    try {
        const bookmarks = await Bookmark.find({ user });
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createBookMark = async (req, res) => {
    const { url, title, user, description, tag } = req.body;
    try {
        const bookmark = await Bookmark.create({
            url,
            title,
            user,
            description,
            tag
        });
        res.status(201).json(bookmark);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const editBookmark = async (req, res) => {
    const { id } = req.params;
    const { url, title, user, description, tag } = req.body;
    try {
        const bookmark = await Bookmark.findByIdAndUpdate(id, {
            url,
            title,
            user,
            description,
            tag
        }, { new: true });
        res.status(201).json(bookmark);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const deleteBookmark = async (req, res) => {
    const { id } = req.params;
    try {
        const bookmark = await Bookmark.findByIdAndDelete(id);
        res.status(201).json(bookmark);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    createBookMark,
    editBookmark,
    deleteBookmark,
    getBookmarksByUser,
    searchBookmark
}  
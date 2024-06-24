const Page = require('../models/pageModel'); // Make sure the model is correctly set up
const mongoose = require('mongoose');

// Get a single page by ID
const getPage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid page ID" });
    }

    const page = await Page.findById(id);

    if (!page) {
        return res.status(404).json({ error: "Page not found" });
    }

    res.status(200).json(page);
}

// Get all pages
const getPages = async (req, res) => {
    try {
        const pages = await Page.find({}).sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new page
const createPage = async (req, res) => {
    const { title, tags } = req.body;

    // Validate required fields
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const page = new Page({ title, tags });
        await page.save();
        console.log('Page created successfully');
        res.status(201).json(page);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a page by ID
const deletePage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid page ID" });
    }

    const page = await Page.findByIdAndDelete(id);

    if (!page) {
        return res.status(404).json({ error: "Page not found" });
    }

    res.status(200).json({ message: "Page deleted successfully" });
}

// Update a page by ID
const updatePage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid page ID" });
    }

    try {
        const page = await Page.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!page) {
            return res.status(404).json({ error: "Page not found" });
        }

        res.status(200).json(page);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getPage, 
    getPages,
    createPage,
    deletePage,
    updatePage,
};

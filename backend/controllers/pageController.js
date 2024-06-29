const Page = require('../models/pageModel'); // Make sure the model is correctly set up
const mongoose = require('mongoose');

// Get a single page by ID
const getPage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid page ID" });
    }

    const page = await Page.findById(id).populate('parent').populate('children'); // Populate parent and children

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
    const { title, tags, parent } = req.body;

    // Validate required fields
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const page = new Page({ title, tags, parent });
        await page.save();

        if (parent) {
            // Update the parent's children array
            await Page.findByIdAndUpdate(parent, { $push: { children: page._id } });
        }

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

    // Remove the deleted page from its parent's children array
    if (page.parent) {
        await Page.findByIdAndUpdate(page.parent, { $pull: { children: page._id } });
    }

    res.status(200).json({ message: "Page deleted successfully" });
}

// Delete all pages
const deleteAllPages = async (req, res) => {
    try {
        const result = await Page.deleteMany({});
        res.status(200).json({ message: "All pages deleted successfully", deletedCount: result.deletedCount })
    } catch (error) {
        res.status(400).json({ error: "Failed to delete all pages" })
    }
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
    deleteAllPages,
    updatePage,
};

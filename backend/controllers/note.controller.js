import Note from "../models/noteSchema.js";

export const getNotes = async (req, res) => {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
};

export const createNote = async (req, res) => {
    const note = await Note.create({
        content: req.body.content,
        userId: req.user.id,
    });
    res.status(201).json(note);
};

export const updateNote = async (req, res) => {
    const updated = await Note.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { content: req.body.content },
        { new: true, runValidators: true }
    );

    if (!updated) {
        return res.status(403).json({ message: "Not allowed" });
    }

    res.json(updated);
};

export const deleteNote = async (req, res) => {
    const deleted = await Note.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
    });

    if (!deleted) {
        return res.status(403).json({ message: "Not allowed" });
    }

    res.status(204).end();
};

import Note from "../models/noteSchema.js";
import connectDB from "../dbConnect/index.js";


connectDB();


const getNotes = async (req, res) => {
    console.log("[GET] /notes - Fetching all notes");
    try {
        const notes = await Note.find();
        console.log(`[SUCCESS] Fetched ${notes.length} notes`);
        res.json(notes);
    } catch (err) {
        console.error("[ERROR] GET /notes:", err.message);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
}
const createNote = async (req, res) => {
    console.log("[POST] /notes - Payload:", req.body);
    try {
        const note = await Note.create({
            content: req.body.content,
        });
        console.log("[SUCCESS] Created new note:", note);
        res.status(201).json(note);
    } catch (err) {
        console.error("[ERROR] POST /notes:", err.message);
        res.status(400).json({ error: err.message });
    }
}

const updateNote = async (req, res) => {
    console.log(`[PUT] /notes/${req.params.id} - Payload:`, req.body);
    try {
        const updated = await Note.findByIdAndUpdate(
            req.params.id,
            { content: req.body.content },
            { new: true, runValidators: true }
        );

        if (!updated) {
            console.warn(`[WARN] No note found with id: ${req.params.id}`);
            return res.status(404).json({ error: "Note not found" });
        }

        console.log("[SUCCESS] Updated note:", updated);
        res.json(updated);
    } catch (err) {
        console.error(`[ERROR] PUT /notes/${req.params.id}:`, err.message);
        res.status(400).json({ error: err.message });
    }
}

const deleteNote = async (req, res) => {
    console.log(`[DELETE] /notes/${req.params.id} - Deleting note`);
    try {
        const deleted = await Note.findByIdAndDelete(req.params.id);

        if (!deleted) {
            console.warn(`[WARN] No note found to delete with id: ${req.params.id}`);
            return res.status(404).json({ error: "Note not found" });
        }

        console.log("[SUCCESS] Deleted note:", deleted);
        res.status(204).end();
    } catch (err) {
        console.error(`[ERROR] DELETE /notes/${req.params.id}:`, err.message);
        res.status(400).json({ error: err.message });
    }
}

export { getNotes, createNote, updateNote, deleteNote };
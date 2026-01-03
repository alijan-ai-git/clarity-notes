import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

function Notes() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:3000/notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        toast.error("Failed to load notes");
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  const saveNote = async () => {
    if (!text.trim()) return toast.error("Cannot save empty note");
    setLoading(true);

    try {
      if (editingId) {
        const res = await fetch(`http://localhost:3000/notes/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        });
        const updated = await res.json();
        setNotes(notes.map(n => (n._id === editingId ? updated : n)));
        toast.success("Note updated");
        setEditingId(null);
      } else {
        const res = await fetch("http://localhost:3000/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        });
        const newNote = await res.json();
        setNotes([...notes, newNote]);
        toast.success("Note added");
      }
      setText("");
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    const oldNotes = [...notes];
    setNotes(notes.filter(n => n._id !== id));
    try {
      const res = await fetch(`http://localhost:3000/notes/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Delete failed");
      toast.success("Note deleted");
    } catch (err) {
      setNotes(oldNotes);
      toast.error("Failed to delete note");
      console.error(err);
    }
  };

  const editNote = (note) => {
    setEditingId(note._id);
    setText(note.content);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#eef1f5] via-[#f7f8fa] to-[#ffffff] font-sans overflow-hidden">
      <Toaster position="top-right" />

      {/* Ambient light */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[120px]" />

      {/* Header */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
          Notes
        </h1>
        <p className="text-gray-600 mt-1">
          Clear mind. Clear thoughts.
        </p>
      </header>

      {/* Composer */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 mb-10">
        <div className="flex items-center gap-3 p-4 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start a new note…"
            disabled={loading}
            className="flex-1 bg-transparent outline-none text-lg text-gray-900 placeholder-gray-500"
          />
          <button
            onClick={saveNote}
            disabled={loading}
            className="px-5 py-2 rounded-2xl bg-black/80 text-white text-sm font-medium hover:bg-black transition"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="group p-5 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-[0_15px_30px_rgba(0,0,0,0.12)] transition hover:scale-[1.02]"
            >
              <p className="text-gray-900 leading-relaxed mb-6">
                {note.content}
              </p>

              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => editNote(note)}
                  className="px-3 py-1.5 rounded-xl text-sm text-gray-700 bg-white/60 border border-white/40 hover:bg-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="px-3 py-1.5 rounded-xl text-sm text-red-500 bg-white/60 border border-white/40 hover:bg-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Notes;
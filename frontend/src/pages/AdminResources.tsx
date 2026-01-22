import { useEffect, useState } from "react";
import { getResources, uploadResource, deleteResource, uploadGame } from "../services/api";

const AdminResources = () => {
  // --- Existing Resource States ---
  const [resources, setResources] = useState<any[]>([]);
  const [subject, setSubject] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // --- New Fun Games States ---
  const [gameData, setGameData] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A" // Default selection
  });

  const fetchResources = async () => {
    const res = await getResources();
    setResources(res.data);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // --- Existing HandleUpload (PDFs) ---
  const handleUpload = async () => {
    if (!file) return alert("Select a PDF");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("chapterName", chapterName);
      formData.append("file", file);
      await uploadResource(formData);
      await fetchResources();
      setSubject(""); setChapterName(""); setFile(null);
      alert("Uploaded successfully");
    } catch (err) { alert("Upload failed"); } finally { setLoading(false); }
  };

  // --- New HandleGameUpload (Fun Games) ---
  const handleGameUpload = async () => {
    if (!gameData.questionText || !gameData.optionA) return alert("Please fill all fields");
    try {
      setLoading(true);
      await uploadGame(gameData);
      alert("New Question Live! Leaderboard has been reset.");
      setGameData({ questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "A" });
    } catch (err) {
      alert("Game upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this resource?")) return;
    try {
      await deleteResource(id);
      await fetchResources();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div style={{ padding: "20px", color: "white", backgroundColor: "#121212" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "50px" }}>

        {/* --- SECTION 1: STUDY RESOURCES --- */}
        <div style={{ flex: 1, border: "1px solid #333", padding: "15px" }}>
          <h3>1. Upload Study Resource (PDF)</h3>
          <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} /><br /><br />
          <input placeholder="Chapter Name" value={chapterName} onChange={(e) => setChapterName(e.target.value)} /><br /><br />
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} /><br /><br />
          <button onClick={handleUpload} disabled={loading}> {loading ? "Uploading..." : "Upload PDF"} </button>
        </div>

        {/* --- SECTION 2: FUN GAMES --- */}
        <div style={{ flex: 1, border: "1px solid #333", padding: "15px" }}>
          <h3>2. Update Fun Game Question</h3>
          <textarea
            placeholder="Enter Question"
            value={gameData.questionText}
            onChange={(e) => setGameData({...gameData, questionText: e.target.value})}
            style={{ width: "100%", height: "60px" }}
          /><br /><br />
          <input placeholder="Option A" value={gameData.optionA} onChange={(e) => setGameData({...gameData, optionA: e.target.value})} />
          <input placeholder="Option B" value={gameData.optionB} onChange={(e) => setGameData({...gameData, optionB: e.target.value})} /><br /><br />
          <input placeholder="Option C" value={gameData.optionC} onChange={(e) => setGameData({...gameData, optionC: e.target.value})} />
          <input placeholder="Option D" value={gameData.optionD} onChange={(e) => setGameData({...gameData, optionD: e.target.value})} /><br /><br />

          <label>Correct Answer: </label>
          <select value={gameData.correctAnswer} onChange={(e) => setGameData({...gameData, correctAnswer: e.target.value})}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select><br /><br />

          <button onClick={handleGameUpload} disabled={loading} style={{ backgroundColor: "#28a745", color: "white" }}>
            {loading ? "Updating Game..." : "Set New Question"}
          </button>
          <p style={{ fontSize: "12px", color: "orange" }}>*Note: This will clear the current leaderboard!</p>
        </div>

      </div>

      <hr />
      <h3>Uploaded Study Resources</h3>
      <ul>
        {resources.map((r) => (
          <li key={r.id}>
            {r.subject} – {r.chapterName}
            <button onClick={() => handleDelete(r.id)} style={{ marginLeft: "10px" }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminResources;
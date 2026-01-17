import { useEffect, useState } from "react";
import { getResources, uploadResource, deleteResource } from "../services/api";

const AdminResources = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [subject, setSubject] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    const res = await getResources();
    setResources(res.data);
  };

  useEffect(() => {
    fetchResources();
  }, []);

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

      setSubject("");
      setChapterName("");
      setFile(null);

      alert("Uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this resource?")) return;

    try {
      await deleteResource(id);
      await fetchResources();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin – Upload Resource</h2>

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Chapter Name"
        value={chapterName}
        onChange={(e) => setChapterName(e.target.value)}
      />
      <br /><br />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <hr />

      <h3>Uploaded Resources</h3>
      <ul>
        {resources.map((r) => (
          <li key={r.id}>
            {r.subject} – {r.chapterName}{" "}
            <a
              href={r.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "lightblue" }}
            >
              View PDF
            </a>
            <button onClick={() => handleDelete(r.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminResources;

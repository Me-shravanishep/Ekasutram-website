import { useEffect, useState, useMemo } from "react";
import { getResources } from "../services/api";
import "./Resources.css";

interface Resource {
  id: number;
  subject: string;
  chapterName: string;
  pdfUrl: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResources()
      .then((res) => setResources(res.data))
      .catch((err) => console.error("Failed to fetch resources", err))
      .finally(() => setLoading(false));
  }, []);

  // Extract unique topics (formerly subjects)
  const topics = useMemo(() => {
    const allTopics = resources.map((r) => r.subject);
    return ["All", ...new Set(allTopics)].filter(Boolean);
  }, [resources]);

  // Filter resources
  const filteredResources = useMemo(() => {
    if (selectedTopic === "All") return resources;
    return resources.filter((r) => r.subject === selectedTopic);
  }, [resources, selectedTopic]);

  // Dummy Templates/Clipcharts
  const dummyTemplates = [
    { id: 101, title: "Graph Paper Template (A4)", type: "PDF" },
    { id: 102, title: "Calculus Formula Sheet", type: "Keynote" },
    { id: 103, title: "Geometry Construction Kit", type: "SVG" },
  ];

  return (
    <div className="resources-container">
      {/* Sidebar */}
      <aside className="resources-sidebar">
        <div className="sidebar-header">
          <h2>Categories</h2> 
        </div>
        <ul className="subject-list">
          {topics.map((topic) => (
            <li key={topic} className="subject-item">
              <button
                className={`subject-btn ${selectedTopic === topic ? "active" : ""}`}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
                <span className="subject-count">
                  {topic === "All"
                    ? resources.length
                    : resources.filter(r => r.subject === topic).length}
                </span>
              </button>
            </li>
          ))}
          <li className="subject-item">
            <button
              className={`subject-btn ${selectedTopic === "Templates" ? "active" : ""}`}
              onClick={() => setSelectedTopic("Templates")}
            >
              Templates & Tools
              <span className="subject-count">{dummyTemplates.length}</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="resources-main">
        <div className="page-header">
          <h1 className="page-title">Learning Resources</h1>
          <p className="page-subtitle">Curated materials to boost your mathematical journey.</p>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading resources...</div>
        ) : (
          <div className="resources-grid">
            {selectedTopic === "Templates" ? (
              dummyTemplates.map(t => (
                <div key={t.id} className="resource-card">
                  <div className="resource-icon">📐</div>
                  <div className="resource-subject">{t.type}</div>
                  <h3 className="resource-title">{t.title}</h3>
                  <button className="resource-link">Download <span className="external-icon">⬇</span></button>
                </div>
              ))
            ) : (
              filteredResources.map((r) => (
                <div key={r.id} className="resource-card">
                  <div className="resource-icon">📚</div>
                  <div className="resource-subject">{r.subject}</div>
                  <h3 className="resource-title">{r.chapterName}</h3>
                  <a
                    href={r.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    Download PDF
                    <span className="external-icon">↗</span>
                  </a>
                </div>
              ))
            )}

            {selectedTopic !== "Templates" && filteredResources.length === 0 && (
              <div className="no-results">No resources found.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Resources;
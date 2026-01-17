import { useEffect, useState } from "react";
import { getResources } from "../services/api";

const Resources = () => {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    getResources().then((res) => setResources(res.data));
  }, []);

  return (
    <div>
      <h2>Resources</h2>
      <ul>
        {resources.map((r) => (
          <li key={r.id}>
            <a
              href={r.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "lightblue" }}
            >
              {r.subject} — {r.chapterName}
            </a>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;

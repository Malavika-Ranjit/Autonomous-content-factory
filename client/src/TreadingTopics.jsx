// TrendingTopics.jsx
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function TrendingTopics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Initial fetch
    supabase
      .from("generated_content")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data }) => setTopics(data));

    // Realtime subscription
    const subscription = supabase
      .channel("public:generated_content")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "generated_content" },
        (payload) => {
          setTopics((prev) => [payload.new, ...prev].slice(0, 10));
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Trending Topics</h3>
      <ul>
        {topics.map((t) => (
          <li key={t.id}>{t.topic}</li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from "react";
import PageHead from "../components/PageHead";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import { insightCategories, insights } from "../data/insights";

export default function Insights() {
  const [category, setCategory] = useState("All");

  const visible =
    category === "All"
      ? insights
      : insights.filter((item) => item.category === category);

  return (
    <>
      <Seo
        title="Insights | DRKS Alignment LLC"
        description="Perspectives on strategy, organizational alignment, leadership, operations, government contracting and program management."
      />
      <PageHead
        crumb="Insights"
        title="Notes from the gap between strategy and delivery."
        intro="Short, practical pieces on the problems leadership teams actually bring us."
      />

      <section className="section">
        <div className="shell">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 48,
            }}
          >
            {insightCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={item === category ? "btn btn--navy" : "btn btn--outline"}
                style={{ padding: "9px 18px", fontSize: "0.85rem" }}
                aria-pressed={item === category}
              >
                {item}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="form-status">
              No articles in this category yet. Choose another category, or
              select All to see everything published so far.
            </div>
          ) : (
            <div className="grid-3">
              {visible.map((insight) => (
                <article className="insight" key={insight.slug}>
                  <span className="insight__cat">{insight.category}</span>
                  <h3>{insight.title}</h3>
                  <p>{insight.excerpt}</p>
                  <p
                    style={{
                      marginTop: 16,
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                    }}
                  >
                    {insight.readTime}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Want these as they publish?"
        body="Tell us which topics matter to your team and we will send new pieces in those areas."
        actions={[
          { label: "Start a conversation", to: "/contact", variant: "btn--gold" },
        ]}
      />
    </>
  );
}

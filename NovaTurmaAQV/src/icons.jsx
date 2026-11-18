
export function SenaiLogo() {
  return (
    <div
      className="senai-logo-container"
      style={{
        width: "190px",
        height: "49px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e30613",
        padding: "4px 10px",
        boxSizing: "border-box",
        borderRadius: "1px",
        userSelect: "none",
      }}
    >
      <svg width="16" height="30" viewBox="0 0 14 24" fill="none">
        {[2, 6, 10, 14, 18, 22].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="14"
            y2={y}
            stroke="white"
            strokeWidth="2.5"
          />
        ))}
      </svg>

      <span
        style={{
          color: "#ffffff",
          fontWeight: 900,
          fontSize: "30px",
          letterSpacing: "1px",
          fontStyle: "italic",
          fontFamily: "'Arial Black', Arial, sans-serif",
          lineHeight: 1,
          margin: "0 4px",
        }}
      >
        SENAI
      </span>

      <svg width="16" height="30" viewBox="0 0 14 24" fill="none">
        {[2, 6, 10, 14, 18, 22].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="14"
            y2={y}
            stroke="white"
            strokeWidth="2.5"
          />
        ))}
      </svg>
    </div>
  );
}

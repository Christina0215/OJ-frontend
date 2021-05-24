import React from "react";

function Introduction() {
  return (
    <div style={{ width: "100%", height: "500px", textAlign: "center" }}>
      Introduction
      <div
        style={{ marginTop: "100px", cursor: "pointer", color: "lightblue" }}
        onClick={() => {
          window.location.href = "problem";
        }}
      >
        &gt;&gt;Get Start&lt;&lt;
      </div>
    </div>
  );
}

export default Introduction;

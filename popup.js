document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("scanBtn").addEventListener("click", scanCookies);
});

function scanCookies() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !tab.url.startsWith("http")) {
      alert("Please open a valid website tab.");
      return;
    }

    chrome.cookies.getAll({ url: tab.url }, (cookies) => {
      let missingSecure = 0, missingHttpOnly = 0, missingSameSite = 0;

      const tableBody = document.getElementById("resultsBody");
      tableBody.innerHTML = "";

      if (cookies.length === 0) {
        document.getElementById("summary").textContent = "No cookies found for this domain.";
        document.getElementById("summary").className = "safe";
        document.getElementById("riskLevel").textContent = "";
        return;
      }

      cookies.sort((a, b) => a.name.localeCompare(b.name));

      cookies.forEach(cookie => {
        const row = document.createElement("tr");

        const secureFlag = cookie.secure ? "✅" : "❌";
        const httpOnlyFlag = cookie.httpOnly ? "✅" : "❌";
        const sameSiteFlag = cookie.sameSite ? cookie.sameSite : "❌";

        if (!cookie.secure) missingSecure++;
        if (!cookie.httpOnly) missingHttpOnly++;
        if (!cookie.sameSite || cookie.sameSite.toLowerCase() === "no_restriction") missingSameSite++;

        row.innerHTML = `
          <td>${cookie.name}</td>
          <td>${secureFlag}</td>
          <td>${httpOnlyFlag}</td>
          <td>${sameSiteFlag}</td>
        `;
        tableBody.appendChild(row);
      });

      const totalMissing = missingSecure + missingHttpOnly + missingSameSite;

      // Risk assessment logic
      let risk = "Low";
      let className = "low";

      if (totalMissing === 0) {
        risk = "No Risk";
        className = "safe";
      } else if (totalMissing > (cookies.length * 2)) {
        // if more than 2/3rd of flags are missing
        risk = "High";
        className = "high";
      } else if (totalMissing > (cookies.length)) {
        // if more than 1/3rd of flags are missing
        risk = "Medium";
        className = "medium";
      }

      document.getElementById("summary").textContent = 
        `Detected ${cookies.length} cookies | Missing flags: ${totalMissing}`;
      document.getElementById("summary").className = className;

      document.getElementById("riskLevel").textContent = `Risk Level: ${risk}`;
      document.getElementById("riskLevel").className = className;
    });
  });
}

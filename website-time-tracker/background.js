let activeDomain = null;
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await handleChange(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    await handleChange(tabId);
  }
});

async function handleChange(tabId) {
  if (activeDomain) {
    await saveTime();
  }

  const tab = await chrome.tabs.get(tabId);
  if (!tab.url || !tab.url.startsWith("http")) return;

  activeDomain = new URL(tab.url).hostname;
  startTime = Date.now();
}

async function saveTime() {
  const timeSpent = Date.now() - startTime;

  console.log(`Tracked: ${activeDomain} -> ${timeSpent} ms`);

  try {
    const response = await fetch("http://localhost:8080/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        domain: activeDomain,
        timeSpent: timeSpent
      })
    });

    console.log("Backend response status:", response.status);
  } catch (error) {
    console.error("Backend call failed:", error);
  }
}

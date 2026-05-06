const RULE_IDS = [1, 2, 3];

const blockedRules = [
  {
    id: 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||facebook.com",
      resourceTypes: ["main_frame"]
    }
  },
  {
    id: 2,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||twitter.com",
      resourceTypes: ["main_frame"]
    }
  },
  {
    id: 3,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||reddit.com",
      resourceTypes: ["main_frame"]
    }
  }
];

async function setBlocking(enabled) {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: RULE_IDS,
    addRules: enabled ? blockedRules : []
  });
}

chrome.runtime.onInstalled.addListener(async () => {
  const { focusEnabled = false } = await chrome.storage.sync.get("focusEnabled");
  await setBlocking(focusEnabled);
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "FOCUS_TOGGLE") {
    setBlocking(Boolean(message.enabled))
      .then(() => sendResponse({ ok: true }))
      .catch((error) => sendResponse({ ok: false, error: String(error) }));
    return true;
  }
  return false;
});

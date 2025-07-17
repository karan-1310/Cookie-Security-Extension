# 🍪 Cookie Security Enhancer Extension

A Chrome browser extension that scans cookies set by the active webpage, analyzes their **security attributes** (`Secure`, `HttpOnly`, and `SameSite`), and evaluates the **overall risk level** based on missing or weak configurations.

---

## 🔍 Objective

To build a Chrome extension that helps identify insecure cookie configurations by:

- Scanning cookies on any active webpage.
- Analyzing attributes: `Secure`, `HttpOnly`, and `SameSite`.
- Evaluating overall cookie security and flagging missing settings.

---

## 🛠️ Tools & Environment

- **Browser:** Google Chrome (Developer Mode)
- **Languages:** HTML, CSS, JavaScript
- **Chrome API Permissions:**
  - `cookies`
  - `activeTab`
  - `storage`
  - `host_permissions` for `<all_urls>`

---

## 📦 Extension Structure

### 1. `manifest.json`
- Defines metadata for the extension.
- Declares required permissions and references the popup interface.
- Registers icon assets for different resolutions.

### 2. `popup.html`
- Provides the UI with:
  - A "Scan" button.
  - Table structure to display cookie analysis.
- Links external CSS and JavaScript.

### 3. `popup.css`
- Styles the popup for readability and basic aesthetics.
- Defines risk levels using CSS classes:
  - `.low`, `.medium`, `.high`

### 4. `popup.js` (Core Logic)
- Fetches all cookies for the active tab's domain using `chrome.cookies.getAll()`.
- Sorts cookies alphabetically.
- Iterates over each cookie to check for:
  - `Secure` flag
  - `HttpOnly` flag
  - `SameSite` attribute (`Strict`, `Lax`, `None`, or missing)
- Counts how many cookies are missing each attribute.
- Displays results in a table.
- Computes risk level:

| Risk Level | Criteria                          |
|------------|-----------------------------------|
| No Risk    | All attributes are correctly set  |
| Medium     | More than 1/3rd flags are missing |
| High       | More than 2/3rd flags are missing |

---

## 🔐 Risk Evaluation Methodology

| Attribute     | Purpose                                                      |
|---------------|--------------------------------------------------------------|
| `Secure`      | Ensures cookies are sent only over HTTPS                     |
| `HttpOnly`    | Prevents JavaScript access, reduces XSS risk                 |
| `SameSite`    | Restricts cross-site cookie sending, mitigates CSRF attacks  |

---

## ✅ Validation & Limitations

### ✅ Can Access:
- Cookies accessible via `chrome.cookies` API.
- Cookies available to the extension via proper `host_permissions`.

### ❌ Cannot Access:
- `HttpOnly` cookies set server-side (not exposed to extensions or JS).
- Third-party cookies (unless explicitly allowed by Chrome settings and user permissions).

---

## 📸 Demo

*(Add screenshots or screen recordings of the extension in action here)*

---

## 📁 Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the extension directory.
5. Click the extension icon and press **Scan** to analyze cookies on the current tab.

---

## 🙌 Acknowledgements

Thanks to the Chrome Extensions API team and web security community for continued efforts in making the web safer.

---


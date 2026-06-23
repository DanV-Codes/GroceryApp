# Recovering Your Family Code

GroceryApp protects your shopping lists with a **family code** — a long, random, 16-character key.
Anyone who has the code can read and edit the family's lists, so:

> 🔒 **Keep the code secret.** Never paste the real code into this repo, a public page, or a
> public chat. This guide explains only *how to retrieve* the code — it does **not** contain it.

You enter the code **once per device**; the app then remembers it (browser `localStorage`). You
only need it again on a new device, after clearing site data / using private browsing, or after
tapping **"יציאה" (Leave)**.

---

## How to get your code back — any one of these works

### 1. From a device that's already logged in *(easiest)*
Open the app → on the home screen, the top **family bar** shows `קוד משפחה: …` with a **📋 Copy**
button. Tap it, then paste the code into the other device.

### 2. From the browser's storage *(a logged-in device)*
- Open the browser's DevTools → **Application → Local Storage →** the app's URL → the key
  **`familyCode`** holds the value.
- Or in the DevTools Console: `localStorage.getItem('familyCode')`.

### 3. From the Firebase console — the guaranteed fallback *(project owner)*
Works even if **every** device has forgotten the code, because you own the project:
1. https://console.firebase.google.com → project **`groceryapp-2-b1453`**.
2. **Build → Firestore Database → Data**.
3. Open the **`families`** collection.
4. **The document ID shown there *is* your family code.** Copy it.

> Verified: the family document is stored at `families/<your-code>`. This is why you can never be
> permanently locked out — as the owner you can always read the code off the document ID.

### 4. Your own backup *(recommended — set this up now)*
Save the actual code in a **password manager** (1Password / Bitwarden / your phone's keychain) or
a private note. Fastest recovery, and the one to do today.

---

## Sharing with family
Give a new member the code **privately** (message / AirDrop). They open the app → **Join with
code** → their device then remembers it too.

## If the code is ever exposed
The code is the only key — there's no "reset password" button. If it leaks, create a **new**
family (new code) and migrate the lists into it (same cross-project copy used during setup).

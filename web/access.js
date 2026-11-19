/* Shared access-code check for the questionnaire and assessment pages. */
window.NebulaAccess = {
  async matches(value) {
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(value),
    );
    const hash = [...new Uint8Array(digest)]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return (
      hash ===
      "0f7a4f8120712df5464758e375faf9829818369c774fcedb64ed7bd3b62f5ea1"
    );
  },
};

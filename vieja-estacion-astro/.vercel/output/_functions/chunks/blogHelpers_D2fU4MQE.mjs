function generateSlug(title) {
  return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}
function generateFrontmatter(data) {
  const author = data.author || "Vieja Estación";
  const published = data.published !== void 0 ? data.published : false;
  return `---
title: "${data.title.replace(/"/g, '\\"')}"
pubDate: ${data.pubDate.toISOString()}
description: "${data.description.replace(/"/g, '\\"')}"
heroImage: "${data.heroImage}"
author: "${author}"
published: ${published}
---`;
}
function validateBlogPost(data) {
  if (!data || typeof data !== "object") return null;
  if (!data.title || typeof data.title !== "string" || data.title.length < 5 || data.title.length > 100) {
    return null;
  }
  if (!data.description || typeof data.description !== "string" || data.description.length < 20 || data.description.length > 500) {
    return null;
  }
  if (!data.content || typeof data.content !== "string" || data.content.length < 50) {
    return null;
  }
  if (!data.heroImage || typeof data.heroImage !== "string") {
    return null;
  }
  if (!data.pubDate || !(data.pubDate instanceof Date) || isNaN(data.pubDate.getTime())) {
    return null;
  }
  return {
    title: data.title.trim(),
    description: data.description.trim(),
    content: data.content,
    heroImage: data.heroImage,
    pubDate: data.pubDate,
    author: data.author || "Vieja Estación",
    published: data.published !== void 0 ? Boolean(data.published) : false
  };
}
function generateUniqueImageName(originalName) {
  const date = /* @__PURE__ */ new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const timestamp = date.getTime();
  const cleanName = originalName.toLowerCase().replace(/[^\w.-]/g, "-").replace(/-+/g, "-");
  return `${year}-${month}-${day}-${timestamp}-${cleanName}`;
}
function verifyToken(token, secret) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { valid: false, expired: false };
    }
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
    if (payload.exp && Date.now() >= payload.exp * 1e3) {
      return { valid: false, expired: true };
    }
    return { valid: true, expired: false };
  } catch (error) {
    return { valid: false, expired: false };
  }
}
async function generateToken(secret) {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };
  const payload = {
    exp: Math.floor(Date.now() / 1e3) + 60 * 60,
    // 1 hora
    iat: Math.floor(Date.now() / 1e3)
  };
  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signatureData = `${base64Header}.${base64Payload}`;
  const crypto = await import('crypto');
  const signature = crypto.createHmac("sha256", secret).update(signatureData).digest("base64url");
  return `${signatureData}.${signature}`;
}

export { generateUniqueImageName as a, validateBlogPost as b, generateSlug as c, generateFrontmatter as d, generateToken as g, verifyToken as v };

"use server";

export async function signForNewsletter(formData: FormData) {
  const email = formData.get("email");
  if (typeof email !== "string" || !email?.includes("@")) {
    return { status: 400, message: "Invalid email address" };
  }
  
  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;
  if (!endpoint) {
    return { status: 503, message: "Newsletter service not configured" };
  }

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const json = await result.json();
    return json;
  } catch (error) {
    return { status: 500, message: "Failed to subscribe to newsletter" };
  }
}

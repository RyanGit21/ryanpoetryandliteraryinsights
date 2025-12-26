import { supabase } from "./supabase.js";

// 1. Get post ID from URL
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (!postId) {
  document.getElementById("post-title").innerText = "Post not found";
  throw new Error("No post ID");
}

// 2. Fetch post
async function loadPost() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error) {
    console.error(error);
    document.getElementById("post-title").innerText = "Error loading post";
    return;
  }

  // 3. Render
  document.getElementById("post-title").innerText = data.title;
  document.getElementById("post-content").innerHTML = data.content;
}

loadPost();

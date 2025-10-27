import { supabase } from "./supabaseClient.js";
// import { getUserInfo } from "./getUserInfo.js";
import { signedIn } from "./signedIn.js";

export async function createDiscussion(title, description) {
  const user = await signedIn();
  if (!user) return;

  const userId = user.currentUser.id; // should be UUID

  const { data, error } = await supabase
    .from("discussions")
    .insert([{ title, description, user_id: userId }])
    .select()
    .single();

  if (error) {
    console.error("❌ Error creating discussion:", error.message);
    return null;
  }
  return data;
}

export async function handleDiscussionReaction(discussionId, type) {
  const user = await signedIn();
  if (!user) return alert("You must be signed in.");

  const userId = user.currentUser.id;

  try {
    const { data: existing } = await supabase
      .from("discussion_reactions")
      .select("*")
      .eq("discussion_id", discussionId)
      .eq("user_id", userId)
      .maybeSingle();

    if (!existing) {
      await supabase.from("discussion_reactions").insert([{ discussion_id: discussionId, user_id: userId, type }]);
    } else if (existing.type === type) {
      await supabase.from("discussion_reactions").delete().eq("id", existing.id);
    } else {
      await supabase.from("discussion_reactions").update({ type }).eq("id", existing.id);
    }

    // Refresh counts
    await updateDiscussionReactionCounts(discussionId);

  } catch (err) {
    console.error("Reaction error:", err);
  }
}



export async function getDiscussions() {
  const { data, error } = await supabase
    .from("discussions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching discussions:", error.message);
    return [];
  }
  return data;
}



export async function deleteDiscussion(discussionId) {
  const user = await signedIn();
  if (!user) return alert("You must be signed in");

  const userId = user.currentUser.id;
  console.log("Attempting to delete discussion", discussionId, "by user", userId);

  const { data, error } = await supabase
    .from("discussions")
    .delete()
    .eq("id", discussionId)
    .eq("user_id", userId);

  console.log("Delete response:", data, error);

  if (error) {
    alert("Failed to delete discussion");
    return null;
  }

  return data;
}



export async function sendMessage(discussionId, content) {
  const user = await signedIn();
  if (!user) return;
  
  const userId = user.currentUser.id;

  const { data, error } = await supabase
    .from("messages")
    .insert([{ discussion_id: discussionId, content, user_id: userId }])
    .select()
    .single();

  if (error) {
    console.error("❌ Error sending message:", error.message);
    return null;
  }

  return data;
}

export async function getMessages(discussionId) {
  const { data, error } = await supabase
    .from("messages")
    .select("content, created_at, user_id")
    .eq("discussion_id", discussionId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("❌ Error fetching messages:", error.message);
    return [];
  }

  return data;
}


export function subscribeToDiscussion(discussionId, callback) {
  return supabase
    .channel(`discussion_${discussionId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `discussion_id=eq.${discussionId}`,
      },
      (payload) => callback(payload.new)
    )
    .subscribe();
}














// const discussionId = "your_discussion_id";

// supabase
//   .channel(`discussion_${discussionId}`)
//   .on(
//     "postgres_changes",
//     { event: "INSERT", schema: "public", table: "messages", filter: `discussion_id=eq.${discussionId}` },
//     (payload) => {
//       console.log("📨 New message:", payload.new);
//       // Append message to your chat UI
//     }
//   )
//   .subscribe();


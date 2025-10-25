import { supabase } from "./supabaseClient.js";

export async function signedIn() {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error getting session:", sessionError.message);
    return false;
  }

  if (!session) {
    // 🔁 Redirect if not logged in
    window.location.href = "page4.html";
    return false;
  }

  const currentUserID = session.user.id;

  const { data: userData, error: userError } = await supabaseClient.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    return false;
  }

  const currentUser = userData.user;
  console.log("✅ User signed in:", currentUser.email);

  return { currentUserID, currentUser };
}

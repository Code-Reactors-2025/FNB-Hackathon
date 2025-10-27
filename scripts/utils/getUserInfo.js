import { supabase } from "./supabaseClient.js";
import { signedIn } from "./signedIn.js";

/**
 * Fetches the full current user info:
 * - Auth metadata: firstname, lastname, email, phone
 * - Profile table columns: all columns you have
 * @returns {Promise<Object|null>} user info object or null if not signed in
 */
export async function getUserInfo() {
  const user = await signedIn();
  if (!user) return null; // User not signed in

  const userId = user.currentUser.id;

  // Fetch all columns from profiles table
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }

  // Auth user info
  const { email, user_metadata } = user.currentUser;
  const firstname = user_metadata?.firstname || "";
  const lastname = user_metadata?.lastname || "";
  const phone = user_metadata?.phone || "";

  return {
    email,
    firstname,
    lastname,
    phone,
    ...profile // Spread all profile columns like avatar_url, province, etc.
  };
}

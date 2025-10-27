// import { supabase } from "./utils/supabaseClient.js";


const existingUser = localStorage.getItem("userExists");

// async function userExists() {
//   const { data: { session }, error: sessionError } = await supabase.auth.getSession();

//   if (sessionError) {
//     console.error("Error getting session:", sessionError.message);
//     return false;
//   }

//   if (!session) {
//     // 🔁 Redirect if not logged in
//     window.location.href = "page11.html";
//     return false;
//   }

//   const currentUserID = session.user.id;

//   const { data: userData, error: userError } = await supabase.auth.getUser();

//   if (userError) {
//     console.error("Error fetching user:", userError.message);
//     return false;
//   }

//   const currentUser = userData.user;
//   console.log("✅ User signed in:", currentUser.email);

//   return { currentUserID, currentUser };
// }



if (existingUser === "true") {
  // userExists();
  window.location.href = "page11.html";
} 




function startApp() {
      window.location.href = "page2.html";
}


document.getElementById("startApp").addEventListener("click", () => {
  startApp();
})


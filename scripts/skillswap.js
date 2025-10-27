import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";
import { getUserInfo } from "./utils/getUserInfo.js";
import { createDiscussion, getDiscussions, deleteDiscussion, handleDiscussionReaction } from "./utils/discussions.js";

document.addEventListener("DOMContentLoaded", async () => {
  // ==================== USER INFO ====================
  const user = await signedIn();
  if (!user) return; // redirected if not logged in

  const userInfo = await getUserInfo();
  if (!userInfo) return;

  document.getElementById("username").textContent = `${userInfo.firstname} ${userInfo.lastname}`;
  document.getElementById("avatarImg").src = userInfo.avatar_url;

  const userId = user.currentUser.id;

  // ==================== DASHBOARD ELEMENTS ====================
  const bentoGrid = document.getElementById('bentoGrid');
  const addTile = document.getElementById('addTile');
  const menuToggle = document.getElementById('menuToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const sideNav = document.getElementById('sideNav');
  const container = document.querySelector('.container');

  // ==================== SIDE NAV TOGGLE ====================
  menuToggle.addEventListener('click', () => {
    sideNav.classList.add('active');
    container.classList.add('sidebar-open');
  });

  sidebarClose.addEventListener('click', () => {
    sideNav.classList.remove('active');
    container.classList.remove('sidebar-open');
  });

  // ==================== DISCUSSION ELEMENTS ====================
  const skillsSwapMain = document.getElementById("skillSwapMain");
  const newTopic = document.querySelector("#newTopic i");
  const newSkillsTopicSection = document.getElementById("newSkillsTopic");
  const topicForm = document.getElementById("discussionTopicForm");
  const topicTitleInput = document.getElementById("topicTitle");
  const discussionTextarea = document.getElementById("discussion");

  // ==================== SHOW NEW DISCUSSION FORM ====================
  newTopic.addEventListener("click", () => {
    skillsSwapMain.style.transform = "translateX(-100%)";
    skillsSwapMain.style.transition = "all 0.5s";
    newSkillsTopicSection.style.display = "block"; // make form visible
  });

  // ==================== CREATE NEW DISCUSSION ====================
  topicForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = topicTitleInput.value.trim();
  const description = discussionTextarea.value.trim(); // <-- use description here
  if (!title || !description) return alert("Fill all fields");

  try {
    const discussion = await createDiscussion(title, description);
    console.log("Discussion created:", discussion);
    topicTitleInput.value = "";
    discussionTextarea.value = "";
    skillsSwapMain.style.transform = "translateX(0)";
    await loadDiscussions(); // reload discussions
  } catch (err) {
    console.error(err);
    alert("Failed to create discussion");
  }
});

  // ==================== LOAD AND DISPLAY DISCUSSIONS ====================
  async function loadDiscussions() {
  const discussions = await getDiscussions();

  const skillsSwapMain = document.getElementById("skillSwapMain");
  skillsSwapMain.innerHTML = "";

  discussions.forEach(discussion => {
    const div = document.createElement("div");
    div.classList.add("discussion-item");

    div.innerHTML = `
      <p><strong>${discussion.user_firstname} ${discussion.user_lastname}</strong></p>
      <h3>${discussion.title}</h3>
      <p>${discussion.description}</p>
      <p>${new Date(discussion.created_at).toLocaleString()}</p>
      <div class="reactions">
        <button class="likeBtn" data-id="${discussion.id}">👍 <span class="likeCount">${discussion.likes || 0}</span></button>
        <button class="dislikeBtn" data-id="${discussion.id}">👎 <span class="dislikeCount">${discussion.dislikes || 0}</span></button>
      </div>
    `;

    // Only allow creator to delete
    if (userId === discussion.user_id) {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        if (!confirm("Delete this discussion?")) return;
        await deleteDiscussion(discussion.id);
        await loadDiscussions();
      });
      div.appendChild(deleteBtn);
    }

    // Navigate to discussion page
    div.addEventListener("click", () => {
      window.location.href = `discussion.html?id=${discussion.id}`;
    });

    skillsSwapMain.appendChild(div);

    // Add reaction listeners
    const likeBtn = div.querySelector(".likeBtn");
    const dislikeBtn = div.querySelector(".dislikeBtn");

likeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  handleDiscussionReaction(discussion.id, "like").then(() => loadDiscussions());
});

dislikeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  handleDiscussionReaction(discussion.id, "dislike").then(() => loadDiscussions());
});


  });
}

});

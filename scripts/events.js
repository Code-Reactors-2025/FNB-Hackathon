document.addEventListener("DOMContentLoaded", () => {
  const monthYear = document.getElementById("monthYear");
  const calendarDays = document.getElementById("calendarDays");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  function renderCalendar(month, year) {
    calendarDays.innerHTML = "";
    monthYear.textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Empty spaces before month starts
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      calendarDays.appendChild(empty);
    }

    // Add days
    for (let day = 1; day <= totalDays; day++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = day;

      // Highlight today
      if (
        day === currentDate.getDate() &&
        month === currentDate.getMonth() &&
        year === currentDate.getFullYear()
      ) {
        dayDiv.classList.add("today");
      }

      calendarDays.appendChild(dayDiv);
    }
  }

  prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  renderCalendar(currentMonth, currentYear);
});
// ==================== SIDE NAV TOGGLE ====================
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const sideNav = document.getElementById('sideNav');
  const container = document.querySelector('.container');

  menuToggle.addEventListener('click', () => {
    sideNav.classList.add('active');
    container.classList.add('sidebar-open');
  });

  sidebarClose.addEventListener('click', () => {
    sideNav.classList.remove('active');
    container.classList.remove('sidebar-open');
  });
});
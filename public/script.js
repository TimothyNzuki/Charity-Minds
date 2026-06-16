let users = JSON.parse(localStorage.getItem("users")) || [
  {
    firstname: "Mary",
    lastname: "Watson",
    username: "marywatson",
    email: "marywatson@gmail.com",
    phone: "0712345679",
    dob: "1995-11-13",
    gender: "Female",
    createdAt: "2026-02-24T19:43:24",
  },
  {
    firstname: "John",
    lastname: "Doe",
    username: "johndoe",
    email: "johndoe@gmail.com",
    phone: "0712345673",
    dob: "1984-09-12",
    gender: "Male",
    createdAt: "2026-04-25T18:10:34",
  },
  {
    firstname: "Jane",
    lastname: "Smith",
    username: "janesmith",
    email: "janesmith@gmail.com",
    phone: "0712345674",
    dob: "1990-07-15",
    gender: "Female",
    createdAt: "2026-03-25T18:10:34",
  },
  {
    firstname: "Michael",
    lastname: "Johnson",
    username: "michaeljohnson",
    email: "michaeljohnson@gmail.com",
    phone: "0712345675",
    dob: "1988-03-10",
    gender: "Male",
    createdAt: "2026-05-25T18:10:34",
  },
  {
    firstname: "Emily",
    lastname: "Davis",
    username: "emilydavis",
    email: "emilydavis@gmail.com",
    phone: "0712345676",
    dob: "1992-11-20",
    gender: "Female",
    createdAt: "2026-07-25T18:10:34",
  },
];

// Render users in the table
function renderUsers(filterMonth = null) {
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = ""; // Clear existing rows

  // Filter users by month if filterMonth is provided
  let filteredUsers = users;
  if (filterMonth !== null && filterMonth !== "" && filterMonth !== undefined) {
    filteredUsers = users.filter((u) => {
      const createdDate = new Date(u.createdAt);
      return createdDate.getMonth() === parseInt(filterMonth);
    });
  }

  filteredUsers.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="py-3 px-4">${user.firstname}</td>
            <td class="py-3 px-4">${user.lastname}</td>
            <td class="py-3 px-4">${user.username}</td>
            <td class="py-3 px-4">${user.email}</td>
            <td class="py-3 px-4">${user.phone}</td>
            <td class="py-3 px-4">${user.dob}</td>
            <td class="py-3 px-4">${user.gender}</td>
            <td class="py-3 px-4">${user.createdAt}</td>
        `;
    tbody.appendChild(row);
  });

  // Update total users count
  document.getElementById("totalUsers").textContent = users.length;

  // Count users created this month
  // I filter is applied, show the count of users created in the selected month, otherwise show the count for the current month

  let newThisMonth;
  if (filterMonth !== null && filterMonth !== "" && filterMonth !== undefined) {
    newThisMonth = users.filter((u) => {
      const createdDate = new Date(u.createdAt);
      return createdDate.getMonth() === parseInt(filterMonth);
    }).length;
  } else {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    newThisMonth = users.filter((u) => {
      const createdDate = new Date(u.createdAt);
      return (
        createdDate.getMonth() === currentMonth &&
        createdDate.getFullYear() === currentYear
      );
    }).length;
  }

  document.getElementById("newThisMonth").textContent = newThisMonth;
}

// Event listener for month filter
document.getElementById("monthSelect").addEventListener("change", (event) => {
  const selectedMonth = event.target.value;
  renderUsers(selectedMonth);
});

// Event Listener for reset button
document.getElementById("resetFilterButton").addEventListener("click", () => {
  document.getElementById("monthSelect").value = "";
  renderUsers();
});

// Add new user

document.getElementById("addUserBtn").addEventListener("click", () => {
  const newUser = [
    {
      firstname: "Grace",
      lastname: "Kamau",
      username: "gracek",
      email: "grace.kamau@yahoo.com",
      phone: "0723456789",
      dob: "1998-05-21",
      gender: "Female",
      createdAt: new Date().toISOString(),
    },
    {
      firstname: "David",
      lastname: "Muriuki",
      username: "davidm",
      email: "david.muriuki@yahoo.com",
      phone: "0723456789",
      dob: "1998-06-21",
      gender: "Male",
      createdAt: new Date().toISOString(),
    },
    {
      firstname: "Alice",
      lastname: "Wanjiku",
      username: "alicew",
      email: "alice.wanjiku@yahoo.com",
      phone: "0723456789",
      dob: "1998-04-21",
      gender: "Female",
      createdAt: new Date().toISOString(),
    },
  ];

  users.push(...newUser);
  renderUsers();
});

// Initial render
renderUsers();

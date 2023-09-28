const userCardsContainer = document.getElementById("userCards");
const get_users = document.getElementById("get_users");
const fetchUsers = async () => {
    try {
        const response = await fetch("https://reqres.in/api/users?page=1");
        const data = await response.json();
        const users = data.data;

        if (users.length === 0) {
            userCardsContainer.innerHTML = "<p>No users found</p>";
            return;
        }

        const userCards = users.map(user => `<div class="col-md-4 mb-4"> <div class="card shadow">
        <img src="${user.avatar}" class="card-img-top" alt="User Avatar"> <div class="card-body">
        <h5 class="card-title">${user.first_name} ${user.last_name}</h5> <p class="card-text">${user.email}</p>
        <p class="card-text">User ID: ${user.id}</p>
        </div>
        </div>
        </div>`).join("");

        userCardsContainer.innerHTML = userCards;
    } catch (error) {
        console.error("Error fetching users:", error);
        userCardsContainer.innerHTML = "<p>Error loading users. Please try again later.</p>";
    }
};

get_users.addEventListener("click", () => {
    userCardsContainer.innerHTML = "<p>Loading users...</p>";
    setTimeout(() => {
        fetchUsers();
    }, 5000);
});

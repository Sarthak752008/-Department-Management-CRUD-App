const API_URL = "http://localhost:8090/api/departments";

document.addEventListener("DOMContentLoaded", () => {
    loadDepartments();

    document.getElementById("deptForm").addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const location = document.getElementById("location").value;

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, location })
        })
            .then(() => {
                document.getElementById("deptForm").reset();
                loadDepartments();
            });
    });
});

function loadDepartments() {
    fetch(API_URL)
        .then(r => r.json())
        .then(data => {
            const tbody = document.getElementById("deptTable");
            tbody.innerHTML = "";

            data.forEach(d => {
                tbody.innerHTML += `
                    <tr>
                        <td>${d.id}</td>
                        <td>${d.name}</td>
                        <td>${d.location}</td>
                        <td>
                            <button onclick="deleteDept(${d.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function deleteDept(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadDepartments());
}

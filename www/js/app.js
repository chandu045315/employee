// Function to load employees into the table
function loadEmployees() {
    $.ajax({
        url: 'http://localhost/employee_management/php/get_employees.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            let tableBody = $('#employeeList');
            tableBody.empty(); // Clear existing rows
            data.forEach(employee => {
                tableBody.append(`
                    <tr>
                        <td>${employee.employee_id}</td>
                        <td>${employee.employee_name}</td>
                        <td>${employee.department_name}</td>
                        <td>${employee.position_name}</td>
                        <td>
                            <a href="add_employee.html?id=${employee.employee_id}">Edit</a>
                            <button onclick="deleteEmployee(${employee.employee_id})">Delete</button>
                        </td>
                    </tr>
                `);
            });
            $('#employeeTable').DataTable(); // Initialize DataTables
        },
        error: function (xhr, status, error) {
            console.error("Error fetching employees: ", error);
        }
    });
}

// Function to delete an employee
function deleteEmployee(employeeId) {
    if (confirm("Are you sure you want to delete this employee?")) {
        $.ajax({
            url: 'http://localhost/employee_management/php/delete_employee.php',
            method: 'POST',
            data: { employee_id: employeeId },
            success: function (response) {
                alert(response);
                loadEmployees(); // Refresh the table
            },
            error: function (xhr, status, error) {
                console.error("Error deleting employee: ", error);
            }
        });
    }
}

// Function to load departments into the dropdown
function loadDepartments() {
    $.ajax({
        url: 'http://localhost/employee_management/php/get_departments.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            let dropdown = $('#department_id');
            dropdown.empty();
            dropdown.append('<option value="">Select Department</option>');
            data.forEach(department => {
                dropdown.append(`<option value="${department.department_id}">${department.department_name}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error fetching departments: ", error);
        }
    });
}

// Function to load positions into the dropdown
function loadPositions() {
    $.ajax({
        url: 'http://localhost/employee_management/php/get_positions.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            let dropdown = $('#position_id');
            dropdown.empty();
            dropdown.append('<option value="">Select Position</option>');
            data.forEach(position => {
                dropdown.append(`<option value="${position.position_id}">${position.position_name}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error fetching positions: ", error);
        }
    });
}

// Function to load employee data for editing
function loadEmployee(employeeId) {
    $.ajax({
        url: `http://localhost/employee_management/php/get_employee.php?id=${employeeId}`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#employee_id').val(data.employee_id);
            $('#employee_name').val(data.employee_name);
            $('#department_id').val(data.department_id);
            $('#position_id').val(data.position_id);
            $('#formTitle').text('Edit Employee');
            $('#submitButton').text('Update Employee');
            $('#deleteButton').show();
        },
        error: function (xhr, status, error) {
            console.error("Error fetching employee: ", error);
        }
    });
}

// Function to add a new employee
function addEmployee() {
    const formData = $('#employeeForm').serialize();
    $.ajax({
        url: 'http://localhost/employee_management/php/add_employee.php',
        method: 'POST',
        data: formData,
        success: function (response) {
            alert(response);
            window.location.href = 'index.html';
        },
        error: function (xhr, status, error) {
            console.error("Error adding employee: ", error);
        }
    });
}

// Function to update an employee
function updateEmployee() {
    const formData = $('#employeeForm').serialize();
    $.ajax({
        url: 'http://localhost/employee_management/php/update_employee.php',
        method: 'POST',
        data: formData,
        success: function (response) {
            alert(response);
            window.location.href = 'index.html';
        },
        error: function (xhr, status, error) {
            console.error("Error updating employee: ", error);
        }
    });
}

// Initialize the page
$(document).ready(function () {
    // Load employees into the table (for index.html)
    if (window.location.pathname.endsWith('index.html')) {
        loadEmployees();
    }

    // Load departments and positions (for add_employee.html)
    if (window.location.pathname.endsWith('add_employee.html')) {
        loadDepartments();
        loadPositions();

        // Check if editing an employee
        const urlParams = new URLSearchParams(window.location.search);
        const employeeId = urlParams.get('id');
        if (employeeId) {
            loadEmployee(employeeId);
        }

        // Handle form submission
        $('#employeeForm').submit(function (e) {
            e.preventDefault();
            const employeeId = $('#employee_id').val();
            if (employeeId) {
                updateEmployee();
            } else {
                addEmployee();
            }
        });

        // Handle delete button click
        $('#deleteButton').click(function () {
            deleteEmployee($('#employee_id').val());
        });
    }
});
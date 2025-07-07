function init() {
  renderCustomers(); // Initial load of customers

  // Listener for the "Add Customer" button
  const addCustomerBtn = document.getElementById("addCustomerBtn");
  if (addCustomerBtn) {
    addCustomerBtn.addEventListener("click", openAddCustomerModal);
  }

  // Listener for the "Save" button inside the modal
  const saveBtn = document.getElementById("saveCustomerBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", saveOrUpdateCustomer);
  }

  // Listener for the modal close event to reset the form
  const customerModal = document.getElementById("customerModal");
  if (customerModal) {
    customerModal.addEventListener("hidden.bs.modal", function () {
      document.getElementById("customerForm").reset();
      document.getElementById("customerId").value = ""; // Clear hidden ID
      document.getElementById("customerModalLabel").textContent =
        "Add Customer"; // Restore default title
    });
  }
}

// Function to open the modal in ADD mode
function openAddCustomerModal() {
  document.getElementById("customerModalLabel").textContent =
    "Add New Customer"; // Change modal title
  document.getElementById("customerForm").reset(); // Ensure the form is clean
  document.getElementById("customerId").value = ""; // Ensure the hidden ID is empty
  $("#customerModal").modal("show");
}

// Function to open the modal in EDIT mode
// This function will be called from the "Edit" buttons in the table
let openEditCustomerModal = async (id) => {
  document.getElementById("customerModalLabel").textContent = "Edit Customer"; // Change modal title

  // Load customer data from the backend
  try {
    const response = await fetch(`${URL_SERVER}customer/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const customer = await response.json();

    // fill the form with customer data
    document.getElementById("customerId").value = customer.id; // Store ID in hidden field
    document.getElementById("firstname").value = customer.firstname;
    document.getElementById("lastname").value = customer.lastname;
    document.getElementById("email").value = customer.email;
    document.getElementById("address").value = customer.address;

    // Show the modal
    $("#customerModal").modal("show");
  } catch (error) {
    console.error("Error loading customer data for editing:", error);
    alert("Could not load customer data for editing.");
  }
};

// Unified function to save or update a customer
let saveOrUpdateCustomer = async () => {
  const customerId = document.getElementById("customerId").value;
  const form = document.getElementById("customerForm");

  const customerData = {
    firstname: form.elements["firstname"].value,
    lastname: form.elements["lastname"].value,
    email: form.elements["email"].value,
    address: form.elements["address"].value,
  };

  let url = `${URL_SERVER}customer`;
  let method = "POST"; // Default to POST for adding a new customer

  if (customerId) {
    // If there's an ID, it's an update (PUT)
    url = `${URL_SERVER}customer/${customerId}`;
    method = "PUT";
    // For updates, some REST APIs may require the ID in the JSON body as well
    customerData.id = parseInt(customerId);
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      // If the response is not OK, throw an error
      const errorText = await response.text(); // Try to read the response body for the error
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Operation success:", result);

    // Hide the modal
    $("#customerModal").modal("hide");

    // Reload the customer list
    renderCustomers();
    alert(`Customer ${customerId ? "updated" : "added"} successfully!`);
  } catch (error) {
    console.error("Error saving/updating customer:", error);
    alert(
      `Error ${customerId ? "updating" : "adding"} customer. Check console for details.`
    );
  }
};

let renderCustomers = async () => {
  let customers = await getCustomers();
  let tbody = document.querySelector("#tbody-customers");
  tbody.innerHTML = "";
  customers.forEach((customer) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.firstname + " " + customer.lastname}</td>
            <td>${customer.email}</td>
            <td>${customer.address}</td>
            <td class="d-flex justify-content-center align-items-center">
                  <a href="#" onClick="openEditCustomerModal(${
                    customer.id
                  })" class="btn btn-info btn-circle" style="margin-right: 0.25rem;"> 
                    <i class="fas fa-edit"></i>
                </a>
                <a href="#" onClick="deleteCustomer(${
                  customer.id
                })" class="btn btn-danger btn-circle">
                    <i class="fas fa-trash"></i>
                </a>
            </td>`;
    tbody.appendChild(tr);
  });
};

let getCustomers = async () => {
  let response = await fetch(`${URL_SERVER}customer`);
  let dataEnJson = await response.json();
  return dataEnJson;
};

let deleteCustomer = async (id) => {
  if (confirm("Are you sure you want to delete this customer?")) {
    let response = await fetch(`${URL_SERVER}customer/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Customer deleted successfully.");
      renderCustomers();
    } else {
      alert("Error deleting customer.");
    }
  }
};

document.addEventListener("DOMContentLoaded", init);

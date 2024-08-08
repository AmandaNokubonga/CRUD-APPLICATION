const registerForm = document.getElementById('registerForm');
const registerDiv = document.getElementById('register');
const loginForm = document.getElementById('loginForm');
const loginDiv = document.getElementById('login');
const app = document.getElementById('app');
const addForm = document.getElementById('addForm');
const itemList = document.getElementById('itemList');
const editForm = document.getElementById('editForm');
const editItemForm = document.getElementById('editItemForm');
const generateReportButton = document.getElementById('generateReport');
const reportDiv = document.getElementById('report');
const searchInput = document.getElementById('searchInput');

let items = [
    { name: 'Cow', category: 'Livestock', price: 1000 },
    { name: 'Chicken Feed', category: 'Feed', price: 50 },
    { name: 'Tractor', category: 'Equipment', price: 15000 },
    { name: 'Hay Bale', category: 'Feed', price: 20 },
    { name: 'Sheep', category: 'Livestock', price: 500 },
    { name: 'Milking Machine', category: 'Equipment', price: 2000 },
    { name: 'Vaccines', category: 'Healthcare', price: 100 },
    { name: 'Barn', category: 'Housing', price: 5000 },
    { name: 'Electric Fence', category: 'Fencing', price: 300 }
];

let editingIndex = null;

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    // Store registered user in localStorage
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    alert('Registration successful! Please log in.');
    registerDiv.classList.add('hidden');
    loginDiv.classList.remove('hidden');
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const registeredEmail = localStorage.getItem('registeredEmail');
    const registeredPassword = localStorage.getItem('registeredPassword');

    if (email === registeredEmail && password === registeredPassword) {
        loginDiv.classList.add('hidden');
        app.classList.remove('hidden');
    } else {
        alert('Invalid email or password');
    }
});

function renderItems(filteredItems = items) {
    itemList.innerHTML = '';
    filteredItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ${item.category} - R${item.price}
            <div>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </div>
        `;
        itemList.appendChild(li);
    });
}

addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const category = document.getElementById('itemCategory').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    items.push({ name, category, price });
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
    addForm.reset();
});

function editItem(index) {
    editingIndex = index;
    const item = items[index];
    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemCategory').value = item.category;
    document.getElementById('editItemPrice').value = item.price;
    editForm.classList.remove('hidden');
}

editItemForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('editItemName').value;
    const category = document.getElementById('editItemCategory').value;
    const price = parseFloat(document.getElementById('editItemPrice').value);
    items[editingIndex] = { name, category, price };
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
    editForm.classList.add('hidden');
});

document.getElementById('cancelEdit').addEventListener('click', function() {
    editForm.classList.add('hidden');
});

function deleteItem(index) {
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
}

searchInput.addEventListener('input', function() {
    const searchText = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchText) || 
        item.category.toLowerCase().includes(searchText)
    );
    renderItems(filteredItems);
});

generateReportButton.addEventListener('click', function() {
    const report = `
        <h3>Inventory Report</h3>
        <p>Total items: ${items.length}</p>
        <p>Total value: R${items.reduce((total, item) => total + item.price, 0)}</p>
    `;
    reportDiv.innerHTML = report;
});

document.addEventListener('DOMContentLoaded', function() {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        items = JSON.parse(storedItems);
    }
    renderItems();
});

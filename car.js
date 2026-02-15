// ===========================================================================
//                          DATA STRUCTURES
// ===========================================================================

// Car class
class Car {
    constructor(id, brand, model, price, dsType = "NONE") {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.dsType = dsType;
    }
}

// Array Data Structure
class DS_Array {
    constructor(storageKey) {
        this.arr = [];
        this.maxSize = 100;
        this.storageKey = storageKey;
        this.load();
    }

    contains(id) {
        return this.arr.some(car => car.id === id);
    }

    getCar(id) {
        return this.arr.find(car => car.id === id) || null;
    }

    insert(car) {
        if (this.arr.length >= this.maxSize) {
            return { success: false, message: "Array Full (Max 100)" };
        }
        
        // Insert in sorted order
        let i = this.arr.length - 1;
        while (i >= 0 && this.arr[i].id > car.id) {
            i--;
        }
        this.arr.splice(i + 1, 0, car);
        this.save();
        return { success: true, message: "Inserted into Array" };
    }

    remove(id) {
        const index = this.arr.findIndex(car => car.id === id);
        if (index === -1) {
            return { success: false, message: `ID ${id} not found in Array` };
        }
        this.arr.splice(index, 1);
        this.save();
        return { success: true, message: `Successfully deleted ID ${id} from Array` };
    }

    getTotalPrice() {
        return this.arr.reduce((sum, car) => sum + car.price, 0);
    }

    display() {
        return [...this.arr];
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.arr));
    }

    load() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            this.arr = JSON.parse(data);
        }
    }
}

// Linked List Data Structure
class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class DS_List {
    constructor(storageKey) {
        this.head = null;
        this.storageKey = storageKey;
        this.load();
    }

    contains(id) {
        let current = this.head;
        while (current) {
            if (current.data.id === id) return true;
            current = current.next;
        }
        return false;
    }

    getCar(id) {
        let current = this.head;
        while (current) {
            if (current.data.id === id) return current.data;
            current = current.next;
        }
        return null;
    }

    insert(car) {
        const newNode = new ListNode(car);
        
        if (!this.head || this.head.data.id >= car.id) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next && current.next.data.id < car.id) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
        this.save();
        return { success: true, message: "Inserted into List" };
    }

    remove(id) {
        if (!this.head) {
            return { success: false, message: "List is empty" };
        }

        if (this.head.data.id === id) {
            this.head = this.head.next;
            this.save();
            return { success: true, message: `Successfully deleted ID ${id} from List` };
        }

        let current = this.head;
        while (current.next && current.next.data.id !== id) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
            this.save();
            return { success: true, message: `Successfully deleted ID ${id} from List` };
        }

        return { success: false, message: `ID ${id} not found in List` };
    }

    getTotalPrice() {
        let total = 0;
        let current = this.head;
        while (current) {
            total += current.data.price;
            current = current.next;
        }
        return total;
    }

    display() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    save() {
        const data = this.display();
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    load() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            const cars = JSON.parse(data);
            cars.forEach(car => {
                const newNode = new ListNode(car);
                if (!this.head) {
                    this.head = newNode;
                } else {
                    let current = this.head;
                    while (current.next) {
                        current = current.next;
                    }
                    current.next = newNode;
                }
            });
        }
    }
}

// Stack Data Structure
class DS_Stack {
    constructor(storageKey) {
        this.top = null;
        this.storageKey = storageKey;
        this.load();
    }

    contains(id) {
        let current = this.top;
        while (current) {
            if (current.data.id === id) return true;
            current = current.next;
        }
        return false;
    }

    getCar(id) {
        let current = this.top;
        while (current) {
            if (current.data.id === id) return current.data;
            current = current.next;
        }
        return null;
    }

    push(car) {
        const newNode = new ListNode(car);
        newNode.next = this.top;
        this.top = newNode;
        this.save();
        return { success: true, message: "Pushed to Stack" };
    }

    pop() {
        if (!this.top) {
            return { success: false, message: "Stack Underflow (Empty)" };
        }
        const id = this.top.data.id;
        this.top = this.top.next;
        this.save();
        return { success: true, message: `Popped ID ${id} from Stack` };
    }

    getTotalPrice() {
        let total = 0;
        let current = this.top;
        while (current) {
            total += current.data.price;
            current = current.next;
        }
        return total;
    }

    display() {
        const result = [];
        let current = this.top;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    save() {
        const data = this.display();
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    load() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            const cars = JSON.parse(data);
            // Load in reverse to maintain stack order
            for (let i = cars.length - 1; i >= 0; i--) {
                const newNode = new ListNode(cars[i]);
                newNode.next = this.top;
                this.top = newNode;
            }
        }
    }
}

// Queue Data Structure
class DS_Queue {
    constructor(storageKey) {
        this.front = null;
        this.rear = null;
        this.storageKey = storageKey;
        this.load();
    }

    contains(id) {
        let current = this.front;
        while (current) {
            if (current.data.id === id) return true;
            current = current.next;
        }
        return false;
    }

    getCar(id) {
        let current = this.front;
        while (current) {
            if (current.data.id === id) return current.data;
            current = current.next;
        }
        return null;
    }

    enqueue(car) {
        const newNode = new ListNode(car);
        if (!this.rear) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.save();
        return { success: true, message: "Enqueued to Queue" };
    }

    dequeue() {
        if (!this.front) {
            return { success: false, message: "Queue Underflow" };
        }
        const id = this.front.data.id;
        this.front = this.front.next;
        if (!this.front) this.rear = null;
        this.save();
        return { success: true, message: `Dequeued ID ${id} from Front` };
    }

    getTotalPrice() {
        let total = 0;
        let current = this.front;
        while (current) {
            total += current.data.price;
            current = current.next;
        }
        return total;
    }

    display() {
        const result = [];
        let current = this.front;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    save() {
        const data = this.display();
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    load() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            const cars = JSON.parse(data);
            cars.forEach(car => {
                const newNode = new ListNode(car);
                if (!this.rear) {
                    this.front = this.rear = newNode;
                } else {
                    this.rear.next = newNode;
                    this.rear = newNode;
                }
            });
        }
    }
}

// Graph Data Structure
class DS_Graph {
    constructor(storageKey) {
        this.nodes = [];
        this.maxSize = 10;
        this.storageKey = storageKey;
        this.load();
    }

    contains(id) {
        return this.nodes.some(car => car.id === id);
    }

    getCar(id) {
        return this.nodes.find(car => car.id === id) || null;
    }

    insert(car) {
        if (this.nodes.length >= this.maxSize) {
            return { success: false, message: "Graph Full (Max 10)" };
        }
        this.nodes.push(car);
        this.save();
        return { success: true, message: "Added Node to Graph" };
    }

    remove(id) {
        const index = this.nodes.findIndex(car => car.id === id);
        if (index === -1) {
            return { success: false, message: `ID ${id} not found in Graph` };
        }
        this.nodes.splice(index, 1);
        this.save();
        return { success: true, message: `Successfully deleted ID ${id} from Graph` };
    }

    getTotalPrice() {
        return this.nodes.reduce((sum, car) => sum + car.price, 0);
    }

    display() {
        return [...this.nodes];
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.nodes));
    }

    load() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            this.nodes = JSON.parse(data);
        }
    }
}

// Binary Search Tree Data Structure
class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class DS_Tree {
    constructor(storageKey) {
        this.root = null;
        this.storageKey = storageKey;
        this.load();
    }

    contains(id) {
        return this._find(this.root, id) !== null;
    }

    getCar(id) {
        return this._find(this.root, id);
    }

    _find(node, id) {
        if (!node) return null;
        if (node.data.id === id) return node.data;
        return id < node.data.id ? 
            this._find(node.left, id) : 
            this._find(node.right, id);
    }

    insert(car) {
        this.root = this._insert(this.root, car);
        this.save();
        return { success: true, message: "Inserted into Tree" };
    }

    _insert(node, car) {
        if (!node) return new TreeNode(car);
        
        if (car.id < node.data.id) {
            node.left = this._insert(node.left, car);
        } else {
            node.right = this._insert(node.right, car);
        }
        return node;
    }

    remove(id) {
        if (!this.contains(id)) {
            return { success: false, message: `ID ${id} not found in Tree` };
        }
        this.root = this._delete(this.root, id);
        this.save();
        return { success: true, message: `Successfully deleted ID ${id} from Tree` };
    }

    _delete(node, id) {
        if (!node) return node;

        if (id < node.data.id) {
            node.left = this._delete(node.left, id);
        } else if (id > node.data.id) {
            node.right = this._delete(node.right, id);
        } else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            let minNode = node.right;
            while (minNode.left) {
                minNode = minNode.left;
            }
            node.data = minNode.data;
            node.right = this._delete(node.right, minNode.data.id);
        }
        return node;
    }

    getTotalPrice() {
        return this._sumNodes(this.root);
    }

    _sumNodes(node) {
        if (!node) return 0;
        return node.data.price + this._sumNodes(node.left) + this._sumNodes(node.right);
    }

    display() {
        const result = [];
        this._inorder(this.root, result);
        return result;
    }

    _inorder(node, result) {
        if (node) {
            this._inorder(node.left, result);
            result.push(node.data);
            this._inorder(node.right, result);
        }
    }

    save() {
        const data = this.display();
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    load() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            const cars = JSON.parse(data);
            cars.forEach(car => {
                this.root = this._insert(this.root, car);
            });
        }
    }
}

// ===========================================================================
//                          GLOBAL STATE
// ===========================================================================

// Admin Data Structures
const adminDS = {
    array: new DS_Array('admin_array'),
    list: new DS_List('admin_list'),
    stack: new DS_Stack('admin_stack'),
    queue: new DS_Queue('admin_queue'),
    graph: new DS_Graph('admin_graph'),
    tree: new DS_Tree('admin_tree')
};

// User Data Structures
const userDS = {
    array: new DS_Array('user_array'),
    list: new DS_List('user_list'),
    stack: new DS_Stack('user_stack'),
    queue: new DS_Queue('user_queue'),
    graph: new DS_Graph('user_graph'),
    tree: new DS_Tree('user_tree')
};

// User Authentication - Load from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [
    { username: "demo", password: "demo" }
];
let currentUser = null;

// Admin Password
const ADMIN_PASSWORD = "admin";

// ===========================================================================
//                          UTILITY FUNCTIONS
// ===========================================================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
    
    // Clear alerts when switching screens
    document.querySelectorAll('[id$="Alert"]').forEach(alert => {
        alert.innerHTML = '';
    });
}

function showAlert(elementId, message, type) {
    const alertDiv = document.getElementById(elementId);
    alertDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}

function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    }
}

function renderCarCard(car) {
    return `
        <div class="car-card">
            <h3>🚗 ${car.brand} ${car.model}</h3>
            <div class="car-info">
                <div class="car-info-item">
                    <strong>ID:</strong> ${car.id}
                </div>
                <div class="car-info-item">
                    <strong>Price/Week:</strong> $${car.price.toFixed(2)}
                </div>
                <div class="car-info-item">
                    <strong>Brand:</strong> ${car.brand}
                </div>
                <div class="car-info-item">
                    <strong>Model:</strong> ${car.model}
                </div>
                <div class="car-info-item" style="grid-column: 1 / -1;">
                    <strong>Source:</strong> ${car.dsType}
                </div>
            </div>
        </div>
    `;
}

function adminHasID(id) {
    return Object.values(adminDS).some(ds => ds.contains(id));
}

function userHasID(id) {
    return Object.values(userDS).some(ds => ds.contains(id));
}

function findAdminCar(id) {
    for (let ds of Object.values(adminDS)) {
        const car = ds.getCar(id);
        if (car) return car;
    }
    return null;
}

// ===========================================================================
//                          NAVIGATION FUNCTIONS
// ===========================================================================

function exitApp() {
    if (confirm("Are you sure you want to exit?")) {
        alert("Thank you for using Car Management System!");
        window.close();
    }
}

function showDataStatus() {
    let message = "📊 LOCALSTORAGE DATA STATUS\n\n";
    
    // Admin data
    message += "ADMIN INVENTORY:\n";
    message += `  • Array: ${adminDS.array.display().length} cars\n`;
    message += `  • Linked List: ${adminDS.list.display().length} cars\n`;
    message += `  • Stack: ${adminDS.stack.display().length} cars\n`;
    message += `  • Queue: ${adminDS.queue.display().length} cars\n`;
    message += `  • Graph: ${adminDS.graph.display().length} cars\n`;
    message += `  • Tree: ${adminDS.tree.display().length} cars\n\n`;
    
    // User data
    message += "USER CART:\n";
    message += `  • Array: ${userDS.array.display().length} cars\n`;
    message += `  • Linked List: ${userDS.list.display().length} cars\n`;
    message += `  • Stack: ${userDS.stack.display().length} cars\n`;
    message += `  • Queue: ${userDS.queue.display().length} cars\n`;
    message += `  • Graph: ${userDS.graph.display().length} cars\n`;
    message += `  • Tree: ${userDS.tree.display().length} cars\n\n`;
    
    // Users
    message += `REGISTERED USERS: ${users.length}\n\n`;
    
    message += "✅ All data is persisted in browser localStorage";
    
    alert(message);
}

function clearAllData() {
    if (confirm("⚠️ WARNING: This will delete ALL data including cars and users!\n\nAre you sure?")) {
        if (confirm("This action cannot be undone. Continue?")) {
            // Clear all localStorage
            localStorage.clear();
            
            alert("✅ All data cleared! Please refresh the page.");
            location.reload();
        }
    }
}

function showAdminLogin() {
    showScreen('adminLogin');
}

function showUserAccess() {
    showScreen('userAccess');
}

function showUserLogin() {
    showScreen('userLogin');
}

function showUserRegister() {
    showScreen('userRegister');
}

function showAdminInsert() {
    showScreen('adminInsert');
}

function showAdminDelete() {
    showScreen('adminDelete');
    document.getElementById('deleteDS').addEventListener('change', function() {
        const dsType = this.value;
        const idGroup = document.getElementById('deleteIDGroup');
        if (dsType === 'stack' || dsType === 'queue') {
            idGroup.classList.add('hidden');
        } else {
            idGroup.classList.remove('hidden');
        }
    });
}

function showAdminSearch() {
    showScreen('adminSearch');
}

function showAdminDisplay() {
    showScreen('adminDisplay');
}

function showUserInsert() {
    showScreen('userInsert');
}

function showUserDelete() {
    showScreen('userDelete');
    document.getElementById('userDeleteDS').addEventListener('change', function() {
        const dsType = this.value;
        const idGroup = document.getElementById('userDeleteIDGroup');
        if (dsType === 'stack' || dsType === 'queue') {
            idGroup.classList.add('hidden');
        } else {
            idGroup.classList.remove('hidden');
        }
    });
}

function showUserSearch() {
    showScreen('userSearch');
}

function showUserDisplay() {
    showScreen('userDisplay');
}

function adminLogout() {
    if (confirm("Are you sure you want to logout?")) {
        showScreen('mainMenu');
    }
}

function userLogout() {
    if (confirm("Are you sure you want to logout?")) {
        currentUser = null;
        showScreen('mainMenu');
    }
}

// ===========================================================================
//                          ADMIN FUNCTIONS
// ===========================================================================

function adminLoginSubmit() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        showScreen('adminMenu');
        document.getElementById('adminPassword').value = '';
    } else {
        showAlert('adminAlert', '❌ Wrong Password!', 'error');
    }
}

function adminInsertCar() {
    const dsType = document.getElementById('insertDS').value;
    const id = parseInt(document.getElementById('insertID').value);
    const brand = document.getElementById('insertBrand').value;
    const model = document.getElementById('insertModel').value;
    const price = parseFloat(document.getElementById('insertPrice').value);

    // Validation
    if (isNaN(id) || !brand || !model || isNaN(price)) {
        showAlert('insertAlert', '❌ Please fill all fields correctly!', 'error');
        return;
    }

    if (adminHasID(id)) {
        showAlert('insertAlert', `❌ Error: ID ${id} already exists in Admin DB!`, 'error');
        return;
    }

    const dsName = dsType.toUpperCase();
    const car = new Car(id, brand, model, price, dsName);
    
    let result;
    if (dsType === 'stack') {
        result = adminDS.stack.push(car);
    } else if (dsType === 'queue') {
        result = adminDS.queue.enqueue(car);
    } else {
        result = adminDS[dsType].insert(car);
    }

    if (result.success) {
        showAlert('insertAlert', `✅ ${result.message}`, 'success');
        // Clear form
        document.getElementById('insertID').value = '';
        document.getElementById('insertBrand').value = '';
        document.getElementById('insertModel').value = '';
        document.getElementById('insertPrice').value = '';
    } else {
        showAlert('insertAlert', `❌ ${result.message}`, 'error');
    }
}

function adminDeleteCar() {
    const dsType = document.getElementById('deleteDS').value;
    
    let result;
    if (dsType === 'stack') {
        result = adminDS.stack.pop();
    } else if (dsType === 'queue') {
        result = adminDS.queue.dequeue();
    } else {
        const id = parseInt(document.getElementById('deleteID').value);
        if (isNaN(id)) {
            showAlert('deleteAlert', '❌ Please enter a valid ID!', 'error');
            return;
        }
        result = adminDS[dsType].remove(id);
    }

    if (result.success) {
        showAlert('deleteAlert', `✅ ${result.message}`, 'success');
        document.getElementById('deleteID').value = '';
    } else {
        showAlert('deleteAlert', `❌ ${result.message}`, 'error');
    }
}

function adminSearchCar() {
    const dsType = document.getElementById('searchDS').value;
    const id = parseInt(document.getElementById('searchID').value);

    if (isNaN(id)) {
        showAlert('searchAlert', '❌ Please enter a valid ID!', 'error');
        return;
    }

    const found = adminDS[dsType].contains(id);
    
    if (found) {
        const car = adminDS[dsType].getCar(id);
        showAlert('searchAlert', 
            `✅ Found!<br>${renderCarCard(car)}`, 
            'success');
    } else {
        showAlert('searchAlert', `❌ ID ${id} not found in ${dsType.toUpperCase()}!`, 'error');
    }
}

function adminDisplayCars() {
    const dsType = document.getElementById('displayDS').value;
    const contentDiv = document.getElementById('displayContent');

    if (!dsType) {
        contentDiv.innerHTML = '';
        return;
    }

    const cars = adminDS[dsType].display();
    
    if (cars.length === 0) {
        contentDiv.innerHTML = '<div class="empty-state">📭 No cars in this data structure</div>';
        return;
    }

    contentDiv.innerHTML = cars.map(car => renderCarCard(car)).join('');
}

// ===========================================================================
//                          USER FUNCTIONS
// ===========================================================================

function userRegister() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    if (!username || !password) {
        showAlert('registerAlert', '❌ Please fill all fields!', 'error');
        return;
    }

    // Check if username exists
    if (users.some(user => user.username === username)) {
        showAlert('registerAlert', '❌ Username already exists!', 'error');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    showAlert('registerAlert', '✅ Successfully Registered! You can now login.', 'success');
    
    // Clear form
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
}

function userLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = username;
        document.getElementById('userWelcome').textContent = `Welcome, ${username}!`;
        showScreen('userMenu');
        
        // Clear form
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        showAlert('loginAlert', '❌ Invalid Username or Password!', 'error');
    }
}

function userAddToCart() {
    const dsType = document.getElementById('userInsertDS').value;
    const id = parseInt(document.getElementById('userInsertID').value);

    if (isNaN(id)) {
        showAlert('userInsertAlert', '❌ Please enter a valid ID!', 'error');
        return;
    }

    const car = findAdminCar(id);

    if (!car) {
        showAlert('userInsertAlert', `❌ Car ID ${id} not found in Admin Stock!`, 'error');
        return;
    }

    if (userHasID(id)) {
        showAlert('userInsertAlert', 
            `❌ Error: You already have Car ID ${id} in your cart!`, 
            'error');
        return;
    }

    const userCar = new Car(car.id, car.brand, car.model, car.price, 'USER_CART');
    
    let result;
    if (dsType === 'stack') {
        result = userDS.stack.push(userCar);
    } else if (dsType === 'queue') {
        result = userDS.queue.enqueue(userCar);
    } else {
        result = userDS[dsType].insert(userCar);
    }

    if (result.success) {
        showAlert('userInsertAlert', `✅ ${result.message}`, 'success');
        document.getElementById('userInsertID').value = '';
    } else {
        showAlert('userInsertAlert', `❌ ${result.message}`, 'error');
    }
}

function userRemoveFromCart() {
    const dsType = document.getElementById('userDeleteDS').value;
    
    let result;
    if (dsType === 'stack') {
        result = userDS.stack.pop();
    } else if (dsType === 'queue') {
        result = userDS.queue.dequeue();
    } else {
        const id = parseInt(document.getElementById('userDeleteID').value);
        if (isNaN(id)) {
            showAlert('userDeleteAlert', '❌ Please enter a valid ID!', 'error');
            return;
        }
        result = userDS[dsType].remove(id);
    }

    if (result.success) {
        showAlert('userDeleteAlert', `✅ ${result.message}`, 'success');
        document.getElementById('userDeleteID').value = '';
    } else {
        showAlert('userDeleteAlert', `❌ ${result.message}`, 'error');
    }
}

function userSearchCar() {
    const dsType = document.getElementById('userSearchDS').value;
    const id = parseInt(document.getElementById('userSearchID').value);

    if (isNaN(id)) {
        showAlert('userSearchAlert', '❌ Please enter a valid ID!', 'error');
        return;
    }

    const car = adminDS[dsType].getCar(id);
    
    if (car) {
        showAlert('userSearchAlert', 
            `✅ Found in Admin Stock!<br>${renderCarCard(car)}`, 
            'success');
    } else {
        showAlert('userSearchAlert', 
            `❌ ID ${id} not found in Admin ${dsType.toUpperCase()}!`, 
            'error');
    }
}

function userDisplayCars() {
    const displayType = document.getElementById('userDisplayType').value;
    const dsType = document.getElementById('userDisplayDS').value;
    const contentDiv = document.getElementById('userDisplayContent');

    if (!dsType) {
        contentDiv.innerHTML = '';
        return;
    }

    if (displayType === 'admin') {
        // Display Admin Stock
        const cars = adminDS[dsType].display();
        
        if (cars.length === 0) {
            contentDiv.innerHTML = '<div class="empty-state">📭 No cars in Admin Stock</div>';
            return;
        }

        contentDiv.innerHTML = cars.map(car => renderCarCard(car)).join('');
    } else {
        // Display User Cart
        const cars = userDS[dsType].display();
        const total = userDS[dsType].getTotalPrice();
        
        if (cars.length === 0) {
            contentDiv.innerHTML = `
                <div class="user-profile">
                    <h2>👤 ${currentUser}</h2>
                    <p>Rentals for 1 Week</p>
                </div>
                <div class="empty-state">🛒 Your cart is empty</div>
            `;
            return;
        }

        contentDiv.innerHTML = `
            <div class="user-profile">
                <h2>👤 ${currentUser}</h2>
                <p>Rentals for 1 Week</p>
            </div>
            ${cars.map(car => renderCarCard(car)).join('')}
            <div class="total-cost">
                💰 TOTAL CART COST: $${total.toFixed(2)}
            </div>
        `;
    }
}

// ===========================================================================
//                          INITIALIZATION
// ===========================================================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    showScreen('mainMenu');
    console.log('Car Management System loaded. Data persists in localStorage.');
});
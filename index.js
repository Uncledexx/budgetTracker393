var data = JSON.parse(localStorage.getItem("sipat_db")) || [];
show();

function add() {
    var a = Number(document.getElementById("amount").value);
    var n = document.getElementById("name").value;
    if (!n || a == 0) return;

    data.push({ name: n, amount: a });
    save();
}

function del(index) {
    data.splice(index, 1); // Removes the specific line
    save();
}

function save() {
    localStorage.setItem("sipat_db", JSON.stringify(data));
    show();
    document.getElementById("amount").value = "";
    document.getElementById("name").value = "";
}

function show() {
    var list = document.getElementById("list");
    list.innerHTML = "";
    var inc = 0, exp = 0;

    data.forEach((item, i) => {
        var li = document.createElement("li");
        li.className = item.amount > 0 ? "income" : "spending";
        
        // This adds the row with a delete button that targets the specific index
        li.innerHTML = `
            <span>${item.name}: ₱${item.amount}</span>
            <button class="del-btn" onclick="del(${i})">X</button>
        `;
        
        list.appendChild(li);

        if (item.amount > 0) inc += item.amount;
        else exp += Math.abs(item.amount);
    });

    document.getElementById("income").innerText = "₱" + inc;
    document.getElementById("expense").innerText = "₱" + exp;
    document.getElementById("remaining").innerText = "₱" + (inc - exp);
}
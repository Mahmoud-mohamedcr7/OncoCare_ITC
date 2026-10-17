let itemsList = document.getElementById('itemsList');
let emptyPlaceholder = document.getElementById('emptyPlaceholder');
let addItemForm = document.getElementById('addItemForm');

itemsList.addEventListener('click', function (e) {
    let deleteBtn = e.target.closest('.btn-delete');
    if (!deleteBtn) return;

    let itemRow = deleteBtn.closest('.item-row');
    if (itemRow) {
        
        itemRow.classList.add('removing');
        setTimeout(() => {
            itemRow.remove();
            if (itemsList.children.length === 0) {
                emptyPlaceholder.style.display = 'block';
            }
        }, 300);
    }
});

addItemForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById('itemName').value.trim();
    let price = document.getElementById('itemPrice').value.trim();
    let category = document.getElementById('itemCategory').value;
    let image = document.getElementById('itemImage').value.trim();


    if (!image) {
        image = 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=150&auto=format&fit=crop&q=80';
    }


    let newRow = document.createElement('li');
    newRow.className = 'item-row';
    newRow.innerHTML = `
        <div class="item-content">
            <img class="item-thumb" src="${image}" alt="${name}" onerror="this.src='https://placehold.co/100x100/f3f4f6/9ca3af?text=طعام'">
            <div class="item-text">
                <span class="item-name">${name}</span>
                <span class="item-meta">${category} - ${price} جنيه</span>
            </div>
        </div>
        <button class="btn-delete" title="حذف الصنف">
            <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            حذف
        </button>
    `;


    itemsList.prepend(newRow);


    emptyPlaceholder.style.display = 'none';


    addItemForm.reset();
});
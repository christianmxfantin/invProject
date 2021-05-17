//TODOS LOS MENU
let i
let id
let unity
let database = []
let searchID
let descriptionNode
let quantityNode
let unitpriceNode
let unitpriceData
let totalpriceNode

const amProduct = {
    description: false,
    quantity: false,
    unitPrice: false
  }

document.getElementById('menu-login').style.display = 'none';
document.getElementById('main-menu__container').style.display = 'none'
document.getElementById('desktop-menu__container').style.display = 'none'

//FUNCIONES
//Mostrar Mobile o Desktop
function screenType() {
    if (screen.width < 1024) { //Mobile
        document.getElementById('desktop-menu__container').style.display = 'none'
        document.getElementById('main-menu__container').style.display = 'block'
        document.getElementById('dashboard').style.display = 'block'
        i = ''
        showData('dashboard-mobile')
    }else{ //Desktop
        document.getElementById('main-menu__container').style.display = 'none'
        document.getElementById('desktop-menu__container').style.display = 'block'
        document.getElementById('dashboard-desktop').style.display = 'block'
        document.getElementById('openModal').style.display = 'block'
        document.getElementById('desktop-menu__add').style.display = 'flex'
        document.getElementById('desktop-menu__username').textContent = JSON.parse(localStorage.getItem('Usuarios'))[0].username
        i = 'd'
        showData('dashboard-desktop')
    }
}

//Cerrar la Pantalla Agregar Producto
function closeAdd() {
    if (i == '') { //es mobile
        document.getElementById('main-menu__icon').style.display = 'block'
        document.getElementById('main-menu__title').textContent = 'Productos'
        document.getElementById('main-menu__add').style.display = 'block'
        document.getElementById('main-menu__delete').innerHTML = '<i class="fas fa-trash-alt">'
        document.getElementById('dashboard').style.display = 'block'
        document.getElementById('am-product__container').style.display = 'none'
    }else{ //es desktop
        document.getElementById('modalTitle').textContent = ''
        document.getElementById('amd-product__description').value = ''
        document.getElementById('amd-product__quantity').value = ''
        document.getElementById('amd-product__unit-price').value = ''
        location.href = '#close'
    }

}

function saveData() {
    const description = document.getElementById('am' + i + '-product__description')
    const quantity = document.getElementById('am' + i + '-product__quantity')
    const unitPrice = document.getElementById('am' + i + '-product__unit-price')
    let dataID
    dataID = JSON.parse(localStorage.getItem('Productos'))
    if (dataID == null || dataID.length == 0) {
        id = 1
    }else{
        id = dataID[dataID.length - 1].id + 1
    }
    const product = {
        id: id,
        description: description.value, 
        quantity: quantity.value,
        unitPrice: unitPrice.value,
    }
    database.push(product)
    localStorage.setItem('Productos', JSON.stringify(database))
    description.value = ''
    quantity.value = ''
    unitPrice.value = ''
}

//Mostrar los Datos en la Pantalla Principal
function showData(show) {
    if (i == '') { //es Mobile
        if (show == 'mobile-save') { 
            
        }else if (show == 'mobile-modify'){ 
            
        }
    }else{ //es Desktop
        database = JSON.parse(localStorage.getItem('Productos'))
        if (show == 'dashboard-desktop') {//si se abrio el Dashboard, dibuja todo
            if (database == null || database.length == 0) {
                database = []
                id = 1
            }else{
                database.forEach(data => {createProduct(data)})
            }
        }else if (show == 'dashboard-save') { //sino, se hizo clic en Guardar
            createProduct(database[database.length - 1])
        }else{ //se modifico un producto (dashboard-modify)
            (Number(document.getElementById('amd-product__quantity').value) == 1) ? unity = 'unidad' : unity = 'unidades'
            // imageNode = 'algo'
            descriptionNode.textContent = document.getElementById('amd-product__description').value
            quantityNode.textContent = `${document.getElementById('amd-product__quantity').value} ${unity}`
            unitpriceNode.textContent = 
                new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format
                (document.getElementById('amd-product__unit-price').value)
            totalpriceNode.textContent = 
                new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format
                (Number(document.getElementById('amd-product__unit-price').value) * 
                Number(document.getElementById('amd-product__quantity').value))
        }
    }
}

function createProduct(data) {
    //letra m o desktop para rellenar y ver si es uno o el otro
    (Number(data.quantity) == 1) ? unity = 'unidad' : unity = 'unidades'
    const div = document.createElement('div')
    div.innerHTML =
    `<div class="product-desktop__container">
    <div class="product-desktop__id">${data.id}</div>
    <div class="product-desktop-description__container">
        <div class="product-desktop__img"><i class="fas fa-check-circle"></i></div>
        <div class="product-desktop__description modify">${data.description}</div>
    </div>
    <div class="product-desktop__unit-price">${new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format(data.unitPrice)}</div>
    <div class="product-desktop__quantity">${data.quantity} ${unity}</div>
    <div class="product-desktop__total-price">${new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format(Number(data.unitPrice)*Number(data.quantity))}</div>
    <div id="product-desktop__delete-item" class="delete">-</div>
    </div>`
    document.getElementById('dashboard-desktop').appendChild(div)
}

//Mostrar la pantalla Modificar Producto
function modifyData(id2) {
    const description = document.getElementById('am' + i + '-product__description')
    const quantity = document.getElementById('am' + i + '-product__quantity')
    const unitPrice = document.getElementById('am' + i + '-product__unit-price')
   
    localStorage.getItem('Productos', JSON.stringify(database))
    database.map(data => {
        if (data.id == id2) {
            data.id = id2
            data.description = description.value
            data.quantity = quantity.value
            data.unitPrice = unitPrice.value
        }
    })
    localStorage.setItem('Productos', JSON.stringify(database))
}

//Funcion deleteItem()
//letra m o desktop para rellenar y ver si es uno o el otro PROBAR EN MOBILE
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        let searchID = e.target.parentElement.childNodes[1].textContent
        database = database.filter(data => `${data.id}` != searchID)
        localStorage.setItem('Productos', JSON.stringify(database))
        e.target.parentElement.remove()
    }else if (e.target.classList.contains('modify')) {
        location.href = '#openModal'
        document.getElementById('modalTitle').textContent = 'Modificar Producto'
        document.getElementById('modalTitle').style.backgroundColor = 'darkmagenta'
        document.getElementById('amd-product__description').style.fontWeight = 'bold'
        document.getElementById('amd-product__quantity').style.fontWeight = 'bold'
        document.getElementById('amd-product__unit-price').style.fontWeight = 'bold'
        document.getElementById('amd-product__description').classList.remove('border-red')
        document.getElementById('amd-product__quantity').classList.remove('border-red')
        document.getElementById('amd-product__unit-price').classList.remove('border-red')
        document.getElementById('amd-product__description').focus()
        
        descriptionNode = e.target.parentElement.parentElement.childNodes[3].childNodes[3]
        unitpriceNode = e.target.parentElement.parentElement.childNodes[5]
        quantityNode = e.target.parentElement.parentElement.childNodes[7]
        totalpriceNode = e.target.parentElement.parentElement.childNodes[9]

        document.getElementById('amd-product__description').value = descriptionNode.textContent
        document.getElementById('amd-product__quantity').value = 
            Number((quantityNode.textContent.substring(0, quantityNode.textContent.indexOf(' '))))
        unitpriceData = unitpriceNode.textContent.substring(2, unitpriceNode.textContent.indexOf(',')) + 
        unitpriceNode.textContent.substring(unitpriceNode.textContent.indexOf(','))
        document.getElementById('amd-product__unit-price').value = Number(unitpriceData.replace(',','.'))
        searchID = e.target.parentElement.parentElement.childNodes[1].textContent
    }
})

function deleteAll() {
    //ver si es mobile o desktop
    if (confirm('Esta seguro que desea borrar todos los Productos?') == true) {
        localStorage.clear()
        document.getElementById('dashboard-desktop').innerHTML = ''
        document.getElementById('dashboard-desktop').innerHTML =
        `<div id="desktop-menu__add">+</div>`
    }
}

function productValues() {
    if (document.getElementById('am' + i + '-product__description').value == '') {
        document.getElementById('am' + i + '-product__description').classList.add('border-red')
        console.log(document.getElementById('am' + i + '-product__description'))
        amProduct.description = false
    }else{
        document.getElementById('am' + i + '-product__description').classList.remove('border-red')
        amProduct.description = true
    }

    if (document.getElementById('am' + i + '-product__quantity').value == '') {
        document.getElementById('am' + i + '-product__quantity').classList.add('border-red')
        amProduct.quantity = false
    }else{
        document.getElementById('am' + i + '-product__quantity').classList.remove('border-red')
        amProduct.quantity = true
    }

    if (document.getElementById('am' + i + '-product__unit-price').value == '') {
        document.getElementById('am' + i + '-product__unit-price').classList.add('border-red')
        amProduct.unitPrice = false
    }else{
        document.getElementById('am' + i + '-product__unit-price').classList.remove('border-red')
        amProduct.unitPrice = true
    }
}


//Boton Submit de Login
document.getElementById('login-form').addEventListener('submit',(e) => {
    e.preventDefault()
    const users = []
    const username = document.getElementById('login-form__username')
    const password = document.getElementById('login-form__password')
    const user = {
        username: username.value,
        password: password.value
    }
    users.push(user)
    localStorage.setItem('Usuarios', JSON.stringify(users))
    document.getElementById('login-container').style.display = 'none'
    screenType()
})

//Boton Menu de Hamburguesa
document.getElementById('main-menu__icon').addEventListener('click', () => {
    document.getElementById('menu-login').style.left = '0vw'
    document.getElementById('menu-login').classList.remove('slide-out')
    document.getElementById('menu-login').classList.add('slide-in')
    document.getElementById('menu-login').style.display = 'block';
})

//Boton Cerrar del Menu de Hamburguesa
document.getElementById('menu-login__close').addEventListener('click', () => {
    document.getElementById('menu-login').classList.remove('slide-in')    
    document.getElementById('menu-login').classList.add('slide-out')
    document.getElementById('menu-login').style.left = '-100vw'
})

//Boton Agregar Producto en MOBILE
document.getElementById('main-menu__add').addEventListener('click', () => {
    document.getElementById('main-menu__icon').style.display = 'none'
    document.getElementById('main-menu__title').textContent = 'Agregar Producto'
    document.getElementById('main-menu__add').style.display = 'none'
    document.getElementById('main-menu__delete').innerHTML = '<i class="fas fa-times close">'
    document.getElementById('dashboard').style.display = 'none'
    document.getElementById('am-product__container').style.display = 'block'
})

//Click en Cerrar en Agregar o Modificar Producto en MOBILE
document.getElementById('main-menu__delete').addEventListener('click', () => {
    if (document.getElementById('main-menu__title').textContent == 'Agregar Producto') {
        showData()
        closeAdd()
    }else if (document.getElementById('main-menu__title').textContent = 'Modificar Producto'){ 
        showData()
        closeAdd()
    }else { //sino, va a ser el boton Eliminar Todo
        deleteAll()
    }
})
//Boton Agregar Producto en DESKTOP
document.getElementById('desktop-menu__add').addEventListener('click', (e) => {
    e.preventDefault()
    location.href = '#openModal'
    document.getElementById('modalTitle').textContent = 'Agregar Producto'
    document.getElementById('modalTitle').style.backgroundColor = 'red'
    document.getElementById('amd-product__description').classList.remove('border-red')
    document.getElementById('amd-product__quantity').classList.remove('border-red')
    document.getElementById('amd-product__unit-price').classList.remove('border-red')
    document.getElementById('amd-product__description').value = ''
    document.getElementById('amd-product__quantity').value = ''
    document.getElementById('amd-product__unit-price').value = ''
    document.getElementById('amd-product__description').focus()
})

//Boton Guardar de Agregar o Modificar Producto en MOBILE
document.getElementById('am-product').addEventListener('submit', (e) => {
    e.preventDefault()
    productValues()   
    const amValues = Object.values(amProduct)
    const valid = amValues.findIndex(value => value == false)
    if (valid == -1) {
        if (document.getElementById('main-menu__title').textContent == 'Agregar Producto') {
            saveData()
            showData('mobile-save')
            closeAdd()
        }else{ //sino, va a ser Modificar
            modifyData(searchID)
            showData('mobile-modify')
            closeAdd()
        }
    }
})

//Boton Guardar de Agregar o Modificar Producto en DESKTOP
document.getElementById('amd-product').addEventListener('submit', (e) => {
    e.preventDefault
    //preguntar si los campos estan vacios
    productValues()   
    const amValues = Object.values(amProduct)
    const valid = amValues.findIndex(value => value == false)
    if (valid == -1) {
        if (document.getElementById('modalTitle').textContent == 'Agregar Producto') {
            saveData()
            showData('dashboard-save')
            closeAdd()
        }else if (document.getElementById('modalTitle').textContent == 'Modificar Producto') {
            modifyData(searchID)
            showData('dashboard-modify')
            closeAdd()
        }
    }else{
        e.preventDefault()
    }
})

//Clic en Borrar Todo en Desktop
document.getElementById('desktop-menu__delete').addEventListener('click', () => {
    deleteAll()
})
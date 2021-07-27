class Item {
  constructor(id,name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class Bill {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem = item => {
    this.items.push(item);

  }

  removeItem = id => {
    this.items.forEach((item, index) => {
      if (item["id"] === id) {
        this.items.splice(index, 1);
        bill.render();
      }
    })
  }

  billTotal = () => {
    if (this.total > 0) {
      this.total = 0
    }

    this.items.forEach(item => {
      this.total += item["price"]
    })

    return this.total.toFixed(2);
  }

  resetBill = () => {
    this.items = [];
    this.total = 0;
  }

  render = () => {
    let titleElement = document.querySelector('.bill h1');
    let billContainer = document.getElementById('items');
    let total = document.getElementById('total');

    billContainer.innerHTML = '';

    if (this.items.length === 0) {
      document.querySelector('.bill__items').setAttribute('id', 'hide');
      document.querySelector('.bill__total').setAttribute('id', 'hide');
      titleElement.innerHTML = "A Comanda está vazia!"
    } else {
      document.querySelector('.bill__items').removeAttribute('id');
      document.querySelector('.bill__total').removeAttribute('id');
      titleElement.innerHTML = "Comanda";


      this.items.map(item => {
        let row = document.createElement('tr');
        let foodName = document.createElement('td');
        let foodPrice = document.createElement('td');
        foodName.innerHTML = item.name;
        foodPrice.innerHTML = 'R$ ' + item.price;

        foodName.onclick = () => {
          confirm('Tem certeza que quer deletar esse item ?')
          if (confirm) {
            this.removeItem(item.id);
          }
        }

        row.append(foodName);
        row.append(foodPrice);
        billContainer.append(row);
      })

      total.innerHTML = 'R$ ' + this.billTotal();

    }
  }
}

var bill = new Bill();

function init() {
  bill.render();
  document.getElementsByTagName('body')[0].style.display = 'flex';
}

function addItem() {
  let name = document.querySelector('#name').value;
  let price = Number(document.querySelector('#price').value);


  if (name === '' || price === 0) {
    alert("Por favor preencha os campos Nome e Preço!")
  } else {

    bill.addItem(new Item(Math.floor(100* Math.random()) ,name, price));

    document.querySelector('#name').value = '';
    document.querySelector('#price').value = '';

    bill.render();

  }

}

function printBill() {
  window.print();

  bill.resetBill();

  bill.render();

}
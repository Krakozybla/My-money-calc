const generateId = () => `Identificator${Math.round(Math.random() * 1e8).toString(16)}`;

const balanceTotal = document.querySelector('.balance-total');
const income = document.querySelector('.income');
const expenses = document.querySelector('.expenses');
const historyList = document.querySelector(".history-list");
const form = document.querySelector('.form');
const operationName = document.querySelector(".operation-name");
const operationAmount = document.querySelector(".operation-amount");


let dbOperation = [
    {
        id: '1',
        description: 'зарплата',
        amount: 3000,
    },
    {
        id: '2',
        description: 'квартплата',
        amount: -1000,
    },
];

const renderOperation = (operation) =>{
    const className = operation.amount > 0 ? 'history__item-plus' : 'history__item-minus';
    console.log(className);
    const listItem = document.createElement('li');
    listItem.classList.add('history__item');
    listItem.classList.add(className);
    listItem.innerHTML = `${operation.description}
    <span class="history__money">${operation.amount}₽</span>
    <button class="history_delete" data-id="${operation.id}">x</button>
    `
    historyList.appendChild(listItem);
}

const updeteBalance = () =>{
    resultIncom = dbOperation
        .filter(item => item.amount > 0)
        .reduce((result, item) => result = item.amount, 0);
    resultExpenses = dbOperation
        .filter(item => item.amount < 0)
        .reduce((result, item) => result + item.amount, 0);

        income.textContent = resultIncom;
        expenses.textContent = resultExpenses;
        balanceTotal.textContent = resultExpenses + resultIncom
}

const addOperation = (event) =>{    
    event.preventDefault();
    
    const operationNameValue = operationName.value;
    const operationAmountValue = operationAmount.value;
    
    if(operationAmountValue !== "" && operationNameValue !== ""){
        const operation = {
            id: generateId(),
            description: operationNameValue,
            amount: +operationAmountValue,
        }
        dbOperation.push(operation);
        init();
    }
    operationName.value = '';
    operationAmount.value = '';
}

const deliteOperation = (event) =>{
    let target = event.target;
    if(target.classList.contains('history_delete')){
        dbOperation = dbOperation
            .filter(item => item.id !== target.dataset.id)
            init();
    }
}

const init = () =>{
    historyList.textContent = '';
    updeteBalance();
    dbOperation.forEach(renderOperation);
}
historyList.addEventListener('click', deliteOperation);
form.addEventListener('submit', addOperation);
init();

//Popula lista com um cliente inicial
if (localStorage.hasOwnProperty("clients") == false) {
    localStorage.setItem("clients", JSON.stringify([{
        name: "Joana",
        email: "joana@gmail.com",
        cpfCnpj: "118.615.612-30",
        telephone: '71-8833-9933',
        cep: '42293-225',
        street: "Rua das Flores",
        number: 19,
        neighborhood: "Bairro das arvores",
        city: "Cidade das Folhas",
        state: "SP"
    }]))
}

function toFormat(mask, element) {
    let i = element.value.length;
    let output = mask.substring(0, 1);
    let text = mask.substring(i)

    if (text.substring(0, 1) != output) {
        element.value += text.substring(0, 1);
    }
}

const registerBtn = document.getElementById("register-btn");
const alert = document.getElementById("alert");
const clientsList = document.getElementById("clients-list");
const modal = document.getElementById("ok-modal");

//Função para verificar se todos os campos foram preenchidos.
function validateInputs(array) {
    let isValid = true;
    for (let i = 0; i < array.length; i++) {
        if (array[i].value == "") {
            isValid = false;
        }
    }
    return isValid;
}

//Verifica se CPF ou CNPJ já se encontra na base de clientes
function verifyCPFCNPJ(data) {
    let dataFound = false;
    let listOfClientes = JSON.parse(localStorage.getItem("clients"));
    for (let i = 0; i < listOfClientes.length; i++) {
        if (listOfClientes[i].cpfCnpj == data) {
            dataFound = i;
        }
    }
    return dataFound;
}

//Adiciona cliente a lista
registerBtn.addEventListener("click", () => {
    alert.textContent = "";
    const clientName = document.getElementById("name");
    const email = document.getElementById("email");
    const cpfCnpj = document.getElementById("cpf-cnpj");
    const telephone = document.getElementById("telephone");
    const cep = document.getElementById("cep");
    const street = document.getElementById("street");
    const number = document.getElementById("street-number");
    const neighborhood = document.getElementById("neighborhood");
    const city = document.getElementById("city");
    const state = document.getElementById("state");

    let fields = [clientName, email, cpfCnpj, telephone, cep, street, number, neighborhood, city, state];

    let client = {
        name: clientName.value,
        email: email.value,
        cpfCnpj: cpfCnpj.value,
        telephone: telephone.value,
        cep: cep.value,
        street: street.value,
        number: number.value,
        neighborhood: neighborhood.value,
        city: city.value,
        state: state.value
    };

    if (validateInputs(fields) == true) {
        if (verifyCPFCNPJ(cpfCnpj.value) == false) {
            let clients = JSON.parse(localStorage.getItem("clients")); //Pega os clientes já existentes
            clients.push(client) //Adiciona cliente atual
            JSON.parse(localStorage.getItem("clients")).push(client)  //Guarda a listagem nova de clientes no local storage
            localStorage.setItem("clients", JSON.stringify(clients))

            modal.style.display = "flex";
            setTimeout(() => {
                modal.style.display = "none";
                window.location.reload(); //Recarrega para mostrar listagem atualizada
            }, 3000)
        } else {
            alert.textContent = "CPF ou CNPJ já cadastrado."
        }

        //Limpa os campos após o cadastro
        fields.forEach(field => {
            field.value = "";
        })
    } else {
        alert.textContent = "Todos os campos devem ser preenchidos."
    }
});

//Carrega a lista de clientes
window.addEventListener("load", () => {
    if (localStorage.hasOwnProperty("clients")) {
        JSON.parse(localStorage.getItem("clients")).forEach(client => {
            clientsList.insertAdjacentHTML('beforeend', `
            <tr>
            <td class="name">${client.name}</td>
            <td class="email">${client.email}</td>
            <td class="cpf-cpnj">${client.cpfCnpj}</td>
            <td class="telephone">${client.telephone}</td>
            <td class="cep">${client.cep}</td>
            <td class="street">${client.street}</td>
            <td class="number">${client.number}</td>
            <td class="neighborhood">${client.neighborhood}</td>
            <td class="city">${client.city}</td>
            <td class="state">${client.state}</td>
            <td><button class="delete-client-btn" onclick="deleteClient(this)"><i class="far fa-trash-alt"></i></button></td>
            </tr>
        `);
        });
    };
});


//Exclui cliente da listagem
function deleteClient(btn) {
    let clientCPForCNPJ = btn.parentElement.parentElement.children[2].textContent; //Pega o dado único do cliente a excluir

    //Percorre a lista de clientes para encontrar o cliente que contem o dado unico do botão clicado e o exclui
    let listOfClientes = JSON.parse(localStorage.getItem("clients"));
    let clienteIndex = verifyCPFCNPJ(clientCPForCNPJ)
    listOfClientes.splice(clienteIndex, 1);
    localStorage.setItem("clients", JSON.stringify(listOfClientes));
    window.alert("Cliente excluido!")
    window.location.reload();
}
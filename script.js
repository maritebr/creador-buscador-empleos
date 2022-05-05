const openModalEditar = document.getElementById("modal-edit");
const btnEditar = document.getElementById("btn-edit");
const idEditar = document.getElementById("idEditar");
const btnSaveEdit = document.getElementById("btn-save-edit");
const closeEditar = document.getElementById("close-editar");
const inputEditPuesto = document.getElementById("input_editPuesto");
const inputEditEmpresa = document.getElementById("input_editEmpresa");
const inputEditTag = document.getElementById("input_editTag");
const openModalDelete = document.getElementById("modal-delete");

const idEliminar = document.getElementById("idEliminar");
const btnEliminar = document.getElementById("bnt-delete");
const btnSaveProposal = document.getElementById("btn-save");
const closeEliminar = document.getElementById("close-eliminar");

const puesto = document.getElementById("puesto");
const empresa = document.getElementById("empresa");
const tags = document.getElementById("tags");
const cards = document.getElementById("box-proposalJobs");

const bgModalDelete = document.getElementById("bgModal-delete")
const bgModalEdit = document.getElementById("bgModal-edit")

const URL = "https://62462ba8739ac845918b7f46.mockapi.io/empleos";

//GUARDAR PROPUESTAS

const nuevaPropuesta = () => {
    let arrayTags = []
    let tag = tags.value
    arrayTags.push(tag)

    console.log(arrayTags, "arrayTags");

    let arrayTransformado = arrayTags.join().split(",")
    console.log(arrayTransformado, "arrayTrans");

    const empleos = {
        Puesto: puesto.value,
        Empresa : empresa.value,
        Tags1 : arrayTransformado[0],
        Tags2 : arrayTransformado[1],
        Tags3 : arrayTransformado[2]
    }

    fetch(`${URL}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(empleos),
    })
    .then ((res) => res.json())
    .then (data => {
        renderEmpleos();
    })
}

btnSaveProposal.addEventListener('click', nuevaPropuesta);

//MODAL EDITAR
const showModalEditar = () => {
    bgModalEdit.classList.add('is-visible');
}

const closeModalEditar = () => {
    bgModalEdit.classList.remove('is-visible');
}


//MODAL ELIMINAR

const showModalEliminar = (id) => {
    bgModalDelete.classList.add('is-visible');
    btnEliminar.addEventListener('click', () => {
        openModalEliminar(id)
        
    });
}

const closeModalEliminar = () => {
    bgModalDelete.classList.remove('is-visible');
}

const openModalEliminar =(id)=>{
    fetch(`${URL}/${id}`,{ 
        method: 'DELETE',
    })
    .then((res) => res.json())
    .then(data => {
        renderEmpleos()
        closeModalEliminar()
    })
}

//cerrar modales

closeEditar.addEventListener('click', closeModalEditar);
closeEliminar.addEventListener('click', closeModalEliminar);


const openModalEdit = (id) => {
    showModalEditar();
    fetch(`${URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        
        inputEditPuesto.value = data.Puesto;
        inputEditEmpresa.value = data.Empresa;
        inputEditTag.value = `${data.Tags1} ${data.Tags2} ${data.Tags3}`  ;
        idEditar.value = id;
    });
 
};

const datosEditados =  () => {
    const valorIngresado = inputEditTag.value;
    const arrayValor = valorIngresado.split(" ")
    const id = idEditar.value;

    const empleos = {};
    empleos.Puesto = inputEditPuesto.value;
    empleos.Empresa = inputEditEmpresa.value;
    empleos.Tags1 = arrayValor[0]
    empleos.Tags2 = arrayValor[1]
    empleos.Tags3 = arrayValor[2]
    
    fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleos),
    })
    .then((res)=> res.json());
    renderEmpleos();
};

btnSaveEdit.addEventListener('click', () => {

    datosEditados();
    renderEmpleos();
    closeModalEditar();
  
});
  

btnEliminar.addEventListener('click', () => {
    const id = idEliminar.value;
    fetch(`${URL}/${id}`,{ method: 'DELETE'})
    .then((res) => res.json());
    
});

const renderEmpleos = () => {
    fetch(`${URL}`)
    .then (response => response.json())
    .then (data => {
      const datos = data.reduce((acc, datos)=>{
          console.log(datos);
       return  `${acc}
       <div class="addProposal" id="addProposal">
                <div class="header-proposal">
                    <h2>${datos.Puesto}</h2>
                    
                </div>

                <div class="sub-header">
                    <p class="subtitle">${datos.Empresa}</p>
                    <button>${datos.createdAt.substring(0,10)}</button>   
                </div>
                
                <div class="tags">
                    <button>#${datos.Tags1}</button>
                    <button>#${datos.Tags2}</button>
                    <button>#${datos.Tags3}</button>
                </div>
                
                <div class="icons">
                    <i class="fa-solid fa-trash"  onclick="showModalEliminar(${datos.id})"></i>
                    <i class="fa-solid fa-pencil" onclick="openModalEdit(${datos.id})"></i>    
                </div>   
        </div>
        `
      },"")
      cards.innerHTML = datos;
    })
    
}

renderEmpleos();






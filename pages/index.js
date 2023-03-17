import { navbar } from "../components/navbar.js";
import { getData } from "../scripts/getDataUtil.js";

console.log("home page");
const nav = document.getElementById("navbar");
nav.innerHTML = navbar

const display = document.getElementById("tbody")

const initialize = async() =>{
    await getData(` http://localhost:3000/blogs`).then(res =>{
              append(res);
    })

} 


const append = async(blogs) => {

    blogs.forEach(({id,image,description,price})=>{
        //   display.innerHTML += 
          
        //   `
        //   <tr>
        //   <td>${id}</td>
        //   <td>${title}</td>
        //   <td>${author}</td>
        //   <td><button id="btn"  class="view-data">View</button> </td>
        //   <td><button id="btn">Edit</button> </td>
        //   <td><button id="btn">Delete</button> </td>        
        // </tr>
        //   `

        let tr = document.createElement("tr");
        let td1 = document.createElement("td")
        td1.innerText = id
        let td2 = document.createElement("td")
        let images = document.createElement("img");
        images.setAttribute("src",image)
        images.setAttribute("id","image")
        td2.append(image)
        td2.innerText = images
        let td3 = document.createElement("td")
        td3.innerText = description
        let td7 = document.createElement("td")
        td7.innerText = price
        let td4 = document.createElement("td")
        let viewButton = document.createElement("button");
        viewButton .setAttribute("id","view-btn")
        td4.append(viewButton)
        viewButton.innerText = "view"
        viewButton.onclick = function(){
            console.log(id);
            localStorage.setItem("blogId",JSON.stringify(id));
            window.location.href = "view.html"
        }
        let td5 = document.createElement("td")
        let editButton = document.createElement("button");
        editButton.setAttribute("id","edit-btn")
        td5.append(editButton)
        editButton.innerText = "Edit"
        editButton.onclick = function(){
            console.log(id);
            localStorage.setItem("blogId",JSON.stringify(id));
            window.location.href = "edit.html"
           
        }
        let td6 = document.createElement("td")
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("id","delete-btn")
        td6.append(deleteButton)
        deleteButton.innerText = "delete"
        deleteButton.onclick = function(){
            console.log(id);
            deleteData(id)
            localStorage.setItem("blogId",JSON.stringify(id));
        }

        tr.append(td1,images,td3,td7,td4,td5,td6)
        display.append(tr)
    }) 


}
async function deleteData(id){
    await fetch(`http://localhost:3000/blogs/${id}`,{
        method:'DELETE'
    })
    initialize();
 }


initialize();
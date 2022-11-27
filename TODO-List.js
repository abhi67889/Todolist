function getAndUpdate(){
	tit = document.getElementById('title').value;
	desc = document.getElementById('description').value;
	if (localStorage.getItem('itemJson')==null){
		console.log("Updating list....");
		itemJsonArray =[];
		itemJsonArray.push([tit, desc])
		localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
	}else{
		itemJsonArraystr = localStorage.getItem('itemJson')
		itemJsonArray = JSON.parse(itemJsonArraystr);
		itemJsonArray.push([tit, desc])
		localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
	}
	update();
}

function update() {
	if (localStorage.getItem('itemJson')==null){
		itemJsonArray =[];
		localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
	}else{
		itemJsonArraystr = localStorage.getItem('itemJson')
		itemJsonArray = JSON.parse(itemJsonArraystr);
	}
	// Populate the Table
	let tablebody = document.getElementById('tbody');
	let str = "";
	itemJsonArray.forEach((element, index) =>{
		str += `
		<tr>
      	<th scope="row">${index + 1}</th>
      	<td>${element[0]}</td>
      	<td>${element[1]}</td>
      	<td><button class="btn btn-sm btn-primary" onclick = "deleted(${index})">Delete</button></td>
    	</tr>`;
	});
	tablebody.innerHTML= str;
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex){
	console.log('Delete', itemIndex);
	itemJsonArraystr = localStorage.getItem('itemJson')
	itemJsonArray = JSON.parse(itemJsonArraystr);

	// Delete the itemIndex element from the Array
	itemJsonArray.splice(itemIndex, 1)
	localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
	update();
}
 function clearStorage(){
    if (confirm("Do you areally want to clear?")){
    console.log('Clearing the storage')
    localStorage.clear();
    update()
    }
}

let a;
let time;
let date;
const options = { weekday:'long', year: 'numeric', month: 'long', day: 'numeric'};
setInterval(()=>{
a = new Date();
time = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
date = a.toLocaleDateString(undefined, options);
document.getElementById('time').innerHTML = time + "<br> on " + date;
}, 200);
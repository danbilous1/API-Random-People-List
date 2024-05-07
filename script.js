let domThead = document.querySelector('thead');
let domTbody = document.querySelector('tbody');

let columns = ['photo', 'name', 'address', 'gender', 'birthday', 'email adress', 'phone number', 'actions'];
//create tr once
let tr = document.createElement('tr');

for (let i = 0; i < columns.length; i++) {
	//create th for every el
	let th = document.createElement('th');
	//add name into th
	th.innerText = columns[i];
	//add el to tr
	tr.appendChild(th);
	//add tr to thead
	domThead.appendChild(tr);
}

// let userFullName = user.name[title] + " " + user.name[first] + " " + user.name[last];


let url = 'https://randomuser.me/api/?results=50'
fetch(url).then(response => response.json()).then(data => {
	renderList(data.results)

})

function listKey(element, profile) {
	for (key in element) {
		if (typeof (element[key]) !== 'object') {
			let row = document.createElement('div');
			row.innerHTML = `<b>${key}</b> ${element[key]}`;
			profile.append(row);
		} else {
			listKey(element[key], profile);
		}
	}
}

function renderList(list) {
	for (let i = 0; i < list.length; i++) {
		let fullName = list[i].name.first + " " + list[i].name.last + " " + list[i].name.title;
		let adress = list[i].location.country + ' ' + list[i].location.city + ' ' + list[i].location.postcode;
		let gender = list[i].gender;
		let birthday = list[i].dob.date.split('T')[0];
		let email = list[i].email;
		let phoneNumber = list[i].phone;
		let photo = list[i].picture.medium;
    console.log(list[i]);
		//create tr for every user
		let trUser = document.createElement('tr');

		let profile = document.createElement('div');
    listKey(list[i], profile);
		
      
			//try tio make this algorithm to work recursively to show every level deep
		

    



		// creating user image
		let userImg = document.createElement('img');
		userImg.src = photo;

		// put image in table
		let tdImg = document.createElement('td');
		tdImg.appendChild(userImg);
		trUser.appendChild(tdImg);


		[fullName, adress, gender, birthday, email, phoneNumber].forEach(el => {

			//if index = 0 
			//createElement + append
			let tdUser = document.createElement('td');

			tdUser.innerText = el;
			trUser.appendChild(tdUser);
			domTbody.appendChild(trUser);
		});


		// creating delete btn
		let deleteBtn = document.createElement('button');
		deleteBtn.innerText = 'Delete';
		// deleteBtn.classList.add('delete-btn');

		// delete function
		deleteBtn.addEventListener('click', function() {
			trUser.remove();
		})

		// make delete btn on screen
		let tdButton = document.createElement('td');
		trUser.appendChild(tdButton);

    let infoBtn = document.createElement('button');
    infoBtn.innerText = 'Info';
    // deleteBtn.classList.add('delete-btn');

    // delete function
    infoBtn.addEventListener('click', function() {
        myModal.show();
        let modalBody = document.querySelector('.modal-body');
        //let jsonList = JSON.stringify(list[i]);
        modalBody.innerHTML = ''
        modalBody.append(profile);
    })

    // make delete btn on screen

		tdButton.append(deleteBtn, infoBtn);



	}
}

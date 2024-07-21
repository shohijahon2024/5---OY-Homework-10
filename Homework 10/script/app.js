document.getElementById('car-form').addEventListener('submit', createCar);

async function createCar(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const model = document.getElementById('model').value;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, model }),
        });
        fetchData();
    } catch (error) {
        console.error('Avtomobil yaratishda xatolik yuz berdi:', error);
    }
}

const API_URL = 'https://669a77e99ba098ed61ffc202.mockapi.io/products/cars';

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const cars = await response.json();
        displayCars(cars);
    } catch (error) {
        console.error('Maʼlumotlarni olishda xatolik yuz berdi:', error);
    }
}

function displayCars(cars) {
    const carList = document.getElementById('car-list');
    carList.innerHTML = "";
    cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${car.avatar}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p>${car.model}</p>
            <button onclick="deleteCar(${car.id})">Delete</button>
        `;
        carList.appendChild(card);
    });
}

async function deleteCar(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    } catch (error) {
        console.error('Avtomobilni oʻchirishda xatolik yuz berdi:', error);
    }
}



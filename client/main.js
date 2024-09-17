const url = "http://localhost:3600";


const tabCards = document.querySelector(".tab-cards");
const contentCards = document.querySelector(".content-cards");
const tabCard = document.getElementsByClassName("tab-card");

const getTabData = async () => {
    try {
        const response = await fetch(`${url}/catalog`);
        const data = await response.json();
        renderTab(data);
        getContentData(data[0].name);
    } catch (error) {
        return error.message;
    }
}
getTabData();

const renderTab = (data) => {
    tabCards.innerHTML = data.map((item) => `
        <a data-name="${item.name}" class="tab-link" href="#">${item.text}</a>
    `).join("");
};

const renderContent = async (data) => {
    contentCards.innerHTML = data.map((item) => `
    <div class="content-card">
        <div class="content-card-img">
            <img src="${item.img}" alt="">
        </div>
        <div class="content-card-info">
            <p class="content-card-title">${item.title}</p>
            <div class="content-card-info-price-btn">
                <p class="content-card-price">${item.price}</p>
                <button class="content-card-buy-btn" href="#">Buy</button>
            </div>
        </div>
    </div>
    `).join("");
}


const getContentData = async (name) => {
    try {
        const response = await fetch(`${url}/${name}`);
        const data = await response.json();
        renderContent(data);
    } catch (error) {
        return error.message;
    }
}


tabCards.addEventListener("click", (e) => {
    if (e.target.dataset.name) {
        getContentData(e.target.dataset.name);
    }
});
// load all news category
const loadAllNewsCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`
  );
  const data = await res.json();
  return data.data.news_category;
};

// display all news category
const displayAllNewsCategory = async () => {
  const categories = await loadAllNewsCategory();
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    const { category_id, category_name } = category;
    const categoryLi = document.createElement("li");
    categoryLi.innerHTML = ` <a>${category_name}</a> `;
    categoryContainer.appendChild(categoryLi);

    categoryLi.addEventListener("click", async function loadNewsData() {
      const res = await fetch(
        `https://openapi.programming-hero.com/api/news/category/${category_id}`
      );
      const data = await res.json();
      const newsContainer = document.getElementById("news-container");
      newsContainer.textContent = "";
      data.data.forEach((news) => {
        const newsDiv = document.createElement("div");
        const { thumbnail_url, title, total_view, details, author, _id } = news;
        const { name, img, published_date } = author;
        newsDiv.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl p-5 my-5">
        <figure>
            <img src="${thumbnail_url}" alt="Album" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${
              details.length > 500 ? details.slice(0, 500) + "..." : details
            }</p>
            <div class="flex justify-between mt-4 items-center">
            <div class="flex justify-center items-center">
              <div>
                <img
                  src="${img}"
                  alt=""
                  class="w-12 rounded-full"
                />
              </div>
              <div class="ml-5">
                <h6 class="text-md font-semibold">${name}</h6>
                <p class="text-xs">${published_date}</p>
              </div>
            </div>
            <div>Views : ${total_view}</div>
            <div>
            <div class="card-actions justify-end">
            <label onclick="loadNewsDetails('${_id}')" for="my-modal-3" class="btn modal-button btn-primary">Show Details</label>
            </div>
            </div>
            </div>
          </div>

        </div>
        `;
        newsContainer.appendChild(newsDiv);
      });
    });
  });
};

const loadNewsDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${id}`
  );
  const data = await res.json();
  displayNewsDetails(data.data[0]);
};

const displayNewsDetails = async (newsDetails) => {
  console.log(newsDetails);
  const { title, total_view, image_url, details, author } = newsDetails;
  const { name, published_date } = author;

  const modalBody = document.getElementById("modal-body");
  modalBody.textContent = "";
  modalBody.innerHTML = `
  <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
  <h3 class="text-lg font-bold"> ${title} </h3>
  <p class="py-4"><img src="${image_url}"/></p>
  <p class="py-4">${details}</p>
  <p class="pt-2"><span class="font-semibold">Total view</span> : ${total_view}</p>
  <p class="pt-1"><span class="font-semibold">Author</span> : ${name}</p>
  <p class="pt-1 text-sm"><span class="font-semibold">Published Date</span> : ${published_date}</p>
  `;
};
displayAllNewsCategory();

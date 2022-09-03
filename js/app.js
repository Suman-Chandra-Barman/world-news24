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
        const { thumbnail_url, title, total_view, details, author } = news;
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
                <button class="btn btn-primary">Show Details</button>
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
displayAllNewsCategory();

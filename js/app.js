// load all news category
const loadAllNewsCategory = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/categories`
    );
    const data = await res.json();
    return data.data.news_category;
  } catch (error) {
    console(error);
  }
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

    categoryLi.addEventListener("click", async function () {
      document.getElementById("spinner").classList.remove("hidden");
      // const res = await fetch(
      //   `https://openapi.programming-hero.com/api/news/category/${category_id}`
      // );
      // const data = await res.json();
      try {
        const res = await fetch(
          `https://openapi.programming-hero.com/api/news/category/${category_id}`
        );
        const data = await res.json();
        const newsContainer = document.getElementById("news-container");
        newsContainer.textContent = "";
        const categoryLength = data.data.length;
        const categoryLengthContainer =
          document.getElementById("category-length");
        if (categoryLength > 0) {
          categoryLengthContainer.innerHTML = `${categoryLength} items found for ${category_name}`;
        } else {
          categoryLengthContainer.innerHTML = `No news found for ${category_name}`;
          document.getElementById("spinner").classList.add("hidden");
        }

        const mostViewData = data.data.sort(
          (a, b) => b.total_view - a.total_view
        );

        mostViewData.forEach((news) => {
          const newsDiv = document.createElement("div");
          const { thumbnail_url, title, total_view, details, author, _id } =
            news;
          // console.log(total_view);
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
              <div class="flex justify-between flex-col gap-5 md:flex-row mt-4 md:items-center">
              <div class="flex md:justify-center items-center">
                <div>
                  <img
                    src="${img}"
                    alt=""
                    class="w-12 rounded-full"
                  />
                </div>
                <div class="ml-5">
                  <h6 class="text-md font-semibold">${
                    name === null ? "No data found!" : name
                  }</h6>
                  <p class="text-xs">${published_date}</p>
                </div>
              </div>
              <div>
              <i class="fa-solid fa-eye mr-3"></i>${
                total_view === null ? "No data found!" : total_view
              }M</div>
              <div>
              <div class="card-actions md:justify-end">
              <label onclick="loadNewsDetails('${_id}')" for="my-modal-3" class="btn modal-button btn-primary">Show Details</label>
              </div>
              </div>
              </div>
            </div>
  
          </div>
          `;
          newsContainer.appendChild(newsDiv);
          document.getElementById("spinner").classList.add("hidden");
        });
      } catch (err) {
        console.log(err);
      }
      /*       const newsContainer = document.getElementById("news-container");
      newsContainer.textContent = "";
      const categoryLength = data.data.length;
      const categoryLengthContainer =
        document.getElementById("category-length");
      if (categoryLength > 0) {
        categoryLengthContainer.innerHTML = `${categoryLength} items found for ${category_name}`;
      } else {
        categoryLengthContainer.innerHTML = `No news found for ${category_name}`;
        document.getElementById("spinner").classList.add("hidden");
      }

      const mostViewData = data.data.sort(
        (a, b) => b.total_view - a.total_view
      );

      mostViewData.forEach((news) => {
        const newsDiv = document.createElement("div");
        const { thumbnail_url, title, total_view, details, author, _id } = news;
        // console.log(total_view);
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
            <div class="flex justify-between flex-col gap-5 md:flex-row mt-4 md:items-center">
            <div class="flex md:justify-center items-center">
              <div>
                <img
                  src="${img}"
                  alt=""
                  class="w-12 rounded-full"
                />
              </div>
              <div class="ml-5">
                <h6 class="text-md font-semibold">${
                  name === null ? "No data found!" : name
                }</h6>
                <p class="text-xs">${published_date}</p>
              </div>
            </div>
            <div>
            <i class="fa-solid fa-eye mr-3"></i>${
              total_view === null ? "No data found!" : total_view
            }M</div>
            <div>
            <div class="card-actions md:justify-end">
            <label onclick="loadNewsDetails('${_id}')" for="my-modal-3" class="btn modal-button btn-primary">Show Details</label>
            </div>
            </div>
            </div>
          </div>

        </div>
        `;
        newsContainer.appendChild(newsDiv);
        document.getElementById("spinner").classList.add("hidden");
      }); */
    });
  });
};

// news details
const loadNewsDetails = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`
    );
    const data = await res.json();
    displayNewsDetails(data.data[0]);
  } catch (err) {
    console.log(err);
  }
};

const displayNewsDetails = async (newsDetails) => {
  const { title, total_view, image_url, details, author } = newsDetails;
  const { name, published_date } = author;

  const modalBody = document.getElementById("modal-body");
  modalBody.textContent = "";
  modalBody.innerHTML = `
  <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
  <h3 class="text-lg font-bold"> ${title} </h3>
  <p class="py-4"><img src="${image_url}"/></p>
  <p class="py-4">${details}</p>
  <p class="pt-2"><span class="font-semibold">Total view</span> : ${
    total_view === null ? "No data found!" : total_view
  }M</p>
  <p class="pt-1"><span class="font-semibold">Author</span> : ${
    name === null ? "No data found!" : name
  }</p>
  <p class="pt-1 text-sm"><span class="font-semibold">Published Date</span> : ${published_date}</p>
  `;
};
displayAllNewsCategory();

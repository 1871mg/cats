const $wrapper = document.querySelector('[data-wr]');

const generateCatCard = (cat) => {
    return (
        `<div data-id=${cat.id} class="card mb-2" style="width: 18rem">
        <img
          src="${cat.image}"
          class="card-img-top"
          alt="фото киски"
        />
        <div class="card-body">
          <h5 class="card-title">${cat.name}</h5>
          <p class="card-text">${cat.description}</p>
          <button class="btn btn-success">Open</button>
          <button class="btn btn-light">Edit</button>
          <button class="btn btn-danger">Delete</button>

        </div>
      </div>`
    )
}

api.getAllCats()
    .then(res => {
        console.log({ res });
        // if(res.ok)
        // res.status === 204 / 500 /

        return res.json()
    })
    .then(data => {
        console.log(data);

        data.forEach(cat => {
            $wrapper.insertAdjacentHTML('afterbegin', generateCatCard(cat))
        });
    })

const $wrapper = document.querySelector('[data-wrapper]')
const $addBtn = document.querySelector('[data-add_button]')
const $modalAdd = document.querySelector('[data-modal]')
const $spinner = document.querySelector('[data-spinner]')
const $formErrorMsg = document.querySelector('[data-errmsg]')

const HIDDEN_CLASS = 'hidden'

const generateCatCard = (cat) => {
  return (
    `<div data-card_id=${cat.id} class="card mx-2" style="width: 20rem">
        <img
          src="${cat.image}"
          class="card-img-top"
          alt="фото киски"
        />
        <div class="card-body">
          <h5 class="card-title">${cat.name}</h5>
          <p class="card-text">${cat.description}</p>
            <div class="center-block-wide">
              <button type="button" data-action="open" class="btn btn-info">Open</button>
              <button type="button" data-action="edit" class="btn btn-light">Edit</button>
              <button type="button" data-action="delete" class="btn btn-danger">Delete</button>
            </div>
        </div>
      </div>
      `)
}

$wrapper.addEventListener('click', async (event) => {
  const action = event.target.dataset.action;

  switch (action) {
    case 'delete':
      const $currentCard = event.target.closest('[data-card_id]');
      const catId = $currentCard.dataset.card_id;
      try {
        const res = await api.deleteCat(catId);
        const response = await res.json();
        if (!res.ok) throw Error(response.message)
        $currentCard.remove()
      } catch (error) {
        console.log(error);
      }
      break;

    case 'open':
      // открывается модалка где расположена подробная информация о коте
      // должен происходить какой запрос на бек о всей информации о конкретном коте по id
      // вывести в модальном окне

      break;

    case 'edit':
      // открывается модалка с формой
      // должен происходить какой запрос на бек о всей информации о конкретном коте по id
      // форма уже предзаполнена информацией о коте
      break;

    default:
      break;
  }
})

$addBtn.addEventListener('click', () => {
  $modalAdd.classList.remove(HIDDEN_CLASS) // открываем модалку

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { // по нажатию esc
      $modalAdd.classList.add(HIDDEN_CLASS) // скрываем модалку
    }
  });



})

document.forms.add_cats_form.addEventListener('submit', async (event) => {
  event.preventDefault();
  $formErrorMsg.innerText = '';

  const data = Object.fromEntries(new FormData(event.target).entries());

  data.id = Number(data.id)
  data.age = Number(data.age)
  data.rate = Number(data.rate)
  data.favorite = data.favorite == 'on'

  const res = await api.addNewCat(data)

  if (res.ok) {
    $wrapper.replaceChildren();
    getCatsFunc()
    $modalAdd.classList.add(HIDDEN_CLASS)
    return event.target.reset()
  } else {
    const response = await res.json();
    $formErrorMsg.innerText = response.message
    return;
  }
})

const getCatsFunc = async () => {
  $spinner.classList.remove(HIDDEN_CLASS)
  const res = await api.getAllCats();

  if (res.status !== 200) {
    const $errorMessage = document.createElement('p');
    $errorMessage.classList.add('error-msg');
    $errorMessage.innerText = 'Произошла ошибка, попробуйте выполнить запрос позже';

    return $wrapper.appendChild($errorMessage);
  }

  const data = await res.json();

  if (data.length === 0) {
    const $notificationMessage = document.createElement('p');
    $notificationMessage.innerText = 'Список котяток пуст, добавьте котятку';

    return $wrapper.appendChild($notificationMessage);
  }

  setTimeout(() => {
    $spinner.classList.add(HIDDEN_CLASS)
    data.forEach(cat => {
      $wrapper.insertAdjacentHTML('afterbegin', generateCatCard(cat))
    });
  }, 1000);
}
getCatsFunc();

// TODO:
// закрытие модалки по области вокруг, escape (DONE), кнопки крестика в углу
// сохранять форму добавления в LC
// возможность обновления кота - ???
// подробная информация о коте (модалка/отдельная страница)
// обработать все ошибки со всех запросов
    // окультурить спиннер - DONE
// сделать красивой страницу
// сделать мобильную верстку 

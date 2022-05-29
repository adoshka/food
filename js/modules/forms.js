import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {

	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: "img/form/spinner.svg",
		success: "Спасибо! Мы скоро с вами свяжемся",
		failure: "Что-то пошло не так...",
	};

	forms.forEach((item) => {
		bindPostData(item);
	});


	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const statusMessege = document.createElement("img");
			statusMessege.src = message.loading;
			statusMessege.style.cssText = `
						display: block;
						margin: 10px auto 0 auto;
			`;

			form.insertAdjacentElement("afterend", statusMessege);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData("http://localhost:3000/requests", json)
			.then((data) => {
				console.log(data);
				showThanksModal(message.success);
				statusMessege.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				form.reset();
			});
	});
}

	function showThanksModal(message) {
		const previosModalDialog = document.querySelector(".modal__dialog");

		previosModalDialog.classList.add("hide");
		openModal('.modal',  modalTimerId);

		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
						<div class="modal__content">
								<div class="modal__title">${message}</div>
						</div>
			`;

		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			previosModalDialog.classList.add("show");
			previosModalDialog.classList.remove("hide");
			closeModal('.modal');
		}, 3000);
	}


	// fetch('http://localhost:3000/menu')
	// .then(data => data.json())
	// .then(res => console.log(res));

}

export default forms;
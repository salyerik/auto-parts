// Popup
import popup from './modules/popup.js';
popup();

// Menu burger
const menuIcon = document.querySelector('.menu__icon');
const menuList = document.querySelector('.menu__list');
const menuLink = document.querySelectorAll('.menu__link');

menuIcon.addEventListener('click', () => {
	document.body.classList.toggle('lock');
	menuIcon.classList.toggle('active');
	menuList.classList.toggle('active');
});

menuLink.forEach(e => {
	e.addEventListener('click', () => {
		document.body.classList.remove('lock');
		menuIcon.classList.remove('active');
		menuList.classList.remove('active');
	});
});

// Header anchor
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors)
	anchor.addEventListener('click', e => {
		e.preventDefault();
		document
			.querySelector(anchor.getAttribute('href'))
			.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});

// Show or Hide the "to top-arrow btn"
window.onscroll = function () {
	document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000
		? (document.querySelector('.footer__arrow').style.display = 'block')
		: (document.querySelector('.footer__arrow').style.display = 'none');
};

// Tabs
const tabsBtn = document.querySelectorAll('.block3__btn');
const tabsBlock = document.querySelectorAll('.block3__block');
tabsBtn.forEach(tabBtn => {
	tabBtn.addEventListener('click', () => {
		const dataTab = document.querySelector(tabBtn.getAttribute('data-tab'));
		if (!tabBtn.classList.contains('active')) {
			tabsBtn.forEach(el => el.classList.remove('active'));
			tabsBlock.forEach(el => el.classList.remove('active'));
			tabBtn.classList.add('active');
			dataTab.classList.add('active');
		}
	});
});

// Swiper-Slider
new Swiper('.block1-slider', {
	navigation: { prevEl: '.slider-arrow-prev', nextEl: '.slider-arrow-next' },
	slidesPerView: '1',
	spaceBetween: 30,
	loop: true,
	autoplay: { delay: 2000 },
});

new Swiper('.block2__slider', {
	navigation: {
		prevEl: '.slider2-arrow-prev',
		nextEl: '.slider2-arrow-next',
	},
	slidesPerView: '3',
	spaceBetween: 30,
	loop: true,
	breakpoints: {
		320: { slidesPerView: 1.3 },
		480: { slidesPerView: 2.3 },
		1024: { slidesPerView: 3 },
	},
	autoplay: { delay: 2000 },
});

// Show or hide catalog popup
const catalogBtn = document.querySelector('.header-bottom__btn');
const catalog = document.querySelector('.catalog');
catalogBtn.addEventListener('click', function (e) {
	catalog.classList.toggle('active'), de.classList.toggle('active');
});

// Cart logic
const buyBtns = document.querySelectorAll('.buy'),
	cartList = document.querySelector('.cart-content__list'),
	totalPrice = document.querySelector('.fullprice'),
	quantity = document.querySelector('.cart__quantity'),
	cart = document.querySelector('.cart'),
	cartIcon = document.querySelector('.header-bottom__links > .icon-basket');
let count = 0;

const toNumber = e => parseInt(e.replace(/\s/g, ''));
const toStringNumber = e =>
	String(e).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
const updateCart = () => {
	const cartLength = cartList.children.length;
	quantity.textContent = cartLength;
	if (cartLength > 0) cart.classList.add('active');
	else cart.classList.remove('active');
};

cart.addEventListener('click', e => {
	if (
		e.target === cartIcon ||
		'cart__quantity' === e.target.classList ||
		'cart__text' === e.target.classList
	) {
		cart.classList.toggle('click');
	}
});

buyBtns.forEach(buyBtn => {
	buyBtn
		.closest('.product')
		.setAttribute('data-id', Math.random().toString(16).substring(2, 8));

	buyBtn.addEventListener('click', () => {
		const product = buyBtn.closest('.product');
		const id = product.dataset.id;
		const imgSrc = product.querySelector('.img img').getAttribute('src');
		const title = product.querySelector('.title').textContent;
		const price = toNumber(product.querySelector('.price').textContent);
		count += price;
		totalPrice.textContent = `${toStringNumber(count)} $`;
		cartList.insertAdjacentHTML(
			'afterbegin',
			`<li class="cart-content__item">
					<article class="cart-product" data-id="${id}">
						<img src="${imgSrc}" alt="" class="cart-product__img">
						<div class="cart-product__text">
							<h3 class="cart-product__title">${title}</h3>
							<span class="cart-product__price">${toStringNumber(price)} $</span>
						</div>
						<button class="cart-product__delete"></button>
					</article>
				</li>`,
		);
		updateCart();
		buyBtn.disabled = true;
	});
});

cartList.addEventListener('click', e => {
	if (!e.target.classList.contains('cart-product__delete')) return;

	const cartItem = e.target.closest('.cart-content__item');
	const id = cartItem.querySelector('.cart-product').dataset.id;
	const price = cartItem.querySelector('.cart-product__price').textContent;
	document
		.querySelector(`.product[data-id="${id}"]`)
		.querySelector('.buy').disabled = false;
	count -= toNumber(price);
	totalPrice.textContent = `${toStringNumber(count)} $`;
	cartItem.remove();
	updateCart();
});

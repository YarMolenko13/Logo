// function testWebP(callback) {

// 	var webP = new Image();
// 	webP.onload = webP.onerror = function () {
// 		callback(webP.height == 2);
// 	};
// 	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
// }

// testWebP(function (support) {

// 	if (support == true) {
// 		document.querySelector('body').classList.add('webp');
// 	} else {
// 		document.querySelector('body').classList.add('no-webp');
// 	}
// });

; !(function ($) {
	$.fn.classes = function (callback) {
		var classes = [];
		$.each(this, function (i, v) {
			var splitClassName = v.className.split(/\s+/);
			for (var j = 0; j < splitClassName.length; j++) {
				var className = splitClassName[j];
				if (-1 === classes.indexOf(className)) {
					classes.push(className);
				}
			}
		});
		if ('function' === typeof callback) {
			for (var i in classes) {
				callback(classes[i]);
			}
		}
		return classes;
	};
})(jQuery);


var userDeviceArray = [
	{ device: 'Android', platform: /Android/ },
	{ device: 'iPhone', platform: /iPhone/ },
	{ device: 'iPad', platform: /iPad/ },
	{ device: 'Symbian', platform: /Symbian/ },
	{ device: 'Windows Phone', platform: /Windows Phone/ },
	{ device: 'Tablet OS', platform: /Tablet OS/ },
	{ device: 'Linux', platform: /Linux/ },
	{ device: 'Windows', platform: /Windows NT/ },
	{ device: 'Macintosh', platform: /Macintosh/ }
];

var platform = navigator.userAgent;

function getPlatform() {
	for (var i in userDeviceArray) {
		if (userDeviceArray[i].platform.test(platform)) {
			return userDeviceArray[i].device;
		}
	}
	return 'Неизвестная платформа!' + platform;
}


'use strict'

$(document).ready(function () {
	$('.icon-menu').click(function (event) {
		$('.icon-menu, .menu__body').toggleClass('_active');
		$('body').toggleClass('_active');
		if ($('.icon-menu').classes()[1] == 'active') {
			document.body.style.overflow = 'hidden';
			$(document).scrollTop(0)
		} else {
			document.body.style.overflow = 'auto';
		}
	});
	$('.menu-page__burger').click(function (event) {
		$('.menu-page__burger').toggleClass('_active');

	});

	function ibg() {
		$.each($('.ibg'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');

			}
		});
	}

	//Button click animation
	function buttonClick(button, oldColor, newColor, time) {
		button.style.backgroundColor = newColor;
		button.style.transition = `all ${time}s ease 0s`;
		setTimeout(() => button.style.backgroundColor = oldColor, parseFloat(time) * 1000);
	}
	ibg();


	const items = document.querySelectorAll('[data-da]')
	const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	function hideOrView(item, place) {
		const itemAtrs = item.dataset.da.split(',');
		const target = document.querySelector('.' + itemAtrs[0]);
		const seq = Number(itemAtrs[1]);
		const res = Number(itemAtrs[2]);
		const originalParent = item.parentElement;
		if (viewportWidth <= res) {
			if (!item.classList.contains('done')) {
				// target.insertBefore(item, target.children[seq]);
				if (place == 1) {
					target.prepend(item)
				} else {
					target.append(item)
				}
				item.classList.add('done');
			}
		} else {
			if (item.classList.contains('done')) {
				originalParent.insertBefore(item, originalParent.children[0])
				item.classList.remove('done')
			}
		}
	}

	hideOrView(items[0], 1);
	hideOrView(items[1], 1);
	hideOrView(items[2], 2);
	hideOrView(items[3]);
	hideOrView(items[4]);


	const menuParents = document.querySelectorAll('.menu-page__link_parent');
	const submenuItems = document.querySelectorAll('.submenu-page__item');

	if (viewportWidth > 992) {
		menuParents.forEach(function (menuParent) {
			const submenuNumber = parseInt(menuParent.getAttribute('data-item'));
			const submenuItem = submenuItems[submenuNumber];

			menuParent.addEventListener('mouseenter', function (event) {
				submenuItem.classList.add('_active');
				menuParents[submenuNumber].classList.add('_hover');
			});
			menuParent.addEventListener('mouseleave', function (event) {
				submenuItem.classList.remove('_active');
				menuParents[submenuNumber].classList.remove('_hover');
			});
			submenuItem.addEventListener('mouseenter', function (event) {
				submenuItem.classList.add('_active');
				menuParents[submenuNumber].classList.add('_hover');
			});
			submenuItem.addEventListener('mouseleave', function (event) {
				submenuItem.classList.remove('_active');
				menuParents[submenuNumber].classList.remove('_hover');
			});
		})
	}



	const burger = document.querySelector('.menu-page__burger');
	const menuBody = document.querySelector('.menu-page__body');
	const submenu = document.querySelector('.submenu-page');

	if (viewportWidth < 992) {
		menuBody.classList.remove('_active');
	}

	burger.addEventListener('click', function () {
		buttonClick(burger, '#068292', '#0a5e69', '0.3');
		if (menuBody.classList.contains('_active')) {
			$('.menu-page__body').slideUp(400, 'swing');
			menuBody.classList.remove('_active');
			submenu.classList.add('_hide');
		} else {
			$('.menu-page__body').slideDown(400, 'swing');
			menuBody.classList.add('_active');
			submenu.classList.remove('_hide')
			burger.classList.remove('_active');
		}
	})


	const searchCategories = document.querySelector('.search-page__categories');
	const searchTitle = document.querySelector('.search-page__title');

	searchTitle.addEventListener('click', function (event) {
		if (searchTitle.contains(event.target))
			if (searchCategories.classList.contains('_active')) {
				$('.search-page__categories').slideUp(400, 'swing');
				searchCategories.classList.remove('_active');
				searchTitle.classList.remove('_active');
			} else {
				$('.search-page__categories').slideDown(400, 'swing');
				searchCategories.classList.add('_active');
				searchTitle.classList.add('_active');
			}
	});

	document.querySelector('body').addEventListener('click', function (event) {
		if (event.target.contains(searchCategories) & !event.target.classList.contains('search-page__categories') & searchCategories.classList.contains('_active')) {
			$('.search-page__categories').slideUp(400, 'swing');
			searchTitle.classList.remove('_active');
		}
		let closest = event.target.closest('input');
		let itemsProduct = document.querySelectorAll('.item-product');
		itemsProduct.forEach(function (item) {
			if (!item.contains(event.target)) {
				let productBodyS = item.querySelectorAll('.products-slider .item-product__body');
				productBodyS.forEach(function (product) {
					product.classList.remove('_active-hover');
				})
				let productHoverS = item.querySelectorAll('.hover-product');
				productHoverS.forEach(function (hover) {
					hover.classList.remove('_active-hover');
				})
			}
		})
		if (event.target.tagName !== 'INPUT') { return }
		let countChecked = document.querySelectorAll('input:checked').length;
		let titleSpan = searchTitle.querySelector('span');
		if (!countChecked == 0) {
			titleSpan.innerHTML = `Выбрано ${countChecked}`;
		} else {
			titleSpan.innerHTML = 'Везде';
		}
		if (event.target.contains(searchCategories) & searchCategories.classList.contains('_active')) {
			$('.search-page__categories').slideUp(400, 'swing');
			searchTitle.classList.remove('_active');
		}
	})

	const searchCheckboxes = document.querySelectorAll('.checkbox__text');

	searchCheckboxes.forEach(function (item) {
		item.onselectstart = () => false
	});




	function fontAwesomeIcons() {
		// attr: data-icon="icon,font-size,color"
		let icons = {
			like: '<i class="fas fa-thumbs-up"></i>',
			shopCart: '<i class="fas fa-shopping-cart"></i>',
			shopBasket: '<i class="fas fa-shopping-basket"></i>',
			arrowT: '<i class="fas fa-arrow-up"></i>',
			arrowR: '<i class="fas fa-arrow-right"></i>',
			arrowB: '<i class="fas fa-arrow-down"></i>',
			arrowL: '<i class="fas fa-arrow-left"></i>',
			doubleArrowL: '<i class="fas fa-angle-double-left"></i>',
			doubleArrowT: '<i class="fas fa-angle-double-up"></i>',
			doubleArrowR: '<i class="fas fa-angle-double-right"></i>',
			doubleArrowD: '<i class="fas fa-angle-double-down"></i>',
			search: '<i class="fas fa-search"></i>',
			userPlus: '<i class="fas fa-user-plus"></i>',
			signIn: '<i class="fas fa-sign-in-alt"></i>',
			email: '<i class="fas fa-envelope"></i>',
			phone: '<i class="fas fa-phone-alt"></i>'
		}
		let head = document.querySelector('head');
		let script = document.createElement('script');

		script.setAttribute('src', 'https://kit.fontawesome.com/254acde86d.js');
		script.setAttribute('crossorigin', 'anonymou');

		head.children[0].prepend(script);

		let itemsWithAttrIcon = document.querySelectorAll('[data-icon]');
		itemsWithAttrIcon.forEach(function (elem) {
			let attrValues = elem.dataset.icon.split(',');
			let attrIcon = {
				icon: attrValues[0],
				fz: attrValues[1],
				color: attrValues[2]
			}
			let needIcon = attrIcon['icon'];
			let parent = elem.parentElement;
			elem.outerHTML = icons[needIcon];
			let newElem = parent.querySelector('i');

			newElem.style.fontSize = attrIcon.fz;
			newElem.style.color = attrIcon.color;
		});
	};
	fontAwesomeIcons();



	const itemsProduct = document.querySelectorAll('.item-product');

	itemsProduct.forEach(function (item) {
		if (getPlatform() == 'Windows' || getPlatform() == 'Linux' || getPlatform() == 'Macintosh') {
			item.addEventListener('mouseenter', function (e) {
				let target = e.target;
				if (target.classList.contains('item-product')) {
					let productBody = target.querySelector('.products-slider .item-product__body');
					let productHover = target.querySelector('.hover-product');
					productBody.classList.add('_active-hover');
					productHover.classList.add('_active-hover');
				}
			});
			item.addEventListener('mouseleave', function (e) {
				let target = e.target;
				if (target.classList.contains('item-product')) {
					let productBody = target.querySelector('.products-slider .item-product__body');
					let productHover = target.querySelector('.hover-product');
					productBody.classList.remove('_active-hover');
					productHover.classList.remove('_active-hover');
				}
			});
		} else {
			item.addEventListener('click', function (e) {
				let target = e.target;
				if (item.contains(target)) {
					let productBody = item.querySelector('.products-slider .item-product__body');
					let productHover = item.querySelector('.hover-product');
					productBody.classList.toggle('_active-hover');
					productHover.classList.toggle('_active-hover');
				}
			});
		}
	});

	translateItems();

	function translateItems() {
		const productsItems = document.querySelectorAll('.products-slider__item');
		const productWrapper = document.querySelector('.products-slider__wrapper');

		productsItems.forEach(function (item) {
			if (viewportWidth < 621) {
				let productsRows = item.querySelectorAll('.item-products__row');
				if (productsRows.length > 1) {
					let newItem = document.createElement('div');
					let row = productsRows[1];
					newItem.classList.add('products-slider__item');
					newItem.classList.add('item-products');
					row.remove();
					newItem.append(row);
					productWrapper.append(newItem)
				}
			}
		});
	}

	const btnMoreBlockText = document.querySelector('.text-block__more-btn');
	const textsBlockMod = document.querySelectorAll('.text-block__mod');

	btnMoreBlockText.addEventListener('click', function () {
		textsBlockMod.forEach(function (text) {
			text.classList.toggle('_active')
		})
		btnMoreBlockText.classList.toggle('_active')

		if (btnMoreBlockText.classList.contains('_active')) {
			btnMoreBlockText.innerHTML = 'Закрыть';
		} else {
			btnMoreBlockText.innerHTML = 'Подробнее';
		}
	})

})










$(document).ready(function () {
	const sliderWrapper = document.querySelector('.products-slider__wrapper');
	const btnPrev = document.querySelector('.products-slider .control-slider__btn-prev');
	const btnNext = document.querySelector('.products-slider .control-slider__btn-next');
	const pageCurrent = document.querySelector('.control-slider__current');
	const pageTotal = document.querySelector('.control-slider__total');
	const wrapperWidth = getComputedStyle(sliderWrapper).width.split('p')[0];
	const countItem = document.querySelectorAll('.products-slider__item').length;
	const maxWidth = countItem * wrapperWidth - wrapperWidth;
	let oldTranslate = getComputedStyle(sliderWrapper).transform.split(',')
	let newTranslate = 0;
	sliderWrapper.style.transform = 'translateX(0px)';
	sliderWrapper.style.transition = 'all 0.6s ease 0s';

	pageTotal.innerHTML = countItem;

	btnNext.addEventListener('click', function () {
		if (maxWidth > -newTranslate) {
			newTranslate = newTranslate - wrapperWidth;
			sliderWrapper.style.transform = 'translate(' + newTranslate + 'px)';
		}
		let itemIndex = whatItem(newTranslate);
		pageCurrent.innerHTML = itemIndex + 1;
	});

	btnPrev.addEventListener('click', function () {
		if (newTranslate < 0) {
			newTranslate = parseFloat(newTranslate) + parseFloat(wrapperWidth);
			sliderWrapper.style.transform = 'translate(' + newTranslate + 'px)';
		}
		let itemIndex = whatItem(newTranslate);
		pageCurrent.innerHTML = itemIndex + 1;
	});

	function whatItem(newTranslate) {
		return -newTranslate / wrapperWidth;
	}
})
const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
let pegChildren;
let items = document.querySelectorAll('.spider__item');

const mySwiper = new Swiper('.spider', {
	loop: true,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		}
	},

	on: {
		init: function () {
			// if (viewportWidth < 991) { items[items.length - 1].remove() }
			// if (viewportWidth < 455) { items[items.length - 2].remove() }
		}
	}
})

if (viewportWidth < 455) { mySwiper.removeSlide(items.length - 1); }
if (viewportWidth < 991) { mySwiper.removeSlide(items.length - 2); }
pegChildren = document.querySelector('.swiper-pagination').children;
pegChildren[0].innerHTML = '1';


const swiperBrands = new Swiper('.brands-slider', {
	loop: true,
	slidesPerView: 1,
	slidesPerGroup: 1,
	speed: 800,
	spaceBetween: 20,
	navigation: {
		nextEl: '.brands-slider__next',
		prevEl: '.brands-slider__prev',
	},
	visibilityFullFit: true,
	breakpoints: {
		1100: {
			slidesPerView: 5,
			slidesPerGroup: 5,
			spaceBetween: 10,
		},
		900: {
			slidesPerView: 4,
			slidesPerGroup: 1,
			spaceBetween: 10,
		},
		736: {
			slidesPerView: 3,
			slidesPerGroup: 1,
			spaceBetween: 10,
		},
		500: {
			slidesPerView: 2,
			slidesPerGroup: 1,
			spaceBetween: 10,
		}
	}
})







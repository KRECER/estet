window.onload = function() {
  let tabsBtn = document.querySelectorAll('.tabs__btn'),
      tabsContent = document.querySelectorAll('.tabs__content');

  for (let i = 0; i < tabsBtn.length; i++) {
    tabsBtn[i].onclick = function() {
      for (let j = 0; j < tabsContent.length; j++) {
        tabsContent[j].classList.remove('tabs__content--show');
        tabsBtn[j].classList.remove('tabs__btn--active');
      }
      tabsContent[i].classList.add('tabs__content--show');
      tabsBtn[i].classList.add('tabs__btn--active');
    }
  }

  $('.pages__list').slick({
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 1,
    mobileFirst: true,
    arrows: false,
    dots: true,
    prevArrow: '<button type="button" class="pages__btn-prev slick-prev">Previous</button>',
    nextArrow: '<button type="button" class="pages__btn-next slick-next">Next</button>',
    responsive: [
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px'
        }
      },
      {
        breakpoint: 768,
        settings: {
					slidesToShow: 3,
          sliderToScroll: 3,
          arrows: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
					slidesToShow: 3,
          centerPadding: '200px',
          arrows: true
        }
      }
    ]
  });

  $('.promo__list').slick({
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 1,
    mobileFirst: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px'
        }
      },
      {
        breakpoint: 768,
        settings: 'unslick'
      }
    ]
  });

  $('.seo__list').slick({
    slidesToShow: 1,
    mobileFirst: true,
    arrows: false,
    dots: true,
    prevArrow: '<button type="button" class="seo__btn-prev slick-prev">Previous</button>',
    nextArrow: '<button type="button" class="seo__btn-next slick-next">Next</button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          dots: false
        }
      }
    ]
  });

  $('.advantages__list').slick({
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 1,
    mobileFirst: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: 'unslick'
      }
    ]
  });

  $('.opportunities__list').slick({
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 1,
    dots: true,
    mobileFirst: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: 'unslick'
      }
    ]
	});
	
	$('.services__list').slick({
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 1,
    mobileFirst: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px'
        }
      },
      {
        breakpoint: 768,
        settings: 'unslick'
      }
    ]
  });
};
// header
$(function () {
  // 윈도우 스크롤 시 실행
  $(window).scroll(function () {
    // 스크롤이 100px을 넘으면,
    if ($(this).scrollTop() > 30) {
      // .header_scrolled 클래스가 추가
      $(".header").addClass("header_scrolled");
    } else {
      // 스크롤이 위로 올라가면 클래스 제거
      $(".header").removeClass("header_scrolled");
    }
  });
});


// 스크롤
$(document).ready(function () {

  const navLinks = $('.gnb a');
  const sections = $('[id]'); // 각 섹션들

  // 1. 클릭했을 때 active
  navLinks.on('click', function (e) {
    e.preventDefault();

    const target = $(this).attr('href');
    const offset = $(target).offset().top;

    $('html, body').animate({
      scrollTop: offset
    }, 500);

    navLinks.removeClass('active');
    $(this).addClass('active');
  });

  // 2. 스크롤 시 active 자동 변경
  $(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop();

    sections.each(function () {
      const top = $(this).offset().top - 100; // 헤더 높이 보정
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.removeClass('active');
        $('.gnb a[href="#' + id + '"]').addClass('active');
      }
    });
  });

});


const modal = document.getElementById("videoModal");
const videoArea = modal.querySelector(".video_area");
const closeBtn = modal.querySelector(".close_btn");

// 슬라이드 클릭
document.querySelectorAll(".video_slide").forEach((slide) => {
  slide.addEventListener("click", function () {
    const videoSrc = this.querySelector("video").getAttribute("src");

    // 모달에 영상 넣기
    videoArea.innerHTML = `
            <video src="${videoSrc}" controls autoplay></video>
        `;

    modal.classList.add("active");
  });
});

// 닫기 버튼
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  videoArea.innerHTML = ""; // 영상 제거 (재생 멈춤)
});

// 배경 클릭 시 닫기
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    videoArea.innerHTML = "";
  }
});
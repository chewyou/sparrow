import $ from '../jquery-2.1.4';

export default function () {
    $(window).load(() => {

        $('.mobile-nav').on("click", function () {
            $(this).children('.nav-menu').toggleClass('is-open');
        });

        $(document).click((e) => {
            if (!$('.nav-menu').is(e.target) && $('.nav-menu').has(e.target).length === 0) {
                if (!$('.mobile-nav').is(e.target) && $('.mobile-nav').has(e.target).length === 0) {
                    $('.nav-menu').removeClass('is-open');
                }
            }
        })
    });
}
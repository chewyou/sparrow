import $ from 'jquery';

export default function () {
    $(window).load(() => {

        $('.volcano-image').on("click", function () {
            console.log("open");
            $(this).next().addClass('is-active');
        });

        $('.modal-close').on("click", function () {
            $(this).parent().removeClass('is-active');
        });

    });
}
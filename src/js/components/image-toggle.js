import $ from '../jquery-2.1.4';

export default function () {
    $(window).load(() => {

        $('.volcano-image').on("click", function () {
            $(this).next().addClass('is-active');
        });

        $('.modal-close').on("click", function () {
            $(this).parent().removeClass('is-active');
        });

    });
}
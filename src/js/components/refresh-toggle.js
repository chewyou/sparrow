import $ from '../jquery-2.1.4';

export default function () {
    $(window).load(() => {

        $('.refresh').on("click", function () {
            location.reload();
        });

    });
}
(function () {
})(window.jQuery);

jQuery(function ($) {
        "use strict";

        function openModal() {
            $('.volcano-image').on("click", function () {
                $(this).next().addClass('is-active');
            });
        }

        function closeModal() {
            $('.modal-close').on("click", function () {
                $(this).parent().removeClass('is-active');
            });
        }

        $(document).ready(function () {
            openModal();
            closeModal();
        });
    }
);

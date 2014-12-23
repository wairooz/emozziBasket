$(document).ready(function(){
    $('select').select2({
        minimumResultsForSearch: -1
    });

    goodsPack.init();
});

var goodsPack = {
    init: function() {
        // binding
        $('.good_pack_button_to_open').on('click', goodsPack.handleOpen);
        $('.good_pack_button_to_close').on('click', goodsPack.handleClose);
        $('.goods_pack_select_button').on('click', goodsPack.handleChoosePack);
        $('.good_pack_button_to_cancel').on('click', goodsPack.handleUnpack);
        $('.arrow_right').on('click', goodsPack.handleScrollNext);
        $('.arrow_left').on('click', goodsPack.handleScrollPrev);

        // preparations
        goodsPack._preparePackSliderWidth();
    },

    handleOpen: function() {
        $(this).parents('.goods_pack_block').addClass('open');
        return false;
    },

    handleClose: function() {
        $(this).parents('.goods_pack_block').removeClass('open');
        return false;
    },

    handleChoosePack: function() {
        $(this).parents('.goods_pack_block')
            .removeClass('open')
            .addClass('done');
        return false;
    },

    handleUnpack: function() {
        if (confirm(goodsPack.CONST.unpack)) {
            $(this).parents('.goods_pack_block')
                .removeClass('open')
                .removeClass('done');
        }
    },

    handleScrollNext: function() {
        if (!$(this).is('.disabled')) {
            var el = $(this).parents('.goods_pack_slider_block').find('.goods_pack_slider_img_wrap'),
                width = el.width(),
                left = el.position().left;

            if (!el.is(':animated')) {
                el.animate({
                    left: "-=" + goodsPack.CONST.packImgWidth + "px"
                }, {
                    duration: 200,
                    complete: function() {
                        el.attr('data-visible', parseInt(el.attr('data-visible')) + 1);
                        goodsPack._setScrollIconsVisibility(el);
                    }
                });
            }
        }
    },

    handleScrollPrev: function() {
        if (!$(this).is('.disabled')) {
            var el = $(this).parents('.goods_pack_slider_block').find('.goods_pack_slider_img_wrap'),
                width = el.width(),
                left = el.position().left;

            if (!el.is(':animated')) {
                el.animate({
                    left: "+=" + goodsPack.CONST.packImgWidth + "px"
                }, {
                    duration: 200,
                    complete: function() {
                        el.attr('data-visible', parseInt(el.attr('data-visible')) - 1);
                        goodsPack._setScrollIconsVisibility(el);
                    }
                });
            }
        }
    },


    _setScrollIconsVisibility: function(element) {
        if (typeof(element) !== "undefined") {
            var width = element.width(),
                left = element.position().left,
                el = element.parents('.goods_pack_slider_block');

            if (Math.abs(left - goodsPack.CONST.packImgWidth) >= width) {
                el.find('.arrow_right')
                    .addClass('disabled');
            } else {
                el.find('.arrow_right')
                    .removeClass('disabled');
            }

            if (left + goodsPack.CONST.packImgWidth > 0) {
                el.find('.arrow_left')
                    .addClass('disabled');
            } else {
                el.find('.arrow_left')
                    .removeClass('disabled');
            }

            el.parents('.pack_view_block')
                .find('.goods_pack_price')
                    .text(element.find('img:eq('+element.attr('data-visible')+')').attr('data-price'));
        }
    },

    _preparePackSliderWidth: function() {
        $('.goods_pack_slider_img_wrap').each(function() {
            var el = $(this);
            el.attr('data-count', el.find('img').length)
                .attr('data-selected', 0)
                .attr('data-visible', 0)
                .width(el.attr('data-count') * goodsPack.CONST.packImgWidth);
            goodsPack._setScrollIconsVisibility(el);
        });
    },

    CONST: {
        unpack: 'are you sure you want to unpack ticket?',
        packImgWidth: 178
    }
}
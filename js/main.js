// js cố định sidebar khi cuộn trang
! function(i) {
    i.fn.theiaStickySidebar = function(t) {
        function e(t, e) {
            return !0 === t.initialized || !(i("body").width() < t.minWidth) && (function(t, e) {
                t.initialized = !0, 0 === i("#theia-sticky-sidebar-stylesheet-" + t.namespace).length && i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-' + t.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')), e.each(function() {
                    function e() {
                        a.fixedScrollTop = 0, a.sidebar.css({
                            "min-height": "1px"
                        }), a.stickySidebar.css({
                            position: "static",
                            width: "",
                            transform: "none"
                        })
                    }
                    var a = {};
                    if (a.sidebar = i(this), a.options = t || {}, a.container = i(a.options.containerSelector), 0 == a.container.length && (a.container = a.sidebar.parent()), a.sidebar.parents().css("-webkit-transform", "none"), a.sidebar.css({
                            position: a.options.defaultPosition,
                            overflow: "visible",
                            "-webkit-box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "box-sizing": "border-box"
                        }), a.stickySidebar = a.sidebar.find(".theiaStickySidebar"), 0 == a.stickySidebar.length) {
                        var n = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                        a.sidebar.find("script").filter(function(i, t) {
                            return 0 === t.type.length || t.type.match(n)
                        }).remove(), a.stickySidebar = i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()), a.sidebar.append(a.stickySidebar)
                    }
                    a.marginBottom = parseInt(a.sidebar.css("margin-bottom")), a.paddingTop = parseInt(a.sidebar.css("padding-top")), a.paddingBottom = parseInt(a.sidebar.css("padding-bottom"));
                    var s = a.stickySidebar.offset().top,
                        r = a.stickySidebar.outerHeight();
                    a.stickySidebar.css("padding-top", 1), a.stickySidebar.css("padding-bottom", 1), s -= a.stickySidebar.offset().top, r = a.stickySidebar.outerHeight() - r - s, 0 == s ? (a.stickySidebar.css("padding-top", 0), a.stickySidebarPaddingTop = 0) : a.stickySidebarPaddingTop = 1, 0 == r ? (a.stickySidebar.css("padding-bottom", 0), a.stickySidebarPaddingBottom = 0) : a.stickySidebarPaddingBottom = 1, a.previousScrollTop = null, a.fixedScrollTop = 0, e(), a.onScroll = function(a) {
                        if (a.stickySidebar.is(":visible")) {
                            if (i("body").width() < a.options.minWidth) return void e();
                            if (a.options.disableOnResponsiveLayouts) {
                                var n = a.sidebar.outerWidth("none" == a.sidebar.css("float"));
                                if (n + 50 > a.container.width()) return void e()
                            }
                            var s = i(document).scrollTop(),
                                r = "static";
                            if (s >= a.sidebar.offset().top + (a.paddingTop - a.options.additionalMarginTop)) {
                                var d, c = a.paddingTop + t.additionalMarginTop,
                                    p = a.paddingBottom + a.marginBottom + t.additionalMarginBottom,
                                    b = a.sidebar.offset().top,
                                    l = a.sidebar.offset().top + function(t) {
                                        var e = t.height();
                                        return t.children().each(function() {
                                            e = Math.max(e, i(this).height())
                                        }), e
                                    }(a.container),
                                    f = 0 + t.additionalMarginTop,
                                    h = a.stickySidebar.outerHeight() + c + p < i(window).height();
                                d = h ? f + a.stickySidebar.outerHeight() : i(window).height() - a.marginBottom - a.paddingBottom - t.additionalMarginBottom;
                                var g = b - s + a.paddingTop,
                                    u = l - s - a.paddingBottom - a.marginBottom,
                                    S = a.stickySidebar.offset().top - s,
                                    y = a.previousScrollTop - s;
                                "fixed" == a.stickySidebar.css("position") && "modern" == a.options.sidebarBehavior && (S += y), "stick-to-top" == a.options.sidebarBehavior && (S = t.additionalMarginTop), "stick-to-bottom" == a.options.sidebarBehavior && (S = d - a.stickySidebar.outerHeight()), S = y > 0 ? Math.min(S, f) : Math.max(S, d - a.stickySidebar.outerHeight()), S = Math.max(S, g), S = Math.min(S, u - a.stickySidebar.outerHeight());
                                var m = a.container.height() == a.stickySidebar.outerHeight();
                                r = !m && S == f || !m && S == d - a.stickySidebar.outerHeight() ? "fixed" : s + S - a.sidebar.offset().top - a.paddingTop <= t.additionalMarginTop ? "static" : "absolute"
                            }
                            if ("fixed" == r) {
                                var k = i(document).scrollLeft();
                                a.stickySidebar.css({
                                    position: "fixed",
                                    width: o(a.stickySidebar) + "px",
                                    transform: "translateY(" + S + "px)",
                                    left: a.sidebar.offset().left + parseInt(a.sidebar.css("padding-left")) - k + "px",
                                    top: "0px"
                                })
                            } else if ("absolute" == r) {
                                var v = {};
                                "absolute" != a.stickySidebar.css("position") && (v.position = "absolute", v.transform = "translateY(" + (s + S - a.sidebar.offset().top - a.stickySidebarPaddingTop - a.stickySidebarPaddingBottom) + "px)", v.top = "0px"), v.width = o(a.stickySidebar) + "px", v.left = "", a.stickySidebar.css(v)
                            } else "static" == r && e();
                            "static" != r && 1 == a.options.updateSidebarHeight && a.sidebar.css({
                                "min-height": a.stickySidebar.outerHeight() + a.stickySidebar.offset().top - a.sidebar.offset().top + a.paddingBottom
                            }), a.previousScrollTop = s
                        }
                    }, a.onScroll(a), i(document).on("scroll." + a.options.namespace, function(i) {
                        return function() {
                            i.onScroll(i)
                        }
                    }(a)), i(window).on("resize." + a.options.namespace, function(i) {
                        return function() {
                            i.stickySidebar.css({
                                position: "static"
                            }), i.onScroll(i)
                        }
                    }(a)), "undefined" != typeof ResizeSensor && new ResizeSensor(a.stickySidebar[0], function(i) {
                        return function() {
                            i.onScroll(i)
                        }
                    }(a))
                })
            }(t, e), !0)
        }

        function o(i) {
            var t;
            try {
                t = i[0].getBoundingClientRect().width
            } catch (i) {}
            return void 0 === t && (t = i.width()), t
        }
        return (t = i.extend({
                containerSelector: "",
                additionalMarginTop: 0,
                additionalMarginBottom: 0,
                updateSidebarHeight: !0,
                minWidth: 0,
                disableOnResponsiveLayouts: !0,
                sidebarBehavior: "modern",
                defaultPosition: "relative",
                namespace: "TSS"
            }, t)).additionalMarginTop = parseInt(t.additionalMarginTop) || 0, t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0,
            function(t, o) {
                e(t, o) || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."), i(document).on("scroll." + t.namespace, function(t, o) {
                    return function(a) {
                        e(t, o) && i(this).unbind(a)
                    }
                }(t, o)), i(window).on("resize." + t.namespace, function(t, o) {
                    return function(a) {
                        e(t, o) && i(this).unbind(a)
                    }
                }(t, o)))
            }(t, this), this
    }
}(jQuery), $(".sidebar-wrapper, .main-wrapper").each(function() {
    $(this).theiaStickySidebar()
});
// show dropdown menu
$(".dropdown").on("show.bs.dropdown", function(o) {
    $(this).find(".dropdown-menu").first().stop(!0, !0).slideDown()
}), $(".dropdown").on("hide.bs.dropdown", function(o) {
    $(this).find(".dropdown-menu").first().stop(!0, !0).slideUp()
});
// Back to top button
$(function() {
    $(window).scroll(function() {
        $(this).scrollTop() > 500 ? $(".backtotop").addClass('arlniainf') : $(".backtotop").removeClass('arlniainf')
    }), $(".backtotop").click(function() {
        return $("html,body").animate({
            scrollTop: 0
        }, 500), !1
    })
});
// tooltip bootstrap
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});
// console
console.log('%cTrang web được thiết kế bởi Nguyễn Tỉnh\nMột cậu sinh viên có vẻ ngoài đẹp trai, hiền lành, tốt bụng và điều đặc biệt quan trọng và cậu ta chưa có...%cNGƯỜI YÊU!', 'font-family:"Roboto Slab", serif;font-size:30px;color:#000', 'font-family:"Roboto Slab", serif;font-size:30px;color:red');
// preload
window.addEventListener('load', function() {
    document.getElementById('af-preloader').style.display = 'none'
});
$(window).on('load', function() {
    $('#af-preloader').delay(500).fadeOut('slow')
});
// time
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
document.getElementById("time-now").innerHTML = formatAMPM(new Date);
n = new Date();
if (n.getTimezoneOffset() == 0) t = n.getTime() + (7 * 60 * 60 * 1000);
else t = n.getTime();
n.setTime(t);
d = n.getDay();
m = n.getMonth() + 1;
y = n.getFullYear()
var day_name = '';
var mon_name = '';
switch (d) {
    case 0:
    day_name = "Sunday";
    break;
    case 1:
    day_name = "Monday";
    break;
    case 2:
    day_name = "Tuesday";
    break;
    case 3:
    day_name = "Wednesday";
    break;
    case 4:
    day_name = "Thursday";
    break;
    case 5:
    day_name = "Friday";
    break;
    case 6:
    day_name = "Saturday";
    break;
}
switch (m) {
    case 1:
    mon_name = "January";
    break;
    case 2:
    mon_name = "February";
    break;
    case 3:
    mon_name = "March";
    break;
    case 4:
    mon_name = "April";
    break;
    case 5:
    mon_name = "May";
    break;
    case 6:
    mon_name = "June";
    break;
    case 7:
    mon_name = "July";
    break;
    case 8:
    mon_name = "August";
    break;
    case 9:
    mon_name = "September";
    break;
    case 10:
    mon_name = "October";
    break;
    case 11:
    mon_name = "November";
    break;
    case 12:
    mon_name = "December";
    break;
}
document.getElementById("calendar").innerHTML = (day_name + ", " + mon_name + " " + (n.getDate() < 10 ? "0" : "") + n.getDate() + ", " + y);
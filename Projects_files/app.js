$(window).bind("load", function () {
    var footer = $("#footer");
    var pos = footer.position();
    var height = $(window).height();
    height = height - pos.top;
    height = height - footer.height();
    if (height > 0) {
        footer.css({
            'margin-top': height - 27 + 'px'
        });
    }
});
/***********************************************
 * Easy Email Scrambler script- © Dynamic Drive (www.dynamicdrive.com)
 * This notice MUST stay intact for legal use
 * Visit http://www.dynamicdrive.com/ for full source code
 ***********************************************/

var maildivider = "[at]" //enter divider you use to divide your email address strings

for (i = 0; i <= (document.links.length - 1); i++) {
    if (document.links[i].href.indexOf(maildivider) != -1)
        document.links[i].href = document.links[i].href.split(maildivider)[0] + "@" + document.links[i].href.split(maildivider)[1]
}
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-26548637-2', 'auto');
ga('send', 'pageview');

$(document).foundation();
$('a').smoothScroll();
$(".drawer").click(function () {
    $("#portfolio-menu").slideToggle(300);
    $("#portfolio-nav").fadeToggle("slow", "linear");
    $(".project-title h3").fadeToggle("medium", "linear");
    $(this).text($(this).text() == 'Portfolio' ? 'Close' : 'Portfolio');
});

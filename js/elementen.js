var version = 'v0.1.h - 19-01-2018';



$(document).ready(function() {
    $('#version').html(version);

    var itemBgColors = ['#fff', '#cf9', '#3c3', '#58f', '#58f', '#b8d', '#f55', '#f83', '#fb6', '#66a6ff', '#88c0ff'];
    var periodeSelected = [0, 1, 1, 1, 1, 1, 1, 1];


    // + + + + + + + + + + user-interaction + + + + + + + + + +
    $('#systeemBox td').on('click', function(evt) {
        /*
        	click-events inside the periodic system
        		show the info-box with information
        	params
        		evt: object - mouse-event
        */
        var itemGroep = this; // td
        var item = itemGroep.parentNode; // tr
        var itemId = itemGroep.getAttribute('id'); // atoomnummer
        var itemClass = itemGroep.getAttribute('class'); // class-info
        var groepRow = parseInt(itemClass.substr(7)); // groep-nummer
        var typeNum = parseInt(itemClass.substr(4, 1)); // type element
        var element = elementObj[itemId]; // element naam


        $('.el div:first-child').css({ 'color': '#fff' });

        if (parseInt(itemId) > 0) { // + + + + + element clicked + + + + +
            var periodeId = item.getAttribute('id'); // periode-info
            var periode = parseInt(periodeId.substr(7)); // periode
            if (periode > 7) {
                periode -= 2;
            }
            var position = { x: evt.pageX, y: evt.pageY };
            var infoStr = '<span class="grey">Atoonnummer:</span> ' + itemId + '<br><span class="grey">Element:</span> ' + element;
            infoStr += '<br><span class="grey">Periode:</span> ' + periode + ' - <span class="grey">Groep:</span> ' + groepRow;
            showMessage(infoStr, position, itemId, groepRow);

            console.log('element clicked', periodeId, periode, groepRow)
        } else {
            var periode = itemClass.substr(6, 2);
            if (periode.substr(0, 1) == 'p') { // + + + + + periode-num clicked + + + + +
                periode = parseInt(periode.substr(1, 1));
                var periodeId = 'periode' + periode;

                if (periodeSelected[periode] < 1) {
                    $('tr#' + periodeId).css('opacity', 1);
                    periodeSelected[periode] = 1;
                    if (periode == 6) {
                        $('tr#periode8').css('opacity', 1);
                    } else if (periode == 7) {
                        $('tr#periode9').css('opacity', 1);
                    }
                } else {
                    $('tr#' + periodeId).css('opacity', 0.3);
                    periodeSelected[periode] = 0;
                    if (periode == 6) {
                        $('tr#periode8').css('opacity', 0.3);
                    } else if (periode == 7) {
                        $('tr#periode9').css('opacity', 0.3);
                    }
                }

                console.log('periode', periode, item, periodeId, periodeSelected);
            } else {
                var groep = parseInt(evt.target.innerHTML);
                var hoofdGroep = evt.target.innerHTML;
                // if (isNaN(itemId)) {
                // 	var periodeId = item.getAttribute('id');		// periode-info
                // 	var periode = parseInt(periodeId.substr(7));	// periode
                // 	if (periode > 7) {
                // 		periode-= 2;
                // 	}
                // 	console.log('is periode?', periodeId, periode)
                // }

                var position = { x: evt.pageX, y: evt.pageY }
                var formaat = { w: 80, h: 22 }
                if (groep > 0) { // + + + + + groep clicked + + + + +
                    if (parseFloat($('td.el.g' + groep).css('opacity')) < 1) {
                        $('td.el.g' + groep).css('opacity', 1);
                        if (groep == 3) {
                            $('td.el.g' + groep + '0').css('opacity', 1);
                            $('td.el.g' + groep + '1').css('opacity', 1);
                        }
                    } else {
                        $('td.el.g' + groep).css('opacity', 0.3);
                        if (groep == 3) {
                            $('td.el.g' + groep + '0').css('opacity', 0.3);
                            $('td.el.g' + groep + '1').css('opacity', 0.3);
                        }
                    }

                    console.log('groep TODO', groep);
                } else if (isNaN(groep)) { // + + + + + hoofdgroep clicked + + + + +
                    if (hoofdGroep == 'Lant.') {
                        if (parseFloat($('td.el.g30').css('opacity')) < 1) {
                            $('td.el.g30').css('opacity', 1);
                        } else {
                            $('td.el.g30').css('opacity', 0.3);
                        }
                    } else if (hoofdGroep == 'Acti.') {
                        if (parseFloat($('td.el.g31').css('opacity')) < 1) {
                            $('td.el.g31').css('opacity', 1);
                        } else {
                            $('td.el.g31').css('opacity', 0.3);
                        }
                    }
                    console.log('hoofd-groep TODO ' + hoofdGroep)
                }
            }

            //showMessage(infoStr,position, formaat);
        }


        //console.log('click', itemGroep, item, 'atoomnr: '+itemId, itemClass, 'periode: '+periode, 'groep: '+groepRow, 'type-num: '+typeNum, elementObj[itemId]);
    })

    $('#types').on('click', function(evt) {
        /*
        	click-events inside the types (Alkali metalen, enz.)
        		hide/show the selected type in the system
        	params
        		evt: object - mouse-event
        */
        var type = evt.target.getAttribute('class');
        if (type == 'typeRegel') {
            type = evt.target.firstElementChild.getAttribute('class').substr(8);
        } else {
            type = evt.target.getAttribute('class').substr(8);
        }

        var typeEl = $('td.el.' + type);
        var tmpEl = typeEl[1].getAttribute('style');
        if (tmpEl != null) {
            tmpEl = parseInt(tmpEl.substr(8));
        }
        if (tmpEl == 0) {
            typeEl.css('opacity', 1);
        } else {
            typeEl.css('opacity', 0.3);
        }
        console.log('typeRegel', evt, type, typeEl, tmpEl);
    })


    $('#infoBox').on('click', function() {
        /*
        	click-events inside the info-box
        		hide info-box
        */
        $('#infoBox').fadeOut(500);
    })

    $('input[type=checkbox]').on('change', function(evt) {
        /*
        	click-events inside checboxes under the system
        		disable/enabale selected item
        	params
        		evt: object - mouse-event
        */
        var item = evt.target;
        var itemId = item.getAttribute('id');
        var itemClass = item.getAttribute('class');
        var itemVal = $(this).is(':checked');

        $('.el div:first-child').css({ 'color': '#fff' });

        if (itemId == 'setNum') { // + + + + + setNum checkbox + + + + +
            if (itemVal) {
                $('.el div:first-child').show();
                $('.el div:nth-child(2)').css({ 'margin-top': '0' });
            } else {
                $('.el div:first-child').hide();
                $('.el div:nth-child(2)').css({ 'margin-top': '1px' });
            }
        } else if (itemId == 'setSymbol') { // + + + + + setSymbol checkbox + + + + +
            if (itemVal) {
                $('.el div:nth-child(2)').show();
                $('.el div:first-child').css({ 'margin-top': '-8px' });
                $('.el.t0').css('opacity', 1);
            } else {
                $('.el div:nth-child(2)').hide();
                $('.el div:first-child').css({ 'margin-top': '-21px' });
                $('.el.t0').css('opacity', 0);
            }
        } else if (itemId == 'setColor') { // + + + + + setColor checkbox + + + + +
            if (itemVal) {
                for (var i = 1; i < 11; i++) {
                    $('td.t' + i).css('background', itemBgColors[i]);
                }
                $('.el div:first-child').css({ 'color': '#fff' });
                $('.el.t0.lant').css({ 'color': '#66a6ff', 'borderColor': '#66a6ff' });
                $('.el.t0.acti').css({ 'color': '#88c0ff', 'borderColor': '#88c0ff' });
            } else {
                $('td.el').css('background', '#fff');
                $('.el div:first-child').css({ 'color': '#999' });
                $('.el.t0').css({ 'color': '#ccc', 'borderColor': '#ccc' });
            }
        } else if (itemId == 'doGroep') { // + + + + + doGroep checkbox + + + + +
            if (itemVal) {
                $('td.el').css('opacity', 1);
            } else {
                $('td.el').css('opacity', 0.3);
            }
        } else if (itemId == 'doPeriode') { // + + + + + doP{eriode} checkbox + + + + +
            if (itemVal) {
                periodeSelected = [0, 1, 1, 1, 1, 1, 1, 1];
                for (var i = 1; i < 10; i++) {
                    $('tr#periode' + i).css('opacity', 1);
                }
            } else {
                periodeSelected = [0, 0, 0, 0, 0, 0, 0, 0];
                for (var i = 1; i < 10; i++) {
                    $('tr#periode' + i).css('opacity', 0.3);
                }
            }
        } else if (itemId == 'doType') { // + + + + + doType checkbox + + + + +
            if (itemVal) {
                $('td.el').css('opacity', 1);
            } else {
                $('td.el').css('opacity', 0.3);
            }
        } else if (itemId == 'doSymbol') { // + + + + + doSymbol checkbox + + + + +
            if (itemVal) {

            } else {

            }
        }

        console.log('set do', itemId, itemVal, itemClass);
    })

    // + + + + + + + + + + functions + + + + + + + + + +
    function showMessage(msg, pos, atomNr, grpRow) {
        /*
        	show infobox
        		display information on selected element
        	params
        		msg: string - informatie
        		pos: object - x- en y-mouse coördinaten
        		atomNr: str - atoomnummer
        		grpRow: int - groep-nummer
        */
        if (grpRow < 13) { // right side infobox
            var posX = pos.x;
        } else { // left-sided infobox
            var posX = pos.x - 320;
            if (atomNr == '57' || atomNr == '89') {
                posX += 44;
            }
        }
        var posY = pos.y - 20

        var formaat = { w: 320, h: 92 };

        $('#infoBox').css({ 'top': posY + 'px', 'left': posX + 'px', 'width': formaat.w, 'height': formaat.h });
        $('#infoBox').show().html(msg);
        $('#infoBox').delay(2000).fadeOut(500);
        setTimeout(function() { $("#infoBox").fadeOut(500); }, 5000);
        //console.log('showMessage',msg, pos, atomNr, posX);
    }

    function hideInfoBox() {
        /*
        	hide infobox
        		fadeout in 500ms
        */
        $('#infoBox').fadeOut(500);
    }
});
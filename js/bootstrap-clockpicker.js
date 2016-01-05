function clockMySUN()
{
	var $ = window.jQuery,
		$win = $(window),
		$doc = $(document),
		$body;
	var hActuelle = Dedicace._json_hour[0].rowheures;
	var minActuelle = Dedicace._json_min[0].minutes;
	
	var heureActuelle = hActuelle+':'+minActuelle;
	console.log(heureActuelle);
	
	var minSelect = '';
	var hSelect = '';
	
	var Hblock = new Array();
	
	var hBefore = hActuelle;
	
	var tableauMinutesPerH = new Array();
	tableauMinutesPerH = ['','','','','','','','','','','',''];
	
	var tableauMinutesPerH2 = new Array();
	tableauMinutesPerH2 = ['','','','','','','','','','','',''];

	// Can I use inline svg ?
	var svgNS = 'http://www.w3.org/2000/svg',
		svgSupported = 'SVGAngle' in window && (function(){
			var supported,
				el = document.createElement('div');
			el.innerHTML = '<svg/>';
			supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
			el.innerHTML = '';
			return supported;
		})();

	// Can I use transition ?
	var transitionSupported = (function(){
		var style = document.createElement('div').style;
		return 'transition' in style ||
			'WebkitTransition' in style ||
			'MozTransition' in style ||
			'msTransition' in style ||
			'OTransition' in style;
	})();

	// Listen touch events in touch screen device, instead of mouse events in desktop.
	var touchSupported = 'ontouchstart' in window,
		mousedownEvent = 'mousedown' + ( touchSupported ? ' touchstart' : ''),
		mousemoveEvent = 'mousemove.clockpicker' + ( touchSupported ? ' touchmove.clockpicker' : ''),
		mouseupEvent = 'mouseup.clockpicker' + ( touchSupported ? ' touchend.clockpicker' : '');

	// Vibrate the device if supported
	var vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

	function createSvgElement(name) {
		return document.createElementNS(svgNS, name);
	}

	function leadingZero(num) {
		return (num < 10 ? '0' : '') + num;
	}

	// Get a unique id
	var idCounter = 0;
	function uniqueId(prefix) {
		var id = ++idCounter + '';
		return prefix ? prefix + id : id;
	}

	// Clock size
	var dialRadius = 100,
		outerRadius = 80,
		// innerRadius = 80 on 12 hour clock
		innerRadius = 54,
		tickRadius = 13,
		diameter = dialRadius * 2,
		duration = transitionSupported ? 350 : 1;

	// Popover template
	var tpl = [
		'<div id="popoverRoue" class="popover clockpicker-popover">',
			'<!--<div class="arrow"></div>-->',
			'<!--<div class="popover-title">',
				'<span class="text-primary">Aujourd\'hui</span>',
			'</div>-->',
			'<div class="popover-title">',
				'<span class="clockpicker-span-hours text-primary"></span>',
				' : ',
				'<span class="clockpicker-span-minutes"></span>',
				'<span class="clockpicker-span-am-pm"></span>',
			'</div>',
			'<div class="popover-content">',
				'<div class="clockpicker-plate">',
					'<div class="clockpicker-canvas"></div>',
					'<div class="clockpicker-dial clockpicker-hours"></div>',
					'<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>',
				'</div>',
				'<span class="clockpicker-am-pm-block">',
				'</span>',
			'</div>',
		'</div>'
	].join('');

	// ClockPicker
	function ClockPicker(element, options) {
		var popover = $(tpl),
			plate = popover.find('.clockpicker-plate'),
			hoursView = popover.find('.clockpicker-hours'),
			minutesView = popover.find('.clockpicker-minutes'),
			amPmBlock = popover.find('.clockpicker-am-pm-block'),
			isInput = element.prop('tagName') === 'INPUT',
			input = isInput ? element : element.find('input'),
			addon = element.find('.input-group-addon'),
			self = this,
			timer;

		this.id = uniqueId('cp');
		this.element = element;
		this.options = options;
		this.isAppended = false;
		this.isShown = false;
		this.currentView = 'hours';
		this.isInput = isInput;
		this.input = input;
		this.addon = addon;
		this.popover = popover;
		this.plate = plate;
		this.hoursView = hoursView;
		this.minutesView = minutesView;
		this.amPmBlock = amPmBlock;
		this.spanHours = popover.find('.clockpicker-span-hours');
		this.spanMinutes = popover.find('.clockpicker-span-minutes');
		this.spanAmPm = popover.find('.clockpicker-span-am-pm');
		this.amOrPm = "PM";
		
		document.getElementById("imagePochette").innerHTML="";
		document.getElementById("imagePochette").style.display="none";
		document.getElementById("titreSelectDedi").innerHTML="---";
		document.getElementById("titreSelectDedi").style.color="white"; 
		
		// Setup for for 12 hour clock if option is selected
		if (options.twelvehour) {
			
			var  amPmButtonsTemplate = ['<div class="clockpicker-am-pm-block">',
				'<button type="button" class="btn btn-sm btn-default clockpicker-button clockpicker-am-button">',
				'AM</button>',
				'<button type="button" class="btn btn-sm btn-default clockpicker-button clockpicker-pm-button">',
				'PM</button>',
				'</div>'].join('');
			
			var amPmButtons = $(amPmButtonsTemplate);
			//amPmButtons.appendTo(plate);
			
			////Not working b/c they are not shown when this runs
			//$('clockpicker-am-button')
			//    .on("click", function() {
			//        self.amOrPm = "AM";
			//        $('.clockpicker-span-am-pm').empty().append('AM');
			//    });
			//    
			//$('clockpicker-pm-button')
			//    .on("click", function() {
			//         self.amOrPm = "PM";
			//        $('.clockpicker-span-am-pm').empty().append('PM');
			//    });
	
			$('<button type="button" class="btn btn-sm btn-default clockpicker-button am-button">' + "AM" + '</button>')
				.on("click", function() {
					self.amOrPm = "AM";
					$('.clockpicker-span-am-pm').empty().append('AM');
				}).appendTo(this.amPmBlock);
				
				
			$('<button type="button" class="btn btn-sm btn-default clockpicker-button pm-button">' + "PM" + '</button>')
				.on("click", function() {
					self.amOrPm = 'PM';
					$('.clockpicker-span-am-pm').empty().append('PM');
				}).appendTo(this.amPmBlock);
				
		}
		
		if (! options.autoclose) {
			// If autoclose is not setted, append a button
			/*$('<button type="button" id="boutonEnvoiMySUN" class="btn-block clockpicker-button">' + options.donetext + '</button>')
				.click($.proxy(this.done, this))
				.appendTo(popover);*/
			/*$('<button type="button" class="btn btn-sm btn-default btn-block clockpicker-button">' + options.donetext + '</button>').appendTo(popover);*/
		}

		// Placement and arrow align - make sure they make sense.
		if ((options.placement === 'top' || options.placement === 'bottom') && (options.align === 'top' || options.align === 'bottom')) options.align = 'left';
		if ((options.placement === 'left' || options.placement === 'right') && (options.align === 'left' || options.align === 'right')) options.align = 'top';

		popover.addClass(options.placement);
		popover.addClass('clockpicker-align-' + options.align);

		this.spanHours.click($.proxy(this.toggleView, this, 'hours'));
		this.spanMinutes.click($.proxy(this.toggleView, this, 'minutes'));
		//this.spanMinutes.click(console.log('click'));

		// Show or toggle
		input.on('focus.clockpicker click.clockpicker', $.proxy(this.show, this));
		addon.on('click.clockpicker', $.proxy(this.toggle, this));

		// Build ticks
		var tickTpl = $('<div class="clockpicker-tick"></div>'),
			i, tick, radian, radius;

		// Hours view
		if (options.twelvehour) {
			for (i = 1; i < 13; i += 1) {
				tick = tickTpl.clone();
				radian = i / 6 * Math.PI;
				radius = outerRadius;
				tick.css('font-size', '120%');
				tick.css({
					left: dialRadius + Math.sin(radian) * radius - tickRadius,
					top: dialRadius - Math.cos(radian) * radius - tickRadius
				});
				tick.html(i === 0 ? '00' : i);
				tick[0].id = 'h'+i;
				hoursView.append(tick);
				tick.on(mousedownEvent, mousedown);
			}
		} else {
			var countHeureExist = 0;
			for (i = 0; i < 24; i += 1) {
				tick = tickTpl.clone();
				radian = i / 6 * Math.PI;
				var inner = i >= 0 && i < 12;
				radius = inner ? innerRadius : outerRadius;
				tick.css({
					left: dialRadius + Math.sin(radian) * radius - tickRadius,
					top: dialRadius - Math.cos(radian) * radius - tickRadius
				});
				if (inner) {
					tick.css('font-size', '120%');
				}
				
				if(i<hActuelle)
				{
					tick.css('color', '#dedede');
					Hblock[i]=0;
				}
				else
				{
					if (countHeureExist < Dedicace._json_hour.length) 
					{
						
						if(Dedicace._json_hour[countHeureExist].rowheures == i)
						{
							tick.css('font-weight','bold');
							tick.css('color', 'green');
							countHeureExist = countHeureExist+1;
							Hblock[i]=0;
						}
						else
						{
							tick.css('color', '#dedede');
							Hblock[i]=1;
							//Heures bloqués		
						}
						
					}
					else
					{
						tick.css('color', '#dedede');
						Hblock[i]=1;
						//Heures bloqués		
					}
				}
				tick.html(i === 0 ? '00' : i);
				tick[0].id = 'h'+i;
				hoursView.append(tick);
				tick.on(mousedownEvent, mousedown);
			}
		}

		// Minutes view
		var interval = 5;
		if(this.options.quarterpick)
		{
			interval = 5;
		}
		
		var i2 = 0;
		for (i = 0; i < 60; i += interval) {
			
			tick = tickTpl.clone();
			radian = i / 30 * Math.PI;
			tick.css({
				left: dialRadius + Math.sin(radian) * outerRadius - tickRadius,
				top: dialRadius - Math.cos(radian) * outerRadius - tickRadius
			});
			tick.css('font-size', '120%');
			tick[0].id = 'min'+i;
			
			if(Dedicace._json_min[i2].minutes==i)
			{
				if(Dedicace._json_min[i2].status==0)
				{
					tick.css('color', 'red');
					tableauMinutesPerH[i/5]=Dedicace._json_min[i2].element_image;
					tableauMinutesPerH2[i/5]=Dedicace._json_min[i2].info_creneau_nondispo;
				}
				else
				{
					tick.css('color', 'green');
					tableauMinutesPerH[i/5]='green';
					tableauMinutesPerH2[i/5]='';
					tick.css('font-weight','bold');
				}
				i2=i2+1;
			}
			else
			{
				tick.css('color', '#dedede');
				tableauMinutesPerH[i/5]='gray';
				tableauMinutesPerH2[i/5]='';
			}
			
			tick.html(leadingZero(i));
			minutesView.append(tick);
			tick.on(mousedownEvent, mousedown);
		}

		// Clicking on minutes view space

		plate.on(mousedownEvent, function(e){
			if ($(e.target).closest('.clockpicker-tick').length === 5) {
				mousedown(e, false);
			}
		});

		// Mousedown or touchstart
		function mousedown(e, space) {
			var offset = plate.offset(),
				isTouch = /^touch/.test(e.type),
				x0 = offset.left + dialRadius,
				y0 = offset.top + dialRadius,
				dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
				dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
				z = Math.sqrt(dx * dx + dy * dy),
				moved = true;

			// When clicking on minutes view space, check the mouse position
			if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
				return;
			}
			e.preventDefault();

			// Set cursor style of body after 200ms
			var movingTimer = setTimeout(function(){
				$body.addClass('clockpicker-moving');
			}, 200);

			// Place the canvas to top
			if (svgSupported) {
				plate.append(self.canvas);
			}

			// Clock
			self.setHand(dx, dy, ! space, true);

			// Mousemove on document
			$doc.off(mousemoveEvent).on(mousemoveEvent, function(e){
				e.preventDefault();
				var isTouch = /^touch/.test(e.type),
					x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
					y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
				if (! moved && x === dx && y === dy) {
					// Clicking in chrome on windows will trigger a mousemove event
					return;
				}
				moved = true;
				self.setHand(x, y, true);
			});

			// Mouseup on document
			$doc.off(mouseupEvent).on(mouseupEvent, function(e){
				$doc.off(mouseupEvent);
				e.preventDefault();
				var isTouch = /^touch/.test(e.type),
					x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
					y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
				if ((space || moved) && x === dx && y === dy) {
					self.setHand(x, y);
				}
				if (self.currentView === 'hours') {
					self.toggleView('minutes', duration / 2);
				} else {
					if (options.autoclose) {
						self.minutesView.addClass('clockpicker-dial-out');
						setTimeout(function(){
							self.done();
						}, duration / 2);
					}
				}
				plate.prepend(canvas);

				// Reset cursor style of body
				clearTimeout(movingTimer);
				$body.removeClass('clockpicker-moving');

				// Unbind mousemove event
				$doc.off(mousemoveEvent);
			});
		}

		if (svgSupported) {
			// Draw clock hands and others
			var canvas = popover.find('.clockpicker-canvas'),
				svg = createSvgElement('svg');
			svg.setAttribute('class', 'clockpicker-svg');
			svg.setAttribute('width', diameter);
			svg.setAttribute('height', diameter);
			var g = createSvgElement('g');
			g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
			var bearing = createSvgElement('circle');
			bearing.setAttribute('class', 'clockpicker-canvas-bearing');
			bearing.setAttribute('cx', 0);
			bearing.setAttribute('cy', 0);
			bearing.setAttribute('r', 2);
			var hand = createSvgElement('line');
			hand.setAttribute('x1', 0);
			hand.setAttribute('y1', 0);
			var bg = createSvgElement('circle');
			bg.setAttribute('class', 'clockpicker-canvas-bg');
			bg.setAttribute('r', tickRadius);
			var fg = createSvgElement('circle');
			fg.setAttribute('class', 'clockpicker-canvas-fg');
			fg.setAttribute('r', 3.5);
			g.appendChild(hand);
			g.appendChild(bg);
			g.appendChild(fg);
			g.appendChild(bearing);
			svg.appendChild(g);
			canvas.append(svg);

			this.hand = hand;
			this.bg = bg;
			this.fg = fg;
			this.bearing = bearing;
			this.g = g;
			this.canvas = canvas;
		}

		raiseCallback(this.options.init);
	}

	function raiseCallback(callbackFunction) {
		if (callbackFunction && typeof callbackFunction === "function") {
			callbackFunction();
		}
	}

	// Default options
	ClockPicker.DEFAULTS = {
		'default': heureActuelle,       // default time, 'now' or '13:14' e.g.
		fromnow: '',          // set default time to * milliseconds from now (using with default = 'now')
		placement: '', // clock popover placement
		align: '',       // popover arrow align
		donetext: 'OK',    // done button text
		autoclose: false,    // auto close when minute is selected
		twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
		vibrate: true,        // vibrate the device when dragging clock hand
		quarterpick: true	// pick minutes quarter by quarter
	};

	// Show or hide popover
	ClockPicker.prototype.toggle = function(){
		this[this.isShown ? 'hide' : 'show']();
	};

	// Set popover position
	ClockPicker.prototype.locate = function(){
		var element = this.element,
			popover = this.popover,
			offset = element.offset(),
			width = element.outerWidth(),
			height = element.outerHeight(),
			placement = this.options.placement,
			align = this.options.align,
			styles = {},
			self = this;

		popover.show();

		// Place the popover
		switch (placement) {
			case 'bottom':
				styles.top = offset.top + height;
				break;
			case 'right':
				styles.left = offset.left + width;
				break;
			case 'top':
				styles.top = offset.top - popover.outerHeight();
				break;
			case 'left':
				styles.left = offset.left - popover.outerWidth();
				break;
		}

		// Align the popover arrow
		switch (align) {
			case 'left':
				styles.left = offset.left;
				break;
			case 'right':
				styles.left = offset.left + width - popover.outerWidth();
				break;
			case 'top':
				styles.top = offset.top;
				break;
			case 'bottom':
				styles.top = offset.top + height - popover.outerHeight();
				break;
		}

		popover.css(styles);
	};

	// Show popover
	ClockPicker.prototype.show = function(e){
		// Not show again
		if (this.isShown) {
			return;
		}

		raiseCallback(this.options.beforeShow);

		var self = this;

		// Initialize
		if (! this.isAppended) {
			// Append popover to body
			//$body = $(document.body).append(this.popover);
			
			$body = $('#roueSelectMySUN').append(this.popover);

			// Reset position when resize
			$win.on('resize.clockpicker' + this.id, function(){
				if (self.isShown) {
					self.locate();
				}
			});

			this.isAppended = true;
		}

		// Get the time
		var value = ((this.input.prop('value') || this.options['default'] || '') + '').split(':');
		if (value[0] === 'now') {
			var now = new Date(+ new Date() + this.options.fromnow);
			value = [
				now.getHours(),
				now.getMinutes()
			];
		}
		this.hours = + value[0] || 0;
		this.minutes = + value[1] || 0;
		this.spanHours.html(leadingZero(this.hours));
		this.spanMinutes.html(leadingZero(this.minutes));

		// Toggle to hours view
		this.toggleView('hours');

		// Set position
		this.locate();

		this.isShown = true;

		// Hide when clicking or tabbing on any element except the clock, input and addon
		
		/*
		
		$doc.on('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id, function(e){
			var target = $(e.target);
			if (target.closest(self.popover).length === 0 &&
					target.closest(self.addon).length === 0 &&
					target.closest(self.input).length === 0) {
				self.hide();
			}
		});

		// Hide when ESC is pressed
		$doc.on('keyup.clockpicker.' + this.id, function(e){
			if (e.keyCode === 27) {
				self.hide();
			}
		});
		*/

		raiseCallback(this.options.afterShow);
	};

	// Hide popover
	ClockPicker.prototype.hide = function(){
		raiseCallback(this.options.beforeHide);

		this.isShown = false;

		// Unbinding events on document
		$doc.off('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id);
		$doc.off('keyup.clockpicker.' + this.id);

		this.popover.hide();

		raiseCallback(this.options.afterHide);
	};

	// Toggle to hours or minutes view
	ClockPicker.prototype.toggleView = function(view, delay){
		var raiseAfterHourSelect = false;
		if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
			raiseCallback(this.options.beforeHourSelect);
			raiseAfterHourSelect = true;
		}
		var isHours = view === 'hours',
			nextView = isHours ? this.hoursView : this.minutesView,
			hideView = isHours ? this.minutesView : this.hoursView;
		
		
		if (view === 'hours')
		{
			console.log('heures');
			
			if(isphonegap == true)
			{
				var localStorage_tuto3 = localStorage.getItem("tuto3");
				if(localStorage_tuto3)
				{
				}
				else
				{
					tuto.tutoPart3();
				}
			}
			
			$('.clockpicker-button').hide();
		}
		else if (view === 'minutes')
		{
			console.log('minutes');
			
			if(isphonegap == true)
			{
				var localStorage_tuto3 = localStorage.getItem("tuto3");
				if(localStorage_tuto3)
				{
				}
				else
				{
					tuto.tutoPart3_2();
				}
			}
			$('.clockpicker-button').show();
		}
		

		this.currentView = view;

		this.spanHours.toggleClass('text-primary', isHours);
		this.spanMinutes.toggleClass('text-primary', ! isHours);

		// Let's make transitions
		hideView.addClass('clockpicker-dial-out');
		nextView.css('visibility', 'visible').removeClass('clockpicker-dial-out');

		// Reset clock hand
		this.resetClock(delay);

		// After transitions ended
		clearTimeout(this.toggleViewTimer);
		this.toggleViewTimer = setTimeout(function(){
			hideView.css('visibility', 'hidden');
		}, duration);

		if (raiseAfterHourSelect) {
			raiseCallback(this.options.afterHourSelect);
		}
	};

	// Reset clock hand
	ClockPicker.prototype.resetClock = function(delay){
		var view = this.currentView,
			value = this[view],
			isHours = view === 'hours',
			unit = Math.PI / (isHours ? 6 : 30),
			//unit = Math.PI / (isHours ? 6 : (this.options.quarterpick ? 6 : 30)),
			radian = value * unit,
			radius = isHours && value >= 0 && value < 12 ? innerRadius : outerRadius,
			x = Math.sin(radian) * radius,
			y = - Math.cos(radian) * radius,
			self = this;
		if (svgSupported && delay) {
			self.canvas.addClass('clockpicker-canvas-out');
			setTimeout(function(){
				self.canvas.removeClass('clockpicker-canvas-out');
				self.setHand(x, y);
			}, delay);
		} else {
			this.setHand(x, y);
		}
	};

	// Set clock hand to (x, y)
	ClockPicker.prototype.setHand = function(x, y, roundBy5, dragging){
		var radian = Math.atan2(x, - y),
			isHours = this.currentView === 'hours',
			unit = Math.PI / (isHours || roundBy5 ? 6 : 30),
			//unit = Math.PI / (isHours ? 6 : (this.options.quarterpick ? 6 : 30)),
			z = Math.sqrt(x * x + y * y),
			options = this.options,
			inner = isHours && z < (outerRadius + innerRadius) / 2,
			radius = inner ? innerRadius : outerRadius,
			value;
			
			if (options.twelvehour) {
				radius = outerRadius;
			}

		// Radian should in range [0, 2PI]
		if (radian < 0) {
			radian = Math.PI * 2 + radian;
		}

		// Get the round value
		value = Math.round(radian / unit);

		// Get the round radian
		radian = value * unit;

		// Correct the hours or minutes
		if (options.twelvehour) {
			if (isHours) {
				if (value === 0) {
					value = 12;
				}
			} else {
				if (roundBy5) {
					value *= 5;
				}
				if (value === 60) {
					value = 0;
				}				
				else if (this.options.quarterpick) {
					if(value < 5)
					{
						value*=5;
					}
					if (value === 60)
					{
						value = 0;
					}
					value*=5;
 				}
			}
		} else {
			if (isHours) {
				if (value === 12) {
					value = 0;
				}
				value = inner ? (value === 0 ? 00 : value) : value === 0 ? 12 : value + 12;
			} else {
				if (roundBy5) {
					value *= 5;
				}
				if (value === 60) {
					value = 0;
				}
				
				/* Test correction */
				
				if(value === 1 || value === 2 || value === 58 || value === 59)
				{
					value = 0;
				}
				if(value === 3 || value === 4 || value === 6 || value === 7)
				{
					value = 5;
				}
				if(value === 8 || value === 9 || value === 11 || value === 12)
				{
					value = 10;
				}
				if(value === 13 || value === 14 || value === 16 || value === 17)
				{
					value = 15;
				}
				if(value === 18 || value === 19 || value === 21 || value === 22)
				{
					value = 20;
				}
				if(value === 23 || value === 24 || value === 26 || value === 27)
				{
					value = 25;
				}
				if(value === 28 || value === 29 || value === 31 || value === 32)
				{
					value = 30;
				}
				if(value === 33 || value === 34 || value === 36 || value === 37)
				{
					value = 35;
				}
				if(value === 38 || value === 39 || value === 41 || value === 42)
				{
					value = 40;
				}
				if(value === 43 || value === 44 || value === 46 || value === 47)
				{
					value = 45;
				}
				if(value === 48 || value === 49 || value === 51 || value === 52)
				{
					value = 50;
				}
				if(value === 53 || value === 54 || value === 56 || value === 57)
				{
					value = 55;
				}
				
				/* Test correction */
				
				else if (this.options.quarterpick) {
					if(value < 5)
					{
						value*=5;
					}
					if (value === 60)
					{
						value = 0;
					}
				}
			}
		}
		
		// Once hours or minutes changed, vibrate the device
		if (this[this.currentView] !== value) {
			if (vibrate && this.options.vibrate) {
				// Do not vibrate too frequently
				if (! this.vibrateTimer) {
					navigator[vibrate](10);
					this.vibrateTimer = setTimeout($.proxy(function(){
						this.vibrateTimer = null;
					}, this), 100);
				}
			}
		}

		this[this.currentView] = value;
		this[isHours ? 'spanHours' : 'spanMinutes'].html(leadingZero(value));

		// If svg is not supported, just add an active class to the tick
		if (! svgSupported) {
			this[isHours ? 'hoursView' : 'minutesView'].find('.clockpicker-tick').each(function(){
				var tick = $(this);
				tick.toggleClass('active', value === + tick.html());
			});
			return;
		}

		// Place clock hand at the top when dragging
		/*if (dragging || (! isHours && value % 5)) {
			this.g.insertBefore(this.hand, this.bearing);
			this.g.insertBefore(this.bg, this.fg);
			this.bg.setAttribute('class', 'clockpicker-canvas-bg clockpicker-canvas-bg-trans');
		} else {
			// Or place it at the bottom
			this.g.insertBefore(this.hand, this.bg);
			this.g.insertBefore(this.fg, this.bg);
			this.bg.setAttribute('class', 'clockpicker-canvas-bg');
		}*/

		// Set clock hand and others' position
		var cx = Math.sin(radian) * radius,
			cy = - Math.cos(radian) * radius;
		this.hand.setAttribute('x2', cx);
		this.hand.setAttribute('y2', cy);
		this.bg.setAttribute('cx', cx);
		this.bg.setAttribute('cy', cy);
		this.fg.setAttribute('cx', cx);
		this.fg.setAttribute('cy', cy);
		
		if (isHours) {
			
			hSelect = this.spanHours[0].textContent;
			document.getElementById("imagePochette").innerHTML="";
			document.getElementById("imagePochette").style.display="none";
			document.getElementById("roueSelectMySUN").style="padding-bottom:60px;padding-top:20px;";
			document.getElementById("titreSelectDedi").innerHTML="---";
			document.getElementById("titreSelectDedi").style.color="white"; 
			
			if(hSelect != hBefore)
			{
				if(hSelect<hActuelle)
				{
					var new_json_min = 'false';
					for (i = 0; i < 60; i += 5) {
						document.getElementById("min"+i).style.color='#dedede';
						tableauMinutesPerH[i/5]='gray';
						tableauMinutesPerH2[i/5]='';
					}
				}
				else if(Hblock[hSelect]==1)
				{
					var new_json_min = 'false';
					for (i = 0; i < 60; i += 5) {
						document.getElementById("min"+i).style.color='#dedede';
						tableauMinutesPerH[i/5]='gray';
						tableauMinutesPerH2[i/5]='';
					}
				}
				else
				{
				
					var new_json_min;
					
					$.ajax({ 
						type: 'POST',
						url: Dedicace._url_get_min,
						data: 'jour='+Dedicace.returnTimeStamp()+'&heures='+hSelect,
						success: function(msg) {
							eval('new_json_min = '+msg);
							if(new_json_min.length < 3) {
								new_json_min.push({"status":"1","minutes":"--"});
								new_json_min.push({"status":"1","minutes":"--"});
							}
							console.log(new_json_min);
							
							var i2 = 0;
							for (i = 0; i < 60; i += 5) {
							
								if(new_json_min[i2].minutes==i)
								{
									if(new_json_min[i2].status==0)
									{
										document.getElementById("min"+i).style.color='red';
										document.getElementById("min"+i).style.fontWeight='normal';
										//tick.css('color', 'red');
										tableauMinutesPerH[i/5]=new_json_min[i2].element_image;
										tableauMinutesPerH2[i/5]=Dedicace._json_min[i2].info_creneau_nondispo;
									}
									else
									{
										document.getElementById("min"+i).style.color='green';
										document.getElementById("min"+i).style.fontWeight='bold';
										//tick.css('color', 'green');
										tableauMinutesPerH[i/5]='green';
										tableauMinutesPerH2[i/5]='';
									}
									i2=i2+1;
								}
								else
								{
									document.getElementById("min"+i).style.color='#dedede';
									document.getElementById("min"+i).style.fontWeight='normal';
									//tick.css('color', '#dedede');
									tableauMinutesPerH[i/5]='gray';
									tableauMinutesPerH2[i/5]='';
								}
							
							}
							
						},
						error: function() {
							console.log('Erreur requete jsonMin'); 
						}
						
					});
						
				}
				
			}
			
			hBefore = this.spanHours[0].textContent;
			
		}
		else
		{
			//console.log('Minutes : '+this.spanMinutes[0].textContent);
			minSelect = this.spanMinutes[0].textContent;	
			
			// changement images
			
			document.getElementById("imagePochette").style.display="block";
			document.getElementById("roueSelectMySUN").style="padding-bottom:0px;padding-top:20px;";
			
			//console.log(tableauMinutesPerH);
			
			if((this.spanMinutes[0].textContent)==0)
			{
				if(tableauMinutesPerH[0]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[0]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[0]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[0];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==5)
			{
				if(tableauMinutesPerH[1]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[1]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[1]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[1];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==10)
			{
				if(tableauMinutesPerH[2]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[2]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[2]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[2];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==15)
			{
				if(tableauMinutesPerH[3]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[3]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[3]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[3];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==20)
			{
				if(tableauMinutesPerH[4]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[4]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[4]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[4];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==25)
			{
				if(tableauMinutesPerH[5]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[5]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[5]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[5];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==30)
			{
				if(tableauMinutesPerH[6]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[6]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[6]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[6];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==35)
			{
				if(tableauMinutesPerH[7]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[7]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[7]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[7];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==40)
			{
				if(tableauMinutesPerH[8]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[8]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[8]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[8];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==45)
			{
				if(tableauMinutesPerH[9]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[9]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[9]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[9];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==50)
			{
				if(tableauMinutesPerH[10]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[10]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[10]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[10];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}
			if((this.spanMinutes[0].textContent)==55)
			{
				if(tableauMinutesPerH[11]=='gray')
				{
					document.getElementById("imagePochette").innerHTML="<img src='images/interdit.png'/>";
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
				else if(tableauMinutesPerH[11]=='green')
				{
					$('#imagePochette').html('');
					$('<img style="cursor:pointer;" src="images/autorise.png"/>').click($.proxy(this.done, this)).appendTo(imagePochette);
					document.getElementById("titreSelectDedi").innerHTML="---";
					document.getElementById("titreSelectDedi").style.color="white"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = false;
				}
				else
				{
					document.getElementById("imagePochette").innerHTML="<img src='"+tableauMinutesPerH[11]+"'/>";
					document.getElementById("titreSelectDedi").innerHTML=tableauMinutesPerH2[11];
					document.getElementById("titreSelectDedi").style.color="rgb(99, 99, 99)"; 
					//document.getElementById("boutonEnvoiMySUN").disabled = true;
				}
			}		
		}
		
	};

	// Hours and minutes are selected
	ClockPicker.prototype.done = function() {
		raiseCallback(this.options.beforeDone);
		this.hide();
		var last = this.input.prop('value'),
			value = leadingZero(this.hours) + ':' + leadingZero(this.minutes);
		if  (this.options.twelvehour) {
			value = value + this.amOrPm;
		}
		
		this.input.prop('value', value);
		
		document.getElementById("imagePochette").innerHTML="";
		document.getElementById("titreSelectDedi").innerHTML="---";
		document.getElementById("titreSelectDedi").style.color="white"; 
		
		console.log(this.hours);
		console.log(this.minutes);
		
		Dedicace._hClock = this.hours;
		Dedicace._mClock = this.minutes;
		
		if(isphonegap == true)
		{
			tuto.closeTuto3();
		}
		
		Dedicace._search_words = '';
		Dedicace.valideDedicace();
		
		if (value !== last) {
			this.input.triggerHandler('change');
			if (! this.isInput) {
				this.element.trigger('change');
			}
		}

		if (this.options.autoclose) {
			this.input.trigger('blur');
		}

		raiseCallback(this.options.afterDone);
	};

	// Remove clockpicker from input
	ClockPicker.prototype.remove = function() {
		this.element.removeData('clockpicker');
		this.input.off('focus.clockpicker click.clockpicker');
		this.addon.off('click.clockpicker');
		if (this.isShown) {
			this.hide();
		}
		if (this.isAppended) {
			$win.off('resize.clockpicker' + this.id);
			this.popover.remove();
		}
	};

	// Extends $.fn.clockpicker
	$.fn.clockpicker = function(option){
		var args = Array.prototype.slice.call(arguments, 0);
		return this.each(function(){
			var $this = $(this),
				data = $this.data('clockpicker');
			if (! data) {
				var options = $.extend({}, ClockPicker.DEFAULTS, $this.data(), typeof option == 'object' && option);
				$this.data('clockpicker', new ClockPicker($this, options));
			} else {
				// Manual operatsions. show, hide, remove, e.g.
				if (typeof data[option] === 'function') {
					data[option].apply(data, args);
				}
			}
		});
	};
	
	
	// INITIALISATION
	
	$('.clockpicker').clockpicker().clockpicker('remove');
	
	$('.clockpicker').clockpicker().clockpicker('show');
	
	/*$('.clockpicker').clockpicker()
	.find('input').change(function(){
		console.log(this.value);
	});

	if (/mobile/i.test(navigator.userAgent)) {
		$('input').prop('readOnly', true);
	}*/
	
}
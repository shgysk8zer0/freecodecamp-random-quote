import {$} from './std-js/functions.js';
import * as consts from './consts.js';

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getQuote() {
	const template = document.getElementById('quote-template').content.cloneNode(true);
	const target = document.getElementById('quote-target');
	const quote = consts.quotes[getRandomInt(0, consts.quotes.length)];

	$(target).empty();

	$('[data-prop="text"]', template).text = quote.text;
	$('[data-prop="by"]', template).text = quote.by;
	$('[data-action="random-quote"]', template).click(getQuote);
	$('[data-action="tweet"]', template).each(tweetBtn => {
		const url = new URL(tweetBtn.href);
		url.searchParams.set('url', location.href);
		url.searchParams.set('text', `Random quote:\n"${quote.text}"\n- ${quote.by}\n`);
		tweetBtn.href = url.toString();
	});
	target.append(template);
}

$(window).ready(() => {
	$('.cursor-wait').removeClass('cursor-wait');
	getQuote();
}, {once: true});

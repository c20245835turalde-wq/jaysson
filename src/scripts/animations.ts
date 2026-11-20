import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const darkModeToggle = document.querySelector<HTMLButtonElement>('#darkModeToggle');

darkModeToggle?.addEventListener('click', () => {
	const isDark = document.documentElement.classList.toggle('dark');
	darkModeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
	darkModeToggle.setAttribute('aria-pressed', String(isDark));
	darkModeToggle.setAttribute(
		'aria-label',
		isDark ? 'Switch to light mode' : 'Switch to dark mode',
	);
});

const replayButton = document.querySelector<HTMLButtonElement>('#replayBtn');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motion = gsap.matchMedia();

motion.add('(prefers-reduced-motion: no-preference)', () => {
	const intro = gsap.timeline({
		paused: true,
		defaults: {
			duration: 0.65,
			ease: 'power3.out',
		},
	});

	intro
		.from('#hero h1', { y: 48, autoAlpha: 0, ease: 'power4.out' })
		.from('#hero p', { y: 24, autoAlpha: 0, ease: 'power2.out' }, '-=0.35')
		.from(
			'#hero .button, #replayBtn',
			{
				y: 16,
				autoAlpha: 0,
				stagger: 0.12,
				ease: 'back.out(1.4)',
			},
			'-=0.25',
		);

	const replayIntro = () => {
		if (!prefersReducedMotion.matches) {
			intro.restart();
		}
	};

	replayButton?.addEventListener('click', replayIntro);
	intro.restart();

	gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
		gsap.fromTo(
			element,
			{ autoAlpha: 0, y: 36 },
			{
				autoAlpha: 1,
				y: 0,
				duration: 0.75,
				ease: 'power2.out',
				immediateRender: false,
				scrollTrigger: {
					trigger: element,
					start: 'top 86%',
					toggleActions: 'play none none reverse',
				},
			},
		);
	});

	gsap.fromTo(
		'#progressBar',
		{ scaleX: 0 },
		{
			scaleX: 1,
			ease: 'none',
			scrollTrigger: {
				trigger: document.documentElement,
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
			},
		},
	);

	return () => replayButton?.removeEventListener('click', replayIntro);
});

motion.add('(prefers-reduced-motion: reduce)', () => {
	gsap.set(['#hero h1', '#hero p', '#hero .button', '#replayBtn'], {
		autoAlpha: 1,
		clearProps: 'transform',
	});
	gsap.set('.reveal', { autoAlpha: 1, clearProps: 'transform' });
	gsap.set('#progressBar', { scaleX: 0 });
});

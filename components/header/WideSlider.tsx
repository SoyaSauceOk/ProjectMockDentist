import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { WidthContext } from '../../pages/_app';
// import Slider from 'react-slick';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { CSSProperties } from 'react';
import { wrap } from 'node:module';
import React from 'react';

const getSliderHeight = number => {
	if (number > 800) {
		return 400;
	} else if (number < 340) {
		return 126;
	} else {
		return number * 0.393;
	}
};

export default function WideSlider() {
	const width = useContext(WidthContext);
	const [sliderHeight, setSliderHeight] = useState<number>(0);
	const [slideMoving, setSlideMoving] = useState<boolean | 'shifting'>(false);
	const prevStart = useRef(-100);
	const moveStart = useRef(-100);
	const wrapper = useRef<HTMLDivElement>();

	useEffect(() => {
		setSliderHeight(getSliderHeight(width));
	}, [width]);

	const innerStyles: CSSProperties = {
		height: '100%',
		width: width,
		maxWidth: '1020px',
		cursor: 'pointer',
	};

	const shiftRight = (index: number) => {
		setSlideMoving('shifting');
		wrapper.current.style.transition = '0.5s';
		wrapper.current.style.left =
			width >= 1020
				? (index - 1) * 1020 * -1 + (width - 1020) / 2 + 'px'
				: (index - 1) * width * -1 + 'px';
		setTimeout(() => {
			wrapper.current.style.transition = '0s';
			const newNode: HTMLImageElement = wrapper.current.childNodes[
				index
			].cloneNode() as HTMLImageElement;
			wrapper.current.prepend(newNode);
			wrapper.current.removeChild(wrapper.current.lastChild);
			wrapper.current.style.left =
				width >= 1020
					? index * 1020 * -1 + (width - 1020) / 2 + 'px'
					: index * width * -1 + 'px';
			prevStart.current = -100;
			moveStart.current = -100;
			setSlideMoving(false);
		}, 501);
	};
	const shiftLeft = (index: number) => {
		setSlideMoving('shifting');
		wrapper.current.style.transition = '0.5s';
		wrapper.current.style.left =
			width >= 1020
				? (index + 1) * 1020 * -1 + (width - 1020) / 2 + 'px'
				: (index + 1) * width * -1 + 'px';
		setTimeout(() => {
			wrapper.current.style.transition = '0s';
			const newNode: HTMLImageElement = wrapper.current.childNodes[
				index
			].cloneNode() as HTMLImageElement;
			wrapper.current.appendChild(newNode);
			wrapper.current.removeChild(wrapper.current.firstChild);
			wrapper.current.style.left =
				width >= 1020
					? index * 1020 * -1 + (width - 1020) / 2 + 'px'
					: index * width * -1 + 'px';
			prevStart.current = -100;
			moveStart.current = -100;
			setSlideMoving(false);
		}, 501);
	};

	const onMouseDown = (e: React.MouseEvent) => {
		prevStart.current = e.pageX;
		moveStart.current = e.pageX;
		if (e.pageX < 40) {
			shiftRight(Array.from((e as any).target.parentNode.children).indexOf(e.target));
		} else if (e.pageX > width - 40) {
			shiftLeft(Array.from((e as any).target.parentNode.children).indexOf(e.target));
		} else {
			setSlideMoving(true);
			wrapper.current.style.transition = '0s';
		}
	};

	const onMouseMove = (e: React.MouseEvent) => {
		if (e.pageX < 40) {
			shiftLeft(Array.from((e as any).target.parentNode.children).indexOf(e.target));
		} else if (e.pageX > width - 40) {
			shiftRight(Array.from((e as any).target.parentNode.children).indexOf(e.target));
		} else {
			const dis = e.pageX - prevStart.current;
			const wrapperLeft = Number(wrapper.current.style.left.replace('px', ''));
			wrapper.current.style.left = wrapperLeft + dis + 'px';
			prevStart.current = e.pageX;
		}
	};

	const onMouseUp = (e: React.MouseEvent) => {
		const index = Array.from((e as any).target.parentElement.children).indexOf(e.target);
		const dis = (e.pageX - moveStart.current) / width;
		if (dis > 0.1) {
			shiftRight(index);
		} else if (dis < -0.1) {
			shiftLeft(index);
		} else {
			wrapper.current.style.transition = '0.25s';
			wrapper.current.style.left =
				width >= 1020
					? index * 1020 * -1 + (width - 1020) / 2 + 'px'
					: index * width * -1 + 'px';
			setSlideMoving(false);
			prevStart.current = -100;
		}
	};

	const onTouchStart = (e: React.TouchEvent) => {
		prevStart.current = moveStart.current = e.changedTouches[0].pageX;
		if (moveStart.current < 40) {
			shiftRight(Array.from((e as any).target.parentNode.children).indexOf(e.target));
		} else if (moveStart.current > width - 40) {
			shiftLeft(Array.from((e as any).target.parentNode.children).indexOf(e.target));
		} else {
			setSlideMoving(true);
			wrapper.current.style.transition = '0s';
		}
	};

	const whileTouch = (e: React.TouchEvent) => {
		const position = e.changedTouches[0].pageX;
		if (position < 40) {
			shiftLeft(Array.from((e as any).target.parentNode.children).indexOf(e.target));
		} else if (position > width - 40) {
			shiftRight(Array.from((e as any).target.parentNode.children).indexOf(e.target));
		} else {
			const dis = position - prevStart.current;
			const wrapperLeft = Number(wrapper.current.style.left.replace('px', ''));
			wrapper.current.style.left = wrapperLeft + dis + 'px';
			prevStart.current = position;
		}
	};

	const onTouchEnd = (e: React.TouchEvent) => {
		const index = Array.from((e as any).target.parentElement.children).indexOf(e.target);
		const dis = (e.changedTouches[0].pageX - moveStart.current) / width;
		if (dis > 0.1) {
			shiftRight(index);
		} else if (dis < -0.1) {
			shiftLeft(index);
		} else {
			wrapper.current.style.transition = '0.25s';
			wrapper.current.style.left =
				width >= 1020
					? index * 1020 * -1 + (width - 1020) / 2 + 'px'
					: index * width * -1 + 'px';
			setSlideMoving(false);
			prevStart.current = -100;
		}
	};

	return (
		<>
			<div
				onMouseDown={slideMoving === false ? e => onMouseDown(e) : () => {}}
				onMouseMove={slideMoving === true ? e => onMouseMove(e) : () => {}}
				onMouseUp={slideMoving ? e => onMouseUp(e) : () => {}}
				onTouchStartCapture={e => onTouchStart(e)}
				onTouchMoveCapture={e => whileTouch(e)}
				onTouchEndCapture={e => onTouchEnd(e)}
				style={{
					height: sliderHeight,
					width: width < 1020 ? width * 5 : 5100,
					display: 'flex',
					position: 'relative',
					left: width < 1020 ? -width * 2 : -2040 + (width - 1020) / 2,
					top: width < 800 ? '60px' : 0,
					zIndex: 10,
					cursor: 'pointer',
				}}
				ref={wrapper}
			>
				<img
					style={innerStyles as CSSProperties}
					draggable={false}
					src='/pics/slide3.png'
				></img>
				<img
					style={innerStyles as CSSProperties}
					draggable={false}
					src='/pics/slide1.png'
				></img>
				<img
					style={innerStyles as CSSProperties}
					draggable={false}
					src='/pics/slide2.png'
				></img>
				<img
					style={innerStyles as CSSProperties}
					draggable={false}
					src='/pics/slide3.png'
				></img>
				<img
					style={innerStyles as CSSProperties}
					draggable={false}
					src='/pics/slide1.png'
				></img>
			</div>
		</>
	);
}

import { useEffect } from 'react';

type useOutsideClickListener = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	OverlayRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickListener = ({
	isOpen,
	OverlayRef: OverlayRef,
	onClose,
	onChange,
}: useOutsideClickListener) => {
	useEffect(() => {
	
		if (!isOpen) {
			return;
		}
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			
			if (target instanceof Node && OverlayRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		// Добавляем обработчик события
		window.addEventListener('click', handleClick);
		// Удаляем обработчик события при изменении зависимостей
		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isOpen]);
};
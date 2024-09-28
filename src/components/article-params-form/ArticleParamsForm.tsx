import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickListener } from './hooks/useOutsideClickListener';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';

type ArticleParamsFormProps = {
	setStyle: (style: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setStyle }: ArticleParamsFormProps) => {
	// Логика отвечающая за открытие/закрытие формы
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

	const overlayRef = useRef<HTMLDivElement>(null);

	useOutsideClickListener({
		isOpen: formIsOpen,
		onChange: setFormIsOpen,
		OverlayRef: overlayRef,
	});

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleReset = () => {
		setFormState(defaultArticleState);
		setStyle(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setStyle(formState);
	};

	return (
		<>
			<div
				className={clsx(styles.overlay, formIsOpen && styles.overlay_open)}
				ref={overlayRef}
			/>
			<ArrowButton
				onClick={() => setFormIsOpen(!formIsOpen)}
				isOpen={formIsOpen}
			/>

			<aside
				className={clsx(styles.container, formIsOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(value) =>
							setFormState({ ...formState, fontColor: value })
						}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
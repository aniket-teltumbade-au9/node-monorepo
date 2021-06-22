import React from 'react';
import {useRMController} from './useRMController';
import CheckboxGroup from '../forms/CheckboxGroup';

export default function RHFSelect(props) {
	const {
		ref,
		// eslint-disable-next-line no-unused-vars
		fieldState,
		// eslint-disable-next-line no-unused-vars
		formState,
		...rest
	} = useRMController(props);
	console.log(props, 'props in checkbox');
	return <CheckboxGroup inputRef={ref} options={props.options} {...rest}/>;
}

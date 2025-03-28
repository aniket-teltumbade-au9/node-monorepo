import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {useFormControl} from '@mui/material/FormControl';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

const PREFIX = 'MuiFormControlLabel';

const classes = {
	root: `${PREFIX}-root`,
	label: `${PREFIX}-label`,
	labelPlacementStart: `${PREFIX}-labelPlacementStart`,
	labelPlacementTop: `${PREFIX}-labelPlacementTop`,
	labelPlacementBottom: `${PREFIX}-labelPlacementBottom`,
	disabled: `${PREFIX}-disabled`,
	marginLeft0: `${PREFIX}-marginLeft0`,
};

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const StyledLabel = styled('label')(({theme}) => ({
	/* Styles applied to the root element. */
	[`&.${classes.root}`]: {
		display: 'inline-flex',
		alignItems: 'center',
		cursor: 'pointer',
		// For correct alignment with the text.
		verticalAlign: 'middle',
		// Remove grey highlight
		WebkitTapHighlightColor: 'transparent',
		marginLeft: -11,
		marginRight: 16, // used for row presentation of radio/checkbox
		'&$disabled': {
			cursor: 'default',
		},
	},
	[`&.${classes.marginLeft0}`]: {
		marginLeft: 0,
	},
	/* Styles applied to the root element if `labelPlacement="start"`. */
	[`&.${classes.labelPlacementStart}`]: {
		flexDirection: 'row-reverse',
		marginLeft: 16, // used for row presentation of radio/checkbox
		marginRight: -11,
	},
	/* Styles applied to the root element if `labelPlacement="top"`. */
	[`&.${classes.labelPlacementTop}`]: {
		flexDirection: 'column-reverse',
		marginLeft: 16,
	},
	/* Styles applied to the root element if `labelPlacement="bottom"`. */
	[`&.${classes.labelPlacementBottom}`]: {
		flexDirection: 'column',
		marginLeft: 16,
	},
	/* Pseudo-class applied to the root element if `disabled={true}`. */
	[`& .${classes.disabled}`]: {},
	[`&.${classes.disabled}`]: {},
	/* Styles applied to the label's Typography component. */
	[`& .${classes.label}`]: {
		'&$disabled': {
			color: theme.palette.text.disabled,
		},
	},
}));

/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
const FormControlLabel = React.forwardRef(function FormControlLabel(props, ref) {
	const {
		checked, // eslint-disable-line no-unused-vars
		classes,
		className: classNameProp,
		control,
		disabled: disabledProp,
		inputRef, // eslint-disable-line no-unused-vars
		label,
		labelPlacement = 'end',
		name, // eslint-disable-line no-unused-vars
		offLabel,
		onChange, // eslint-disable-line no-unused-vars
		value, // eslint-disable-line no-unused-vars
		...other
	} = props;
	const muiFormControl = useFormControl();

	let disabled = disabledProp;
	if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
		disabled = control.props.disabled;
	}
	if (typeof disabled === 'undefined' && muiFormControl) {
		disabled = muiFormControl.disabled;
	}

	const controlProps = {
		disabled,
	};
	['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(key => {
		if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
			controlProps[key] = props[key];
		}
	});

	return (
		<StyledLabel
			className={clsx(
				classes.root,
				{
					[classes[`labelPlacement${capitalize(labelPlacement)}`]]: labelPlacement !== 'end',
					[classes.disabled]: disabled,
					[classes.marginLeft0]: offLabel,
				},
				classNameProp,
			)}
			ref={ref}
			{...other}
		>
			{offLabel && <Typography
				component='span'
				className={clsx(classes.label, {[classes.disabled]: disabled})}
			>
				{offLabel}
			</Typography>}
			{React.cloneElement(control, controlProps)}
			<Typography
				component='span'
				className={clsx(classes.label, {[classes.disabled]: disabled})}
			>
				{label}
			</Typography>
		</StyledLabel>
	);
});

FormControlLabel.propTypes = {
	/**
   * If `true`, the component appears selected.
   */
	checked: PropTypes.bool,
	/**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
	classes: PropTypes.object.isRequired,
	/**
   * @ignore
   */
	className: PropTypes.string,
	/**
   * A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`.
   */
	control: PropTypes.element,
	/**
   * If `true`, the control will be disabled.
   */
	disabled: PropTypes.bool,
	/**
   * This prop can be used to pass a ref callback to the `input` element.
   */
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
   * The text to be used in an enclosing label element.
   */
	label: PropTypes.node,
	/**
   * The position of the label.
   */
	labelPlacement: PropTypes.oneOf(['end', 'start', 'top', 'bottom']),
	/**
   * @ignore
   */
	muiFormControl: PropTypes.object,
	/*
   * @ignore
   */
	name: PropTypes.string,
	/**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.checked`.
   * @param {boolean} checked The `checked` value of the switch
   */
	onChange: PropTypes.func,
	/**
   * The value of the component.
   */
	value: PropTypes.any,
};
FormControlLabel.displayName = 'MuiFormControlLabel';
export default FormControlLabel;

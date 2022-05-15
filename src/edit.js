/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	RichText,
	AlignmentControl,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
} from "@wordpress/block-editor";

import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		align,
		content,
		backgroundColor,
		textColor,
		affiliateLink,
		linkLabel,
		hasLinkNofollow,
	} = attributes;

	// https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#block-wrapper-props
	const blockProps = useBlockProps({
		className: classnames({
			[`has-text-align-${align}`]: align,
		}),
	});

	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent });
	};

	const onChangeAlign = (newAlign) => {
		setAttributes({
			align: newAlign === undefined ? "none" : newAlign,
		});
	};
	const onChangeBackgroundColor = (newBackgroundColor) => {
		setAttributes({ backgroundColor: newBackgroundColor });
	};
	const onChangeTextColor = (newTextColor) => {
		setAttributes({ textColor: newTextColor });
	};

	// https://reactjs.org/docs/forms.html#controlled-components
	const onChangeAffiliateLink = (newAffiliateLink) => {
		setAttributes({
			affiliateLink: newAffiliateLink === undefined ? "" : newAffiliateLink,
		});
	};

	const onChangeLinkLabel = (newLinkLabel) => {
		setAttributes({
			linkLabel: newLinkLabel === undefined ? "" : newLinkLabel,
		});
	};

	const toggleNofollow = () => {
		setAttributes({ hasLinkNofollow: !hasLinkNofollow });
	};

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__("Color settings", "bumberlist")}
					initialOpen={false}
					colorSettings={[
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __("Text color", "bumberlist"),
						},
						{
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __("Background color", "bumberlist"),
						},
					]}
				/>
				<PanelBody title={__("Link Settings", "bumberlist")} initialOpen={true}>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__("Wishlist", "bumberlist")}
								value={affiliateLink}
								onChange={onChangeAffiliateLink}
								help={__("Add your Wishlist", "bumberlist")}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__("Link label", "bumberlist")}
								value={linkLabel}
								onChange={onChangeLinkLabel}
								help={__("Add link label", "bumberlist")}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<ToggleControl
								label="Add rel = nofollow"
								help={
									hasLinkNofollow ? "Has rel nofollow." : "No rel nofollow."
								}
								checked={hasLinkNofollow}
								onChange={toggleNofollow}
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentControl value={align} onChange={onChangeAlign} />
			</BlockControls>
			<div {...blockProps} style={{ backgroundColor: backgroundColor }}>
				<RichText
					tagName="p"
					onChange={onChangeContent}
					allowedFormats={["core/bold", "core/italic"]}
					value={content}
					placeholder={__("Write your text...", "bumberlist")}
					style={{ color: textColor }}
				/>
				<ExternalLink
					href={affiliateLink}
					className="affiliate-button"
					rel={hasLinkNofollow ? "nofollow" : ""}
				>
					{linkLabel}
				</ExternalLink>
			</div>
		</>
	);
}

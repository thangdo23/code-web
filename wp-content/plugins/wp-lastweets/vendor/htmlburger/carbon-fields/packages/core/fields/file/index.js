/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';
import { get } from 'lodash';

/**
 * Internal dependencies.
 */
import './style.scss';
import MediaLibrary from '../../components/media-library';
import apiFetch from '../../utils/api-fetch';

class FileField extends Component {
	/**
	 * Local state.
	 *
	 * @type {Object}
	 */
	state = {
		data: {}
	};

	/**
	 * Lifecycle Hook.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		const { value, field } = this.props;

		if ( value ) {
			// TODO: Refactor this to use `@wordpress/api-fetch` package.
			apiFetch(
				`${ window.wpApiSettings.root }carbon-fields/v1/attachment/?type=${ field.value_type }&value=${ value }`,
				'get'
			).then( this.handleFileDataChange );
		}
	}

	/**
	 * Returns an URL to the attachment's thumbnail.
	 *
	 * @return {string}
	 */
	getThumb() {
		const { data } = this.state;

		if ( data.sizes ) {
			const size = data.sizes.thumbnail || data.sizes.full;

			if ( size ) {
				return size.url;
			}
		}

		if ( data.thumb_url ) {
			return data.thumb_url;
		}

		return data.icon;
	}

	/**
	 * Handles the file meta set.
	 *
	 * @param  {Object} data
	 * @return {void}
	 */
	handleFileDataChange = ( data ) => {
		this.setState( { data } );
	}

	/**
	 * Handles the clear action of the file field.
	 *
	 * @return {void}
	 */
	handleClear = () => {
		const { id, onChange } = this.props;

		onChange( id, '' );

		this.handleFileDataChange( {} );
	}

	/**
	 * Handles the file selection.
	 *
	 * @param  {Object} files
	 * @return {void}
	 */
	handleSelect = ( files ) => {
		const {
			id,
			field,
			onChange
		} = this.props;

		const [ file ] = files;

		onChange( id, get( file, field.value_type, file.id ) );

		this.handleFileDataChange( file );
	}

	/**
	 * Render the component.
	 *
	 * @return {Object}
	 */
	render() {
		const { data } = this.state;

		const {
			value,
			name,
			field,
			buttonLabel,
			mediaLibraryButtonLabel,
			mediaLibraryTitle
		} = this.props;

		return (
			<MediaLibrary
				onSelect={ this.handleSelect }
				multiple={ false }
				title={ mediaLibraryTitle }
				buttonLabel={ mediaLibraryButtonLabel }
				typeFilter={ field.type_filter }
			>
				{
					( { openMediaBrowser } ) => {
						return <div className="cf-file__inner">
							<input
								type="hidden"
								name={ name }
								value={ value }
								readOnly
							/>

							{ ( value && !! data.id ) && (
								<div className="cf-file__content">
									<div className="cf-file__preview">
										<img src={ this.getThumb() } className="cf-file__image" />

										<button type="button" className="cf-file__remove dashicons-before dashicons-no-alt" onClick={ this.handleClear }></button>
									</div>

									<span className="cf-file__name" title={ data.filename || data.file_name }>
										{ data.filename || data.file_name }
									</span>
								</div>
							) }

							<button type="button" className="button cf-file__browse" onClick={ openMediaBrowser }>
								{ buttonLabel }
							</button>
						</div>;
					}
				}
			</MediaLibrary>
		);
	}
}

export default FileField;

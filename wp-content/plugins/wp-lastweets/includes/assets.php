<?php

namespace wp-lastweets\Assets;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue scripts and styles
 */
function enqueue_assets() {
	if ( ! \wp-lastweets\Options\get( 'wp-lastweets_load_css' ) || apply_filters( 'wp-lastweets/disable_default_css_loading', false ) ) {
		return;
	}

	wp_enqueue_style( 'wp-lastweets/theme', wp-lastweets_URL . 'assets/css/theme.css', [], wp-lastweets_VERSION );
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_assets' );

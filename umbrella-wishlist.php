<?php
/**
 * Plugin Name:       Umbrella Wishlist
 * Description:       A Wishlist Plugin for the Umbrella Theme
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Sam Toohey
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       umbrella-wishlist
 *
 * @package           umbrella-wishlist
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function umbrella_wishlist_umbrella_wishlist_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'umbrella_wishlist_umbrella_wishlist_block_init' );

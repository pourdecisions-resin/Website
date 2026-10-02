<?php
/**
 * Plugin Name:       Pour Decisions – In-Stock Shop
 * Description:       Treats every product as a one-of-a-kind piece: new products default to a stock of 1 and one per order, sold items drop off the shop automatically, and the [pd_shop] shortcode shows everything currently available.
 * Version:           1.0.0
 * Author:            Pour Decisions Resin & Wood
 * Requires Plugins:  woocommerce
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Text Domain:       pour-decisions-shop
 */

defined( 'ABSPATH' ) || exit;

/**
 * On activation, hide sold-out products from the shop so a piece
 * disappears as soon as it sells.
 */
register_activation_hook( __FILE__, function () {
	update_option( 'woocommerce_manage_stock', 'yes' );
	update_option( 'woocommerce_hide_out_of_stock_items', 'yes' );
} );

/**
 * When adding a new product, pre-fill the Inventory tab so it's a
 * one-of-a-kind item: "Track stock" on, quantity 1, "Limit purchases to 1".
 * These are only defaults — they can still be changed before publishing.
 */
add_action( 'admin_footer-post-new.php', function () {
	if ( get_current_screen()->post_type !== 'product' ) {
		return;
	}
	?>
	<script>
	jQuery( function ( $ ) {
		$( '#_manage_stock' ).prop( 'checked', true ).trigger( 'change' );
		$( '#_stock' ).val( 1 );
		$( '#_sold_individually' ).prop( 'checked', true ).trigger( 'change' );
	} );
	</script>
	<?php
} );

/**
 * [pd_shop] — grid of everything currently in stock, newest first.
 *
 * Optional attributes:
 *   columns  — products per row (default 3)
 *   category — only show this product category slug, e.g. [pd_shop category="cutting-boards"]
 *   empty    — message shown when everything has sold
 */
add_shortcode( 'pd_shop', function ( $atts ) {
	if ( ! function_exists( 'wc_get_products' ) ) {
		return '';
	}

	$atts = shortcode_atts( array(
		'columns'  => 3,
		'category' => '',
		'empty'    => __( 'Everything is sold out right now — new pieces are on the way, so check back soon!', 'pour-decisions-shop' ),
	), $atts, 'pd_shop' );

	$query = array(
		'status'       => 'publish',
		'stock_status' => 'instock',
		'limit'        => 1,
		'return'       => 'ids',
	);
	if ( $atts['category'] !== '' ) {
		$query['category'] = array( sanitize_title( $atts['category'] ) );
	}

	if ( empty( wc_get_products( $query ) ) ) {
		return '<p class="pd-shop-empty">' . esc_html( $atts['empty'] ) . '</p>';
	}

	$products = sprintf(
		'[products limit="24" columns="%d" orderby="date" order="DESC" paginate="true"%s]',
		absint( $atts['columns'] ),
		$atts['category'] !== '' ? ' category="' . esc_attr( sanitize_title( $atts['category'] ) ) . '"' : ''
	);

	return do_shortcode( $products );
} );

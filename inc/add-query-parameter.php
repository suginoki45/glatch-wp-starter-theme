<?php

function get_url_with_update_query( $file_name ) {
	$file_directory = get_template_directory() . $file_name;
	$file_url       = get_theme_file_uri( $file_name );

	if ( file_exists( $file_directory ) ) {
		echo esc_url( add_query_arg( 'ver', date( 'ymdHis', filemtime( $file_directory ) ), $file_url ) );
	}
}

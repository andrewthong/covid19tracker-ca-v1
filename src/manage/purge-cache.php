<?php

	$cached_files = glob("/etc/nginx/cache/*/*/*");
	array_map( 'unlink', $cached_files );

	echo "Nginx cache purged (".count($cached_files)." files)";

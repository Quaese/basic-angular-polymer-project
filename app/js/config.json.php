<?php
    require_once '../../srv/include/path.php';
?>

{
    "paths": {
        "abs_path": "<?php echo ABS_PATH; ?>",
        "img_path": "<?php echo ABS_PATH . IMG_PATH; ?>",
        "cover_path": "<?php echo ABS_PATH . COVER_PATH; ?>",
        "rel_cover_path": "<?php echo REL_COVER_PATH; ?>"
    },

    "templates": {
        "header": {"url": "views/header.tmpl.html", "class": ""},
        "topdivider": {"url": "views/topdivider.tmpl.html", "class": ""},
        "content": {"url": "views/content.tmpl.html", "class": ""},
        "scrolltotop": {"url": "views/scrolltotop.tmpl.html", "class": ""},
        "footer": {"url": "views/footer.tmpl.html", "class": ""}
    },

    "cd_config": {
        "types": ["CD", "2 CDs", "Maxi-CD", "LP", "MC"],
        "scores": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
}
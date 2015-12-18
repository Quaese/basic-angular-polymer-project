<?php
// require '../vendor/slim/slim/Slim/Slim.php';
require '../vendor/autoload.php';
require '../srv/include/path.php';
include '../srv/include/tools.php';

// require "Slim/Slim.php";

\Slim\Slim::registerAutoloader();



// load classes
spl_autoload_register('autoload_class');

function autoload_class($class_name) {
    $directories = array(
        '../srv/include/',
        '../srv/controller/',
        '../srv/model/'
    );

    foreach ($directories as $directory) {
        $filename = $directory . $class_name . '.php';
        // echo("<pre>".$filename."</pre>");
        if (is_file($filename)) {
            // echo("classname: " . $filename . "<br />");
            require($filename);
            break;
        }
    }
}


$arr = array(
    array('id' => 0, 'name' => 'none'),
    array('id' => 1, 'name' => 'acdc'),
    array('id' => 2, 'name' => 'blind guardian'),
    array('id' => 3, 'name' => 'civil war'),
    array('id' => 4, 'name' => 'def leppard'),
    array('id' => 5, 'name' => 'enforcer'),
    array('id' => 6, 'name' => 'flotsam & jetsam'),
    array('id' => 7, 'name' => 'zz top')
);

// create new Slim instance
$app = new \Slim\Slim();
$app->contentType('application/json');
// $db = ""; //new PDO('sqlite:db.sqlite3');
// $db = new dbconnect();


// --- CDs ----
/**
 * (GET)
 * Liefert ein Array mit CD-Objekten aller CDs zurück
 */
$app->get('/cds', function () use ($app) {
    // CD-Controller instanziieren
    $ctrlCD = new CDController();
    // Alle CDs aus Datenbank holen
    $ctrlCD->GetCD();
});

/**
 * (GET)
 * Informationen (GET) zu einer CD einer CD-ID
 *
 * Parameter
 * @id   - (integer) CD-ID
 */
$app->get('/cd/:id', function ($id) use ($app) {
    // global $arr;

    // echo json_encode($arr[$id]);

    // CD-Controller instanziieren
    $ctrlCD = new CDController();
    // CD zur angefragten ID aus Datenbank holen
    $ctrlCD->GetCD($id);
});

/**
 * (GET)
 * Informationen (GET) zu einer CD anhand eines Typs und einer CD-ID
 *
 * Parameter
 * @type - (string) Type (z.B. song)
 * @id   - (integer) CD-ID
 */
$app->get('/cd/:type/:id', function ($type, $id) use ($app){
    // echo json_encode(array('type' => $type, 'id' => $id), JSON_NUMERIC_CHECK);

    // Band-Controller instanziieren
    $ctrlCD = new CDController();
    // CD-Info aus Datenbank holen
    // Mögliche Typen (type):
    // - songs
    // - ...
    $ctrlCD->GetCdInfo((object) array(
        'type'    => $type,
        'id' => $id
    ));
});

/**
 * (GET)
 * Gruppiert CDs nach Erscheinungsjahr
 */
$app->get('/statistics/group-cds-by-year', function () use ($app) {
    // CD-Controller instanziieren
    $ctrlCD = new StatisticsController();
    // Alle CDs aus Datenbank holen
    $ctrlCD->GetStats("group-cds-by-year");
});


/**
 * (POST)
 * Speichert eine CD in der Datenbank
 */
$app->post('/cd', function () use ($app){
    // $req = $app->request();
    // $body = $req->getBody();
    // $_request = json_decode($body);

    // Band-Controller instanziieren
    $ctrlCD = new CDController();
    echo json_encode($_REQUEST, JSON_NUMERIC_CHECK);
    // echo json_encode(array('type' => $_REQUEST['type'], 'id' => $_REQUEST['id']), JSON_NUMERIC_CHECK);
    // CD-Info aus Datenbank holen

    // Mögliche Typen ($_REQUEST['type']):
    // - songs
    // - ...
    // $ctrlCD->PostCdInfo((object) array(
    //     'type'    => $_REQUEST['type'],
    //     'id' => $_REQUEST['id']
    // ));
});


// $app->put('/cd/:id', function ($id) use ($db, $app) {
$app->put('/cd/:id', function ($id) use ($app) {
   // update data
});

$app->delete('/cd/:id', function ($id) use ($db) {
   // delete data
});


// --- Bands ----
/**
 * (GET)
 * Liefert ein Array mit Band-Objekten aller Bands zurück
 */
$app->get('/bands', function () use ($app) {
    // // Band-Controller instanziieren
    $ctrlBand = new BandController();
    // // Alle Bands aus Datenbank holen
    $ctrlBand->GetBand();
});

/**
 * (GET)
 * Informationen (GET) zu einer Band einer Band-ID
 *
 * Parameter
 * @id   - (integer) Band-ID
 */
$app->get('/band/:id', function ($id) use ($app) {
    // Band-Controller instanziieren
    $ctrlBand = new BandController();
    // Band zur angefragten ID aus Datenbank holen
    $ctrlBand->GetBand($id);
});

/**
 * (GET)
 * Informationen (GET) zu einer Band einer Band-ID
 *
 * Parameter
 * @number   - (integer) Band-ID
 */
$app->get('/bandinfo/:number', function ($number) use ($app) {
    // Band-Controller instanziieren
    $ctrlBand = new BandController();
    // Bandinfo aus Datenbank holen
    $ctrlBand->GetBandInfo($number);
});


// --- Suche ----
// $app->get('/search/:pattern', function ($pattern) use ($app) {
//     // Band-Controller instanziieren
//     $ctrlSearch = new SearchController();
//     // Searchinfo aus Datenbank holen
//     $ctrlSearch->GetSearchResult((object) array(
//         'type'    => 'common',
//         'pattern' => $pattern
//     ));
// });

/**
 * (GET)
 * Suche über den gesamten Datenbestand anhand eines Typs und Suchbegriffen
 *
 * Parameter
 * @type    - (string) Type (z.B. common, bands, cds)
 * @pattern - (string) Suchbegriff(e)
 */
$app->get('/search/:type/:pattern', function ($type, $pattern) use ($app) {
    // Statistics-Controller instanziieren
    $ctrlSearch = new SearchController();
    // Searchinfo aus Datenbank holen
    // Mögliche Typen (type):
    // - common
    // - bands
    // - cds
    $ctrlSearch->GetSearchResult((object) array(
        'type'    => $type,
        'pattern' => $pattern
    ));
});
// ENDE  - Suche


// --- Authentication ----
/**
 * (POST)
 * Authentifiziert den Benutzer am System
 *
 * Requestparameter als JSON ({"username":"gast","password":"gast"})
 * Aufruf siehe: app/js/services/login-service.js -> Methode: AuthenticationService.Login
 */
$app->post('/authenticate', function () use ($app){
    $req = $app->request();
    $body = $req->getBody();
    $_request = json_decode($body);

    // User-Controller instanziieren
    $ctrlUser = new UserController();

    // User-Authentifizierung
    $ctrlUser->UserAuthentication((object) array(
        'username' => $_request->username,
        'password' => $_request->password
    ));
});
// ENDE  - Authentication


// --- Bilder-Service ----
/**
 * (GET)
 * Liefert die Cover der CDs zurück
 */
$app->get('/cover', function () use ($app) {
    // Dateinamen der Cover aus dem Cover-Verzeichnis auslesen
    $dir = "../" . REL_COVER_PATH;
    $hDir = dir($dir);
    $cover = array();
    $size;

    while($entry=$hDir->read()) {
        if(($entry == ".")||($entry == "..")){
        }else if((preg_match("/.jpg/i", $entry))||(preg_match("/.gif/i", $entry))||(preg_match("/.jpeg/i", $entry))||(preg_match("/.png/i", $entry))||(preg_match("/.bmp/i", $entry))){
            // Dimensionen ermitteln
            $size = getimagesize($dir . $entry);

            // Cover-Informationen in Objekt-Array schreiben
            $cover[] = array(
                "path" => ABS_PATH . COVER_PATH // . $entry,
                ,"src" => $entry
                ,"width" => $size[0]
                ,"height" => $size[1]
            );
        }
    }
    $hDir->close();

    // Array nach SubKey sortieren (Fkt. siehe ../srv/include/tools.php)
    sksort($cover, "src");

    // in JSON-String überführen
    echo json_encode($cover, JSON_NUMERIC_CHECK);
});
// ENDE  - Bilder-Service



// START - Externe APIs

// START: Discogs
/**
 * (GET)
 * Abfrage der Discogs-REST-Schnittstelle von Releases anhand der ID
 * Response (success): Objekt mit Infos zu tracks, artist ...
 */
$app->get('/discogs/:id', function ($id) use ($app) {

    // Discogs-REST-Schnittstelle zur Abfrage von Releases anhand der ID
    $url = 'api.discogs.com/releases/' . $id;

    // curl-Objekt instanziieren
    $curl = curl_init();

    // Optionen setzen
    curl_setopt($curl, CURLOPT_USERAGENT, 'TheVinylCrate/1.0 +hazadus.net');
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    // curl ausführen
    $output = curl_exec($curl);
    // Verbindung wieder schließen
    curl_close($curl);

    // Response zurückgeben
    echo $output;

});

// ENDE  - Externe APIs

// Anwendung starten!
$app->run();
?>
<?php
/**
 * Created by PhpStorm.
 * User: Guido
 * Date: 08.05.2017
 * Time: 09:14
 */


use Monolog\Logger;
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

require 'vendor/autoload.php';

$fileDir = dirname(__FILE__);
const DEBUG_PAGE_REQUESTED = '{name}.html requested';
const APP_LOG_PATH = './logs/app.log';

// Create and configure Slim app
$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

//$config['db']['host']   = "localhost";
//$config['db']['user']   = "user";
//$config['db']['pass']   = "password";
//$config['db']['dbname'] = "exampleapp";

$app_arr = ['settings' => $config];
$app = new App($app_arr);
$container = $app->getContainer();
$container['twig'] = function ($c) {
    $loader = new Twig_Loader_Filesystem(['./templates/', './static/']);
    return new Twig_Environment($loader, array());
};
$container['logger'] = function ($c) {
    $logLevel = Logger::DEBUG;
    $fileHandler = new \Monolog\Handler\RotatingFileHandler(APP_LOG_PATH, 0, $logLevel);
    $psrProcessor = new \Monolog\Processor\PsrLogMessageProcessor();
    $webProcessor = new \Monolog\Processor\WebProcessor();

    $browserHandler = new \Monolog\Handler\BrowserConsoleHandler($logLevel);
    $introspectionProcessor = new \Monolog\Processor\IntrospectionProcessor($logLevel);
    return new \Monolog\Logger('app_logger', [$fileHandler, $browserHandler], [$psrProcessor, $webProcessor, $introspectionProcessor]);
};


//$controllers = [];
//$controllers['frontend'] = new FrontendApplicationController($app);
//$controllers['static'] = new StaticFilesController($app);
//$app->group('/api', function () use ($app, $fileDir) {
//    $controllers['backend'] = new BackendApplicationController($app);
//    $controllers['backend'] = new MemoryWallApiController($app);
//});

// Define app routes
$app->get('[/]', function (Request $request, Response $response, $args) {
    try {
        /** @var Twig_Environment $twig */
        $twig = $this->twig;
        $response = $twig->render('./StartPage.html.twig');
        /** @var \Monolog\Logger $logger */
        $logger = $this->logger;
        $logger->debug(DEBUG_PAGE_REQUESTED, ['name' => 'StartPage']);
        return $response;
    } catch (\Exception $e) {
        return $response->write($e->getMessage());
    }
});
$app->get('/AboutTheDeveloper[/]', function (Request $request, Response $response, $args) {
    try {
        /** @var Twig_Environment $twig */
        $twig = $this->twig;
        $response = $twig->render('./AboutTheDeveloper.html.twig');
        /** @var \Monolog\Logger $logger */
        $logger = $this->logger;
        $logger->debug(DEBUG_PAGE_REQUESTED, ['name' => 'AboutTheDeveloper']);
        return $response;
    } catch (\Exception $e) {
        return $response->write($e->getMessage());
    }
});
$app->get('/Impressum[/]', function (Request $request, Response $response, $args) {
    try {
        /** @var Twig_Environment $twig */
        $twig = $this->twig;
        $response = $twig->render('./Impressum.html.twig');
        /** @var \Monolog\Logger $logger */
        $logger = $this->logger;
        $logger->debug(DEBUG_PAGE_REQUESTED, ['name' => 'Impressum']);
        return $response;
    } catch (\Exception $e) {
        return $response->write($e->getMessage());
    }
});
$app->group('/MemoryWall', function () use ($app) {
    $app->get('[/]', function (Request $request, Response $response, $args) {
        try {
            /** @var Twig_Environment $twig */
            $twig = $this->twig;
            $response = $twig->render('./MemoryWallStartPage.html.twig');
            /** @var \Monolog\Logger $logger */
            $logger = $this->logger;
            $logger->debug(DEBUG_PAGE_REQUESTED, ['name' => 'MemoryWallStartPage']);
            return $response;
        } catch (\Exception $e) {
            return $response->write($e->getMessage());
        }
    });

});
$app->group('/Game', function () use ($app) {
    $app->get('[/[#]]', function (Request $request, Response $response, $args) {
      try {
          /** @var Twig_Environment $twig */
          $twig = $this->twig;
          $response = $twig->render('./GameLauncher.html.twig');
          /** @var \Monolog\Logger $logger */
          $logger = $this->logger;
          $logger->debug(DEBUG_PAGE_REQUESTED, ['name' => 'GameLauncher']);
          return $response;
      } catch (\Exception $e) {
          return $response->write($e->getMessage());
      }
    });
    // $app->get('/{name}[/]', function (Request $request, Response $response, $args) {
    //     try {
    //         $gameName = $request->getAttribute('name');
    //         $path = 'games/' . $gameName . '/index.html';
    //         /** @var Twig_Environment $twig */
    //         $twig = $this->twig;
    //         $response = $twig->render($path);
    //         /** @var \Monolog\Logger $logger */
    //         $logger = $this->logger;
    //         $logger->debug(DEBUG_PAGE_REQUESTED, ['name' => $gameName]);
    //         return $response;
    //     } catch (\Exception $e) {
    //         return $response->write($e->getMessage());
    //     }
    // });
});
$app->group('/api', function () use ($app, $fileDir) {
    $app->get('/header-links[/]', function (Request $request, Response $response, $args) use ($fileDir) {
        try {
            $jsonFile = file_get_contents($fileDir . '/data/header-links.json');
            $jsonPhp = json_decode($jsonFile, true);
            $json = json_encode($jsonPhp);
            return $response->withJson($jsonPhp);
        } catch (\Exception $e) {
            $response->write($e->getMessage());
            return $response->withStatus(500);
        }
    });
    $app->get('/footer-links[/]', function (Request $request, Response $response, $args) use ($fileDir) {
        try {
            $jsonFile = file_get_contents($fileDir . '/data/footer-links.json');
            $jsonPhp = json_decode($jsonFile, true);
            return $response->withJson($jsonPhp);
        } catch (\Exception $e) {
            $response->write($e->getMessage());
            return $response->withStatus(500);
        }
    });

    $app->get('/languages+frameworks[/]', function (Request $request, Response $response, $args) use ($fileDir) {
        try {
            $jsonFile = file_get_contents($fileDir . '/data/languages+frameworks.json');
            $jsonPhp = json_decode($jsonFile, true);
            $json = json_encode($jsonPhp);
            return $response->withJson($jsonPhp);
        } catch (\Exception $e) {
            $response->write($e->getMessage());
            return $response->withStatus(500);
        }
    });
    $app->get('/games[/]', function (Request $request, Response $response, $args) use ($fileDir) {
        try {
            $jsonFile = file_get_contents($fileDir . '/data/games.json');
            $jsonPhp = json_decode($jsonFile, true);
            $json = json_encode($jsonPhp);
            return $response->withJson($jsonPhp);
        } catch (\Exception $e) {
            $response->write($e->getMessage());
            return $response->withStatus(500);
        }
    });


    $app->group('/memorywall', function () use ($app) {


        $app->get('/moment/{moment-id}/image/{image-id}[/]', function (Request $request, Response $response, $args) {
            $momentId = $request->getAttribute('moment-id');
            $imageId = $request->getAttribute('image-id');

            $message = 'image ' . $imageId . ' from moment ' . $momentId . ' requested';

//            $response->write('hi');
            return $response;
        });

        $app->get('/person/{person-id}/image/{image-id}[/]', function (Request $request, Response $response, $args) {
            $personId = $request->getAttribute('person-id');
            $imageId = $request->getAttribute('image-id');
            $imgPath = 'backend/memory-wall/person/' . $personId . '/image/' . $imageId . '.jpg';
            $image = imagecreatefromjpeg($imgPath);
            /** @var \Monolog\Logger $logger */
            $logger = $this->logger;
            $logger->debug('Image ' . $imageId . ' from ' . $personId . ' requested; ' . $image);
//            $newStream = new \GuzzleHttp\Psr7\LazyOpenStream('/path/to/file', 'r');
            /** @var Response $response */
            $response->write($image);
            $response = $response->withHeader('Content-Type', 'image/jpeg');
            return $response;
        });
    });
});


// Run app
$app->run();

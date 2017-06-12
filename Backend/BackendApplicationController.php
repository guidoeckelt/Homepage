<?php
/**
 * Created by PhpStorm.
 * User: Guido
 * Date: 14.05.2017
 * Time: 14:35
 */

namespace HomePage\Backend;


use HomePage\Common\Controller;
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;


class BackendApplicationController extends Controller
{
    public function registerRoutes(App $app)
    {
        $fileDir = dirname(__FILE__);
        $baseDir = dirname($fileDir);
        $app->get('/languages+frameworks', function (Request $request, Response $response, $args) use ($fileDir) {
            try {

                $jsonFile = file_get_contents($fileDir . '/data/languages+frameworks.json');
                $json = json_decode($jsonFile, true);
                return $response->withJson($json);
            } catch (\Exception $e) {
                return $response->write($e->getMessage());
            }
        });
        $app->get('/links', function (Request $request, Response $response, $args) use ($fileDir) {
            try {

                $jsonFile = file_get_contents($fileDir . '/data/header-links.json');
                $json = json_decode($jsonFile, true);
                return $response->withJson($json);
            } catch (\Exception $e) {
                return $response->write($e->getMessage());
            }
        });
    }
}

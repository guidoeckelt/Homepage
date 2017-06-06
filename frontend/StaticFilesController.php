<?php
/**
 * Created by PhpStorm.
 * User: Guido
 * Date: 14.05.2017
 * Time: 14:29
 */

namespace HomePage\Frontend;


use HomePage\Common\Controller;
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

class StaticFilesController extends Controller
{
    public function registerRoutes(App $app)
    {
        $app->get('/static/', function (Request $request, Response $response, $args) use ($app) {
            /** @var PhpRenderer $view */
//            $view = $app->get('view');
            $view = $this->get('view');
            return $view->render($response, "StartPage.html", ['view' => $view]);
        });
    }
}
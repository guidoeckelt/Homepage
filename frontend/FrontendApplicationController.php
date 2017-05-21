<?php
/**
 * Created by PhpStorm.
 * User: Guido
 * Date: 14.05.2017
 * Time: 14:35
 */

namespace HomePage\Frontend;


use HomePage\Common\Controller;
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Views\PhpRenderer;

class FrontendApplicationController extends Controller
{
    public function registerRoutes(App $app)
    {
        $app->get('[/]', function (Request $request, Response $response, $args) {
            /** @var PhpRenderer $view */
            try {
//        $view = $app->getContainer()->get('view');
                $view = $this->view;
                return $view->render($response, "StartPage.html", ['view' => $view]);

            } catch (\Exception $e) {
                return $response->write($e->getMessage());
            }
        });
        $app->get('/AboutTheDeveloper[/]', function (Request $request, Response $response, $args) use ($app) {
            /** @var PhpRenderer $view */
            try {
                $view = $app->getContainer()->get('view');
//            $view = $this->get('view');
                return $view->render($response, "AboutTheDeveloper.html", ['view' => $view]);
            } catch (\Exception $e) {
                return $response->write($e->getMessage());
            }
        });
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: Guido
 * Date: 14.05.2017
 * Time: 15:45
 */

namespace HomePage\Common;


use Slim\App;

abstract class Controller
{


    /**
     * Controller constructor.
     * @param App $app
     */
    public function __construct(App $app)
    {
        $this->registerRoutes($app);
    }

    protected abstract function registerRoutes(App $app);

}
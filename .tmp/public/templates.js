angular.module('templates-app', ['about/index.tpl.html', 'home/index.tpl.html', 'intro/index.tpl.html', 'login/index.tpl.html', 'register/index.tpl.html', 'sidebar/index.tpl.html']);

angular.module("about/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<div class=\"surface-container home-pad\">\n" +
    "  our network of advisors, consisting of hunderds of companies spanning the globe. \n" +
    "</div>");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<div ng-include=\"'intro/index.tpl.html'\"></div>\n" +
    "\n" +
    "<canvas id=\"scene\"></canvas>\n" +
    "\n" +
    "<div id=\"header-container\">\n" +
    "	<canvas id=\"scene\"></canvas>\n" +
    "    <div style=\"text-align:center;\" id=\"header-text-area\">\n" +
    "       <p style=\"color:rgb(255,255,255);font-size:64px;margin-left:10%\">empowered financial decisions</p>\n" +
    "       <p style=\"color:rgb(255,255,255);margin-left:15%\">backed by sound, open, data</p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"centered-width\">\n" +
    "	<br>\n" +
    "	<h3 style=\"text-align:center;\">a computational network designed to normalize risk and equalize investment returns.</h3>\n" +
    "	<br><br>\n" +
    "	<div class=\"section-tout\"> \n" +
    "	  <div class=\"container\">\n" +
    "	    <div class=\"row\">\n" +
    "	      <div class=\"col-lg-4 col-sm-6\">\n" +
    "	        <h3><i class=\"fa fa-file-o\"></i> open datasets -- coin</h3>\n" +
    "	        <p>data, we use. data we prouduce, together. </p>\n" +
    "	      </div>\n" +
    "	      <div class=\"col-lg-4 col-sm-6\">\n" +
    "	        <h3><i class=\"fa fa-github\"></i> community algs</h3>\n" +
    "	        <p>contribute. collab, invest, bitcoin</p>\n" +
    "	      </div>\n" +
    "	      <div class=\"col-lg-4 col-sm-6\">\n" +
    "	        <h3><i class=\"fa fa-wrench\"></i>back testing -- open data -- look at our results </h3>\n" +
    "	        <p>(y)our machines are continuously running and producing valuable investment information, check it.</p>\n" +
    "	      </div>\n" +
    "	      <div class=\"col-lg-4 col-sm-6\">\n" +
    "	        <h3><i class=\"fa fa-cogs\"></i> transparent finance </h3>\n" +
    "	         <p>Changes are contained with transparency.</p>\n" +
    "	      </div>\n" +
    "	      <div class=\"col-lg-4 col-sm-6\">\n" +
    "	        <h3><i class=\"fa fa-cloud\"></i> mapping the market</h3>\n" +
    "	        <p><a href=\"./help/#api\">APIs</a> are available.</p>\n" +
    "	      </div>\n" +
    "	      <div class=\"col-lg-4 col-sm-6\">\n" +
    "	        <h3><i class=\"fa fa-bullhorn\"></i> Stay Updated</h3>\n" +
    "	        <p>Be notified about updates by subscribing.</p>\n" +
    "	      </div>\n" +
    "	    </div>\n" +
    "\n" +
    "	  </div>\n" +
    "	</div>\n" +
    "\n" +
    "	<br>\n" +
    "	<p class=\"lead\">nice...</p>\n" +
    "	<a href=\"/stats/\">now let me see some numbers</a>\n" +
    "	<br><br><br>\n" +
    "	<p class=\"lead\">where does the money go?</p>\n" +
    "	<p class=\"lead\">mapping out the investment space</p>\n" +
    "	<br><br><br><br><br><br>\n" +
    "</div>\n" +
    "\n" +
    "<div style=\"background-color:rgb(220,220,240);height:750px;\">\n" +
    "	<br><br><br>\n" +
    "	<h1 style=\"text-align:center;\">why you'll love investingfor</h1>\n" +
    "	<br><br>\n" +
    "	<p style=\"text-align:center;\"><i style=\"font-size:256px;\" class=\"fa fa-heart-o\"></i></p>\n" +
    "	<p class=\"lead\" style=\"text-align:center;\">the computing power around us is immense!</p>\n" +
    "	<br>\n" +
    "	<p class=\"lead\" style=\"text-align:center;\">investingfor uses the idle power of the computational potiental around us.</p>\n" +
    "	<br>\n" +
    "	<p class=\"lead\" style=\"text-align:center;\">what if our devices were working toward a common goal?</p>\n" +
    "	<br>\n" +
    "	<p class=\"lead\" style=\"text-align:center;\">extract value by earning <a href=\"http://www.epoint.me/market/investment-point\">investment points</a>.</p>\n" +
    "	<br>\n" +
    "	<p class=\"lead\" style=\"text-align:center;\">investingfor us all.</p>\n" +
    "	<br><br><br>\n" +
    "</div>\n" +
    "<div style=\"background-color:rgb(240,220,220);height:750px;text-align:center;\">\n" +
    "	<br><br><br>\n" +
    "	<h1>sound and transparent investments</h1>\n" +
    "</div>\n" +
    "<div style=\"background-color:rgb(220,240,220);height:750px;text-align:center;\">\n" +
    "	<br><br><br>\n" +
    "	<h1>more stuff</h1>\n" +
    "	<p>a decentralized network that works together to power financial simulations. financed by investmentcoin. r8\n" +
    "</p></div>\n" +
    "\n" +
    "");
}]);

angular.module("intro/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("intro/index.tpl.html",
    "<div class=\"intro-container\">\n" +
    "    <svg style=\"z-index:10\" class=\"intro\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1920 1080\" width=\"1920px\" height=\"1080px\" preserveAspectRatio=\"xMidYMid slice\">\n" +
    "        <defs>\n" +
    "            <mask class=\"intro-mask\" id=\"intro-mask\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" maskUnits=\"userSpaceOnUse\">\n" +
    "                <rect class=\"intro-rect\" x=\"0\" y=\"0\" width=\"1920px\" height=\"1080px\"></rect>\n" +
    "                <text x=\"960\" y=\"46%\" class=\"medium-text desktop\">investingfor</text>\n" +
    "                <text x=\"960\" y=\"44%\" class=\"medium-text mobile\">embrace change</text>\n" +
    "                <text x=\"960\" y=\"51%\" class=\"small-text mantra\">lessen risk, bolster returns</text>\n" +
    "                <text x=\"960\" y=\"67.5%\" class=\"small-text learn-more\">learn more</text>\n" +
    "                <a href=\"#about\" du-smooth-scroll>\n" +
    "                    <svg class=\"tri-before\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"883px\" y=\"68%\" width=\"150px\" height=\"150px\" viewBox=\"0 0 723 626\" enable-background=\"new 0 0 723 626\" xml:space=\"preserve\">\n" +
    "                        <g>\n" +
    "                          <path fill=\"#232322\" d=\"M0,0h723v1.58c-3.72,4.37-5.58,9.96-8.89,14.62C596.69,219.439,479.44,422.79,361.96,626h-0.6\n" +
    "                            C243.45,421.77,125.54,217.55,7.63,13.32C5.09,9.061,2.85,4.62,0,0.55V0z\"></path>\n" +
    "                          <path fill=\"#FFFFFF\" d=\"M86.57,48.002c183.289,0.01,366.569-0.02,549.859,0.02c-40.779,70.681-81.6,141.33-122.39,212.01\n" +
    "                            c-7.36,12.841-14.91,25.58-22.11,38.521l-0.229-0.01c-86.79-0.09-173.59-0.06-260.38-0.011h-0.211\n" +
    "                            c-20.239-35.569-40.899-70.899-61.289-106.379C142.061,144.111,114.359,96.031,86.57,48.002z\"></path>\n" +
    "                          <path fill=\"#21B795\" d=\"M231.311,298.599c86.79-0.049,173.59-0.079,260.38,0.011c-19.42,34.3-39.36,68.31-59,102.479\n" +
    "                            c-23.71,41.091-47.44,82.16-71.15,123.25c-20.92-36.039-41.68-72.17-62.55-108.229C276.48,376.909,253.65,337.89,231.311,298.599z\"></path>\n" +
    "                        </g>\n" +
    "                    </svg>\n" +
    "                </a>\n" +
    "            </mask>\n" +
    "        </defs>\n" +
    "        <rect class=\"intro-rect\" x=\"0\" y=\"0\" width=\"1920px\" height=\"1080px\"></rect>\n" +
    "        <a href=\"#about\" class=\"hvr-bob\" du-smooth-scroll>\n" +
    "            <svg class=\"tri-after\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"883px\" y=\"68%\" width=\"150px\" height=\"150px\" viewBox=\"0 0 723 626\" enable-background=\"new 0 0 723 626\" xml:space=\"preserve\">\n" +
    "                <g>\n" +
    "                  <path fill=\"#232322\" d=\"M0,0h723v1.58c-3.72,4.37-5.58,9.96-8.89,14.62C596.69,219.439,479.44,422.79,361.96,626h-0.6\n" +
    "                    C243.45,421.77,125.54,217.55,7.63,13.32C5.09,9.061,2.85,4.62,0,0.55V0z\"></path>\n" +
    "                  <path fill=\"#FFFFFF\" d=\"M86.57,48.002c183.289,0.01,366.569-0.02,549.859,0.02c-40.779,70.681-81.6,141.33-122.39,212.01\n" +
    "                    c-7.36,12.841-14.91,25.58-22.11,38.521l-0.229-0.01c-86.79-0.09-173.59-0.06-260.38-0.011h-0.211\n" +
    "                    c-20.239-35.569-40.899-70.899-61.289-106.379C142.061,144.111,114.359,96.031,86.57,48.002z\"></path>\n" +
    "                  <path fill=\"#21B795\" d=\"M231.311,298.599c86.79-0.049,173.59-0.079,260.38,0.011c-19.42,34.3-39.36,68.31-59,102.479\n" +
    "                    c-23.71,41.091-47.44,82.16-71.15,123.25c-20.92-36.039-41.68-72.17-62.55-108.229C276.48,376.909,253.65,337.89,231.311,298.599z\"></path>\n" +
    "                </g>\n" +
    "            </svg>\n" +
    "        </a>\n" +
    "    </svg>\n" +
    "    <video id=\"video\" autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\">\n" +
    "        <source src=\"videos/stock.mp4\" type=\"video/mp4\">\n" +
    "    </video>\n" +
    "    <img class=\"intro-img\" id=\"image\" src=\"http://36.media.tumblr.com/318b26ada390554e3940e1907c0e6d0f/tumblr_no0pwu8TmB1uuhx17o1_1280.jpg\">\n" +
    "</div>");
}]);

angular.module("login/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/index.tpl.html",
    "<!--login-->\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-6\">\n" +
    "        <h3>Login</h3>\n" +
    "        <form class=\"form-horizontal\" role=\"form\" action=\"/auth/local\" method=\"post\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputUsername3\" class=\"col-sm-2 control-label\">Username</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"inputUsername3\" name=\"identifier\" placeholder=\"Username\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputPassword3\" class=\"col-sm-2 control-label\">Password</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"password\" class=\"form-control\" id=\"inputPassword3\" name=\"password\" placeholder=\"Password\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-default\">Sign in</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("register/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("register/index.tpl.html",
    "<!--register-->\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-6\">\n" +
    "        <h3>Create an Account</h3>\n" +
    "        <form class=\"form-horizontal\" role=\"form\" action=\"/auth/local/register\" method=\"post\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputUsername3\" class=\"col-sm-2 control-label\">Username</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"inputUsername3\" name=\"username\" placeholder=\"Username\" value=\"\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputPassword3\" class=\"col-sm-2 control-label\">Password</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"password\" class=\"form-control\" id=\"inputPassword3\" name=\"password\" placeholder=\"Password\" value=\"\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputEmail3\" class=\"col-sm-2 control-label\">Email</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"email\" class=\"form-control\" id=\"inputEmail3\" name=\"email\" placeholder=\"Email\" value=\"\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputFirstName3\" class=\"col-sm-2 control-label\">First Name</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"inputFirstName3\" name=\"first_name\" placeholder=\"First Name\" value=\"\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-default\">Sign in</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<a href=\"/login\">already have an account?</a>");
}]);

angular.module("sidebar/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sidebar/index.tpl.html",
    "<div ng-controller=\"SidebarCtrl\">\n" +
    "    <div class=\"page-nav-zone\">\n" +
    "        <div class=\"flex-item-top\"></div>\n" +
    "        <div class=\"item-container\">\n" +
    "            <a href=\"/\">\n" +
    "                <div class=\"list-item\">\n" +
    "                    <div class=\"nav-large-list\">Home</div>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"item-container\">\n" +
    "            <a href=\"/about\">\n" +
    "                <div class=\"list-item\">\n" +
    "                    <div class=\"nav-small-list\"><i class=\"fa fa-info\"></i></div>\n" +
    "                    <div class=\"nav-large-list\">About</div>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"item-container\">\n" +
    "            <a href=\"/portfolio\">\n" +
    "                <div class=\"list-item\">\n" +
    "                    <div class=\"nav-small-list\"><i class=\"fa fa-picture-o\"></i></div>\n" +
    "                    <div class=\"nav-large-list\">Portfolio</div>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"item-container\">\n" +
    "            <a href=\"/register\">\n" +
    "                <div class=\"list-item\">\n" +
    "                    <div class=\"nav-small-list\"><i class=\"fa fa-newspaper-o\"></i></div>\n" +
    "                    <div class=\"nav-large-list\">Register</div>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"flex-item-bottom\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

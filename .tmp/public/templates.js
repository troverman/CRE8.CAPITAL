angular.module('templates-app', ['about/index.tpl.html', 'account/index.tpl.html', 'footer/index.tpl.html', 'home/index.tpl.html', 'intro/index.tpl.html', 'login/index.tpl.html', 'market/index.tpl.html', 'member/index.tpl.html', 'nav/index.tpl.html', 'register/index.tpl.html']);

angular.module("about/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "	<h2>investingfor</h2>\n" +
    "	<p>our network of advisors, consisting of hunderds of companies spanning the globe.</p> \n" +
    "\n" +
    "	<br><br><br>\n" +
    "	<nvd3 options='options' data='data'></nvd3>\n" +
    "	<br><br><br>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-lg-4 col-sm-6\">\n" +
    "      <h3><i class=\"fa fa-file-o\"></i> open datasets</h3>\n" +
    "      <p>data, we use. data we prouduce, together.</p>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-4 col-sm-6\">\n" +
    "      <h3><i class=\"fa fa-github\"></i> community algs</h3>\n" +
    "      <p>contribute. collab. invest.</p>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-4 col-sm-6\">\n" +
    "      <h3><i class=\"fa fa-wrench\"></i>view our results </h3>\n" +
    "      <p>(y)our machines are continuously running and producing valuable investment information. it's <a href=\"#\">it's transparent</a></p>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-4 col-sm-6\">\n" +
    "      <h3><i class=\"fa fa-cogs\"></i> transparent finance </h3>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-4 col-sm-6\">\n" +
    "      <h3><i class=\"fa fa-cloud\"></i> mapping the market</h3>\n" +
    "      <p><a href=\"./help/#api\">APIs</a> are available.</p>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-4 col-sm-6\">\n" +
    "      <h3><i class=\"fa fa-bullhorn\"></i> Stay Updated</h3>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-include=\"'register/index.tpl.html'\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("account/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("account/index.tpl.html",
    "<div class=\"container\">\n" +
    "	<h1>user info</h1>\n" +
    "	<p>edit etc</p>\n" +
    "	<h2>api key</h2>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "STR	Ste\n" +
    "XEM	NEM\n" +
    "NXT	NXT\n" +
    "USDT\n" +
    "ETH	Et\n" +
    "LTC	Li\n" +
    "BCH	Bit\n" +
    "BTC	Bit\n" +
    "AMP	Syn\n" +
    "ARDR\n" +
    "BCN	By\n" +
    "BCY	Bit\n" +
    "BEL\n" +
    "BLK	Bla\n" +
    "BTCD\n" +
    "BTM	Bit\n" +
    "Tempora\n" +
    "BTS	Bit\n" +
    "BURST\n" +
    "CLAM\n" +
    "CVC	C\n" +
    "DAS\n" +
    "DCR	De\n" +
    "DGB	Di\n" +
    "DOGE\n" +
    "EMC2\n" +
    "ETC	Ethw\n" +
    "EXP	Exp\n" +
    "FCT	Fa\n" +
    "FLDC\n" +
    "FLO	Flo\n" +
    "GAME\n" +
    "GAS	Gas\n" +
    "GNO	Gn\n" +
    "GNT	G\n" +
    "GRC	Griw\n" +
    "HUC	Hun\n" +
    "LBC	LBR\n" +
    "LSK	\n" +
    "MAIDw\n" +
    "NAV	NAV\n" +
    "NEOS\n" +
    "NMC	Na\n" +
    "NXC	Ne\n" +
    "OMG	Omi\n" +
    "OMN\n" +
    "PASC\n" +
    "PINK\n" +
    "POT\n" +
    "PPC\n" +
    "RADS\n" +
    "REP\n" +
    "RIC\n" +
    "SBD\n" +
    "SC\n" +
    "STEEM\n" +
    "STORJ\n" +
    "STRAT\n" +
    "SYS	Sys\n" +
    "VIA	Via\n" +
    "VRC	Ve\n" +
    "VTC	Ve\n" +
    "XBC	Bit\n" +
    "XCP	Cou\n" +
    "XMR	Mo\n" +
    "XPM	Pri\n" +
    "XRP	Ri\n" +
    "XVC	V\n" +
    "ZEC	Z\n" +
    "ZRX	0x\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "<div st\n" +
    "");
}]);

angular.module("footer/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("footer/index.tpl.html",
    "<div class=\"footer\" ng-controller=\"FooterCtrl\">\n" +
    "  <div class=\"container\">\n" +
    "    {{date | date:'yyyy'}} <a href=\"/\">investingfor</a>\n" +
    "    <a href=\"/about\">about</a>\n" +
    "    <a href=\"#\">terms</a>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<div ng-include=\"'intro/index.tpl.html'\"></div>\n" +
    "<!--<nvd3 options='options' data='data'></nvd3>\n" +
    "<nvd3 options='directedOptions' data='directedData'></nvd3>-->\n" +
    "\n" +
    "\n" +
    "<div class=\"container\" id=\"about\">\n" +
    "	<div style=\"height:50px;\"></div>\n" +
    "    <div style=\"text-align:left;\" id=\"header-text-area\">\n" +
    "       <h1>empowered financial representation</h1>\n" +
    "       <h3 style=\"\">backed by sound, open, data</h3>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "	<br>\n" +
    "	<!--<h3 style=\"text-align:center;\">a computational network designed to normalize risk and equalize investment returns.</h3>-->\n" +
    "	<p>select financial representatives</p>\n" +
    "	<br>\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-lg-6 col-sm-6\">\n" +
    "			<h3><i class=\"fa fa-wrench\"></i> financial representation </h3>\n" +
    "			<p>a community of transparent analysts </p>\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-6 col-sm-6\">\n" +
    "			<h3><i class=\"fa fa-github\"></i> community collaboration and discussion</h3>\n" +
    "			<p>contribute. collab. invest.</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-lg-4 col-sm-6\">\n" +
    "			<h3><i class=\"fa fa-file-o\"></i> open datasets</h3>\n" +
    "			<p>data, we use. data we prouduce, together.</p>\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-4 col-sm-6\">\n" +
    "			<h3><i class=\"fa fa-wrench\"></i> view the analysis </h3>\n" +
    "			<p>distributed networks working together to give you the cutting edge</p>\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-4 col-sm-6\">\n" +
    "			<h3><i class=\"fa fa-cogs\"></i> transparent finance </h3>\n" +
    "			<p>data-backed and proven results</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<br>\n" +
    "	<p class=\"lead\">nice...</p>\n" +
    "	<a href=\"/about\">now let me see some numbers</a>\n" +
    "	<br><br><br>\n" +
    "</div>\n" +
    "\n" +
    "<!--<div style=\"background-color:rgb(220,220,220);\">\n" +
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
    "</div>-->\n" +
    "\n" +
    "<div style=\"text-align:left\">\n" +
    "	<br><br><br>\n" +
    "	<div class=\"container\" style=\"\">\n" +
    "		<h4>decentralized network that works together to power financial simulations.</h4>\n" +
    "		<nvd3 options='options' data='data'></nvd3>\n" +
    "		<br><br>\n" +
    "		\n" +
    "		<div ng-repeat=\"pair in tradingPairs\">\n" +
    "			<div class=\"col-md-3\">\n" +
    "				<a href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<!--<div class=\"col-md-3\">\n" +
    "			<div ng-repeat=\"pair in tradingPairs\">\n" +
    "				<a ng-show=\"pair.split('/')[1] == 'BTC'\" href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"col-md-3\">\n" +
    "			<div ng-repeat=\"pair in tradingPairs\">\n" +
    "				<a ng-show=\"pair.split('/')[1] == 'USDT'\" href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"col-md-3\">\n" +
    "			<div ng-repeat=\"pair in tradingPairs\">\n" +
    "				<a ng-show=\"pair.split('/')[1] == 'ETH'\" href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"col-md-3\">\n" +
    "			<div ng-repeat=\"pair in tradingPairs\">\n" +
    "				<a ng-show=\"pair.split('/')[1] == 'XMR'\" href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "			</div>\n" +
    "		</div>-->\n" +
    "\n" +
    "	</div>\n" +
    "	<br><br><br>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div style=\"text-align:left;\">\n" +
    "	<br><br><br>\n" +
    "	<div class=\"container\">\n" +
    "		<h1>Activity</h1>\n" +
    "\n" +
    "		<button class=\"btn btn-default\" ng-click=\"seletetData('BTC', 'LTC', '1000')\">'BTC', 'LTC', '1000'</button>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"seletetData('BTC', 'LTC', '5000')\">'BTC', 'LTC', '5000'</button>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"seletetData('BTC', 'LTC', '30000')\">'BTC', 'LTC', '30000'</button>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"seletetData('BTC', 'LTC', '60000')\">'BTC', 'LTC', '60000'</button>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"seletetData('BTC', 'LTC', '300000')\">'BTC', 'LTC', '300000'</button>\n" +
    "\n" +
    "		<button class=\"btn btn-default\" ng-click=\"seletetData('BTC', 'BCY', '1000')\">'BTC', 'BCY', '1000'</button>\n" +
    "		<nvd3 options='marketOptions' data='marketGraphDataRender'></nvd3>\n" +
    "		<!--<div ng-repeat=\"someData in marketData\">\n" +
    "			{{someData.assetPair}}, {{someData.price}}, {{someData.currentBid}}, {{someData.currentAsk}}, {{someData.currentAsk - someData.currentBid}} {{someData.createdAt}}, {{someData.delta}}\n" +
    "		</div>-->\n" +
    "		<h4>sound and transparent investments</h4>\n" +
    "	</div>\n" +
    "	<br><br><br>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-include=\"'register/index.tpl.html'\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("intro/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("intro/index.tpl.html",
    "<div ng-controller=\"IntroCtrl\" class=\"intro-container\">\n" +
    "    <svg style=\"z-index:10\" class=\"intro\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1920 1080\" width=\"1920px\" height=\"1080px\" preserveAspectRatio=\"xMidYMid slice\">\n" +
    "        <defs>\n" +
    "            <mask class=\"intro-mask\" id=\"intro-mask\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" maskUnits=\"userSpaceOnUse\">\n" +
    "                <rect class=\"intro-rect\" x=\"0\" y=\"0\" width=\"1920px\" height=\"1080px\"></rect>\n" +
    "                <text x=\"960\" y=\"46%\" class=\"medium-text desktop\">investingfor</text>\n" +
    "                <text x=\"960\" y=\"44%\" class=\"medium-text mobile\">empowered financial representation</text>\n" +
    "                <text x=\"960\" y=\"51%\" class=\"small-text mantra\">empowered financial representation</text>\n" +
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
    "    <canvas style=\"position:absolute;top:0%;left:0%;\" id=\"scene\"></canvas>\n" +
    "    <!--<video id=\"video\" autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\">\n" +
    "        <source src=\"videos/stock.mp4\" type=\"video/mp4\">\n" +
    "    </video>-->\n" +
    "</div>");
}]);

angular.module("login/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("login/index.tpl.html",
    "<div class=\"intro-header\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1\">\n" +
    "                <div class=\"site-heading\">\n" +
    "                    <h1 class=\"blue-title\">Login</h1>\n" +
    "                    <hr class=\"small\">\n" +
    "                    <h2 class=\"post-title\">\n" +
    "                        Welcome back!\n" +
    "                    </h2>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-6 col-lg-offset-3 col-md-10 col-md-offset-1\">\n" +
    "            <div class=\"login-form\">\n" +
    "                <form role=\"form\" method=\"post\" action=\"/auth/local\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input class=\"form-control\" name=\"identifier\" placeholder=\"Email or Username\" title=\"username\" type=\"text\"> \n" +
    "                        <i class=\"fa fa-user\"></i>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group log-status\">\n" +
    "                        <input class=\"form-control\" type=\"password\" name=\"password\" placeholder=\"Password\" title=\"password\"> \n" +
    "                        <i class=\"fa fa-lock\"></i>\n" +
    "                    </div>\n" +
    "                    <div class=\"align-right\">\n" +
    "                        <button class=\"btn btn-default log-btn\" type=\"submit\" value=\"submit\">Sign in</button>\n" +
    "                    </div>\n" +
    "                    <br><br>\n" +
    "                    <div class=\"social-log\">\n" +
    "                        <a class=\"btn btn-social btn-facebook\" href=\"\"><i class=\"fa fa-facebook\"></i> Facebook</a>\n" +
    "                        <a class=\"btn btn-social btn-twitter\" href=\"\"><i class=\"fa fa-twitter\"></i> Twitter</a>\n" +
    "                        <a class=\"btn btn-social btn-google\" href=\"\"><i class=\"fa fa-google\"></i> Google</a>\n" +
    "                    </div>\n" +
    "                    <br><hr>\n" +
    "                    <div class=\"\">\n" +
    "                        <a style=\"text-align:center\" href=\"/register\">Need an account?</a>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("market/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("market/index.tpl.html",
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "	<h2>{{stateParams.path1}} / {{stateParams.path2}}</h2>\n" +
    "\n" +
    "	<button class=\"btn btn-default\" ng-click=\"seletetData(stateParams.path1, stateParams.path2, '1000')\">{{stateParams.path1}} / {{stateParams.path2}}: 1 second</button>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"seletetData(stateParams.path1, stateParams.path2, '5000')\">{{stateParams.path1}} / {{stateParams.path2}}: 5 seconds</button>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"seletetData(stateParams.path1, stateParams.path2, '30000')\">{{stateParams.path1}} / {{stateParams.path2}}: 30 seconds'</button>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"seletetData(stateParams.path1, stateParams.path2, '60000')\">{{stateParams.path1}} / {{stateParams.path2}}: 1 min</button>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"seletetData(stateParams.path1, stateParams.path2, '300000')\">{{stateParams.path1}} / {{stateParams.path2}}: 5 min</button>\n" +
    "	\n" +
    "	<h2>Price Data</h2>\n" +
    "	<nvd3 options='marketOptions' data='marketGraphDataRender'></nvd3>\n" +
    "\n" +
    "	<h2>Market Change</h2>\n" +
    "	<nvd3 options='marketOptions' data='marketGraphChangeDataRender'></nvd3>\n" +
    "\n" +
    "\n" +
    "	<h2>Market Change^2</h2>\n" +
    "	<nvd3 options='marketOptions' data='marketGraphChangeChangeDataRender'></nvd3>\n" +
    "\n" +
    "\n" +
    "\n" +
    "	<!--<h2>5 Min Prediction</h2>\n" +
    "	<nvd3 options='options' data='fiveMinData'></nvd3>\n" +
    "	<br><br><br>\n" +
    "\n" +
    "	<br><br><br>\n" +
    "	<h2>Thirty Min Prediction</h2>\n" +
    "	<nvd3 options='options' data='thirtyMinData'></nvd3>\n" +
    "	<br><br><br>\n" +
    "\n" +
    "	<div >\n" +
    "		<h3>Current</h3>\n" +
    "		<h3>Price: {{currentData.last_price}}</h3>\n" +
    "		<h3>Bid: {{currentData.bid}}</h3>\n" +
    "		<h3>Ask: {{currentData.ask}}</h3>\n" +
    "	</div>\n" +
    "	<br><br>\n" +
    "	<div>\n" +
    "		<h3>1 Min Prediction</h3>\n" +
    "		<h3>Price: null</h3>\n" +
    "		<h3>Bid: null</h3>\n" +
    "		<h3>Ask: null</h3>\n" +
    "	</div>\n" +
    "	<br><br>\n" +
    "	<div>\n" +
    "		<h3>5 Min Prediction</h3>\n" +
    "		<h3>Price: null</h3>\n" +
    "		<h3>Bid: {{currentPredictionFiveMin[0]}}</h3>\n" +
    "		<h3>Ask: {{currentPredictionFiveMin[1]}}</h3>\n" +
    "	</div>\n" +
    "	<br><br>\n" +
    "	<div>\n" +
    "		<h3>30 Min Prediction</h3>\n" +
    "		<h3>Price: null</h3>\n" +
    "		<h3>Bid: {{currentPredictionThirtyMin[0]}}</h3>\n" +
    "		<h3>Ask: {{currentPredictionThirtyMin[1]}}</h3>\n" +
    "	</div>\n" +
    "	<br><br>\n" +
    "	<div>\n" +
    "		<h3>1 Hr Prediction</h3>\n" +
    "		<h3>Price: null</h3>\n" +
    "		<h3>Bid: {{currentPredictionFiveMin[0]}}</h3>\n" +
    "		<h3>Ask: {{currentPredictionFiveMin[1]}}</h3>\n" +
    "	</div>\n" +
    "	<br><br>\n" +
    "	<div>\n" +
    "		<h3>6 Hr Prediction</h3>\n" +
    "		<h3>Price: null</h3>\n" +
    "		<h3>Bid: {{currentPredictionFiveMin[0]}}</h3>\n" +
    "		<h3>Ask: {{currentPredictionFiveMin[1]}}</h3>\n" +
    "	</div>\n" +
    "	<br><br>\n" +
    "	<div>\n" +
    "		<h3>12 Hr Prediction</h3>\n" +
    "		<h3>Price: null</h3>\n" +
    "		<h3>Bid: {{currentPredictionFiveMin[0]}}</h3>\n" +
    "		<h3>Ask: {{currentPredictionFiveMin[1]}}</h3>\n" +
    "	</div>\n" +
    "	<br><br>\n" +
    "	<div>\n" +
    "		<h3>24 Hr Prediction</h3>\n" +
    "		<h3>Price: null</h3>\n" +
    "		<h3>Bid: {{currentPredictionFiveMin[0]}}</h3>\n" +
    "		<h3>Ask: {{currentPredictionFiveMin[1]}}</h3>\n" +
    "	</div>\n" +
    "\n" +
    "</div>-->\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "");
}]);

angular.module("member/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/index.tpl.html",
    "<div class=\"container\">\n" +
    "	\n" +
    "	<h1>member</h1>\n" +
    "	<p>representing $1,000,000,000</p> \n" +
    "	<!--or array calc-->\n" +
    "	<!--being more innovation at the pos-->\n" +
    "	<p>return %</p>\n" +
    "	<p>portfolio</p>\n" +
    "	<p>positions</p>\n" +
    "	<p>trade history</p>\n" +
    "	<p>select to represent</p><!--for x $$$$ or array etc-->\n" +
    "\n" +
    "</div>\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "");
}]);

angular.module("nav/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("nav/index.tpl.html",
    "<div ng-controller=\"NavCtrl\" class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand\" href=\"/\">investingfor</a>\n" +
    "    </div>\n" +
    "    <div class=\"collapse navbar-collapse\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li ng-show=\"!currentUser\"><a href=\"/about\">about</a></li>\n" +
    "        <li><a href=\"#\">discover</a></li>\n" +
    "        <form class=\"navbar-form pull-left\" role=\"search\" action=\"/search/\" onSubmit=\" location.href = 'search/' + document.getElementById('search-link').value; return false;\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <input ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\" id=\"search-link\" size=\"40\" type=\"text\" placeholder=\"\">\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </ul>\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li ng-show=\"currentUser\"><a href=\"/account\">{{currentUser.username}}</a></li>\n" +
    "        <li ng-show=\"currentUser\"><a href=\"/logout\">signout</a></li>\n" +
    "        <li ng-show=\"!currentUser\"><a href=\"/register\">register</a></li>\n" +
    "        <li ng-show=\"!currentUser\"><a href=\"/login\">login</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("register/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("register/index.tpl.html",
    "<div class=\"intro-header\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1\">\n" +
    "                <div class=\"site-heading\">\n" +
    "                    <h1 class=\"blue-title\">Create an Account</h1>\n" +
    "                    <hr class=\"small\">\n" +
    "                    <h2 class=\"post-title\">\n" +
    "                        Welcome!\n" +
    "                    </h2>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-6 col-lg-offset-3 col-md-10 col-md-offset-1\">\n" +
    "            <div class=\"login-form\">\n" +
    "                <form role=\"form\" method=\"post\" action=\"/auth/local/register\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input class=\"form-control\" name=\"email\" placeholder=\"email\" title=\"email\" type=\"email\"> \n" +
    "                        <i class=\"fa fa-user\"></i>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input class=\"form-control\" name=\"username\" placeholder=\"username\" title=\"username\" type=\"text\"> \n" +
    "                        <i class=\"fa fa-user\"></i>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group log-status\">\n" +
    "                        <input class=\"form-control\" name=\"password\" placeholder=\"password\" title=\"password\" type=\"password\"> \n" +
    "                        <i class=\"fa fa-lock\"></i>\n" +
    "                    </div>\n" +
    "                    <div class=\"align-right\">\n" +
    "                        <button class=\"btn btn-default log-btn\" type=\"submit\" value=\"submit\">Sign up</button>\n" +
    "                    </div>\n" +
    "                    <br><br>\n" +
    "                    <div class=\"social-log\">\n" +
    "                        <a class=\"btn btn-social btn-facebook\" ng-click=\"\"><i class=\"fa fa-facebook\"></i> Facebook</a>\n" +
    "                        <a class=\"btn btn-social btn-twitter\" ng-click=\"\"><i class=\"fa fa-twitter\"></i> Twitter</a>\n" +
    "                        <a class=\"btn btn-social btn-google\" ng-click=\"\"><i class=\"fa fa-google\"></i> Google</a>\n" +
    "                    </div>\n" +
    "                    <br><hr>\n" +
    "                    <div class=\"social-log\">\n" +
    "                        <a href=\"/login\">Already have an account?</a>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "            <div class=\"selfClear\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates-app", ["about/index.tpl.html", "account/index.tpl.html", "footer/index.tpl.html", "home/index.tpl.html", "intro/index.tpl.html", "login/index.tpl.html", "market/index.tpl.html", "markets/index.tpl.html", "member/index.tpl.html", "nav/index.tpl.html", "register/index.tpl.html", "search/index.tpl.html"]);

angular.module("about/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<!--<img src=\"images/3.jpg\">\n" +
    "<img src=\"images/4.jpg\">\n" +
    "<img src=\"images/5.jpg\">\n" +
    "<img src=\"images/6.jpg\">\n" +
    "<img src=\"images/7.jpg\">\n" +
    "<img src=\"images/8.jpg\">\n" +
    "<img src=\"images/9.jpg\">\n" +
    "<img src=\"images/10.jpg\">\n" +
    "<img src=\"images/11.jpg\">\n" +
    "<img src=\"images/12.jpg\">\n" +
    "<img src=\"images/13.jpg\">\n" +
    "<img src=\"images/14.jpg\">\n" +
    "<img src=\"images/15.jpg\">\n" +
    "<img src=\"images/16.jpg\">\n" +
    "<img src=\"images/17.jpg\">\n" +
    "<img src=\"images/18.jpg\">\n" +
    "<img src=\"images/19.jpg\">\n" +
    "<img src=\"images/20.jpg\">\n" +
    "<img src=\"images/21.jpg\">\n" +
    "<img src=\"images/22.jpg\">\n" +
    "<img src=\"images/23.jpg\">\n" +
    "<img src=\"images/24.jpg\">\n" +
    "<img src=\"images/25.jpg\">\n" +
    "<img src=\"images/26.jpg\">\n" +
    "<img src=\"images/27.jpg\">\n" +
    "<img src=\"images/28.jpg\">\n" +
    "<img src=\"images/29.jpg\">\n" +
    "<img src=\"images/30.jpg\">\n" +
    "<img src=\"images/31.jpg\">\n" +
    "<img src=\"images/32.jpg\">\n" +
    "<img src=\"images/33.jpg\">\n" +
    "<img src=\"images/34.jpg\">\n" +
    "<img src=\"images/35.jpg\">-->\n" +
    "\n" +
    "<!--<img src=\"images/2.gif\">\n" +
    "<img src=\"images/3.gif\">\n" +
    "<img src=\"images/4.gif\">\n" +
    "<img src=\"images/5.gif\">-->\n" +
    "<div style=\"height:20vh;overflow:hidden\">\n" +
    "    <!--<h1 style=\"color:white;position:absolute\">create the next wave</h1>-->\n" +
    "    <img src=\"images/24.jpg\" style=\"width:100%\">\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "    <div style=\"height:25px;\"></div>\n" +
    "    <h2>investingfor</h2>\n" +
    "    <p>a network consisting of thousands of companies and individuals spanning the globe.</p> \n" +
    "    <p>intelligence that learns and works with you to create value and amass wealth</p>\n" +
    "    <p>a network of analysts spanning the globe. a strong team.</p>\n" +
    "    <img src=\"images/3.jpg\" style=\"max-width:100%\">\n" +
    "    <img src=\"images/4.jpg\" style=\"max-width:100%\">\n" +
    "    <!--<img src=\"images/5.jpg\" style=\"max-width:100%\">-->\n" +
    "    <div style=\"height:100px;\"></div>\n" +
    "    <div style=\"height:100px;\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<!--<div style=\"height:20vh;overflow:hidden\">\n" +
    "    <img src=\"images/25.jpg\" style=\"width:100%\">\n" +
    "</div>-->\n" +
    "\n" +
    "<div style=\"color:white;background-color:black\">\n" +
    "    <div style=\"height:100px;\"></div>\n" +
    "    <div class=\"container\" style=\"text-align:left\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <h3><i class=\"fa fa-file-o\"></i> open datasets</h3>\n" +
    "                <p>data, we use. data we prouduce, together.</p>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\" style=\"overflow:hidden\">\n" +
    "                <img src=\"images/2.gif\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div style=\"height:100px;\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "    <!--<img src=\"images/24.jpg\" style=\"max-width:100%\">-->\n" +
    "    <!--<img src=\"images/25.jpg\" style=\"max-width:100%\">\n" +
    "    <img src=\"images/26.jpg\" style=\"max-width:100%\">\n" +
    "    <img src=\"images/13.jpg\" style=\"max-width:100%\">\n" +
    "    <img src=\"images/30.jpg\" style=\"max-width:100%\">\n" +
    "    <img src=\"images/34.jpg\" style=\"width:100%\">-->\n" +
    "\n" +
    "\n" +
    "    <div style=\"height:100px;\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        \n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <img src=\"images/laxmi.png\">\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-6\" style=\"text-align:right\">\n" +
    "            <h3>community analysts</h3>\n" +
    "            <p>contribute. collab. invest.</p>\n" +
    "            <img style=\"max-height:300px\" src=\"images/heatmap.png\">\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-xs-12\"><div style=\"height:200px;\"></div></div>\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h3>transparent finance </h3>\n" +
    "            <p>we create valuable investment intelligence.</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <!--<img src=\"images/heatmap.png\">-->\n" +
    "            <img style=\"max-height:300px;float:right\" src=\"images/1.gif\">\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-xs-12\"><div style=\"height:200px;\"></div></div>\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h3>mapping the market</h3>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <highchart id=\"heatMap\" config=\"heatMapChart\"></highchart>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--<div class=\"col-sm-6\">\n" +
    "            <h3><i class=\"fa fa-bullhorn\"></i> Stay Updated</h3>\n" +
    "        </div>-->\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div style=\"height:100px;\"></div>\n" +
    "    <nvd3 options='options' data='data'></nvd3>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-include=\"'register/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("account/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/index.tpl.html",
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "	<h1>Account info</h1>\n" +
    "    <h3><a href=\"member/{{currentUser.username}}\">{{currentUser.username}}</a></h2><br>\n" +
    "	<p>edit</p>\n" +
    "	<form role=\"form\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <input class=\"form-control\" name=\"userName\" placeholder=\"username\" title=\"username\" type=\"text\" ng-model=\"member.username\"> \n" +
    "            <i class=\"fa fa-user\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input class=\"form-control\" name=\"firstName\" placeholder=\"first name\" title=\"first name\" type=\"text\" ng-model=\"member.firstName\"> \n" +
    "            <i class=\"fa fa-user\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input class=\"form-control\" name=\"lastName\" placeholder=\"last name\" title=\"last name\" type=\"text\" ng-model=\"member.lastName\"> \n" +
    "            <i class=\"fa fa-user\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"align-right\">\n" +
    "            <button class=\"btn btn-default log-btn\" type=\"submit\" value=\"submit\" ng-click=\"update()\">Save</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "	<h2>settings</h2>\n" +
    "	<p>notifications</p>\n" +
    "	<p>email settings</p>\n" +
    "\n" +
    "	<h2>api keys</h2>\n" +
    "\n" +
    "	<!--poloniex-->\n" +
    "    <form role=\"form\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <input class=\"form-control\" name=\"apiKey\" placeholder=\"api key\" title=\"api key\" type=\"text\" ng-model=\"member.poloniexApiKey\"> \n" +
    "            <i class=\"fa fa-user\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input class=\"form-control\" name=\"apiSecret\" placeholder=\"api secret\" title=\"api secret\" type=\"text\" ng-model=\"member.poloniexApiSecret\"> \n" +
    "            <i class=\"fa fa-user\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"align-right\">\n" +
    "            <button class=\"btn btn-default log-btn\" type=\"submit\" value=\"submit\" ng-click=\"update()\">Save</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("footer/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("footer/index.tpl.html",
    "<div class=\"footer\" ng-controller=\"FooterCtrl\">\n" +
    "  <div class=\"container\">\n" +
    "    {{date | date:'yyyy'}} <a href=\"/\">collaborative.capital</a>\n" +
    "    <a href=\"/about\">about</a>\n" +
    "    <a href=\"#\">terms</a>\n" +
    "    <a href=\"https://www.twitter.com/cre8capital\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "    <a href=\"https://www.instagram.com/cre8capital\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<div ng-show=\"currentUser\">\n" +
    "	<div class=\"container\" style=\"text-align:left\">\n" +
    "		<h1>dashboard</h1>\n" +
    "		<p><a href=\"account\">link in wallets, connect api keys, fund account</a></p>\n" +
    "\n" +
    "		<!--<button class=\"btn btn-default\" ng-click=\"sideNavToggle()\">TOGGLE</button>\n" +
    "		<md-sidenav class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"false\">\n" +
    "			<md-toolbar style=\"background-color:rgb(35, 170, 159)\" class=\"md-primary md-hue-2\">\n" +
    "				<h1 class=\"md-toolbar-tools\">Dashboard</h1>\n" +
    "			</md-toolbar>\n" +
    "			<md-content>\n" +
    "				<md-list>\n" +
    "					<md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" style=\"background:#e8e8e8;\">\n" +
    "						<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "							<h3><a ui-sref=\"/dashboard\"><span class=\"pull-left ct-red\">Home</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "						</div>\n" +
    "					</md-list-item>\n" +
    "					<md-divider ></md-divider>\n" +
    "					<md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" ng-click=\"changePath('/accounts')\">\n" +
    "						<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "							<h3><a ui-sref=\"sites\"><span class=\"pull-left ct-red\">Accounts</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "						</div>\n" +
    "					</md-list-item>\n" +
    "					<md-divider ></md-divider>\n" +
    "					<md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" ng-click=\"changePath('/sites')\">\n" +
    "						<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "							<h3><a ui-sref=\"sites\"><span class=\"pull-left ct-red\">Sites</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "						</div>\n" +
    "					</md-list-item>\n" +
    "					<md-divider ></md-divider>\n" +
    "\n" +
    "				</md-list>\n" +
    "			</md-content>\n" +
    "		</md-sidenav>-->\n" +
    "\n" +
    "\n" +
    "		<!--<div style=\"float:right;text-align:right\" class=\"col-sm-12\">-->\n" +
    "			<canvas id=\"doughnut\" class=\"chart chart-doughnut\" chart-data=\"portfolioData\" chart-labels=\"portfolioLabels\"></canvas>\n" +
    "			<!--<canvas id=\"doughnut\" class=\"chart chart-radar\" chart-data=\"portfolioData\" chart-labels=\"portfolioLabels\"></canvas>-->\n" +
    "			<!--<canvas id=\"doughnut\" class=\"chart chart-polar-area\" chart-data=\"portfolioData\" chart-labels=\"portfolioLabels\"></canvas>-->\n" +
    "		<!--</div>-->\n" +
    "\n" +
    "\n" +
    "		<p>{{btcValue}}</p>\n" +
    "		<p>{{btcOrderValue}}</p>\n" +
    "		<p>{{btcValue+btcOrderValue}}</p>\n" +
    "\n" +
    "		<br><br>\n" +
    "		<div style=\"max-height:250px;overflow:scroll\">\n" +
    "			<table class=\"table table-striped table-hover\">\n" +
    "			    <thead>\n" +
    "					<tr>\n" +
    "						<th>Asset</th>\n" +
    "						<th>Amount</th>\n" +
    "						<!--<th>Wallet</th>-->\n" +
    "						<th>UpdatedAt</th>\n" +
    "					</tr>\n" +
    "			    </thead>\n" +
    "			    <tbody>\n" +
    "					<tr ng-repeat=\"asset in assets | orderBy:'-amount'\">\n" +
    "						<td>{{asset.symbol}}</td>\n" +
    "						<td>{{asset.amount}}</td>\n" +
    "						<!--<td>Wallet</td>-->\n" +
    "						<td>{{asset.updatedAt | date :  \"y MM-dd hh:mm.ss a\"}}</td>\n" +
    "					</tr>\n" +
    "			    </tbody>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "\n" +
    "		<br><br>\n" +
    "		<h1>order book</h1>\n" +
    "		<div style=\"max-height:250px;overflow:scroll\">\n" +
    "			<table class=\"table table-striped table-hover\">\n" +
    "			    <thead>\n" +
    "					<tr>\n" +
    "						<th>Market</th>\n" +
    "						<th>Type</th><!--not relevant.. just reverse asset1 and 2.. -->\n" +
    "						<th></th>\n" +
    "						<th></th>\n" +
    "						<th>Date</th>\n" +
    "					</tr>\n" +
    "			    </thead>\n" +
    "			    <tbody>\n" +
    "					<tr ng-repeat=\"order in orders\">\n" +
    "						<td><a style=\"color:gray\" href=\"market/{{order.asset1}}/{{order.asset2}}\">{{order.asset1}}/{{order.asset2}}</a></td>\n" +
    "						<td>{{order.type}}</td>\n" +
    "						<td>{{order.amount}} {{order.asset2}}</td>\n" +
    "						<td>{{order.price}} {{order.asset1}}</td>\n" +
    "						<td>{{order.createdAt | date :  \"y MM-dd hh:mm.ss a\"}}</td>\n" +
    "					</tr>\n" +
    "			    </tbody>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "\n" +
    "		<br><br>\n" +
    "		<h1>markets</h1>\n" +
    "		<div ng-repeat=\"pair in tradingPairs\">\n" +
    "			<div class=\"col-md-3 col-sm-4 col-xs-6 \">\n" +
    "				<a href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-show=\"!currentUser\" >\n" +
    "	<div ng-include=\"'intro/index.tpl.html'\"></div>\n" +
    "	<!--<nvd3 options='options' data='data'></nvd3>\n" +
    "	<nvd3 options='directedOptions' data='directedData'></nvd3>-->\n" +
    "\n" +
    "	<div class=\"container\" id=\"about\">\n" +
    "		<div style=\"height:50px;\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-12\">\n" +
    "			    <div style=\"text-align:left;\" id=\"header-text-area\">\n" +
    "			       <h1>empowered financial representation</h1>\n" +
    "			       <h3 style=\"\">backed by sound, open data</h3>\n" +
    "			    </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div style=\"height:50px;\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"container\" style=\"text-align:left\">\n" +
    "		<div style=\"height:100px;\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-6\">\n" +
    "				<h3>sound financial intellligence; continually learning</h3>\n" +
    "				<!--<p>intellligence; continually learning</p>-->\n" +
    "				<p>a community of analysts; select representation</p>\n" +
    "			</div>\n" +
    "			<!--<div class=\"col-sm-6\">\n" +
    "				<img src=\"images/tesseract-bg.png\">\n" +
    "			</div>-->\n" +
    "		</div>\n" +
    "		<div style=\"height:100px;\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-4\">\n" +
    "				<img src=\"images/tesseract-bg.png\">\n" +
    "			</div>\n" +
    "			<div class=\"col-sm-8\" style=\"text-align:right\">\n" +
    "				<h3>collaboration and contribution</h3>\n" +
    "				<p>contribute. collab. invest.</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div style=\"height:100px;\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-12\">\n" +
    "				<h3>open and transparent data</h3>\n" +
    "				<p>data we use, data we prouduce, together.</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div style=\"height:100px;\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-12\" style=\"text-align:right\">\n" +
    "				<h3>cutting edge analysis at scale</h3>\n" +
    "				<p>distributed networks working to give you the cutting edge.</p>\n" +
    "				<p>computational intelligence designed to normalize risk and equalize investment returns.</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div style=\"height:100px;\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-12\">\n" +
    "				<h3>transparent financial results </h3>\n" +
    "				<p>data-backed with proven results</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div style=\"height:100px;\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-12\">\n" +
    "				<p class=\"lead\">nice...</p>\n" +
    "				<a href=\"/about\" class=\"btn btn-default\">now let me see some numbers</a>\n" +
    "				<br><br>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<!--\n" +
    "	<div style=\"background-color:rgb(220,220,220);\">\n" +
    "		<br><br><br>\n" +
    "		<h1 style=\"text-align:center;\">why you'll love investingfor</h1>\n" +
    "		<br><br>\n" +
    "		<p style=\"text-align:center;\"><i style=\"font-size:256px;\" class=\"fa fa-heart-o\"></i></p>\n" +
    "		<p class=\"lead\" style=\"text-align:center;\">the computing power around us is immense!</p>\n" +
    "		<br>\n" +
    "		<p class=\"lead\" style=\"text-align:center;\">investingfor uses the idle power of the computational potiental around us.</p>\n" +
    "		<br>\n" +
    "		<p class=\"lead\" style=\"text-align:center;\">what if our devices were working toward a common goal?</p>\n" +
    "		<br>\n" +
    "		<p class=\"lead\" style=\"text-align:center;\">extract value by earning crypto-backed <a href=\"http://www.epoint.me/market/investment-point\">investment points</a>.</p>\n" +
    "		<br>\n" +
    "		<p class=\"lead\" style=\"text-align:center;\">investingfor us all.</p>\n" +
    "		<br><br><br>\n" +
    "	</div>\n" +
    "	-->\n" +
    "\n" +
    "	<div style=\"text-align:left\">\n" +
    "		<br><br><br>\n" +
    "		<div class=\"container\" style=\"\">\n" +
    "			<h1>market exposure</h1>\n" +
    "			<!--<nvd3 options='options' data='data'></nvd3>-->\n" +
    "			<br><br>\n" +
    "\n" +
    "\n" +
    "			<div ng-repeat=\"pair in tradingPairs\">\n" +
    "				<div class=\"col-md-3 col-sm-4 col-xs-6 \">\n" +
    "					<a href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<!--<div class=\"col-md-4\">\n" +
    "				<table class=\"table table-inverse table-hover\">\n" +
    "				    <thead>\n" +
    "						<tr>\n" +
    "							<th>Market</th>\n" +
    "							<th>Price</th>\n" +
    "							<th>Percent Change</th>\n" +
    "						</tr>\n" +
    "				    </thead>\n" +
    "				    <tbody>\n" +
    "						<tr ng-repeat=\"pair in tradingPairs\">\n" +
    "							<td><a href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a></td>\n" +
    "							<td>0</td>\n" +
    "							<td>0</td>\n" +
    "						</tr>\n" +
    "				    </tbody>\n" +
    "				</table>\n" +
    "			</div>-->\n" +
    "\n" +
    "\n" +
    "\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<br><br><br>\n" +
    "\n" +
    "\n" +
    "	<div style=\"text-align:left;color:gray;background-color:black;\">\n" +
    "		<style>.nvd3 text{color:gray;fill:gray;}.nvd3 .nv-axis line{stroke:gray;}</style>\n" +
    "		<br><br><br>\n" +
    "		<div class=\"container\">\n" +
    "			<h1>activity</h1>\n" +
    "			<div class=\"chartContainer\"><nvd3 options='marketOptions' data='marketGraphDataRender'></nvd3></div>\n" +
    "			<!--<highchart id=\"chart1\" config=\"chartConfig\"></highchart>-->\n" +
    "			<br>\n" +
    "			<!--daily return vs index..-->\n" +
    "			<!--<h4>sound and transparent investments</h4>-->\n" +
    "			<!--<h1>order book</h1><br>-->\n" +
    "			<!--<div ng-repeat=\"order in orders\">\n" +
    "				<p><a style=\"color:gray\" href=\"market/{{order.asset1}}/{{order.asset2}}\">{{order.asset1}}/{{order.asset2}}</a> traded {{order.amount}} {{order.asset1}} for {{order.amount/order.price}} {{order.asset2}} at {{order.price}}: {{order.createdAt}}</p>\n" +
    "			</div>-->\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div style=\"text-align:left;\" class=\"container\">\n" +
    "		<br><br>\n" +
    "		<h1>order book</h1>\n" +
    "		<h4>sound and transparent investments</h4>\n" +
    "		<br><br>\n" +
    "		<table class=\"table table-inverse table-hover\">\n" +
    "		    <thead>\n" +
    "				<tr>\n" +
    "					<th>Market</th>\n" +
    "					<th>Type</th><!--not relevant.. just reverse asset1 and 2.. -->\n" +
    "					<th></th>\n" +
    "					<th></th>\n" +
    "					<th>Date</th>\n" +
    "				</tr>\n" +
    "		    </thead>\n" +
    "		    <tbody>\n" +
    "				<tr ng-repeat=\"order in orders\">\n" +
    "					<td><a style=\"color:gray\" href=\"market/{{order.asset1}}/{{order.asset2}}\">{{order.asset1}}/{{order.asset2}}</a></td>\n" +
    "					<td>{{order.type}}</td>\n" +
    "					<td>{{order.amount}} {{order.asset2}}</td>\n" +
    "					<td>{{order.price}} {{order.asset1}}</td>\n" +
    "					<td>{{order.createdAt | date :  \"y MM-dd hh:mm.ss a\"}}</td>\n" +
    "					<!--<td>{{order.createdAt | date :  \"s.m.h.dd.MM.y\"}}</td>-->\n" +
    "					<!--<td>{{order.createdAt | date :  \"medium\"}}</td>-->\n" +
    "\n" +
    "				</tr>\n" +
    "		    </tbody>\n" +
    "		</table>\n" +
    "		\n" +
    "		<br><br>\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-include=\"'register/index.tpl.html'\"></div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("intro/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("intro/index.tpl.html",
    "<div ng-controller=\"IntroCtrl\" class=\"intro-container\">\n" +
    "    <svg style=\"z-index:10\" class=\"intro\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1920 1080\" width=\"1920px\" height=\"1080px\" preserveAspectRatio=\"xMidYMid slice\">\n" +
    "        <defs>\n" +
    "            <mask class=\"intro-mask\" id=\"intro-mask\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" maskUnits=\"userSpaceOnUse\">\n" +
    "                <rect class=\"intro-rect\" x=\"0\" y=\"0\" width=\"1920px\" height=\"1080px\"></rect>\n" +
    "                <text x=\"960\" y=\"46%\" class=\"medium-text\">investingfor</text>\n" +
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

angular.module("login/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/index.tpl.html",
    "<div class=\"intro-header\" style=\"background-color:black\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1\">\n" +
    "                <div class=\"site-heading\">\n" +
    "                    <h1 class=\"blue-title\" style=\"color:white\">Login</h1>\n" +
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
    "                        <a class=\"btn btn-facebook\" href=\"#\"><i class=\"fa fa-facebook\"></i> Facebook</a>\n" +
    "                        <a class=\"btn btn-twitter\" href=\"#\"><i class=\"fa fa-twitter\"></i> Twitter</a>\n" +
    "                        <a class=\"btn btn-google\" href=\"#\"><i class=\"fa fa-google\"></i> Google</a>\n" +
    "                    </div>\n" +
    "                    <br><hr>\n" +
    "                    <div class=\"\">\n" +
    "                        <a style=\"text-align:center\" href=\"/register\">Need an account?</a>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("market/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("market/index.tpl.html",
    "<md-sidenav class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"false\">\n" +
    "	<md-toolbar style=\"background-color:rgb(35, 170, 159)\" class=\"md-primary md-hue-2\">\n" +
    "		<h1 class=\"md-toolbar-tools\">Markets</h1>\n" +
    "	</md-toolbar>\n" +
    "	<md-content>\n" +
    "		<md-list>\n" +
    "			<md-list-item ng-repeat=\"pair in tradingPairs\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" style=\"background:#e8e8e8;\">\n" +
    "				<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "					<h3><a href=\"/market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\"><span class=\"pull-left ct-red\">{{pair.split('/')[1]}} / {{pair.split('/')[0]}}</span></a></h3>\n" +
    "				</div>\n" +
    "				<md-divider ></md-divider>\n" +
    "			</md-list-item>\n" +
    "		</md-list>\n" +
    "	</md-content>\n" +
    "</md-sidenav>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "	<br>\n" +
    "	<span ng-click=\"sideNavToggle()\"><i style=\"font-size:24px\" class=\"fa fa-bars\"></i></span>\n" +
    "	<h2>{{stateParams.path1}} / {{stateParams.path2}}</h2>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<button ng-class=\"selectedClass('Live')\" ng-click=\"getLive()\">Live</button>\n" +
    "		<button ng-class=\"selectedClass('5000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '5000')\">5sec </button>\n" +
    "		<button ng-class=\"selectedClass('30000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '30000')\">30sec</button>\n" +
    "		<button ng-class=\"selectedClass('60000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '60000')\">1min </button>\n" +
    "		<button ng-class=\"selectedClass('300000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '300000')\">5min </button>\n" +
    "		<button ng-class=\"selectedClass('1800000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '1800000')\">30min</button>\n" +
    "		<button ng-class=\"selectedClass('3600000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '3600000')\">1hr  </button>\n" +
    "		<button ng-class=\"selectedClass('7200000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '7200000')\">2hr  </button>\n" +
    "		<button ng-class=\"selectedClass('14400000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '14400000')\">4hr  </button>\n" +
    "		<button ng-class=\"selectedClass('21600000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '21600000')\">6hr  </button>\n" +
    "		<button ng-class=\"selectedClass('43200000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '43200000')\">12hr </button>\n" +
    "		<button ng-class=\"selectedClass('86400000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '86400000')\">24hr </button>\n" +
    "	</div>\n" +
    "	<!--how much data..?-->\n" +
    "	<!--zoom out ability.. a lot-->\n" +
    "\n" +
    "	<h2>Price Data</h2>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getEma([20,40,80,160,320,640],'price')\">ema</button><!--select periods..?-->\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getTsf([20,40,80,160,320,640],'price')\">tsf</button><!--select periods..?-->\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getBband([10],[1,2,3],'price')\">bband</button><!--select periods / stD.?-->\n" +
    "	<!--<button class=\"btn btn-default\" ng-click=\"getNn('price')\">nn</button>-->\n" +
    "	<!--<button class=\"btn btn-default\" ng-click=\"getPdf('price')\">pdf</button>--><!--;)-->\n" +
    "\n" +
    "	<nvd3 options='marketOptions' data='marketGraphDataRender'></nvd3>\n" +
    "\n" +
    "	<!--<h2>Market Depth, volume</h2>-->\n" +
    "	<h2>Order Book</h2>\n" +
    "	<nvd3 options='orderBookOptions' data='orderBookGraphDataRender'></nvd3>\n" +
    "\n" +
    "	<h2>Market Change</h2>\n" +
    "	<!--<button class=\"btn btn-default\" ng-click=\"getEma([20,40,80,160,320,640],'change')\">ema</button>--><!--select periods..?-->\n" +
    "	<!--<button class=\"btn btn-default\" ng-click=\"getTsf([20,40,80,160,320,640],'change')\">tsf</button>--><!--select periods..?-->\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getBband([10],[1,2,3],'change')\">bband</button><!--select periods / sD..?-->\n" +
    "	<!--<button class=\"btn btn-default\" ng-click=\"getNn('change')\">nn</button>-->\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getPdf('change')\">pdf</button><!--;)-->\n" +
    "\n" +
    "	<nvd3 options='marketOptions' data='marketGraphChangeDataRender'></nvd3>\n" +
    "\n" +
    "	<h2>Market Change^2</h2>\n" +
    "	<!--\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getEma('changeChange')\">ema</button>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getTsf('changeChange')\">tsf</button>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getBband([10],[1,2,3],'changeChange')\">bband</button>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getNn('changeChange')\">nn</button>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getPdf('changeChange')\">pdf</button>\n" +
    "	-->\n" +
    "\n" +
    "	<nvd3 options='marketOptions' data='marketGraphChangeChangeDataRender'></nvd3>\n" +
    "\n" +
    "	<h2>Oscillator</h2>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getMacd([20,40,80,160,320,640],'change')\">macd</button>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getFosc([20,40,80,160,320,640],'change')\">fosc</button>\n" +
    "	<button class=\"btn btn-default\" ng-click=\"getRsi([20,40,80,160,320,640],'change')\">rsi</button>\n" +
    "\n" +
    "	<nvd3 options='marketOptions' data='marketGraphOscillatorDataRender'></nvd3>\n" +
    "\n" +
    "	<h2>Probability Density</h2>\n" +
    "	<!--<div style=\"max-height:500px;overflow:scroll\">-->\n" +
    "		<canvas id=\"tableHeatmap\" width=\"1200\" height=\"500\"></canvas>\n" +
    "	<!--</div>-->\n" +
    "	<!--<heatmap id=\"heatmap-1\" data=\"heatmapData\" config=\"heatmapConfig\" width=\"834\" height=\"400\" class=\"ng-isolate-scope\"></heatmap>-->\n" +
    "\n" +
    "	<!--HIGH CHART-->\n" +
    "\n" +
    "	<!--TODO: POSITIONS.. LONG SHORT.. SELL THIS AMOUNT AT THIS PRICE.. ETC. NOTO YET EXECUTED-->\n" +
    "	<h2>Market Orders</h2>\n" +
    "	<table class=\"table table-inverse table-hover\">\n" +
    "	    <thead>\n" +
    "			<tr>\n" +
    "				<th>Type</th><!--not relevant.. just reverse asset1 and 2.. -->\n" +
    "				<th></th>\n" +
    "				<th></th>\n" +
    "				<th>Date</th>\n" +
    "			</tr>\n" +
    "	    </thead>\n" +
    "	    <tbody>\n" +
    "			<tr ng-repeat=\"order in orders\">\n" +
    "				<td>{{order.type}}</td>\n" +
    "				<td>{{order.amount}} {{order.asset2}}</td>\n" +
    "				<td>{{order.price}} {{order.asset1}}</td>\n" +
    "				<td>{{order.createdAt | date :  \"y MM-dd hh:mm.ss a\"}}</td>\n" +
    "			</tr>\n" +
    "	    </tbody>\n" +
    "	</table>\n" +
    "\n" +
    "	<!--EXCHANGE-->\n" +
    "	\n" +
    "	<!--<h2>Ask</h2>\n" +
    "	<form role=\"form\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <input class=\"form-control\" name=\"amount\" placeholder=\"Amount\" title=\"Amount\" type=\"text\"> \n" +
    "            <i class=\"fa fa-user\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input class=\"form-control\" name=\"price\" placeholder=\"Price\" title=\"Price\" type=\"text\"> \n" +
    "            <i class=\"fa fa-user\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"align-right\">\n" +
    "            <button class=\"btn btn-default log-btn\" type=\"submit\" value=\"submit\">Create Order</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "	<h2>Bid</h2>\n" +
    "    <form role=\"form\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <input class=\"form-control\" name=\"amount\" placeholder=\"Amount\" title=\"Amount\" type=\"text\"> \n" +
    "            <i class=\"fa fa-user\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input class=\"form-control\" name=\"price\" placeholder=\"Price\" title=\"Price\" type=\"text\"> \n" +
    "            <i class=\"fa fa-user\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"align-right\">\n" +
    "            <button class=\"btn btn-default log-btn\" type=\"submit\" value=\"submit\">Create Order</button>\n" +
    "        </div>\n" +
    "    </form>-->\n" +
    "	\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("markets/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("markets/index.tpl.html",
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "	<h1>markets</h1>\n" +
    "\n" +
    "	<!--\n" +
    "	<div ng-repeat=\"pair in tradingPairs\">\n" +
    "		<div class=\"col-md-3 col-sm-4 col-xs-6 \">\n" +
    "			<a href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	-->\n" +
    "\n" +
    "	<h5>overlay percentage change</h5>\n" +
    "	<nvd3 options='marketOptions' data='marketDataRenderRender'></nvd3>\n" +
    "	<!--<p class=\"btn btn-default\" ng-click=\"selectTime(5000,'BTC')\">5sec</p>-->\n" +
    "	<!--<p class=\"btn btn-default\" ng-click=\"selectTime(30000,'BTC')\">30sec</p>-->\n" +
    "	<p class=\"btn btn-default\" ng-click=\"selectTime(60000,'BTC')\">1min</p>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"selectTime(300000,'BTC')\">5min</p>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"selectTime(1800000,'BTC')\">30min</p>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"selectTime(3600000,'BTC')\">1hr</p>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"selectTime(7200000,'BTC')\">2hrs</p>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"selectTime(14400000,'BTC')\">4hrs</p>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"selectTime(21600000,'BTC')\">6hrs</p>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"selectTime(43200000,'BTC')\">12hrs</p>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"selectTime(86400000,'BTC')\">24hrs</p>\n" +
    "	<div style=\"height:100px;\"></div>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"solvePortfolio('60000', 100)\">Solve</p>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"solvePortfolioMulti('60000', 100)\">MultiSolve</p>\n" +
    "	<p class=\"btn btn-default\" ng-click=\"solvePortfolioPDF('60000', 100)\">MultiSolvePDF</p>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div style=\"height:20px;\"></div>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "	<div class=\"col-md-12\">\n" +
    "		<div ng-repeat=\"portfolio in portfolioData.portfolioSet\">\n" +
    "			{{portfolio}}\n" +
    "			<br><br>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"col-md-12\">\n" +
    "		<div style=\"height:20px;\"></div>\n" +
    "		<div ng-repeat=\"order in portfolioData.orderSet\">\n" +
    "			<p style=\"color:grey\">{{order.amount}} {{order.asset1}} ==@{{order.price}}==> {{order.amount / order.price}} {{order.asset2}} @ {{order.createdAt}}</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("member/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("member/index.tpl.html",
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "	\n" +
    "	<h1>member</h1>\n" +
    "	<p>representing $1,000,000,000</p> \n" +
    "	<!--or array calc-->\n" +
    "	<!--being more innovation at the pos-->\n" +
    "	<p>return %</p>\n" +
    "	<p>portfolio</p>\n" +
    "	<p>positions</p>\n" +
    "	<p>trade history</p>\n" +
    "	<p>select as representative</p><!--pay commission to copy trades-->\n" +
    "	<!--for x $$$$ or array etc-->\n" +
    "\n" +
    "</div>\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("nav/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("nav/index.tpl.html",
    "<style>\n" +
    "  .navbar-custom{background-color: #fff; text-align: left;}//border-bottom:1px solid #15b593;}\n" +
    "  .navbar-custom .navbar-brand:focus{color:#424242}\n" +
    "  .navbar-custom .navbar-toggle {border-color: white;}\n" +
    "  .navbar-custom .navbar-toggle .icon-bar{background-color:#424242;}\n" +
    "  .navbar-custom .navbar-toggle:hover .icon-bar{background-color:#000;}\n" +
    "  //.navbar-inverse .navbar-toggle:hover, .navbar-inverse .navbar-toggle:focus{background-color:black }\n" +
    "</style>\n" +
    "<div ng-controller=\"NavCtrl\" class=\"navbar navbar-custom navbar-fixed-top\" role=\"navigation\">\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand\" href=\"/\"><img src=\"images/tesseract.png\" style=\"height:32px;float:left;margin-top:-3px;margin-right:10px\">collaborative.capital</a>\n" +
    "      <!--cre8.capital-->\n" +
    "    </div>\n" +
    "    <div class=\"collapse navbar-collapse\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li ng-class=\"{ active: isActive('/about')}\" ng-show=\"!currentUser\"><a href=\"/about\">about</a></li>\n" +
    "        <li ng-class=\"{ active: isActive('/markets')}\"><a href=\"/markets\">markets</a></li>\n" +
    "        <form class=\"navbar-form pull-left\" role=\"search\" action=\"/search/\" onSubmit=\" location.href = 'search/' + document.getElementById('search-link').value; return false;\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <input ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\" id=\"search-link\" size=\"40\" type=\"text\" placeholder=\"\">\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </ul>\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li ng-class=\"{ active: isActive('/account')}\" ng-show=\"currentUser\"><a href=\"/account\">{{currentUser.username}}</a></li>\n" +
    "        <li ng-show=\"currentUser\"><a href=\"/logout\">signout</a></li>\n" +
    "        <li ng-class=\"{ active: isActive('/register')}\" ng-show=\"!currentUser\"><a href=\"/register\">register</a></li>\n" +
    "        <li ng-class=\"{ active: isActive('/login')}\" ng-show=\"!currentUser\"><a href=\"/login\">login</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <md-progress-linear ng-if=\"stateIsLoading\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "</div>");
}]);

angular.module("register/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("register/index.tpl.html",
    "<div class=\"intro-header\" style=\"background-color:black\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div class=\"site-heading\">\n" +
    "                    <h1 class=\"post-title\" style=\"color:white\">Create an Account</h1>\n" +
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
    "                        <a class=\"btn btn-facebook\" ng-click=\"\"><i class=\"fa fa-facebook\"></i> Facebook</a>\n" +
    "                        <a class=\"btn btn-twitter\" ng-click=\"\"><i class=\"fa fa-twitter\"></i> Twitter</a>\n" +
    "                        <a class=\"btn btn-google\" ng-click=\"\"><i class=\"fa fa-google\"></i> Google</a>\n" +
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
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("search/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/index.tpl.html",
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "	<h1>{{stateParams}}</h1>\n" +
    "	\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "	\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

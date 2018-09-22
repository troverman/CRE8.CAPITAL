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
    "    <div class=\"spacing-25\"></div>\n" +
    "    <h2>CRE8.CAPITAL</h2>\n" +
    "    <p>A network consisting of thousands of companies and individuals spanning the globe.</p> \n" +
    "    <p>Intelligence that learns and works with you to create value and amass wealth.</p>\n" +
    "    <p>A network of analysts spanning the globe. A strong team.</p>\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "    <img src=\"images/3.jpg\" style=\"max-width:100%\">\n" +
    "    <img src=\"images/4.jpg\" style=\"max-width:100%\">\n" +
    "    <!--<img src=\"images/5.jpg\" style=\"max-width:100%\">-->\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<!--<div style=\"height:20vh;overflow:hidden\">\n" +
    "    <img src=\"images/25.jpg\" style=\"width:100%\">\n" +
    "</div>-->\n" +
    "\n" +
    "<div style=\"color:white;background-color:black\">\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "    <div class=\"container\" style=\"text-align:left\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <!--<h3><i class=\"fa fa-file-o\"></i> Open Data</h3>\n" +
    "                <p style=\"font-style:italic\">Data, we use. Data we produce, together.</p>-->\n" +
    "                <h3>Cutting Edge Analysis at Scale</h4>\n" +
    "                <h3>Open Intelligence</h3>\n" +
    "                                <h3>Collaboration and Contribution</h3>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\" style=\"overflow:hidden; text-align:right\">\n" +
    "                <img style=\"height:200px\"src=\"images/2.gif\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"spacing-50\"></div>\n" +
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
    "    <div class=\"spacing-50\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h3>Open Intelligence</h3>\n" +
    "            <h5>Community Analysts</h5>\n" +
    "            <img style=\"max-height:300px\" src=\"images/heatmap.png\">\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <highchart config=\"bidAskChart\"></highchart>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h3>Transparent Finance </h3>\n" +
    "            <p style=\"font-style:italic\">We Create Valuable Intelligence</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <img style=\"max-height:300px;float:right\" src=\"images/1.gif\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <!--<div class=\"col-sm-6\">\n" +
    "            <h3>Mapping the Market</h3>\n" +
    "            <highchart config=\"bidAskChart\"></highchart>\n" +
    "        </div>-->\n" +
    "\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <highchart config=\"heatMapChart\"></highchart>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h3>Performance | Analysis </h3>\n" +
    "            <p style=\"font-style:italic\">How are we doing?</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <img style=\"max-height:300px;float:right\" src=\"images/1.gif\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "    <highchart config=\"chartConfig\"></highchart>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"spacing-50\"></div>\n" +
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
    "		<h1>Dashboard</h1>\n" +
    "		<p><a href=\"account\">link in wallets, connect api keys, fund account</a></p>\n" +
    "\n" +
    "		<span ng-click=\"sideNavToggle()\"><i style=\"font-size:24px\" class=\"fa fa-bars\"></i></span>\n" +
    "		<md-sidenav class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"false\">\n" +
    "			<md-toolbar style=\"background-color:rgb(35, 170, 159)\" class=\"md-primary md-hue-2\">\n" +
    "			</md-toolbar>\n" +
    "			<md-content>\n" +
    "				<md-list>\n" +
    "					<md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" style=\"background:#e8e8e8;\">\n" +
    "						<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "							<h3><a ui-sref=\"\"><span class=\"pull-left ct-red\">Home</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "						</div>\n" +
    "					</md-list-item>\n" +
    "					<md-divider ></md-divider>\n" +
    "					<md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" ng-click=\"changePath('/markets')\">\n" +
    "						<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "							<h3><a ui-sref=\"sites\"><span class=\"pull-left ct-red\">Markets</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "						</div>\n" +
    "					</md-list-item>\n" +
    "					<md-divider ></md-divider>\n" +
    "					<md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" ng-click=\"changePath('member/troverman')\">\n" +
    "						<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "							<h3><a ui-sref=\"sites\"><span class=\"pull-left ct-red\">Portfolio</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "						</div>\n" +
    "					</md-list-item>\n" +
    "					<md-divider ></md-divider>\n" +
    "					<md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" ng-click=\"changePath('')\">\n" +
    "						<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "							<h3><a ui-sref=\"sites\"><span class=\"pull-left ct-red\">Trades</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "						</div>\n" +
    "					</md-list-item>\n" +
    "					<md-divider ></md-divider>\n" +
    "				</md-list>\n" +
    "			</md-content>\n" +
    "		</md-sidenav>\n" +
    "\n" +
    "\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-12\">\n" +
    "				<canvas id=\"doughnut\" class=\"chart chart-doughnut\" chart-data=\"portfolioData\" chart-labels=\"portfolioLabels\"></canvas>\n" +
    "			</div>\n" +
    "			<!--<div class=\"col-md-4\">\n" +
    "				<highchart config=\"chartConfig\"></highchart>\n" +
    "			</div>-->\n" +
    "		</div>\n" +
    "\n" +
    "		<div>\n" +
    "			<p>Available to Trade: {{btcValue}} BTC</p>\n" +
    "			<p>Order value: {{btcOrderValue}} BTC</p>\n" +
    "			<p>Protfolio Value: {{btcValue+btcOrderValue}} BTC</p>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"spacing-10\"></div>\n" +
    "		<h1>Assets</h1>\n" +
    "		<div>\n" +
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
    "		<div class=\"spacing-10\"></div>\n" +
    "		<h1>Order Book</h1>\n" +
    "		<div>\n" +
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
    "		<div class=\"spacing-10\"></div>\n" +
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
    "		<div class=\"spacing-50\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-12\">\n" +
    "			    <div style=\"text-align:left;\" id=\"header-text-area\">\n" +
    "			       <h2>Empowered Financial Representation</h2>\n" +
    "			       <h3 style=\"\">Backed by Sound, Open Data</h3>\n" +
    "			    </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"container\" style=\"text-align:left\">\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-6\">\n" +
    "				<h3>A Financial Intellligence Continually Learning</h3>\n" +
    "				<p>Guided by a Community of Analysts; Select Your Representation</p>\n" +
    "			</div>\n" +
    "			<div class=\"col-sm-6\" style=\"text-align:right\">\n" +
    "				<img style=\"max-height:300px;\" src=\"images/1.gif\">\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-4\">\n" +
    "				<img src=\"images/tesseract-bg.png\">\n" +
    "			</div>\n" +
    "			<div class=\"col-sm-8\" style=\"text-align:right\">\n" +
    "				<h3>Collaboration and Contribution</h3>\n" +
    "				<p>The collaborative.capital engine is continually learning from intelligence produced from your machienes and analytic insight.</p>\n" +
    "				<p>Deep Learning Techniques create actionable intelligence.</p>\n" +
    "				<h3>Cutting Edge Analysis at Scale</h3>\n" +
    "				<p>Distributed Networks work to give you the cutting edge</p>\n" +
    "				<p>Computational Intelligence Designed to Normalize Risk and Equalize Investment Returns</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-12\">\n" +
    "				<h3>Open Intelligence</h3>\n" +
    "				<p>Data we use, data we prouduce, together.</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-12\">\n" +
    "				<h3>Transparent Results </h3>\n" +
    "				<p>Data-backed with proven results.</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-12\">\n" +
    "				<a href=\"/about\" class=\"btn btn-default log-btn\">Learn More</a>\n" +
    "				<div class=\"spacing-10\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div style=\"text-align:left\">\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "		<div class=\"container\" style=\"\">\n" +
    "			<h2><a href=\"/markets\">Market Exposure</a></h2>\n" +
    "			<!--<nvd3 options='options' data='data'></nvd3>-->\n" +
    "			<div class=\"spacing-10\"></div>\n" +
    "\n" +
    "			<div ng-repeat=\"pair in tradingPairs\">\n" +
    "				<div class=\"col-md-3 col-sm-4 col-xs-6 \">\n" +
    "					<div class=\"card\">\n" +
    "						<div style=\"padding:16px;\">\n" +
    "							<a href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<!--\n" +
    "			<div class=\"col-md-4\">\n" +
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
    "			</div>\n" +
    "			-->\n" +
    "\n" +
    "		</div>\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div style=\"text-align:left;color:gray;background-color:black;\">\n" +
    "		<style>.nvd3 text{color:gray;fill:gray;}.nvd3 .nv-axis line{stroke:gray;}</style>\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "		<div class=\"container\">\n" +
    "			<h2>Activity</h2>\n" +
    "			<div class=\"spacing-10\"></div>\n" +
    "			<highchart config=\"chartConfig\"></highchart>\n" +
    "			<!--daily return vs index..-->\n" +
    "			<div class=\"spacing-50\"></div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div style=\"text-align:left;\" class=\"container\">\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "		<h2>Order Book</h2>\n" +
    "		<h4>Transparent Investments</h4>\n" +
    "		<div class=\"spacing-10\"></div>\n" +
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
    "				</tr>\n" +
    "		    </tbody>\n" +
    "		</table>\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-include=\"'register/index.tpl.html'\"></div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("intro/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("intro/index.tpl.html",
    "<style>\n" +
    "@import url(https://fonts.googleapis.com/css?family=Titillium+Web:400,300,600,700);\n" +
    "\n" +
    ".intro {\n" +
    "    position:relative;\n" +
    "    top:0;\n" +
    "    overflow: hidden;\n" +
    "}\n" +
    "\n" +
    ".intro-container {\n" +
    "    cursor:default;\n" +
    "    min-height:100vh;\n" +
    "    min-width:100vw;\n" +
    "    height:100%;\n" +
    "    width:100%;\n" +
    "    z-index:1\n" +
    "}\n" +
    "\n" +
    ".intro-mobile {\n" +
    "    visibility:hidden;\n" +
    "    position:absolute;\n" +
    "    top:0;\n" +
    "    left:0;\n" +
    "    min-width:100%;\n" +
    "    min-height:100%;\n" +
    "    z-index:-4;\n" +
    "    overflow:hidden;\n" +
    "    background-repeat:no-repeat;\n" +
    "    background:url(https://s3.amazonaws.com/novollc/images/home/mobile.png);\n" +
    "    -webkit-background-size:cover;\n" +
    "    -moz-background-size:cover;\n" +
    "    -o-background-size:cover;\n" +
    "    background-size:cover\n" +
    "}\n" +
    "\n" +
    "svg {\n" +
    "    max-width:100%;\n" +
    "    max-height:100%;\n" +
    "    min-width:100%;\n" +
    "    min-height:100%\n" +
    "}\n" +
    "\n" +
    ".continue-wrap {\n" +
    "    position:absolute;\n" +
    "    top:75%;\n" +
    "    width:100%;\n" +
    "    margin:0 auto\n" +
    "}\n" +
    "\n" +
    ".svg-wrapper {\n" +
    "    height:60px;\n" +
    "    margin:0 auto;\n" +
    "    width:320px;\n" +
    "    cursor: pointer;\n" +
    "}\n" +
    "\n" +
    ".text {\n" +
    "    color:#fff;\n" +
    "    font-family:'Play',sans-serif;\n" +
    "    font-size:22px;\n" +
    "    letter-spacing:8px;\n" +
    "    line-height:32px;\n" +
    "    position:relative;\n" +
    "    top:-48px\n" +
    "}\n" +
    "\n" +
    "#novo-svg {\n" +
    "    fill:#fff;\n" +
    "}\n" +
    "\n" +
    ".shape {\n" +
    "    fill:transparent;\n" +
    "    stroke-dasharray:180 540;\n" +
    "    stroke-dashoffset:-454;\n" +
    "    stroke-width:6px;\n" +
    "    stroke:#fff\n" +
    "}\n" +
    "\n" +
    "@keyframes draw {\n" +
    "0% {\n" +
    "    stroke-dasharray:180 540;\n" +
    "    stroke-dashoffset:-454;\n" +
    "    stroke-width:6px;\n" +
    "    stroke:#14B795\n" +
    "}\n" +
    "\n" +
    "100% {\n" +
    "    stroke-dasharray:760;\n" +
    "    stroke-dashoffset:0;\n" +
    "    stroke-width:2px;\n" +
    "    stroke:#14B795\n" +
    "}\n" +
    "}\n" +
    "\n" +
    ".svg-wrapper:hover .shape {\n" +
    "    -webkit-animation:.5s draw linear forwards;\n" +
    "    animation:.5s draw linear forwards\n" +
    "}\n" +
    "\n" +
    ".svg-wrapper:hover .text {\n" +
    "    color: #fff;\n" +
    "}\n" +
    "\n" +
    ".box-with-text {\n" +
    "    position:absolute;\n" +
    "    top:0;\n" +
    "    left:0;\n" +
    "    width:100%;\n" +
    "    height:100%;\n" +
    "    margin:0 auto\n" +
    "}\n" +
    "\n" +
    ".svg-inverted-mask {\n" +
    "    margin:0 auto;\n" +
    "    overflow:auto!important;\n" +
    "    z-index:2\n" +
    "}\n" +
    "\n" +
    ".text-fill {\n" +
    "    z-index:-5;\n" +
    "    margin:auto;\n" +
    "    overflow:hidden\n" +
    "}\n" +
    "\n" +
    ".video {\n" +
    "    position:absolute;\n" +
    "    top:0;\n" +
    "    left:0;\n" +
    "    bottom:0;\n" +
    "    min-width:100%;\n" +
    "    min-height:100%;\n" +
    "    overflow:hidden;\n" +
    "    z-index:-5\n" +
    "}\n" +
    "\n" +
    ".mask__shape {\n" +
    "    fill:#fff\n" +
    "}\n" +
    "\n" +
    ".shape--fill {\n" +
    "    fill:rgba(0,0,0,0.25);\n" +
    "}\n" +
    "\n" +
    ".text--transparent {\n" +
    "    fill:rgba(255,255,255,0.75);\n" +
    "    font-family: 'Titillium Web', sans-serif;\n" +
    "    font-weight: bold;\n" +
    "    letter-spacing: 1px;\n" +
    "}\n" +
    "\n" +
    ".intro-shade {\n" +
    "    background: rgba(0,0,0,0.5);\n" +
    "    position: absolute;\n" +
    "    top: 0;\n" +
    "    left: 0;\n" +
    "    width: 100%;\n" +
    "    height: 100%;\n" +
    "    margin: 0 auto;\n" +
    "    z-index: -1;\n" +
    "}\n" +
    "\n" +
    ".svg-defs {\n" +
    "    width:0;\n" +
    "    height:0;\n" +
    "}\n" +
    "\n" +
    "/* media queries */\n" +
    "@media only screen and (max-width: 1024px) {\n" +
    "    video {\n" +
    "        display:none\n" +
    "    }\n" +
    "\n" +
    "    .intro-mobile {\n" +
    "        visibility:visible;\n" +
    "        height:100%\n" +
    "    }\n" +
    "\n" +
    "    .port-mobile {\n" +
    "        visibility:visible\n" +
    "    }\n" +
    "\n" +
    "    .port-box a #fill-hover {\n" +
    "        fill:rgba(255,255,255,0.1);\n" +
    "        transition:fill .2s\n" +
    "    }\n" +
    "\n" +
    "    .contact-mobile {\n" +
    "        visibility:visible;\n" +
    "        height:100%\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "@media only screen and (max-width: 920px) {\n" +
    "    .intro-container {\n" +
    "        zoom: 0.8;\n" +
    "    }\n" +
    "    .continue-wrap {\n" +
    "        display: none;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 850px) {\n" +
    "    .intro-container {\n" +
    "        zoom: 0.7;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 740px) {\n" +
    "    .intro-container {\n" +
    "        zoom: 0.6;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 640px) {\n" +
    "    .intro-container {\n" +
    "        zoom: 0.55;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 600px) {\n" +
    "    .intro-container {\n" +
    "        zoom: 0.5;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 555px) {\n" +
    "    .intro-container {\n" +
    "        zoom: 0.45;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 510px) {\n" +
    "    .intro-container {\n" +
    "        zoom: 0.4;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 460px) {\n" +
    "    .intro-container {\n" +
    "        zoom: 0.35;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 410px) {\n" +
    "    .intro-container {\n" +
    "        zoom: 0.325;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 788px) {\n" +
    "    .desktop {\n" +
    "        visibility:hidden\n" +
    "    }\n" +
    "\n" +
    "    .mobile {\n" +
    "        visibility:visible\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 500px) {\n" +
    "    .shape--fill {\n" +
    "        fill: rgba(0,0,0,0.8);\n" +
    "    }\n" +
    "}\n" +
    "/*@media only screen and (max-width: 920px) {\n" +
    "    html {\n" +
    "        zoom: 0.8;\n" +
    "    }\n" +
    "    .continue-wrap {\n" +
    "        display: none;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 850px) {\n" +
    "    html {\n" +
    "        zoom: 0.7;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 740px) {\n" +
    "    html {\n" +
    "        zoom: 0.6;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 640px) {\n" +
    "    html {\n" +
    "        zoom: 0.55;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 600px) {\n" +
    "    html {\n" +
    "        zoom: 0.5;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 555px) {\n" +
    "    html {\n" +
    "        zoom: 0.45;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 510px) {\n" +
    "    html {\n" +
    "        zoom: 0.4;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 460px) {\n" +
    "    html {\n" +
    "        zoom: 0.35;\n" +
    "    }\n" +
    "}\n" +
    "@media only screen and (max-width: 410px) {\n" +
    "    html {\n" +
    "        zoom: 0.325;\n" +
    "    }\n" +
    "}*/\n" +
    ".imageContainer {\n" +
    "  background:rgba(26,26,36, 0.84);\n" +
    "  overflow:hidden;\n" +
    "  min-height: 500px;\n" +
    "  font-family: 'Jura', sans-serif;\n" +
    "  margin:0;padding:0;border:0 none;position: relative;\n" +
    "}\n" +
    ".imageContainerDiv {\n" +
    "  width:100%;\n" +
    "  height: 35em;\n" +
    "  display: flex;\n" +
    "  flex-direction: column;\n" +
    "}\n" +
    ".imageContainerDiv h1 {\n" +
    "  color: rgba(255,255,255,0.9);\n" +
    "  font-size: 50px;\n" +
    "  font-weight: 400;\n" +
    "  margin-top:auto;\n" +
    "  margin-bottom:auto;\n" +
    "}\n" +
    ".imageContainerSmall {\n" +
    "  background:rgba(36,36,46, 0.84);\n" +
    "  overflow:hidden;\n" +
    "  min-height: 200px;\n" +
    "  font-family: 'Jura', sans-serif;\n" +
    "  margin:0;padding:0;border:0 none;position: relative;\n" +
    "}\n" +
    ".imageContainerSmallDiv {\n" +
    "  width:100%;\n" +
    "  height: 200px;\n" +
    "  display: flex;\n" +
    "  flex-direction: column;\n" +
    "}\n" +
    ".imageContainerSmallDiv h1 {\n" +
    "  color: rgba(255,255,255,0.9);\n" +
    "  font-size: 50px;\n" +
    "  font-weight: 400;\n" +
    "  margin-top:auto;\n" +
    "  margin-bottom:auto;\n" +
    "}\n" +
    "video {\n" +
    "  position: absolute;\n" +
    "  top: 0;\n" +
    "  left: 0;\n" +
    "  bottom: 0;\n" +
    "  min-width: 100%;\n" +
    "  min-height: 100%;\n" +
    "  overflow: hidden;\n" +
    "  z-index: -5;\n" +
    "}\n" +
    "</style>\n" +
    "<!--Multidimensional Financial Partners-->\n" +
    "<div ng-show=\"false\" ng-controller=\"IntroCtrl\" class=\"intro-container\">\n" +
    "    <svg style=\"z-index:10\" class=\"intro\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1920 1080\" width=\"1920px\" height=\"1080px\" preserveAspectRatio=\"xMidYMid slice\">\n" +
    "        <defs>\n" +
    "            <mask class=\"intro-mask\" id=\"intro-mask\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" maskUnits=\"userSpaceOnUse\">\n" +
    "                <rect class=\"intro-rect\" x=\"0\" y=\"0\" width=\"1920px\" height=\"1080px\"></rect>\n" +
    "                <text x=\"960\" y=\"46%\" class=\"medium-text\">collaborative.capital</text>\n" +
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
    "</div>\n" +
    "<div ng-show=\"false\" class=\"imageContainer\">\n" +
    "    <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"videos/earth.mp4\" type=\"video/mp4\" playsinline></video>\n" +
    "    <div class=\"imageContainerDiv container\">  \n" +
    "        <h1 style=\"\">MULTIDIMENSIONAL CAPITAL PARTNERS</h1>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div ng-show=\"true\" class=\"intro\" style=\"max-height:500px\">\n" +
    "    <div class=\"intro-container\">\n" +
    "      <svg class=\"svg-defs\" viewBox=\"0 0 1920 1080\" viewPort=\"0 0 1920 1080\" preserveAspectRatio=\"xMidYMid slice\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "        <symbol id=\"intro-desktop-text\">\n" +
    "          <text style=\"font-size:48px;\" text-anchor=\"middle\"\n" +
    "                x=\"960\"  \n" +
    "                y=\"488\"\n" +
    "                dy=\".35em\"\n" +
    "                class=\"medium-text\"\n" +
    "                >\n" +
    "            CRE8.CAPITAL\n" +
    "          </text> \n" +
    "          <text style=\"font-size:28px;\" text-anchor=\"middle\"\n" +
    "                x=\"960\"  \n" +
    "                y=\"570\"\n" +
    "                dy=\".35em\"\n" +
    "                class=\"medium-text\"\n" +
    "                >\n" +
    "            MULTIDIMENSIONAL CAPITAL PARTNERS\n" +
    "          </text> \n" +
    "        </symbol>       \n" +
    "        <div class=\"intro-shade\"></div>  \n" +
    "      </svg> \n" +
    "      <div class=\"box-with-text\">\n" +
    "        <div class=\"text-fill\">\n" +
    "          <video itemscope itemtype=\"VideoObject\"\n" +
    "              class=\"video\" \n" +
    "              src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\"\n" +
    "              preload=\"auto\" \n" +
    "              autoplay=\"autoplay\" \n" +
    "              loop=\"loop\" \n" +
    "              muted=\"muted\">\n" +
    "          </video>\n" +
    "        </div>\n" +
    "        <svg class=\"svg-inverted-mask\" viewBox=\"0 0 1920 1080\" viewPort=\"0 0 1920 1080\" \n" +
    "             preserveAspectRatio=\"xMidYMid slice\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "          <rect\n" +
    "            width=\"100%\"\n" +
    "            height=\"100%\"\n" +
    "            mask=\"url(#intro-desktop-mask)\"\n" +
    "            class=\"shape--fill\"/>\n" +
    "          <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#intro-desktop-text\" class=\"text--transparent\"></use>\n" +
    "          <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#intro-desktop-novo\" class=\"text--transparent\"></use>\n" +
    "        </svg> \n" +
    "      </div>\n" +
    "    </div>\n" +
    "  <div class=\"intro-mobile\"></div>\n" +
    "</div>\n" +
    "");
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
    "				<md-divider></md-divider>\n" +
    "			</md-list-item>\n" +
    "		</md-list>\n" +
    "	</md-content>\n" +
    "</md-sidenav>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "	<div class=\"row\">\n" +
    "		<h2><span ng-click=\"sideNavToggle()\"><i style=\"font-size:24px\" class=\"fa fa-bars\"></i></span> {{selectedPair[0]}} / {{selectedPair[1]}}</h2>\n" +
    "	</div>\n" +
    "	<div class=\"row\">\n" +
    "		<button ng-class=\"selectedClass('Live')\" ng-click=\"getLive()\">LIVE</button>\n" +
    "		<button ng-class=\"selectedClass('5000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '5000')\">5SEC </button><!--x6-->\n" +
    "		<button ng-class=\"selectedClass('30000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '30000')\">30SEC</button><!--x2-->\n" +
    "		<button ng-class=\"selectedClass('60000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '60000')\">1MIN </button><!--x5-->\n" +
    "		<button ng-class=\"selectedClass('300000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '300000')\">5MIN </button><!--x6-->\n" +
    "		<button ng-class=\"selectedClass('1800000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '1800000')\">30MIN</button><!--x2-->\n" +
    "		<button ng-class=\"selectedClass('3600000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '3600000')\">1HR </button><!--x2-->\n" +
    "		<button ng-class=\"selectedClass('7200000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '7200000')\">2HR </button><!--x2-->\n" +
    "		<button ng-class=\"selectedClass('14400000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '14400000')\">4HR </button><!--x2-->\n" +
    "		<button ng-class=\"selectedClass('21600000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '21600000')\">6HR </button><!--x3/2-->\n" +
    "		<button ng-class=\"selectedClass('43200000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '43200000')\">12HR </button><!--x2-->\n" +
    "		<button ng-class=\"selectedClass('86400000')\" ng-click=\"selectData(stateParams.path1, stateParams.path2, '86400000')\">24HR </button><!--x2-->\n" +
    "	</div>\n" +
    "	<hr>\n" +
    "	<!--how much data..?-->\n" +
    "	<!--zoom out ability.. a lot-->\n" +
    "	<div class=\"row\">\n" +
    "		<h2>Price Data</h2>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getEma([20,40,80,160,320,640],'price')\">EMA</button><!--select periods..?-->\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getTsf([20,40,80,160,320,640],'price')\">TSF</button><!--select periods..?-->\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getBband([10],[1,2,3],'price')\">BBAND</button><!--select periods / stD.?-->\n" +
    "		<!--<button class=\"btn btn-default\" ng-click=\"getNn('price')\">nn</button>-->\n" +
    "		<!--<button class=\"btn btn-default\" ng-click=\"getPdf('price')\">pdf</button>--><!--;)-->\n" +
    "		<hr>\n" +
    "		<div class=\"col-md-10\"><highchart config=\"chartConfig\"></highchart></div>\n" +
    "		<div class=\"col-md-2\"><highchart config=\"bidAskChart\"></highchart></div>\n" +
    "		<!--<highchart config=\"chartConfig\"></highchart>-->\n" +
    "	</div>\n" +
    "	<!--<h2>Order Book</h2><hr>\n" +
    "	<highchart config=\"bidAskChart\"></highchart>-->\n" +
    "	<div class=\"row\">\n" +
    "		<h2>Market Change</h2>\n" +
    "		<!--<button class=\"btn btn-default\" ng-click=\"getEma([20,40,80,160,320,640],'change')\">ema</button>--><!--select periods..?-->\n" +
    "		<!--<button class=\"btn btn-default\" ng-click=\"getTsf([20,40,80,160,320,640],'change')\">tsf</button>--><!--select periods..?-->\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getBband([10],[1,2,3],'change')\">BBAND</button><!--select periods / sD..?-->\n" +
    "		<!--<button class=\"btn btn-default\" ng-click=\"getNn('change')\">nn</button>-->\n" +
    "		<!--<button class=\"btn btn-default\" ng-click=\"getPdf('change')\">PDF</button>--><!--;)-->\n" +
    "		<hr>\n" +
    "		<highchart config=\"changeChart\"></highchart>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<h2>Oscillator</h2>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getMacd([20,40,80,160,320,640],'change')\">MACD</button>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getFosc([20,40,80,160,320,640],'change')\">FOSC</button>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getRsi([20,40,80,160,320,640],'change')\">RSI</button>\n" +
    "		<hr>\n" +
    "		<highchart config=\"oscillatorChart\"></highchart>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<h2>Probability Density</h2>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getPdf('change')\">PDF</button>\n" +
    "		<hr>\n" +
    "		<!--<canvas id=\"tableHeatmap\" width=\"1200\" height=\"500\"></canvas>-->\n" +
    "		<highchart config=\"heatMapChart\"></highchart>\n" +
    "		<div class=\"spacing-10\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<!--TODO: POSITIONS.. LONG SHORT.. SELL THIS AMOUNT AT THIS PRICE.. ETC. NOT YET EXECUTED-->\n" +
    "	<div class=\"row\">\n" +
    "		<h2>Market Orders</h2>\n" +
    "		<table class=\"table table-inverse table-hover\">\n" +
    "		    <thead>\n" +
    "				<tr>\n" +
    "					<th>Type</th><!--not relevant.. just reverse asset1 and 2.. -->\n" +
    "					<th></th>\n" +
    "					<th></th>\n" +
    "					<th>Date</th>\n" +
    "				</tr>\n" +
    "		    </thead>\n" +
    "		    <tbody>\n" +
    "				<tr ng-repeat=\"order in orders\">\n" +
    "					<td>{{order.type}}</td>\n" +
    "					<td>{{order.amount}} {{order.asset2}}</td>\n" +
    "					<td>{{order.price}} {{order.asset1}}</td>\n" +
    "					<td>{{order.createdAt | date :  \"y MM-dd hh:mm.ss a\"}}</td>\n" +
    "				</tr>\n" +
    "		    </tbody>\n" +
    "		</table>\n" +
    "	</div>\n" +
    "\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("markets/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("markets/index.tpl.html",
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-md-9\">\n" +
    "			<h1>Markets</h1>\n" +
    "			<highchart config=\"chartConfig\"></highchart>\n" +
    "		</div>\n" +
    "		<div class=\"col-md-3\">\n" +
    "			<!--<p class=\"btn btn-default\" ng-click=\"selectTime(5000,'BTC')\">5sec</p>-->\n" +
    "			<!--<p class=\"btn btn-default\" ng-click=\"selectTime(30000,'BTC')\">30sec</p>-->\n" +
    "			<p class=\"btn btn-default\" ng-click=\"selectTime(60000,'BTC')\">1min</p>\n" +
    "			<p class=\"btn btn-default\" ng-click=\"selectTime(300000,'BTC')\">5min</p>\n" +
    "			<p class=\"btn btn-default\" ng-click=\"selectTime(1800000,'BTC')\">30min</p>\n" +
    "			<p class=\"btn btn-default\" ng-click=\"selectTime(3600000,'BTC')\">1hr</p>\n" +
    "			<p class=\"btn btn-default\" ng-click=\"selectTime(7200000,'BTC')\">2hrs</p>\n" +
    "			<p class=\"btn btn-default\" ng-click=\"selectTime(14400000,'BTC')\">4hrs</p>\n" +
    "			<p class=\"btn btn-default\" ng-click=\"selectTime(21600000,'BTC')\">6hrs</p>\n" +
    "			<p class=\"btn btn-default\" ng-click=\"selectTime(43200000,'BTC')\">12hrs</p>\n" +
    "			<p class=\"btn btn-default\" ng-click=\"selectTime(86400000,'BTC')\">24hrs</p>\n" +
    "			<div class=\"spacing-25\"></div>\n" +
    "			<p class=\"btn btn-default\" ng-click=\"solvePortfolio('60000', 100)\">Solve</p>\n" +
    "			<p class=\"btn btn-default\" ng-click=\"solvePortfolioMulti('60000', 100)\">MultiSolve</p>\n" +
    "			<!--<p class=\"btn btn-default\" ng-click=\"solvePortfolioPDF('60000', 100)\">MultiSolvePDF</p>-->\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		\n" +
    "		<!--<div class=\"col-md-6\">\n" +
    "			<div ng-repeat=\"portfolio in portfolioData.portfolioSet\">\n" +
    "				{{portfolio}}\n" +
    "				<br><br>\n" +
    "			</div>\n" +
    "		</div>-->\n" +
    "\n" +
    "		<div>\n" +
    "			<div class=\"spacing-25\"></div>\n" +
    "			<div ng-repeat=\"order in portfolioData.orderSet\">\n" +
    "				<div class=\"col-md-3 col-sm-4 col-xs-6 \">\n" +
    "					<div class=\"card\">\n" +
    "						<div style=\"padding:16px;\">\n" +
    "							<p style=\"color:grey\">{{order.amount}} {{order.asset1}} ==@{{order.price}}==> {{order.amount / order.price}} {{order.asset2}} @ {{order.createdAt}}</p>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<div ng-repeat=\"neuralNet in neuralNets\">\n" +
    "			<div class=\"col-md-3 col-sm-4 col-xs-6 \">\n" +
    "				<div class=\"card\">\n" +
    "					<div style=\"padding:16px;\">\n" +
    "						<a href=\"neural/{{neuralNet}}\">{{neuralNet}}</a>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<h1>Markets</h1>\n" +
    "		<div ng-repeat=\"pair in tradingPairs\">\n" +
    "			<div class=\"col-md-3 col-sm-4 col-xs-6 \">\n" +
    "				<div class=\"card\">\n" +
    "					<div style=\"padding:16px;\">\n" +
    "						<a href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"spacing-50\"></div>\n" +
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
    "      <a class=\"navbar-brand\" href=\"/\"><img src=\"images/tesseract.png\" style=\"height:32px;float:left;margin-top:-3px;margin-right:10px\">CRE8.CAPITAL</a>\n" +
    "      <!--cre8.capital-->\n" +
    "    </div>\n" +
    "    <div class=\"collapse navbar-collapse\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li ng-class=\"{ active: isActive('/about')}\" ng-show=\"!currentUser\"><a href=\"/about\">ABOUT</a></li>\n" +
    "        <li ng-class=\"{ active: isActive('/markets')}\"><a href=\"/markets\">EXPLORE</a></li>\n" +
    "        <form class=\"navbar-form pull-left\" role=\"search\" action=\"/search/\" onSubmit=\" location.href = 'search/' + document.getElementById('search-link').value; return false;\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <input ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\" id=\"search-link\" size=\"40\" type=\"text\" placeholder=\"\">\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </ul>\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li ng-class=\"{ active: isActive('/account')}\" ng-show=\"currentUser\"><a href=\"/account\">{{currentUser.username}}</a></li>\n" +
    "        <li ng-show=\"currentUser\"><a href=\"/logout\">SIGNOUT</a></li>\n" +
    "        <li ng-class=\"{ active: isActive('/register')}\" ng-show=\"!currentUser\"><a href=\"/register\">REGISTER</a></li>\n" +
    "        <li ng-class=\"{ active: isActive('/login')}\" ng-show=\"!currentUser\"><a href=\"/login\">LOGIN</a></li>\n" +
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

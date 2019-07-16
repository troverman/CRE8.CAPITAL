angular.module("templates-app", ["about/index.tpl.html", "account/index.tpl.html", "footer/index.tpl.html", "home/index.tpl.html", "login/index.tpl.html", "market/index.tpl.html", "marketPair/index.tpl.html", "markets/index.tpl.html", "member/index.tpl.html", "nav/index.tpl.html", "register/index.tpl.html", "search/index.tpl.html"]);

angular.module("about/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<div class=\"intro\" style=\"\">\n" +
    "    <div class=\"intro-container\">\n" +
    "        <svg class=\"svg-defs\" viewBox=\"0 0 1920 1080\" viewPort=\"0 0 1920 1080\" preserveAspectRatio=\"xMidYMid slice\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "            <symbol id=\"intro-desktop-text\">\n" +
    "                <text style=\"font-size:108px;\" text-anchor=\"middle\" x=\"960\" y=\"488\" dy=\".35em\" class=\"medium-text\">CRE8.CAPITAL</text> \n" +
    "                <text style=\"font-size:28px;\" text-anchor=\"middle\" x=\"960\" y=\"570\" dy=\".35em\" class=\"medium-text\">ABOUT</text> \n" +
    "            </symbol>  \n" +
    "            <div class=\"intro-shade\"></div>  \n" +
    "        </svg> \n" +
    "        <div class=\"box-with-text\">\n" +
    "            <div class=\"text-fill\">\n" +
    "                <video itemscope itemtype=\"VideoObject\" class=\"video\" src=\"https://www.cre8.xyz/videos/galaxys.mp4\" preload=\"auto\"autoplay=\"autoplay\" loop=\"loop\" muted=\"muted\"></video>\n" +
    "            </div>\n" +
    "            <svg class=\"svg-inverted-mask\" viewBox=\"0 0 1920 1080\" viewPort=\"0 0 1920 1080\" preserveAspectRatio=\"xMidYMid slice\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                <rect width=\"100%\" height=\"100%\" mask=\"url(#intro-desktop-mask)\" class=\"shape--fill\"/>\n" +
    "                <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#intro-desktop-text\" class=\"text--transparent\"></use>\n" +
    "                <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#intro-desktop-novo\" class=\"text--transparent\"></use>\n" +
    "            </svg> \n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"intro-mobile\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "    <div class=\"row\">\n" +
    "        <h3>The Network Effects Of Coming Together</h3>\n" +
    "        <p style=\"font-style:italic;color:gray\">Consisting of thousands of companies and individuals spanning the globe.</p> \n" +
    "        <p style=\"font-style:italic;color:gray\">Our Shared Intelligence learns and works to create value and amass wealth.</p>\n" +
    "        <p style=\"font-style:italic;color:gray\">This network of analysts spans the globe. A strong team.</p>\n" +
    "    </div>\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<!--\n" +
    "<div style=\"color:white;background-color:black\">\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "    <div class=\"container\" style=\"text-align:left\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <h1>Analysis at Scale</h1>\n" +
    "                <h5>Open Intelligence & Market Information</h5>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\" style=\"overflow:hidden; text-align:right\">\n" +
    "                <img style=\"height:100px\"src=\"images/2.gif\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "</div>\n" +
    "-->\n" +
    "\n" +
    "<div style=\"background:url('https://source.unsplash.com/1600x900/?finance,code')\" class=\"imageContainerSmall\">\n" +
    "    <div style=\"background:rgba(0,0,0,0.75)\" class=\"imageContainerSmallDiv\">  \n" +
    "        <div style=\"margin-top: auto;margin-bottom: auto;\">\n" +
    "            <div class=\"container\">\n" +
    "                <h1 style=\"text-align:left;color:rgba(255,255,255,0.9);font-weight:400;\">Analysis at Scale</h1>\n" +
    "                <h5 style=\"color:white;text-align:left\">Open Intelligence & Market Information</h5>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h3>Collaboration and Contribution</h3>\n" +
    "            <p style=\"font-style:italic;color:gray\">The Ethos of CRE8 reflects collaboration. <a href=\"https://www.cre8.xyz\">CRE8.XYZ</a></p>\n" +
    "            <div class=\"spacing-5\"></div>\n" +
    "\n" +
    "            <h4>Community Analysts</h4>\n" +
    "            <p style=\"font-style:italic;color:gray\">We all thrive when we share intelligence. Earn Tokens for Contribution.</p>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h3>Transparent Finance</h3>\n" +
    "            <p style=\"font-style:italic;color:gray\">We Create Valuable Intelligence Together. A shared ledger of communical financaial assets.</p>\n" +
    "            <div class=\"spacing-5\"></div>\n" +
    "\n" +
    "            <h4>Mapping the Market</h4>\n" +
    "            <p style=\"font-style:italic;color:gray\">Multidimensional Market Traversal facilitated through Peer-to-Peer Machine Learning.</p>\n" +
    "            <div class=\"spacing-5\"></div>\n" +
    "\n" +
    "            <h4>Machine Learning</h4>\n" +
    "            <p style=\"font-style:italic;color:gray\">Shared information creates intelligence.</p>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-6\">\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "    \n" +
    "    <!--\n" +
    "    <div class=\"spacing-50\"></div>\n" +
    "    <highchart config=\"chartConfig\"></highchart>\n" +
    "    <a href=\"/markets\" class=\"btn btn-default log-btn\">Explore</a>\n" +
    "    -->\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div style=\"background:url('https://source.unsplash.com/1600x900/?finance,code')\" class=\"imageContainerSmall\">\n" +
    "    <div style=\"background:rgba(0,0,0,0.75)\" class=\"imageContainerSmallDiv\">  \n" +
    "        <div style=\"margin-top: auto;margin-bottom: auto;\">\n" +
    "            <div class=\"container\">\n" +
    "                <h1 style=\"text-align:left;color:rgba(255,255,255,0.9);font-weight:400;\">Investment Performance</h1>\n" +
    "                <h5 style=\"color:white;text-align:left\">With {memberCount} Members, {trandeCount} trades, and over {capitalAppreciation}% Capital Appreciation. We are Successful.</h5>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"spacing-50\"></div>\n" +
    "        <highchart config=\"chartConfig\"></highchart>\n" +
    "        <a href=\"/markets\" class=\"btn btn-default log-btn\">Explore</a>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"spacing-50\"></div>\n" +
    "<div ng-include=\"'register/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("account/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/index.tpl.html",
    "<div style=\"background-color:black;color:white;text-align:left\">\n" +
    "\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1>Account Settings</h1>\n" +
    "            <a style=\"color:white;text-transform:uppercase\" href=\"member/{{currentUser.username}}\">{{currentUser.id}} | {{currentUser.username}}</a></h4>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "    <div class=\"spacing-15\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "    	<form role=\"form\">\n" +
    "            <h4>Username</h4>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input class=\"form-control\" name=\"userName\" placeholder=\"username\" type=\"text\" ng-model=\"member.username\"> \n" +
    "                <i class=\"fa fa-user\"></i>\n" +
    "            </div>\n" +
    "            <h4>First Name</h4>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input class=\"form-control\" name=\"firstName\" placeholder=\"First Name\" type=\"text\" ng-model=\"member.firstName\"> \n" +
    "                <i class=\"fa fa-user\"></i>\n" +
    "            </div>\n" +
    "            <h4>Last Name</h4>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input class=\"form-control\" name=\"lastName\" placeholder=\"Last Name\" type=\"text\" ng-model=\"member.lastName\"> \n" +
    "                <i class=\"fa fa-user\"></i>\n" +
    "            </div>\n" +
    "            <div class=\"align-right\">\n" +
    "                <button class=\"btn btn-default log-btn\" type=\"submit\" value=\"submit\" ng-click=\"update()\">Save</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"spacing-15\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "    	<h2>Settings</h2>\n" +
    "        <p>Investment Strategy</p>\n" +
    "        <p>Investment Fees</p>\n" +
    "    	<p>Notifications</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"spacing-15\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <h2>Wallets</h2>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"spacing-15\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "	   <h2>Exchange API Keys</h2>\n" +
    "\n" +
    "	   <!--poloniex-->\n" +
    "        <form role=\"form\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <input class=\"form-control\" name=\"apiKey\" placeholder=\"api key\" title=\"api key\" type=\"text\" ng-model=\"member.poloniexApiKey\"> \n" +
    "                <i class=\"fa fa-user\"></i>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input class=\"form-control\" name=\"apiSecret\" placeholder=\"api secret\" title=\"api secret\" type=\"text\" ng-model=\"member.poloniexApiSecret\"> \n" +
    "                <i class=\"fa fa-user\"></i>\n" +
    "            </div>\n" +
    "            <div class=\"align-right\">\n" +
    "                <button class=\"btn btn-default log-btn\" type=\"submit\" value=\"submit\" ng-click=\"update()\">Save</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"spacing-50\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("footer/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("footer/index.tpl.html",
    "<div class=\"footer\" ng-controller=\"FooterCtrl\">\n" +
    "\n" +
    "	{{date | date:'yyyy'}} <a href=\"/\">collaborative.capital</a>\n" +
    "	<a href=\"/about\">about</a>\n" +
    "	<a href=\"#\">terms</a>\n" +
    "	<a href=\"https://www.instagram.com/cre8capital\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "	<a href=\"https://www.twitter.com/cre8capital\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "</div>");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<div ng-show=\"currentUser\">\n" +
    "\n" +
    "	<div style=\"background-color:black;color:white;text-align:left\">\n" +
    "	    <div class=\"spacing-25\"></div>\n" +
    "	    <div class=\"container\">\n" +
    "	        <div class=\"row\">\n" +
    "	            <h1 ng-click=\"subNavToggle()\" style=\"text-transform:uppercase\"><i style=\"font-size:30px\" class=\"fa fa-bars\"></i> Dashboard</h1>\n" +
    "	        </div>\n" +
    "	    </div>\n" +
    "	    <div class=\"spacing-25\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"spacing-25\"></div>\n" +
    "\n" +
    "	<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "		<div class=\"row\">\n" +
    "			<p><a href=\"account\">link in wallets, connect api keys, fund account</a></p>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-12\">\n" +
    "				<canvas id=\"doughnut\" class=\"chart chart-doughnut\" chart-data=\"portfolioData\" chart-labels=\"portfolioLabels\"></canvas>\n" +
    "			</div>\n" +
    "			<!--\n" +
    "			<div class=\"col-md-4\">\n" +
    "				<highchart config=\"chartConfig\"></highchart>\n" +
    "			</div>\n" +
    "			-->\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "		<div class=\"row\">\n" +
    "			<p>Available to Trade: {{btcValue}} BTC</p>\n" +
    "			<p>Order value: {{btcOrderValue}} BTC</p>\n" +
    "			<p>Protfolio Value: {{btcValue+btcOrderValue}} BTC</p>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "		<div class=\"row\">\n" +
    "			<h1>Assets</h1>\n" +
    "			<div>\n" +
    "				<table class=\"table table-striped table-hover\">\n" +
    "				    <thead>\n" +
    "						<tr>\n" +
    "							<th>Asset</th>\n" +
    "							<th>Amount</th>\n" +
    "							<!--<th>Wallet</th>-->\n" +
    "							<th>UpdatedAt</th>\n" +
    "						</tr>\n" +
    "				    </thead>\n" +
    "				    <tbody>\n" +
    "						<tr ng-repeat=\"asset in assets | orderBy:'-amount'\">\n" +
    "							<td>{{asset.symbol}}</td>\n" +
    "							<td>{{asset.amount}}</td>\n" +
    "							<!--<td>Wallet</td>-->\n" +
    "							<td>{{asset.updatedAt | date :  \"y MM-dd hh:mm.ss a\"}}</td>\n" +
    "						</tr>\n" +
    "				    </tbody>\n" +
    "				</table>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"spacing-15\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<h1>Order Book</h1>\n" +
    "			<div>\n" +
    "				<table class=\"table table-striped table-hover\">\n" +
    "				    <thead>\n" +
    "						<tr>\n" +
    "							<th>Market</th>\n" +
    "							<th>Type</th><!--not relevant.. just reverse asset1 and 2.. -->\n" +
    "							<th></th>\n" +
    "							<th></th>\n" +
    "							<th>Date</th>\n" +
    "						</tr>\n" +
    "				    </thead>\n" +
    "				    <tbody>\n" +
    "						<tr ng-repeat=\"order in orders\">\n" +
    "							<td><a style=\"color:gray\" href=\"market/{{order.asset1}}/{{order.asset2}}\">{{order.asset1}}/{{order.asset2}}</a></td>\n" +
    "							<td>{{order.type}}</td>\n" +
    "							<td>{{order.amount}} {{order.asset2}}</td>\n" +
    "							<td>{{order.price}} {{order.asset1}}</td>\n" +
    "							<td>{{order.createdAt | date :  \"y MM-dd hh:mm.ss a\"}}</td>\n" +
    "						</tr>\n" +
    "				    </tbody>\n" +
    "				</table>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "		<div class=\"row\">\n" +
    "			<h1>Markets</h1>\n" +
    "			<div ng-repeat=\"pair in tradingPairs\">\n" +
    "				<div class=\"col-md-3 col-sm-4 col-xs-6 \">\n" +
    "					<a href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\">{{pair.split('/')[1]}}/{{pair.split('/')[0]}}</a>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "	\n" +
    "	<div class=\"spacing-50\"></div>\n" +
    "	<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div ng-show=\"!currentUser\">\n" +
    "\n" +
    "	<div class=\"intro\" style=\"\">\n" +
    "	    <div class=\"intro-container\">\n" +
    "	        <svg class=\"svg-defs\" viewBox=\"0 0 1920 1080\" viewPort=\"0 0 1920 1080\" preserveAspectRatio=\"xMidYMid slice\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "	            <symbol id=\"intro-desktop-text\">\n" +
    "	                <text style=\"font-size:62px;font-family:Titillium Web,Helvetica,Arial,sans-serif;\" text-anchor=\"middle\" x=\"960\" y=\"488\" dy=\".35em\" class=\"medium-text\">CRE8.CAPITAL</text> \n" +
    "	                <text style=\"font-size:22px;\" text-anchor=\"middle\" x=\"960\" y=\"570\" dy=\".35em\" class=\"medium-text\">MULTIDIMENSIONAL CAPITAL PARTNERS</text> \n" +
    "	            </symbol>  \n" +
    "	            <div class=\"intro-shade\"></div>  \n" +
    "	        </svg> \n" +
    "	        <div class=\"box-with-text\">\n" +
    "	            <div class=\"text-fill\">\n" +
    "	                <video itemscope itemtype=\"VideoObject\" class=\"video\" src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" preload=\"auto\"autoplay=\"autoplay\" loop=\"loop\" muted=\"muted\"></video>\n" +
    "	            </div>\n" +
    "	            <svg class=\"svg-inverted-mask\" viewBox=\"0 0 1920 1080\" viewPort=\"0 0 1920 1080\" preserveAspectRatio=\"xMidYMid slice\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "	                <rect width=\"100%\" height=\"100%\" mask=\"url(#intro-desktop-mask)\" class=\"shape--fill\"/>\n" +
    "	                <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#intro-desktop-text\" class=\"text--transparent\"></use>\n" +
    "	                <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#intro-desktop-novo\" class=\"text--transparent\"></use>\n" +
    "	            </svg> \n" +
    "	        </div>\n" +
    "	    </div>\n" +
    "	    <div class=\"intro-mobile\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"container\">\n" +
    "	    <div class=\"spacing-50\"></div>\n" +
    "	    <div class=\"row\">\n" +
    "	        <h3>The Network Effects Of Coming Together</h3>\n" +
    "	        <p style=\"font-style:italic;color:gray\">Our Shared Intelligence continually creates value.</p>\n" +
    "	       	<!--<p style=\"font-style:italic;color:gray\">Always growing and learning, CRE8 consists of a companies and individuals spanning the globe.</p>-->\n" +
    "	        <!--<p style=\"font-style:italic;color:gray\">This network of intelligence spans the globe. A strong team.</p>-->\n" +
    "	    </div>\n" +
    "	    <div class=\"spacing-50\"></div>\n" +
    "	</div>\n" +
    "	\n" +
    "	<div class=\"container\" id=\"about\">\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-12\">\n" +
    "				<div style=\"background:url('https://source.unsplash.com/1600x900/?finance,code')\" class=\"imageContainerSmall\">\n" +
    "                    <div style=\"background:rgba(0,0,0,0.75)\" class=\"imageContainerSmallDiv\">  \n" +
    "                        <div style=\"margin-top: auto;margin-bottom: auto;\">\n" +
    "                            <div class=\"container\">\n" +
    "                                <h1 style=\"text-align:left;font-size:35px;color:rgba(255,255,255,0.9);font-weight:400;\">Empowered Financial Representation</h1>\n" +
    "                                <h5 style=\"color:white;text-align:left\">Backed by Sound, Open Data</h5>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "		<div class=\"row\" style=\"padding:16px;\">\n" +
    "			<div class=\"col-sm-6\">\n" +
    "\n" +
    "				<h3>We <a href=\"#\">continually learn and grow</a>.</h3>\n" +
    "				<p style=\"color:gray;font-style:italic\">Our Community of analysts work together to support another. <!--A network of peers--></p>\n" +
    "				<div class=\"spacing-5\"></div>\n" +
    "\n" +
    "				<h3>Open & Shared Intelligence</h3>\n" +
    "				<p style=\"color:gray;font-style:italic\">Data we use, data we prouduce, together.</p>\n" +
    "				<div class=\"spacing-5\"></div>\n" +
    "\n" +
    "				<h3>Transparent Results</h3>\n" +
    "				<p style=\"color:gray;font-style:italic\">Always backed with hard-data.</p>\n" +
    "				<div class=\"spacing-50\"></div>\n" +
    "\n" +
    "			</div>\n" +
    "			<div class=\"col-sm-6\" style=\"text-align:right\">\n" +
    "				<div class=\"block\">\n" +
    "                    <div class=\"shape\">\n" +
    "                        <div class=\"cube outer\">\n" +
    "                            <div class=\"side left\"></div>\n" +
    "                            <div class=\"side right\"></div>\n" +
    "                            <div class=\"side top\"></div>\n" +
    "                            <div class=\"side bottom\"></div>\n" +
    "                            <div class=\"side front\"></div>\n" +
    "                            <div class=\"side back\"></div>\n" +
    "                            <div class=\"cube\">\n" +
    "                                <div class=\"side left\"></div>\n" +
    "                                <div class=\"side right\"></div>\n" +
    "                                <div class=\"side top\"></div>\n" +
    "                                <div class=\"side bottom\"></div>\n" +
    "                                <div class=\"side front\"></div>\n" +
    "                                <div class=\"side back\"></div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-sm-5\" style=\"text-align:center\">\n" +
    "				<img style=\"max-height:300px;\" src=\"images/1.gif\">\n" +
    "				<div class=\"spacing-50\"></div>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"col-sm-7\" style=\"\">\n" +
    "\n" +
    "				<h3>Collaboration and Contribution</h3>\n" +
    "				<!-- and analytic insight ? -->\n" +
    "				<p style=\"color:gray;font-style:italic\">We continually learn from intelligence produced from your computational contribution.</p>\n" +
    "				<p style=\"color:gray;font-style:italic\">Deep Learning Techniques create actionable intelligence.</p>\n" +
    "				<div class=\"spacing-10\"></div>\n" +
    "\n" +
    "				<h3>Decentralized Analysis at Scale</h3>\n" +
    "				<p style=\"color:gray;font-style:italic\">Peer to Peer Distributed Networks performing computation together.</p>\n" +
    "				<p style=\"color:gray;font-style:italic\">Creating Computational Intelligence Designed to Normalize Risk and Equalize Investment Returns.</p>\n" +
    "\n" +
    "				<div class=\"spacing-10\"></div>\n" +
    "				<!--<a href=\"/about\" class=\"btn btn-default log-btn\">Learn More</a>-->\n" +
    "\n" +
    "			</div>\n" +
    "\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"spacing-100\"></div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div style=\"text-align:left;color:gray;background-color:black;\">\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "		<div class=\"container\">\n" +
    "			<highchart config=\"chartConfig\"></highchart>\n" +
    "		</div>\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div style=\"text-align:left;\" class=\"container\">\n" +
    "		<div class=\"spacing-50\"></div>\n" +
    "\n" +
    "		<div style=\"background:url('https://source.unsplash.com/1600x900/?finance,code,data,analysis,forex')\" class=\"imageContainerSmall\">\n" +
    "            <div style=\"background:rgba(0,0,0,0.75)\" class=\"imageContainerSmallDiv\">  \n" +
    "                <div style=\"margin-top: auto;margin-bottom: auto;\">\n" +
    "                    <div class=\"container\">\n" +
    "                        <h1 style=\"text-align:left;font-size:35px;color:rgba(255,255,255,0.9);font-weight:400;\">Transparent Orders</h1>\n" +
    "                        <h5 style=\"color:white;text-align:left\">Accountability in Investment</h5>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "		<div class=\"spacing-10\"></div>\n" +
    "		<div style=\"padding:16px\">\n" +
    "			<table class=\"table table-inverse table-hover\">\n" +
    "			    <thead>\n" +
    "					<tr>\n" +
    "						<th>Market</th>\n" +
    "						<th>Type</th>\n" +
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
    "		<div class=\"spacing-50\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-include=\"'register/index.tpl.html'\"></div>\n" +
    "</div>\n" +
    "\n" +
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
    "<div style=\"background-color:black;color:white;text-align:left\">\n" +
    "\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "    <div class=\"container\">\n" +
    "    	<div class=\"row\"><h1 ng-click=\"marketsToggle()\"><i style=\"font-size:30px\" class=\"fa fa-bars\"></i> {{market}}</h1></div>\n" +
    "    </div>\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTimeBad(60000,'BTC')\">1min</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTimeBad(300000,'BTC')\">5min</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTimeBad(1800000,'BTC')\">30min</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTimeBad(3600000,'BTC')\">1hr</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTimeBad(7200000,'BTC')\">2hrs</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTimeBad(14400000,'BTC')\">4hrs</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTimeBad(21600000,'BTC')\">6hrs</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTimeBad(43200000,'BTC')\">12hrs</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTimeBad(86400000,'BTC')\">24hrs</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"solvePortfolio('60000', 100)\">Solve</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"solvePortfolioMulti('60000', 100)\">MultiSolve</p>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "	<hr>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<highchart config=\"chart\"></highchart>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "\n" +
    "		<h3>Value Vector</h3>\n" +
    "		<!--SEARCH-->\n" +
    "		<table class=\"table table-striped table-hover\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                	<th>Asset</th>\n" +
    "                	<th>Value</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"asset in vector.data\" ng-if=\"asset.data != '--'\">\n" +
    "                    <td><a href=\"market/{{market}}/{{asset.name}}\">{{asset.name}}</a></td>\n" +
    "					<td>{{asset.data}}</td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "\n" +
    "		<h3>Value Matrix</h3>\n" +
    "		<!--SELECTED SET-->\n" +
    "		<div style=\"overflow:scroll\">\n" +
    "			<table class=\"table table-striped table-hover\">\n" +
    "	            <thead>\n" +
    "	                <tr>\n" +
    "	                	<th></th>\n" +
    "	                	<th ng-repeat=\"vector in matrix\">\n" +
    "	                		<a href=\"market/{{vector.name}}\">{{vector.name}}</a>\n" +
    "	                	</th>\n" +
    "	                </tr>\n" +
    "	            </thead>\n" +
    "	            <tbody>\n" +
    "	                <tr ng-repeat=\"vector in matrix\">\n" +
    "	                	<td><b><a href=\"market/{{vector.name}}\">{{vector.name}}</a></b></td>\n" +
    "						<td style=\"max-width:50px;overflow:scroll\" ng-repeat=\"asset in vector.data\"><a href=\"market/{{vector.name}}/{{asset.name}}\">{{asset.data}}</a></td>\n" +
    "	                </tr>\n" +
    "	            </tbody>\n" +
    "	        </table>\n" +
    "	    </div>\n" +
    "\n" +
    "		<!--MULT BY PORTFOLIO VECTOR-->\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "    <div class=\"spacing-10\"></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <h3>Order Book Tensor</h3>\n" +
    "        <!--SELECTED SET & EXCHANGE-->\n" +
    "        <div style=\"overflow:scroll\">\n" +
    "			<table class=\"table table-striped table-hover\">\n" +
    "	            <thead>\n" +
    "	                <tr>\n" +
    "	                	<th ng-repeat=\"vector in matrix\"><a href=\"market/{{vector.name}}\">{{vector.name}}</a></th>\n" +
    "	                </tr>\n" +
    "	            </thead>\n" +
    "	            <tbody>\n" +
    "	                <tr ng-repeat=\"vector in matrix\">\n" +
    "						<td style=\"max-width:50px;overflow:scroll\" ng-repeat=\"asset in vector.data\">\n" +
    "							<a ng-if=\"asset.data != '--' && asset.data != 1\" href=\"market/{{vector.name}}/{{asset.name}}\">[[{{asset.data}}], [{{asset.data}}]]</a>\n" +
    "							<a ng-if=\"asset.data == '--' || asset.data == 1\">{{asset.data}}</a>\n" +
    "						</td>\n" +
    "	                </tr>\n" +
    "	            </tbody>\n" +
    "	        </table>\n" +
    "       	</div>\n" +
    "\n" +
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

angular.module("marketPair/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("marketPair/index.tpl.html",
    "<div style=\"background-color:black;color:white;text-align:left\">\n" +
    "\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "    <div class=\"container\">\n" +
    "    	<div class=\"row\"><h1 ng-click=\"marketsToggle()\"><i style=\"font-size:30px\" class=\"fa fa-bars\"></i> {{selectedPair[0]}} / {{selectedPair[1]}}</h1></div>\n" +
    "    </div>\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "\n" +
    "	<div class=\"row\" style=\"text-align:left\">\n" +
    "		<div class=\"spacing-25\"></div>\n" +
    "		<!--<button class=\"btn-default\" ng-click=\"marketsToggle()\"><i style=\"font-size:24px\" class=\"fa fa-bars\"></i> MARKETS</button>-->\n" +
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
    "\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "	<hr>\n" +
    "\n" +
    "	<!--how much data..?-->\n" +
    "	<!--zoom out ability.. a lot-->\n" +
    "	<div class=\"row\" style=\"text-align:left\">\n" +
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
    "\n" +
    "	<!--<h2>Order Book</h2><hr>\n" +
    "	<highchart config=\"bidAskChart\"></highchart>-->\n" +
    "	<div class=\"row\" style=\"text-align:left\">\n" +
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
    "	<div class=\"row\" style=\"text-align:left\">\n" +
    "		<h2>Oscillator</h2>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getMacd([20,40,80,160,320,640],'change')\">MACD</button>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getFosc([20,40,80,160,320,640],'change')\">FOSC</button>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getRsi([20,40,80,160,320,640],'change')\">RSI</button>\n" +
    "		<hr>\n" +
    "		<highchart config=\"oscillatorChart\"></highchart>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"row\" style=\"text-align:left\">\n" +
    "		<h2>Probability Density</h2>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"getPdf('change')\">PDF</button>\n" +
    "		<hr>\n" +
    "		<highchart config=\"heatMapChart\"></highchart>\n" +
    "		<div class=\"spacing-10\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<!--TODO: POSITIONS.. LONG SHORT.. SELL THIS AMOUNT AT THIS PRICE.. ETC. NOT YET EXECUTED-->\n" +
    "	<div class=\"row\" style=\"text-align:left\">\n" +
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
    "<div class=\"spacing-50\"></div>\n" +
    "\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("markets/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("markets/index.tpl.html",
    "<div style=\"background-color:black;color:white;text-align:left\">\n" +
    "\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "    <div class=\"container\">\n" +
    "    	<div class=\"row\"><h1 ng-click=\"marketsToggle()\"><i style=\"font-size:30px\" class=\"fa fa-bars\"></i> Explore</h1></div>\n" +
    "    </div>\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "\n" +
    "		<!--BTC VALUE VECTOR OVER TIME-->\n" +
    "		<!--TODO: MORE EXCHANGES; PAIRS-->\n" +
    "		<!--<highchart config=\"chartConfig\"></highchart>-->\n" +
    "\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTime(60000,'BTC')\">1min</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTime(300000,'BTC')\">5min</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTime(1800000,'BTC')\">30min</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTime(3600000,'BTC')\">1hr</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTime(7200000,'BTC')\">2hrs</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTime(14400000,'BTC')\">4hrs</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTime(21600000,'BTC')\">6hrs</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTime(43200000,'BTC')\">12hrs</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"selectTime(86400000,'BTC')\">24hrs</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"solvePortfolio('60000', 100)\">Solve</p>\n" +
    "		<p class=\"btn btn-default\" ng-click=\"solvePortfolioMulti('60000', 100)\">MultiSolve</p>\n" +
    "		<!--<p class=\"btn btn-default\" ng-click=\"solvePortfolioPDF('60000', 100)\">MultiSolvePDF</p>-->\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"row\" ng-show=\"portfolioData.orderSet.length > 0\">\n" +
    "\n" +
    "		<div class=\"spacing-15\"></div>\n" +
    "		\n" +
    "		<!--\n" +
    "		<h3>Portfolio Set Over Time</h3>\n" +
    "		<div class=\"col-md-6\">\n" +
    "			<div ng-repeat=\"portfolio in portfolioData.portfolioSet\">\n" +
    "				{{portfolio}}\n" +
    "				<br><br>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		-->\n" +
    "\n" +
    "		<h3>Order Set</h3>\n" +
    "		<div ng-repeat=\"order in portfolioData.orderSet\">\n" +
    "			<div class=\"col-md-3 col-sm-4 col-xs-6 \">\n" +
    "				<div class=\"card\">\n" +
    "					<div style=\"padding:16px;\">\n" +
    "						<p style=\"color:grey\">{{order.amount}} {{order.asset1}} ==@{{order.price}}==> {{order.amount / order.price}} {{order.asset2}} @ {{order.createdAt}}</p>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "\n" +
    "		<!--<h3>Value Vectors</h3>-->\n" +
    "		<!--SEARCH-->\n" +
    "		<!--\n" +
    "		<table class=\"table table-striped table-hover\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                	<th>Asset</th>\n" +
    "                	<th>Value</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"asset in vector.data\">\n" +
    "                    <td><a href=\"market/{{asset}}\">{{asset.name}}</a></td>\n" +
    "					<td>{{asset.data}}</td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    	-->\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "\n" +
    "		<h3>Value Matrix</h3>\n" +
    "		<!--SELECTED SET-->\n" +
    "		<div style=\"overflow:scroll\">\n" +
    "			<table class=\"table table-striped table-hover\">\n" +
    "	            <thead>\n" +
    "	                <tr>\n" +
    "	                	<th></th>\n" +
    "	                	<th ng-repeat=\"vector in matrix\">\n" +
    "	                		<a href=\"market/{{vector.name}}\">{{vector.name}}</a>\n" +
    "	                	</th>\n" +
    "	                </tr>\n" +
    "	            </thead>\n" +
    "	            <tbody>\n" +
    "	                <tr ng-repeat=\"vector in matrix\">\n" +
    "	                	<td><b><a href=\"market/{{vector.name}}\">{{vector.name}}</a></b></td>\n" +
    "						<td style=\"max-width:50px;overflow:scroll\" ng-repeat=\"asset in vector.data\"><a href=\"market/{{vector.name}}/{{asset.name}}\">{{asset.data}}</a></td>\n" +
    "	                </tr>\n" +
    "	            </tbody>\n" +
    "	        </table>\n" +
    "	    </div>\n" +
    "\n" +
    "        <!--MULT BY PORTFOLIO VECTOR-->\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "	<!--\n" +
    "	<div class=\"row\">\n" +
    "        <h3>Order Book Tensor</h3>\n" +
    "        <div style=\"overflow:scroll\">\n" +
    "			<table class=\"table table-striped table-hover\">\n" +
    "	            <thead>\n" +
    "	                <tr>\n" +
    "						<th></th>\n" +
    "	                	<th ng-repeat=\"vector in matrix\"><a href=\"market/{{vector.name}}\">{{vector.name}}</a></th>\n" +
    "	                </tr>\n" +
    "	            </thead>\n" +
    "	            <tbody>\n" +
    "	                <tr ng-repeat=\"vector in matrix\">\n" +
    "						<td><b><a href=\"market/{{vector.name}}\">{{vector.name}}</a></b></td>\n" +
    "						<td style=\"max-width:50px;overflow:scroll\" ng-repeat=\"asset in vector.data\">\n" +
    "							<a ng-if=\"asset.data != '--' && asset.data != 1\" href=\"market/{{vector.name}}/{{asset.name}}\">[[{{asset.data}}], [{{asset.data}}]]</a>\n" +
    "							<a ng-if=\"asset.data == '--' || asset.data == 1\">{{asset.data}}</a>\n" +
    "						</td>\n" +
    "	                </tr>\n" +
    "	            </tbody>\n" +
    "	        </table>\n" +
    "       	</div>\n" +
    "    </div>\n" +
    "	-->\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <h3>Market Image</h3>\n" +
    "        <!--SELECTED SET & EXCHANGE-->\n" +
    "        <div style=\"overflow:scroll\">\n" +
    "			<table class=\"table table-striped table-hover\">\n" +
    "	            <thead>\n" +
    "	                <tr>\n" +
    "						<th></th>\n" +
    "	                	<th ng-repeat=\"vector in marketImage\"><a href=\"market/{{vector.name}}\">{{vector.name}}</a></th>\n" +
    "	                </tr>\n" +
    "	            </thead>\n" +
    "	            <tbody>\n" +
    "	                <tr style=\"max-height:50px;overflow:scroll\" ng-repeat=\"vector in marketImage\">\n" +
    "						<td><b><a href=\"market/{{vector.name}}\">{{vector.name}}</a></b></td>\n" +
    "						<td style=\"max-width:50px;overflow:scroll;max-height:50px;\" ng-repeat=\"asset in vector.data\">\n" +
    "							<a ng-if=\"vector.name == asset.name\">1</a>\n" +
    "							<a ng-if=\"vector.name != asset.name && !asset.orderBooks[0].name\" href=\"market/{{vector.name}}/{{asset.name}}\">CIRCUIT<a>\n" +
    "							<a ng-if=\"vector.name != asset.name && asset.orderBooks[0].name\" href=\"market/{{vector.name}}/{{asset.name}}\">TENSOR</a>\n" +
    "						</td>\n" +
    "	                </tr>\n" +
    "	            </tbody>\n" +
    "	        </table>\n" +
    "       	</div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"spacing-15\"></div>\n" +
    " 	\n" +
    "	<div ng-show=\"false\" class=\"row\">\n" +
    "\n" +
    "        <h3>Neural Networks</h3>\n" +
    "        \n" +
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
    "<style>\n" +
    "\n" +
    "	.member-tabs li{\n" +
    "	    display: inline;\n" +
    "	    font-size: 20px;\n" +
    "	    font-family:'Titillium Web',sans-serif;\n" +
    "	}\n" +
    "\n" +
    "	.member-tabs > li > a{\n" +
    "	    padding:10px 15px;\n" +
    "	    color:rgb(125,125,125);\n" +
    "	}\n" +
    "\n" +
    "	.member-tabs > li > a:hover{\n" +
    "	    background-color: #eee;\n" +
    "	    border-radius:3px;\n" +
    "	}\n" +
    "\n" +
    "	.member-tab-container ul{\n" +
    "	    margin:10px 15px;\n" +
    "	}\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<div style=\"background-color:black;color:white;text-align:left\">\n" +
    "\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1 style=\"text-transform:uppercase\">{{member.username}}</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"spacing-25\"></div>\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "<div class=\"container\" style=\"text-align:left\">\n" +
    "	\n" +
    "	<div class=\"row\">\n" +
    "		<div style=\"text-align:left\" class=\"member-tab-container\">\n" +
    "			<ul class=\"member-tabs subNav\" style=\"padding-inline-start: 0px;\">\n" +
    "				<li><a href=\"member/{{member.username}}\">Activity</a></li>\n" +
    "				<li><a href=\"member/{{member.username}}\">{{member.followerCount}} Followers</a></li>\n" +
    "				<li><a href=\"member/{{member.username}}\">{{member.followingCount}} Following</a></li>\n" +
    "				<li><a href=\"member/{{member.username}}\">Positions</a></li>\n" +
    "				<li ng-show=\"currentUser.id != member.id\">\n" +
    "					<a ng-show=\"!isFollowing\" class=\"btn btn-default\" ng-click=\"follow()\">Follow</a>\n" +
    "					<a ng-show=\"isFollowing\" class=\"btn btn-default\" ng-click=\"unfollow()\">UnFollow</a>\n" +
    "				</li>\n" +
    "				<li ng-show=\"currentUser.id == member.id\"><a class=\"btn btn-default\" href=\"account\">Edit Profile</a></li>\n" +
    "				<li ng-click=\"subNavToggle()\"><a style=\"color:black\" href=\"#\"><i class=\"fa fa-bars\"></i></a></li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<p>Representing $1,000,000,000</p> \n" +
    "		<!--or array calc-->\n" +
    "		<!--being more innovation at the pos-->\n" +
    "\n" +
    "		<p>Return %</p>\n" +
    "		<p>Portfolio</p>\n" +
    "		<p>Positions</p>\n" +
    "		<p>Trade History</p>\n" +
    "		<p>Select as Representative</p>\n" +
    "\n" +
    "		<!--pay commission to copy trades-->\n" +
    "		<!--for x $$$$ or array etc-->\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("nav/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("nav/index.tpl.html",
    "<div ng-controller=\"NavCtrl\">\n" +
    "\n" +
    "    <md-sidenav class=\"md-sidenav-right md-whiteframe-z2\" md-component-id=\"login\" md-is-locked-open=\"false\" style=\"text-align:center;position:fixed;background-color:white;width:70%;max-width:100%\">\n" +
    "        <div class=\"md-list-item-text\" layout=\"column\" style=\"height:100%;\">\n" +
    "            <div style=\"text-align:center\">\n" +
    "                <div class=\"spacing-25\"></div>\n" +
    "\n" +
    "                <div style=\"background-color:black;color:white\">\n" +
    "                    <div class=\"spacing-25\"></div>\n" +
    "                    <div class=\"row\"><h1>Login | Welcome back!</h1></div>\n" +
    "                    <div class=\"spacing-25\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"spacing-25\"></div>\n" +
    "\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-10 col-xs-offset-1\">\n" +
    "                        <div class=\"login-form\">\n" +
    "                            <form role=\"form\" method=\"post\" action=\"/auth/local\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <input class=\"form-control\" name=\"identifier\" placeholder=\"Email or Username\" title=\"Username\" type=\"text\"> \n" +
    "                                    <i class=\"fa fa-user\"></i>\n" +
    "                                </div>\n" +
    "                                <div class=\"form-group log-status\">\n" +
    "                                    <input class=\"form-control\" type=\"password\" name=\"password\" placeholder=\"Password\" title=\"password\"> \n" +
    "                                    <i class=\"fa fa-lock\"></i>\n" +
    "                                </div>\n" +
    "                                <div class=\"align-right\">\n" +
    "                                    <button class=\"btn btn-default log-btn\" type=\"submit\" value=\"submit\">Sign in</button>\n" +
    "                                </div>\n" +
    "                                <br><br>\n" +
    "                                <div class=\"social-log\">\n" +
    "                                    <a style=\"text-align:center\" href=\"/register\"><h4>Need an Account?</h4></a>\n" +
    "                                </div>\n" +
    "                            </form>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"spacing-25\"></div>\n" +
    "\n" +
    "                <div ng-include=\"'footer/index.tpl.html'\"></div>  \n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-sidenav>\n" +
    "\n" +
    "    <md-sidenav class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"markets\" md-is-locked-open=\"false\" style=\"text-align:center;position:fixed;background-color:white;max-width:100%\">\n" +
    "        <div class=\"spacing-25\"></div>\n" +
    "        <md-toolbar style=\"background-color:rgb(35, 170, 159)\" class=\"md-primary md-hue-2\">\n" +
    "            <h1 class=\"md-toolbar-tools\">MARKETS</h1>\n" +
    "        </md-toolbar>\n" +
    "        <md-content>\n" +
    "            <md-list>\n" +
    "                <md-list-item ng-repeat=\"pair in tradingPairs\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" style=\"background:#e8e8e8;\">\n" +
    "                    <div class=\"md-list-item-text\" layout=\"column\">\n" +
    "                        <h3><a href=\"market/{{pair.split('/')[1]}}/{{pair.split('/')[0]}}\"><span class=\"pull-left ct-red\">{{pair.split('/')[1]}} / {{pair.split('/')[0]}}</span></a></h3>\n" +
    "                    </div>\n" +
    "                    <md-divider></md-divider>\n" +
    "                </md-list-item>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-sidenav>\n" +
    "\n" +
    "    <md-sidenav class=\"md-sidenav-right md-whiteframe-z2\" md-component-id=\"nav\" md-is-locked-open=\"false\" style=\"position:fixed;background-color:white;\">\n" +
    "        <div class=\"md-list-item-text\" layout=\"column\" style=\"height:100%;\">\n" +
    "            <div style=\"text-align:center\">\n" +
    "                <div class=\"spacing-25\"></div>\n" +
    "                <form style=\"padding:15px;\" role=\"search\" action=\"/search/\" onSubmit=\"location.href = 'search/' + document.getElementById('search-link').value; return false;\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input class=\"form-control\" style=\"margin-top:3px;border-radius:3px;\" ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\" id=\"search-link\" size=\"40\" type=\"text\" placeholder=\"\">\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "                <h3 ng-show=\"!currentUser\" class=\"nav-links\" style=\"padding:16px;color:white\"><a href=\"/about\">ABOUT</a></h3>\n" +
    "                <h3 ng-show=\"currentUser\" class=\"nav-links\" style=\"padding:16px;color:white; text-transform:uppercase\"><a href=\"member/{{currentUser.username}}\">{{currentUser.username}}</a></h3>\n" +
    "                <h3 class=\"nav-links\" style=\"padding:16px;color:white\"><a href=\"/markets\">EXPLORE</a></h3>\n" +
    "                <h3 ng-show=\"currentUser\" class=\"nav-links\" style=\"padding:16px;color:white;\"><a href=\"/\">PORTFOLIO</a></h3>\n" +
    "                <h3 ng-show=\"currentUser\" class=\"nav-links\" style=\"padding:16px;color:white\"><a href=\"/account\">SETTINGS</a></h3>\n" +
    "                <h3 ng-show=\"currentUser\" class=\"nav-links\" style=\"padding:16px;color:white\"><a href=\"/logout\">LOGOUT</a></h3>\n" +
    "                <h3 ng-show=\"!currentUser\" class=\"nav-links\" style=\"padding:16px;;color:white\"><a href=\"/login\">LOGIN</a></h3>\n" +
    "                <h3 ng-show=\"!currentUser\"class=\"nav-links\" style=\"padding:16px;;color:white\"><a href=\"/register\">REGISTER</a></h3>\n" +
    "                <div class=\"spacing-25\"></div>\n" +
    "                <a href=\"/\"><img style=\"width:50px\" src=\"images/tesseract.png\"></a>\n" +
    "                <div class=\"spacing-25\"></div>\n" +
    "                <div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-sidenav>\n" +
    "\n" +
    "    <md-sidenav class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"subNav\" md-is-locked-open=\"false\" style=\"text-align:center;position:fixed;background-color:white;width:70%;max-width:100%\">\n" +
    "        <md-toolbar style=\"background-color:rgb(35, 170, 159)\" class=\"md-primary md-hue-2\">\n" +
    "        </md-toolbar>\n" +
    "        <md-content>\n" +
    "            <md-list>\n" +
    "                <md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" style=\"background:#e8e8e8;\">\n" +
    "                    <div class=\"md-list-item-text\" layout=\"column\">\n" +
    "                        <h3><a ui-sref=\"\"><span class=\"pull-left ct-red\">Home</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider ></md-divider>\n" +
    "                <md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" ng-click=\"changePath('/markets')\">\n" +
    "                    <div class=\"md-list-item-text\" layout=\"column\">\n" +
    "                        <h3><a ui-sref=\"sites\"><span class=\"pull-left ct-red\">Markets</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider ></md-divider>\n" +
    "                <md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" ng-click=\"changePath('member/troverman')\">\n" +
    "                    <div class=\"md-list-item-text\" layout=\"column\">\n" +
    "                        <h3><a ui-sref=\"sites\"><span class=\"pull-left ct-red\">Portfolio</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider ></md-divider>\n" +
    "                <md-list-item ui-sref-active=\"active\" class=\"menu-select md-3-line\" md-ink-ripple=\"#101010\" ng-click=\"changePath('')\">\n" +
    "                    <div class=\"md-list-item-text\" layout=\"column\">\n" +
    "                        <h3><a ui-sref=\"sites\"><span class=\"pull-left ct-red\">Trades</span><md-icon class=\"pull-right\"></md-icon></a></h3>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider ></md-divider>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-sidenav>\n" +
    "\n" +
    "    <div class=\"navbar navbar-custom navbar-fixed-top\" role=\"navigation\">\n" +
    "        <div class=\"container\">\n" +
    "\n" +
    "            <button class=\"navIcon\" type=\"button\" ng-click=\"navToggle()\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"navbar-brand\" href=\"/\"><img src=\"images/tesseract.png\" style=\"height:32px;float:left;margin-top:-3px;margin-right:10px\">CRE8.CAPITAL</a>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <md-progress-linear ng-if=\"stateIsLoading\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
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
    "                    <!--\n" +
    "                    <br><br>\n" +
    "                    <div class=\"social-log\">\n" +
    "                        <a class=\"btn btn-facebook\" ng-click=\"\"><i class=\"fa fa-facebook\"></i> Facebook</a>\n" +
    "                        <a class=\"btn btn-twitter\" ng-click=\"\"><i class=\"fa fa-twitter\"></i> Twitter</a>\n" +
    "                        <a class=\"btn btn-google\" ng-click=\"\"><i class=\"fa fa-google\"></i> Google</a>\n" +
    "                    </div>\n" +
    "                    -->\n" +
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

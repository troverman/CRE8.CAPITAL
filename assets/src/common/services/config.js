angular.module( 'services.config', ['lodash'])
.service('config',['lodash', function(lodash) {
	return {
		siteName: 'NOVO',
		siteUrl: '/',
		apiUrl: '/api',
		currentUser: false
	};
}]);
module.exports = {
    index: function(req, res) {
        res.view({
            title: 'Home',
            currentUser: req.user
        });
    },

    ssl: function(req, res) {
        res.send('6vMcD5bHdA1IbOn59yq6ms_wEF_h38L-rrOhjlJOKNI.yMz-EAV5agQah1zn-w6Aqp0JVzxv1jmSFH6dh5Ea9uI')
    }

};
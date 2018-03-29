

function webpackNoModules (options) {

}

webpackNoModules.prototype.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
        console.log('_________ dir ___________', __dirname);
        callback();
    });
}

module.exports = webpackNoModules;


var _ = require('lodash');
var path = require('path');
var fs = require('fs');

function webpackNoModules (options) {
    this.options = _.extend({
        target: path.join(__dirname, '../../static'),
        dest: path.join(__dirname, '../../dist')
      }, options);
}

webpackNoModules.prototype.apply = function (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
        let target = this.options.target;
        let dest = this.options.dest;
        let baseName = path.basename(target);

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        let destDir = this.options.dest + '/' + baseName;

        copyFiles(target, destDir);
        callback();
    });
}

function copyFiles (target, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    if (fs.existsSync(target)) {
        let files = fs.readdirSync(target);

        files.forEach((file) => {
            let t = target + '/' + file;
            let d = dest + '/' + file;

            if (fs.statSync(t).isDirectory()) {
                if (!fs.existsSync(d)) {
                    fs.mkdirSync(d);
                }
                copyFiles(t, d);
            } else {
                if (file.indexOf('.') > 0) {
                    fs.copyFileSync(t, d);
                }
                
            }
        });
    } else {
        console.log(' file no exist');
    }
}

module.exports = webpackNoModules;


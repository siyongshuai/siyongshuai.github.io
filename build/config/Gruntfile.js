module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        'clean':{
            files: ['.grunt','build']
        },
        'copy': {
            source: {
                'src': ['source/**/*'],
                'dest': 'build/',
            },
            config: {
                'src': [
                    'package.json',
                    'Gruntfile.js',
                    '_config.yml'
                ],
                'dest': 'build/config/'
            },
            theme: {
                'src': [
                    'themes/landscape/_config.yml'
                ],
                'dest': 'build/theme/',
                expand: true,
                flatten: true
            },
            readme:{
                'src': [
                    'README.md'
                ],
                'dest': 'build/'
            }
        },
        'gh-pages': {
            options: {
                base: 'build',
                branch: 'blog_source'
            },
            src: ['**']
        }
    });

    grunt.registerTask('pre', ['clean','copy']);
    grunt.registerTask('syn', 'gh-pages');
    grunt.registerTask('bac_src', ['clean','copy','gh-pages']);
};

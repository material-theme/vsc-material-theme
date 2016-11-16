'use strict';

/*
 * > Release
 */

import gulp from 'gulp';
import paths from '../paths';
import conventionalGithubReleaser from 'conventional-github-releaser';


gulp.task('github-release', (done) => {
  conventionalGithubReleaser({
    type: 'oauth',
    token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
  }, {
    preset: 'angular'
  }, done);
});
